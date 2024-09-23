interface Command {
    action?: string;
    title: string;
    cat: string;
    child?: boolean | null | {
        inputs?: any;
        checkBox?: any;
        triggers?: any;
    };
}

interface Options {
    bindKey: null | { value?: string | null, options?: any[] };
}

interface CommandAdminMenu {
    command: Command;
    options: Options;
}

interface CommandSelection {
    title: string;
    child?: boolean | null | {
        inputs?: any;
        checkBox?: any;
        triggers?: any;
    };
    action: string;
    entityType: number;
    syncedObject?: boolean;
    lockedDoor?: boolean;
    unlockedDoor?: boolean;
}

interface CommandUI {
    adminMenu?: CommandAdminMenu;
    selection?: CommandSelection;
}

interface CommandData {
    name: string;
    value: any;
    executedFunction: (pUser: any, pArgs: any) => Promise<string>;
    log: string;
    target: boolean;
    canTargetAbove: boolean;
    isClientCommand: boolean;
    commandUI: CommandUI;
    blockClientLog?: boolean;
    closeMenu?: boolean;
}

interface UserData {
    name: string;
    source: number;
}

interface TargetUser {
    source: number;
    name: string;
}

interface Target {
    source: number;
    steamid: string;
    name: string;
    queueType: string;
}

interface TargetData {
    TargetUser?: TargetUser,
    TargetNot?: string;
    Target?: Target;
}

interface SUserData {
    name: string;
    steamid: string;
    character: Character;
}

interface SVehicleInfo {
    vin: string;
    cid: number;
    size: number;
    garage: string;
    model: string;
    metadata: any;
}

interface SGarage {
    garage_id: string;
    name: string;
}