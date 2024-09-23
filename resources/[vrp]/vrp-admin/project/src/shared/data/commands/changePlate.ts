import { RankValue } from "../../classes/enums";

interface ChangePlateArgs {
    Entity?: number;
    Plate: string;
    Temporary: boolean;
}

const _0x26a953 = (pVin: string) => {
    return pVin == null || pVin.substring(0, 1) == '1';
};

const _0xed4bc1 = (pVin: string) => {
    return pVin != null && pVin.substring(1, 3) == 'RN';
};

const IsLocalVehicle = (pVin: string, pTemporary = false) => {
    return pTemporary || _0x26a953(pVin) || _0xed4bc1(pVin);
};

export const changePlate: CommandData = {
    name: 'changePlate',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: ChangePlateArgs) {
        let entity = pArgs.Entity;
        if (!entity) {
            entity = GetVehiclePedIsIn(PlayerPedId(), false);
        }
        if (!entity || !DoesEntityExist(entity) || entity == 0) return 'Invalid Vehicle';
        const vin = global.exports['vrp-vehicles'].GetVehicleIdentifier(entity);
        const plate = pArgs.Plate.trim().toUpperCase().replace(/\s\s+/g, ' ');
        if (IsLocalVehicle(vin, pArgs.Temporary)) SetVehicleNumberPlateText(entity, plate);
        else {
            emitNet('vrp-mdt:changeVehicleData', {
                vehicle: entity,
                type: 'plate',
                vin: vin,
                value: plate
            });
        }
        return '[' + plate + ']';
    },
    log: 'Changed license plate to ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Change License Plate',
                cat: 'Utility',
                child: {
                    inputs: ['Plate'],
                    checkBox: ['Temporary'],
                },
            },
            options: { bindKey: null },
        },
    },
    blockClientLog: true,
    closeMenu: false,
};