import { RankValue } from "../../../shared/classes/enums";
import { Base } from "@vpx/server";

interface GiveWhitelistArgs {
    Job: string;
    Rank: string;
    Target: Target;
}

export const giveWhitelist: CommandData = {
    name: 'giveWhitelist',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: GiveWhitelistArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to give whitelist. Target does not exist.';
        if (!pArgs.Job) return 'Failed to give whitelist. No job specified.';
        if (!pArgs.Rank) return 'Failed to give whitelist. No rank specified.';

        const user: User = Base.getModule<PlayerModule>('Player').GetUser(target.source);
        if (!user) return 'Failed to give whitelist. Target does not exist.';

        const hasJob = await SQL.execute('SELECT * FROM jobs_whitelist WHERE job = @job AND cid = @cid', {
            job: pArgs.Job,
            cid: user.character.id
        });
        if (hasJob[0]) return 'Failed to give whitelist. Target already has this job.';

        const update = await SQL.execute('INSERT INTO jobs_whitelist (cid, rank, callsign, job) VALUES (@cid, @rank, @callsign, @job)', {
            cid: user.character.id,
            rank: pArgs.Rank,
            callsign: '0',
            job: pArgs.Job
        });
        if (!update) return 'Failed to give whitelist.';

        return '' + pArgs.Job + ') to ' + '-' + target.name + '-';
    },
    log: 'Gave Whitelist job (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Give Whitelist',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot', 'Job', 'Rank'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};