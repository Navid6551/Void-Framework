import { RankValue } from "../../classes/enums";
import { getValue, setValue } from "../../../client/controllers/state";
import { Events } from "@vpx/client";

interface AutoRefuelArgs {
    toggle: boolean;
}

export const autoRefuel: CommandData = {
    name: 'autoRefuel',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: AutoRefuelArgs) {
        let isFueling = false;
        if (pArgs.toggle != null) {
            isFueling = pArgs.toggle;
        }

        setValue('autoRefuel', isFueling);
        emit('carandplayerhud:godCheck', isFueling);

        if (isFueling && await getValue('refuelTimer') != null) {
            return '' + isFueling + ')';
        } else {
            if (!isFueling) {
                stopAutoRefuel();
                return '' + isFueling + ')';
            }
        }

        await setValue('refuelTimer', setInterval(startAutoRefuel, 5000));

        async function startAutoRefuel() {
            const playerPed = GetPlayerPed(PlayerId());
            const vehicle = GetVehiclePedIsIn(playerPed, false);
            if (!vehicle || vehicle == 0) return;
            emitNet('vrp-admin:refuelVehicle', +NetworkGetNetworkIdFromEntity(vehicle));
        }

        async function stopAutoRefuel() {
            clearInterval(await getValue('refuelTimer'));
            await setValue('refuelTimer', null);
        }

        Events.emitNet('vrp-admin:submitAdminAction', 'Toggled Auto Refuel', isFueling ? 'On' : 'Off');

        return '' + isFueling + ')';
    },
    log: 'set Auto Refuel (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: { title: 'Auto Refuel', cat: 'Player', child: false },
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