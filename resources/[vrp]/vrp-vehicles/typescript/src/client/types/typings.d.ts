interface ModuleConfigEntry {
    configId: string;
    data: Record<string, any>;
}

interface MainConfig {
    payoutFactor: number;
    characterLimit: number;
    progression: any;
    restartLength: number;
}

interface GarageConfig {
    garage_id: string;
    name: string;
    type: string;
    business_id?: string;
    shared?: boolean;
    parking_limit: number;
    location: GarageLocation;
    vehicle_types: string[];
    parking_spots: ParkingSpot[];
}

declare const RPC: { 
    register(name: string, callback: Function): any;
    execute(name: string, ...args: any): any;
};

declare function RegisterUICallback(name: string, cb: Function): void;

declare function CacheableMap(func: Function, options: { timeToLive: number }): any;

interface PeekContext {
    flags: string[],
    model: number,
    type: number,
    isDead: boolean,
    zones: string[]
}

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Vector4 extends Vector3 {
    h: number;
}

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

interface VehicleStats {
    force: number;
    acceleration: number;
    speed: number;
    handling: number;
    braking: number;
    category: number;
}

interface VehicleInfo {
    cid: number;
    vin: string;
    model: string;
    state: string;
    garage: string;
    plate: string;
    metadata: VehicleMetadata;
    damage: string;
    mods: string;
    appearance: string;
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

interface GarageInfo {
    garage_id: string;
    name: string;
    type: string;
    job?: string;
    shared?: boolean;
    business?: string;
    business_id?: string;
    parking_limit: number;
    location: GarageLocation;
    vehicle_types: string[];
    parking_spots: ParkingSpot[];
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

interface BlipOptions {
    sprite: number;
    color: number;
    scale: number;
    category: number;
    short: boolean;
}

interface HandlingContext {
    value: number;
    type: string;
    priority: number;
}

interface MenuEntry {
    title: string;
    description: string;
    disabled?: boolean;
    key?: {};
    action?: string;
    extraAction?: string;
    children?: MenuEntry[];
}

interface OwnedVehicle {
    id: number;
    cid: number;
    vin: string;
    model: string;
    state: string;
    garage: string;
    plate: string;
    name: string;
    type: string;
    size: number;
    degradation: VehicleDegradation;
    metadata: VehicleMetadata;
    damage: VehicleDamage;
    mods: any;
    appearance: any;
    records: any;
    location: Vector4;
    picture: string;
    information: string;
}
/*
    pData is VehicleAppearance
    for (const [key, value] of Object.entries(pData)) {
        if (key !== "colors") {
            SetVehicleAdditional(pVehicle, key, value);
        } else {
            SetVehicleColors(pVehicle, value);
        }
    }
*/

interface VehicleAppearance {
    [key: string]: any;
}

interface VehicleMods {}

interface PursuitPreset {
    name: string;
    mods: any;
    appearance: any;
    handling: { field: string, multiplier: number }[];
}

interface PursuitMode {
    presets: { id: string, modes: PursuitPreset[] }[];
    vehicles: { model: string, preset: string }[];
}