import { RankValue } from "../../classes/enums";

interface DamageEntityArgs {
    Entity: number;
}

export const damageEntity: CommandData = {
    name: 'damageEntity',
    value: RankValue.special,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: DamageEntityArgs) {
        const type = GetEntityType(pArgs.Entity);
        switch (type) {
            case 1:
                if (IsPedAPlayer(pArgs.Entity)) {
                    const serverId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(pArgs.Entity));
                    emitNet('vrp-admin:damagePed', serverId, 20);
                } else
                    ApplyDamageToPed(pArgs.Entity, 20, true);
                break;
            case 2:
                const netId = NetworkGetNetworkIdFromEntity(pArgs.Entity);
                emitNet('vrp-admin:damageVehicle', netId);
                break;
            case 3:
                const [x, y, z] = GetEntityCoords(pArgs.Entity, false);
                {
                    AddExplosion(x, y, z, 70, 0.1, false, true, 0);
                    emit('vrp:admin:updateUI');
                }
                break;
        }
        return '[' + pArgs.Entity + ']';
    },
    log: '  Damaged Entity ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Damage Entity',
            child: null,
            action: '',
            entityType: -1,
        },
    },
};