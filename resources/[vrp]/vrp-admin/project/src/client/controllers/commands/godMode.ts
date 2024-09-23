import { setValue } from "../state";

let godModeEnabled = null;
let godModeTick = null;

export const IsInGodMode = () => {
    return godModeEnabled != null;
};
global.exports('IsInGodMode', IsInGodMode);

export const toggleGodMode = async (pEnabled, pTimer = -1, pBool = false) => {
    if (godModeTick !== null && pEnabled && !pBool) {
        return emit('DoLongHudText', 'God mode is already enabled.', 2);
    }
    if (!pEnabled) {
        if (godModeTick !== null) {
            clearInterval(godModeTick);
            godModeTick = null;
        }
        godModeEnabled = null;
        setValue('god', false);
        SetPlayerInvincible(PlayerId(), false);
        SetEntityProofs(PlayerPedId(), false, false, false, false, false, false, false, false);
        if (!pBool) {
            emit('DoLongHudText', 'God mode disabled.', 1);
            emit('carandplayerhud:godCheck', IsInGodMode());
        } else {
            global.exports['vrp-ui'].sendAppEvent('hud', { godModeEnabled: IsInGodMode() });
        }
        return;
    }
    if (pEnabled) {
        const time = pTimer * 1000;
        godModeEnabled = pTimer === -1 ? -1 : Date.now() + time;
        setValue('god', true);
        if (!pBool) {
            emit('carandplayerhud:godCheck', IsInGodMode());
            emit('DoLongHudText', 'God mode enabled.', 1);
        } else {
            global.exports['vrp-ui'].sendAppEvent('hud', { godModeEnabled: IsInGodMode() });
        }
    }
    godModeTick = setInterval(() => {
        if (godModeEnabled !== -1 && Date.now() > godModeEnabled) return toggleGodMode(false, pTimer, pBool);
        const playerPed = PlayerPedId();
        SetPlayerInvincible(PlayerId(), true);
        SetEntityProofs(playerPed, true, true, true, true, true, true, true, true);
        SetEntityHealth(playerPed, GetEntityMaxHealth(playerPed));
    }, 1000);
};