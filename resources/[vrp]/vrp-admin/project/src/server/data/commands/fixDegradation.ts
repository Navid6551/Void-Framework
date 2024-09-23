import { RankValue } from "../../../shared/classes/enums";

export const fixDegradation: CommandData = {
    name: 'fixDegradation',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData) {
        const player = GetPlayerPed(pUser.source);
        if (!player) return 'You are not a player)';

        const vehicle = GetVehiclePedIsIn(player, false);
        if (!vehicle) return 'You are not in a vehicle)';

        const result = global.exports["vrp-vehicles"].SetVehicleDegradation(vehicle, {
            axle: 100,
            brakes: 100,
            clutch: 100,
            electronics: 100,
            injector: 100,
            radiator: 100,
            tyres: 100,
            engine: 100,
            body: 100,
            transmission: 100
        });

        if (!result) return 'Failed to fix degradation)';

        return 'Success' + ')';
    },
    log: 'Fixed Degradation (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Fix Degradation',
                cat: 'Utility',
                child: null,
            },
            options: {
                bindKey: {
                    value: null,
                    options: [],
                },
            },
        },
    },
    blockClientLog: true,
};