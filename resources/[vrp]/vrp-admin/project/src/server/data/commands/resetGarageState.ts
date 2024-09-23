import { Base } from "@vpx/server";
import { RankValue } from "../../../shared/classes/enums";

export const resetGarageState: CommandData = {
    name: 'resetGarageState',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData) {
        const user: User = Base.getModule<PlayerModule>("Player").GetUser(Number(pUser.source));
        if (!user) return 'Failed to reset garage state. Target does not exist)';

        const results = await SQL.execute("UPDATE _vehicle SET state = @state WHERE cid = @cid", {
            state: "stored",
            cid: user.character.id
        });

        if (!results) return 'Failed to reset garage state)';

        emitNet("vrp-vehicles:bustGarageCacheOpen", user.source);

        return 'Successfully reset garage state)';
    },
    log: 'Reset Garage State (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Reset Garage State',
                cat: 'Utility',
                child: null,
            },
            options: {
                bindKey: {
                    value: null,
                    options: [],
                },
            },
        },
    },
};