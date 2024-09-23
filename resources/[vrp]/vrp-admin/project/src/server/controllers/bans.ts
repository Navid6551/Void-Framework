import { DB } from "@vpx/server";
import { Delay } from "@shared/utils/tools";
import { getHexId, hexIdToSteamId } from "server/util/tools";

export async function InitBans(): Promise<void> { };

// onNet('playerConnecting', async (name: string, setKickReason: Function, deferrals: Deferrals) => {
//     let connecting = true;
//     const source = global.source;
//     const hexId = await getHexId(source);

//     deferrals.defer();

//     setImmediate(async () => {
//         while (connecting) {
//             await Delay(100);
//             if (!connecting) return;

//             deferrals.update('Checking bans...');
//         }
//     });

//     await Delay(250);

//     if (hexId === "None") {
//         connecting = false;
//         deferrals.done('You need to have steam open to join this server.');
//         CancelEvent();
//         return;
//     }

//     const steamId = await hexIdToSteamId(hexId);

//     const bans = await DB.execute<any[]>('SELECT * FROM _admin_ban WHERE SteamID = @SteamID', {
//         SteamID: steamId
//     });

//     if (bans.length > 0) { // TODO: Add tokens to the table if it doesn't exist (means they were offline banned)
//         connecting = false;
//         deferrals.done(`You are banned. | Ban ID: ${bans[0].ban_id} | Reason: ${bans[0].reason} | Unban Date: ${Number(bans[0].until) === 0 ? 'Permanent' : new Date(Number(bans[0].until))}}`);
//         CancelEvent();
//         return;
//     }

//     const tokenBans = await DB.execute<any[]>('SELECT * FROM _admin_ban', {});
//     if (tokenBans) {
//         let found = false;
//         for (let i = 0; i < tokenBans.length; i++) {
//             const tokens = JSON.parse(tokenBans[i].tokens) ?? [];
//             for (let j = 0; j < tokens.length; j++) {
//                 const token = GetPlayerToken(source.toString(), j);
//                 if (tokens[j] === token) {
//                     found = true;
//                     break;
//                 }
//             }
//         }

//         if (found) { //TODO; If ban is permanent, ban their new steam id for ban evasion.
//             connecting = false;
//             deferrals.done(`You are banned. | Ban ID: ${tokenBans[0].ban_id} | Reason: Ban Evasion | Unban Date: ${Number(tokenBans[0].until) === 0 ? 'Permanent' : new Date(Number(tokenBans[0].until))}`);
//             CancelEvent();
//             return;
//         }
//     }

//     await Delay(250);

//     connecting = false;
//     deferrals.done();
// });