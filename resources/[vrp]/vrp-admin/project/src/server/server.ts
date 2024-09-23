import * as Controllers from './controllers';
export const QBCore = globalThis.exports['vrp-core'].GetCoreObject()

const ResourceName = GetCurrentResourceName();

const requireClientCommands = require.context(
    '../shared/data/commands',
    false, // look subfolders
    /\.ts$/, //regex for files
)

export function GetClientCommands() {
    const clientCommands: any = [];
    requireClientCommands.keys().forEach((key) => {
        const obj = requireClientCommands(key);
        clientCommands.push(obj);
    });
    return clientCommands;
}

const requireServerCommands = require.context(
    './data/commands',
    false, // look subfolders
    /\.ts$/, //regex for files
)

export function GetServerCommands() {
    const serverCommands: any = [];
    requireServerCommands.keys().forEach((key) => {
        const obj = requireServerCommands(key);
        serverCommands.push(obj);
    });
    return serverCommands;
}

export const clientCommandArray: any = [];
export const serverCommandArray: any = [];

on("onResourceStart", async (resource: string) => {
    if (resource !== ResourceName) return;

    if (clientCommandArray.length == 0 && serverCommandArray.length == 0) {
        const clientCommands = GetClientCommands();
        const serverCommands = GetServerCommands();

        console.log(`[${ResourceName}] Attempted [${clientCommands.length + serverCommands.length}] Commands`);

        clientCommands.flatMap(Object.values).forEach(command => clientCommandArray.push(command));
        serverCommands.flatMap(Object.values).forEach(command => serverCommandArray.push(command));

        console.log(`[${ResourceName}] Added [${clientCommandArray.length + serverCommandArray.length}] Commands`);
    }

    await Controllers.Init();
});