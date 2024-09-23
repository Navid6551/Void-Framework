import { RankValue } from "../../../shared/classes/enums";

interface SpawnCarArgs {
    Vehicle: string;
    'Vehicle Overwrite': string;
    'Appearance Overwrite': string;
    'Mods Overwrite': string;
    //Vin: string;
    //Mods: boolean;
}

export const spawnCar: CommandData = {
    name: 'spawnCar',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: SpawnCarArgs) {
        if (pArgs.Vehicle === "" || pArgs.Vehicle === undefined || pArgs.Vehicle === null) pArgs.Vehicle = pArgs['Vehicle Overwrite'];
        if (pArgs.Vehicle === "" || pArgs.Vehicle === undefined || pArgs.Vehicle === null) return 'Failed to spawn vehicle. No vehicle specified.';;      
        let appearance = pArgs?.['Appearance Overwrite'] ?? '{}';
        let mods = pArgs?.['Mods Overwrite'] ?? '{}';
        if (appearance) appearance = JSON.parse(appearance ?? '{}');
        if (mods) mods = JSON.parse(mods ?? '{}');

        const offset = await RPC.execute<number[]>('GetOffsetFromEntityInWorldCoords', Number(pUser.source ?? 0));
        const coords = { x: offset[0], y: offset[1], z: offset[2] };
        const result = await global.exports["vrp-vehicles"].BasicSpawn(Number(pUser.source ?? 0), pArgs.Vehicle, coords, null, 'menu', -1, appearance, mods);        
        if (!result) return 'Failed to spawn vehicle.';

        emitNet('vrp-admin:setLastVehicle', pUser.source, result.netId ?? 0);

        return '' + pArgs.Vehicle + ')';
    },
    log: 'Spawned car (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Spawn Car',
                cat: 'Utility',
                child: {
                    inputs: ['Vehicle', 'Vehicle Overwrite', 'Appearance Overwrite', 'Mods Overwrite'], //'Vin', 
                    //checkBox: ['Mods'],
                    triggers: [
                        {
                            name: 'Last Vehicle',
                            event: 'vrp-admin:enterlastVeh'
                        }
                    ]
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};