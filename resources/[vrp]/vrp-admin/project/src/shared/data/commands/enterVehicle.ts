import { RankValue } from "../../classes/enums";

interface EnterVehicleArgs {
    Entity: number;
    Seat: any;
}

export const enterVehicle: CommandData = {
    name: 'enterVehicle',
    value: RankValue.special,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: EnterVehicleArgs) {
        const entity = pArgs.Entity;
        let seat = Number.parseInt(pArgs.Seat);
        if (!entity || !DoesEntityExist(entity)) return 'Failed to Enter Vehicle. Entity does not exist.';
        if (!Number.isNaN(seat) && !IsVehicleSeatFree(entity, seat)) return 'Failed to Enter Vehicle. Seat already occupied.';
        if (!AreAnyVehicleSeatsFree(entity)) {
            return 'Failed to Enter Vehicle. No free seats.';
        }
        if (Number.isNaN(seat)) {
            for (let i = -1; i <= 6; i++) {
                if (IsVehicleSeatFree(entity, i)) {
                    seat = i;
                    break;
                }
            }
        }
        TaskWarpPedIntoVehicle(PlayerPedId(), entity, seat);
        return 'Entered vehicle (seat=' + seat + ').';
    },
    log: '',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Enter Vehicle',
            child: { inputs: { Seat: 'text' } },
            action: '',
            entityType: 2,
        },
    },
    blockClientLog: false,
};