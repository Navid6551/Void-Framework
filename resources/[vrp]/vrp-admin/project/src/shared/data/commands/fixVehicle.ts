import { RankValue } from "../../../shared/classes/enums";

export const fixVehicle: CommandData = {
    name: 'fixVehicle',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData) {
        const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);
        SetVehicleEngineHealth(vehicle, 1000);
        SetVehicleBodyHealth(vehicle, 1000);
        SetVehicleDeformationFixed(vehicle);
        SetVehicleFixed(vehicle);

        return '';
    },
    log: '  Fixed Vehicle.',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Fix Vehicle',
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
};