import { RankValue } from "../../classes/enums";

interface ExplodeEntityArgs {
    Entity: number;
}

export const explodeEntity: CommandData = {
    name: 'explodeEntity',
    value: RankValue.special,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: ExplodeEntityArgs) {
        const type = GetEntityType(pArgs.Entity);
        switch (type) {
            case 1:
                if (IsPedAPlayer(pArgs.Entity)) {
                    const serverId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(pArgs.Entity));
                    emitNet('vrp-admin:explodePlayer', serverId);
                } else {
                    const netId = NetworkGetNetworkIdFromEntity(pArgs.Entity);
                    emitNet('vrp-admin:explodeVehicle', netId);
                }
                break;
            case 2:
                const netId = NetworkGetNetworkIdFromEntity(pArgs.Entity);
                emitNet('vrp-admin:explodeVehicle', netId);
                break;
            case 3:
                const entityCoords = GetEntityCoords(pArgs.Entity, false);
                {
                    emitNet('vrp-admin:explodeVehicle', null, entityCoords);
                    emit('vrp:admin:updateUI');
                }
                break;
        }
        return '[' + pArgs.Entity + ']';
    },
    log: '  exploded Entity ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Explode Entity',
            child: null,
            action: '',
            entityType: -1,
        },
    },
};