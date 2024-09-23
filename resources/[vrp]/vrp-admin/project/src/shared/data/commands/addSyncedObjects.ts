import { RankValue } from "../../classes/enums";
import { Events } from "@vpx/client";

interface AddSyncedObjectsArgs {
    Model: string;
    JsonText: string;
}

export const addSyncedObjects: CommandData = {
    name: 'addSyncedObjects',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: AddSyncedObjectsArgs) {
        let jsonText = {};

        if (pArgs.JsonText != null && pArgs.JsonText.length >= 1) {
            jsonText = JSON.parse(pArgs.JsonText);
        }

        global.exports['vrp-objects'].PlaceAndSaveObject(GetHashKey(pArgs.Model), jsonText, {
            groundSnap: true,
            useModelOffset: true,
            adjustZ: true,
            distance: 25,
            maxDistance: 400,
            allowHousePlacement: true,
            allowGizmo: true
        });

        const playerCoords = GetEntityCoords(PlayerPedId(), false);
        Events.emitNet('vrp-admin:submitAdminAction', 'Added synced object', pArgs.Model + ' at ' + playerCoords + ' | JSON: (' + pArgs.JsonText + ')');

        return '[' + pArgs.Model + '] ... [' + pArgs.JsonText + ']';
    },
    log: ' Added Synced Object ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Add Synced Object',
                cat: 'Utility',
                child: {
                    inputs: ['Model', 'JsonText'],
                },
            },
            options: { bindKey: null },
        },
    },
    closeMenu: true,
};