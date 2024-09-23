var LOG_LEVELS: any = {
    warning: 1,
    log: 2,
    error: 3,
    debug: 4
};
  
var resourceLogLevel: any = typeof GetConvar === "function" ? GetConvar(`${GetCurrentResourceName()}_logLevel`, "") : "";
var logLevel = typeof GetConvar === "function" ? GetConvar("sv_loglevel", "warning") : "warning";
logLevel = (resourceLogLevel == null ? void 0 : resourceLogLevel.length) > 0 ? resourceLogLevel : logLevel;
  
(() => {
    if (!LOG_LEVELS[logLevel]) throw new Error(`Invalid log level: ${logLevel}`);
})();
  
var warning = () => LOG_LEVELS[logLevel] >= LOG_LEVELS["warning"];
var log = () => LOG_LEVELS[logLevel] >= LOG_LEVELS["log"];
var error = () => LOG_LEVELS[logLevel] >= LOG_LEVELS["error"];
var debug = () => true;//logLevel === "debug";
export const Logger = {
    warning: (text: any, ...input: any) => {
        if (!warning()) return;
        console.log(`^3[WARNING] ^7${text}`, ...input, "^0");
    },
    log: (text: any, ...input: any) => {
        if (!log()) return;
        console.log(`^5[void] ^7${text}`, ...input, "^0");
    },
    debug: (text: any, ...input: any) => {
        if (!debug()) return;
        console.log(`^2[D] ${text}`, ...input, "^0");
    },
    error: (text: any, ...input: any) => {
        if (!error())return;
        console.log(`^1[ERROR] ${text}`, ...input, "^0");
    }
};
    