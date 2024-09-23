import { RankValue } from "../../../shared/classes/enums";

interface SeedCarArgs {
    Cid: number;
    Model: string;
    //PDM: boolean;
    //Tuner: boolean;
}

export const seedCar: CommandData = {
    name: 'seedCar',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: SeedCarArgs) {
        const cid = pArgs.Cid;
        const model = pArgs.Model;
        //const pdm = pArgs.PDM;
        //const tuner = pArgs.Tuner;
        if (!cid || !model) return 'Invalid arguments.';

        const vehicleInfo: any = await global.exports['vrp-vehicles'].GenerateVehicleInfo(pUser.source, cid, model, 'owned', 'pdm');
        if (!vehicleInfo) return 'Invalid vehicle info.';
        
        const result = await SQL.execute('INSERT INTO _vehicle (cid, vin, model, state, garage, plate, name, type, degradation, metadata, damage, mods, appearance) VALUES (@cid, @vin, @model, @state, @garage, @plate, @name, @type, @degradation, @metadata, @damage, @mods, @appearance)', {
            cid: cid,
            vin: vehicleInfo.vin,
            model: model,
            state: 'stored',
            garage: 'garage_alta',
            plate: vehicleInfo.plate,
            name: null,
            type: vehicleInfo.type,
            degradation: JSON.stringify(vehicleInfo.degradation),
            metadata: JSON.stringify(vehicleInfo.metadata),
            damage: JSON.stringify(vehicleInfo.damage),
            mods: JSON.stringify(vehicleInfo.mods),
            appearance: JSON.stringify(vehicleInfo.appearance)
        });
        if (!result) return 'Failed to seed car.';

        return `VIN: ${vehicleInfo.vin}, Model: ${model})`;
    },
    log: 'Seeding car (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Seed Car',
                cat: 'Utility',
                child: {
                    inputs: ['Cid', 'Model'],
                    //checkBox: ['PDM', 'Tuner'],
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};