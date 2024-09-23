// import fetch from 'node-fetch';

// export class Log {
//     private static instance: Log;
//     private constructor() { }

//     public static getInstance(): Log {
//         if (!Log.instance) {
//             Log.instance = new Log();
//         }

//         return Log.instance;
//     }

//     public async logAdminAction(action: string) {
//         //fetch webhook/discord: https://discord.com/api/webhooks/1115701065363505162/5bIZWJuSU7Y0oAQeI7mWGJL_iAl1bkwENg0yV1Q8U3Vh1-QRrXDCh4uxKL7Z3XlsPiq9
//         try {
//             const response = await fetch('https://discord.com/api/webhooks/1115701065363505162/5bIZWJuSU7Y0oAQeI7mWGJL_iAl1bkwENg0yV1Q8U3Vh1-QRrXDCh4uxKL7Z3XlsPiq9', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     username: 'vrp-admin',
//                     content: 'An admin just performed an action',
//                     embeds: [
//                         {
//                             title: 'Admin Action',
//                             description: action,
//                         }
//                     ]
//                 })
//             })

//             if (response) {
//                 console.log(`[ADMIN] Log successfully sent to discord.`);
//             }
//         } catch (error) {
//             console.log(`[ADMIN] Error sending log to discord: ${error}`);
//         }
//     }
// }