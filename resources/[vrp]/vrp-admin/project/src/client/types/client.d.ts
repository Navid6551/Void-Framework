interface BlipSettings {
    short: boolean;
    sprite: number;
    category: number;
    color: number;
    heading: boolean;
    text: string;
    route: any;
    scale: number;
}

export interface PlayerScope {
    player: number;
    inScope: boolean;
}

export interface ScopeHandler {
    [player: number]: PlayerScope;
}