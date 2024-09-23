import { RankValue } from "../../../shared/classes/enums";

interface GiveKeysArgs {
    Entity: number;
    targetNetId: number;
}

export const giveKeys: CommandData = {
    name: 'giveKeys',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: GiveKeysArgs) {
        const netId = pArgs.targetNetId;
        if (!netId) return 'Failed to give keys. Entity does not exist.';

        const entity = NetworkGetEntityFromNetworkId(netId);
        const vehicleModel = GetEntityModel(entity);

        emit('vrp:vehicles:gotKeys', netId, vehicleModel, pUser.source);

        return '' + netId + ')';
    },
    log: 'Gave Keys (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        selection: {
            title: 'Give Keys',
            child: null,
            action: '',
            entityType: 2,
        },
    },
    blockClientLog: true,
};