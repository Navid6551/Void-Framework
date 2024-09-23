import { Base } from "@vpx/server";
import { RankValue } from "../../../shared/classes/enums";
import { QBCore } from "server/server";

interface VehicleMenuArgs {
    Garage: string;
    Target: Target;
}

export const vehicleMenu: CommandData = {
    name: 'vehicleMenu',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: VehicleMenuArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to open vehicle menu. Target does not exist.';

        const user = QBCore.Functions.GetPlayer(target.source);
        if (!user) return 'Failed to open vehicle menu. Target does not exist.';

        emitNet('vehicle:garageVehicleList', target.source, {
            nearby: false,
            radius: 0,
            garageId: pArgs.Garage,
        });

        return '' + '-' + GetPlayerName(target.source) + '-';
    },
    log: 'Opened Vehicle Menu for ',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Vehicle Menu',
                cat: 'Utility',
                child: {
                    inputs: ['TargetNot', 'Garage'],
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
    closeMenu: true,
};