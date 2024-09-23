import { commands } from "./adminMenu";

export const optionList = [{
    optionName: "toggleBlockEmotes",
    displayName: "Block Emotes",
    optionType: "toggle",
    data: false
}, {
    optionName: "toggleDefaultMenu",
    displayName: "Large menu is default",
    optionType: "toggle",
    data: true
}, {
    optionName: "expandedOnPass",
    displayName: "Large menu on 'Pass' menu is default",
    optionType: "toggle",
    data: false
}, {
    optionName: "showTooltips",
    displayName: "Show Tooltips",
    optionType: "toggle",
    data: true
}, {
    optionName: "openDefaultMenu",
    displayName: "Open Normal Menu with Bind",
    optionType: "toggle",
    data: true
}];

export let adminBinds = [{
    parent: '',
    key: "none"
}, {
    parent: '',
    key: "adminBind_0"
}, {
    parent: '',
    key: "adminBind_1"
}, {
    parent: '',
    key: "adminBind_2"
}, {
    parent: '',
    key: "adminBind_3"
}, {
    parent: '',
    key: "adminBind_4"
}, {
    parent: '',
    key: "adminBind_5"
}];

export let staffOptions = [];
export let favCommands = [];
export let optionsLoaded = false;
export let bindsLoaded = false;
export let currentKeybinds = [];

export async function initOptions() {
    return new Promise(resolve => {
        let needUpdate = false;
        const adminOptions = JSON.parse(GetResourceKvpString('Json_adminMenuOptions'));
        if (!optionsLoaded && adminOptions != null) {
            for (const optionName in optionList) {
                const option = optionList[optionName];
                const foundOption = adminOptions.find(_option => _option.optionName === option.optionName);
                if (foundOption == null) {
                    needUpdate = true;
                    adminOptions.push(option);
                }
            }
            optionsLoaded = true;
            if (needUpdate) setOptions(adminOptions);
        }
        if (adminOptions == null) {
            if (staffOptions.length == 0) {
                staffOptions = optionList;
            }
        } else {
            staffOptions = adminOptions;
        }
        return resolve(staffOptions);
    });
}

export function setOptions(options) {
    staffOptions = options;
    SetResourceKvp('Json_adminMenuOptions', JSON.stringify(staffOptions));
}

export async function getOption(name) {
    if (staffOptions.length == 0) {
        await initOptions();
    }
    const foundOption = staffOptions.find(_option => _option.optionName === name);
    return foundOption;
}

export function getKeyBinds() {
    const bindOptions = [];
    const savedOptions = JSON.parse(GetResourceKvpString('Json_adminKeyOptions_2'));
    if (!bindsLoaded && savedOptions != null) {
        for (const key in adminBinds) {
            const bind = adminBinds[key];
            const foundBind = savedOptions.find(_bind => _bind.key === bind.key);
            if (foundBind == null) {
                savedOptions.push(bind);
            }
        }
        bindsLoaded = true;
        adminBinds = savedOptions;
    }
    for (const key in adminBinds) {
        const bind = adminBinds[key];
        bindOptions.push({ text: bind.key });
    }
    for (const key in commands) {
        const command = commands[key];
        if (command.adminMenu && command.adminMenu.options.bindKey && command.adminMenu.options.bindKey.options) {
            const title = command.adminMenu.command.title;
            const foundCommand = adminBinds.find(_bind => _bind.parent === title);
            foundCommand ? command.adminMenu.options.bindKey.value = foundCommand.key : command.adminMenu.options.bindKey.value = null;
            command.adminMenu.options.bindKey.options = bindOptions;
        }
    }
    return;
}

export function updateKeyBinds(keybinds) {
    if (JSON.stringify(currentKeybinds) === JSON.stringify(keybinds)) return;
    currentKeybinds = keybinds;
    for (const key in keybinds) {
        const bindKey = keybinds[key];
        if (bindKey == 'none') {
            const foundBind = adminBinds.find(_bind => _bind.parent.toLocaleLowerCase() === key.toLocaleLowerCase());
            if (foundBind) {
                foundBind.parent = '';
            }
            continue;
        }
        if (bindKey == null) continue;
        const foundBind = adminBinds.find(_bind => _bind.key === bindKey);
        if (foundBind) {
            foundBind.parent = key;
        }
        for (const key in adminBinds) {
            const foundBind = adminBinds[key];
            if (foundBind.parent == key && foundBind.key != bindKey) {
                foundBind.parent = '';
            }
        }
    }
    SetResourceKvp('Json_adminKeyOptions_2', JSON.stringify(adminBinds));
    getKeyBinds();
    const menuData = [];
    for (const key in commands) {
        const command = commands[key];
        menuData.push(command.adminMenu);
    }
    global.exports['vrp-adminUI'].updateMenuData(menuData);
    return;
}

export async function getFavCommands() {
    const _favCommands = JSON.parse(GetResourceKvpString('Json_adminMenuFavCommands'));
    if (_favCommands == null) return [];
    return _favCommands;
}

export function updateFavCommands(commands) {
    favCommands = commands;
    SetResourceKvp('Json_adminMenuFavCommands', JSON.stringify(favCommands));
}