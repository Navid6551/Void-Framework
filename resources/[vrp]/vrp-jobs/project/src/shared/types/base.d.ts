interface PlayerModule {
    GetUser: (pSource: number) => User;
}

interface User {
    source: number;
    name: string;
    comid: number;
    steamid: string;
    hexid: string;
    license: string;
    ip: string;
    job: string;
    rank: string;
    character: Character;
    characters: Character[];
    characterLoaded: boolean;
    charactersLoaded: boolean;
    getVar: (pVar: string) => any;
    setVar: (pVar: string, pValue: any) => void;
    networkVar: (pVar: string, pValue: any) => void;
    getRank: () => string;
    setRank: (pRank: string) => void;
    setCharacter: (pCharacter: Character) => void;
    setCharacters: (pCharacters: Character[]) => void;
    getCash: () => number;
    getBalance: () => number;
    getDirtyMoney: () => number;
    getGangType: () => number;
    getStressLevel: () => number;
    getJudgeType: () => number;
    alterDirtyMoney: (pAmount: number) => void;
    alterStressLevel: (pAmount: number) => void;
    resetDirtyMoney: () => void;
    addMoney: (pAmount: number) => boolean;
    removeMoney: (pAmount: number) => boolean;
    addBank: (pAmount: number) => boolean;
    removeBank: (pAmount: number) => boolean;
    getNumCharacters: () => number;
    ownsCharacter: (pId: number) => boolean;
    getGender: () => number;
    getCharacter: (pId: number) => Character;
    getCharacters: () => Character[];
    getCurrentCharacter: () => Character;
}

interface Character {
    id: number;
    owner: string;
    first_name: string;
    last_name: string;
    date_created: string;
    dob: string;
    cash: number;
    bank: number;
    phone_number: string;
    story: string;
    new: boolean;
    deleted: boolean;
    gender: number;
    jail_time: number;
    stress_level: number;
}