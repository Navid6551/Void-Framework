const BankMinigame = async (options: any) => {
    return globalThis.exports["vrp-heists"].BankMinigame(options);
};
const DDRMinigame = async (options: any) => {
    return globalThis.exports["vrp-heists"].DDRMinigame(options);
};
const DirectionMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].DirectionMinigame(options);
};
const DrillingMinigame = async () => {
    return globalThis.exports["skillchecks"].DrillingMinigame();
};
const FlipMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].FlipMinigame(options);
};
const FloodMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].FloodMinigame(options);
};
const TaskBarMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].TaskBarMinigame(options.difficulty, options.gap, options.iterations, options.useReverse);
};
const MazeMinigame = async (options: any) => {
    return globalThis.exports["vrp-heists"].MazeMinigame(options);
};
const CrackSafe = async (options: any) => {
    return globalThis.exports["skillchecks"].CrackSafe(options.locks);
};
const SameMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].SameMinigame(options);
};
const ThermiteMinigame = async (options: any) => {
    return globalThis.exports["vrp-heists"].ThermiteMinigame(options);
};
const UntangleMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].UntangleMinigame(options);
};
const VarMinigame = async (options: any) => {
    return globalThis.exports["vrp-heists"].VarMinigame(options);
};
const WordsMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].WordsMinigame(options);
};
const AlphabetMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].AlphabetMinigame(options);
};
const LockpickMinigame = async (options: any) => {
    return globalThis.exports["skillchecks"].LockpickMinigame(options);
};

export const Minigames = {
    BankMinigame,
    DDRMinigame,
    DirectionMinigame,
    DrillingMinigame,
    FlipMinigame,
    FloodMinigame,
    TaskBarMinigame,
    MazeMinigame,
    CrackSafe,
    SameMinigame,
    ThermiteMinigame,
    UntangleMinigame,
    VarMinigame,
    WordsMinigame,
    AlphabetMinigame,
    LockpickMinigame
};