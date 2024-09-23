declare const RPC: { 
    register(name: string, callback: Function): any;
    execute<T>(name: string, ...args: any): T;
};

declare const SQL: {
    execute<T>(query: string, ...args: any): T;
};

interface VehicleDegradation {
    axle: number;
    brakes: number;
    clutch: number;
    electronics: number;
    injector: number;
    radiator: number;
    tyres: number;
    engine: number;
    body: number;
    transmission: number;
}

interface VehicleDamage {
    dirt: number;
    body: number;
    engine: number;
    wheels: any[];
    windows: any[];
    doors: any[];
}

interface VehicleInfo {
    vin: string;
    model: string;
    plate: string | undefined;
    metadata: VehicleMetadata | undefined;
    mods: any;
    damage: VehicleDamage | undefined;
    appearance: any;
    degradation: VehicleDegradation  | undefined;
    vinScratched: boolean;
}


interface GarageInfo {
    garage_id: string;
    name: string;
    type: string;
    job?: string;
    shared?: boolean;
    business_id?: string;
    parking_limit: number;
    location: GarageLocation;
    vehicle_types: string[];
    parking_spots: ParkingSpot[];
}

interface GarageInfoMap {
    garage_id: string;
    name: string;
    type: string;
    job?: string;
    shared?: boolean;
    business_id?: string;
    parking_limit: number;
    location: string;
    vehicle_types: string;
    parking_spots: string;
}

interface GarageLocation {
    vectors: Vector3;
    length?: number;
    width: number;
    options: GarageOptions;
    hidden?: boolean;
}

interface GarageOptions {
    heading: number;
    minZ: number;
    maxZ: number;
    debugPoly?: boolean;
}

interface ParkingSpot {
    type: string;
    size: number;
    distance: number;
    heading: number;
    coords: Vector3;
}

interface VehicleMetadata {
    fuel: number;
    mileage: number;
    harness: number;
    nitro: number;
    carPolish: number;
    fakePlate: any;
    neonDisabled: boolean;
    handling: any;
    afterMarkets: any;
    wheelFitment: any;
    carBombData: any;
}

interface ParkingLog {
    vin: string;
    cid: number;
    action: string;
    engine: number;
    body: number;
    fuel: number;
    garage: string;
}

interface ParkingLogSQL extends ParkingLog {
    timestamp: string;
}

type VehicleState = 'stored' | 'out' | 'impound' | 'seized';

type VehicleType = 'owned' | 'script' | 'world';

type VehicleOrigin = 'menu' | 'pdm' | 'tuner' | 'pd' | 'rental' | 'job' | 'arcade';

interface Vehicle {
    cid: number;
    vin: string;
    model: string;
    state: VehicleState;
    garage: string;
    plate: string;
    name: string | undefined;
    type: string;
    size: number;
    degradation: string;
    metadata: string;
    damage: string;
    mods: string;
    appearance: string;
    records: string;
    location?: string;
    wheelfitmment: string;
    vinScratched: boolean;
    strikes: number;
}

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Vector4 extends Vector3 {
    h: number
}

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

interface UserCharacterData {
    first_name: string;
    last_name: string;
    phone_number: string;
}