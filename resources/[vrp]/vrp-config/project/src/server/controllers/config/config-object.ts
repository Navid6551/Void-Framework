const requireConfig = require.context(
    '../../../../../config',
    true, // look subfolders
    /\.json$/, //regex for files
);

export function GetConfigObject() {
    const configObject: any = [];
    requireConfig.keys().forEach((key) => {
        const obj = requireConfig(key);
        configObject.push(obj);
    });
    return configObject;
}