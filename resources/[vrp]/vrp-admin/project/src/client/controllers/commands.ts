const requireClientCommands = require.context(
    '../../shared/data/commands',
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

export const clientCommandArray = [];
export async function InitCommands() {
    const clientCommands = GetClientCommands();
    clientCommands.flatMap(Object.values).forEach(command => clientCommandArray.push(command));
}