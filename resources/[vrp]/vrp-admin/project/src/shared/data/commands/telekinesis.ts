import { RankValue } from "../../classes/enums";

interface TelekinesisArgs {
    Entity: number;
}

export const telekinesis: CommandData = {
    name: 'telekinesis',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: TelekinesisArgs) {
        const type = GetEntityType(pArgs.Entity);
        const netId = NetworkGetNetworkIdFromEntity(pArgs.Entity);
        switch (type) {
            case 1:
            case 2:
                emitNet('vrp-admin:telekinesis', netId);
                break;
        }
        return '[' + pArgs.Entity + ']';
    },
    log: '  used telekinesis on Entity ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Telekinesis',
            child: null,
            action: '',
            entityType: -1,
        },
    },
};