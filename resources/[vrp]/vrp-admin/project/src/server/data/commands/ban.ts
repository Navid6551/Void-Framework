import { Base } from "@vpx/server";
import { RankValue } from "../../../shared/classes/enums";
import { v4 as uuid } from 'uuid';

interface BanArgs {
    Reason: string;
    Target: Target;
}

export const ban: CommandData = {
    name: 'ban',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: BanArgs) {
        const target = pArgs?.Target;
        if (!target) return 'Failed to ban. Target does not exist.';
        const reason = pArgs?.Reason;
        if (!reason) return 'Failed to ban. Reason is empty.';
        const user: User = Base.getModule<PlayerModule>("Player").GetUser(Number(target.source));
        if (!user) return 'Failed to ban. Target does not exist.';

        const banId = uuid();
        const playerName = GetPlayerName(Number(target.source));
        const adminName = GetPlayerName(pUser.source);
        const playerTokens = getPlayerTokens(target.source);

        const results = await SQL.execute('INSERT INTO _admin_ban (`ban_id`, `tokens`, `name`, `admin`, `SteamID`, `reason`, `from`, `until`) VALUES (@ban_id, @tokens, @name, @admin, @SteamID, @reason, @from, @until)', {
            ban_id: banId,
            tokens: JSON.stringify(playerTokens),
            name: playerName,
            admin: adminName,
            SteamID: user.steamid,
            reason: reason,
            from: Date.now(),
            until: 0,
        });
        if (!results) return 'Failed to ban. Database error.';

        DropPlayer(target.source.toString(), `You are banned. | Ban ID: ${banId} | Reason: ${reason} | Unban Date: Permanent`);

        return `[${target.source}] ${target.name} for ${reason}`;
    },
    log: 'Perm Banned ',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Ban',
                cat: 'Player',
                child: {
                    inputs: ['Target', 'Reason'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};