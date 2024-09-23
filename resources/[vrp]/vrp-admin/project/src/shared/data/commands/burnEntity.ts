import { RankValue } from "../../classes/enums";

interface BurnEntityArgs {
    Entity: number;
}

export const burnEntity: CommandData = {
    name: 'burnEntity',
    value: RankValue.special,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: BurnEntityArgs) {
        const type = GetEntityType(pArgs.Entity);
        switch (type) {
            case 1:
                if (IsPedAPlayer(pArgs.Entity)) {
                    const serverId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(pArgs.Entity));
                    emitNet('vrp-admin:burnPlayer', serverId, 20);
                } else {
                    const netId = NetworkGetNetworkIdFromEntity(pArgs.Entity);
                    emitNet('vrp-admin:burnEntity', netId);
                }
                break;
            case 2:
                const netId = NetworkGetNetworkIdFromEntity(pArgs.Entity);
                emitNet('vrp-admin:burnEntity', netId);
                break;
        }
        return '[' + pArgs.Entity + ']';
    },
    log: '  burned Entity ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Burn Entity',
            child: null,
            action: '',
            entityType: -1,
        },
    },
    closeMenu: true,
};