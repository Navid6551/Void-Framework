export const registered = [];

export function RegisterUICallback(pName: string, cb) {
    AddEventHandler(`_npx_uiReq:${pName}`, cb);

    if (GetResourceState('vrp-ui') === 'started') exports['vrp-ui'].RegisterUIEvent(pName);

    registered.push(pName);
}

export function SendUIMessage(pData: any) {
    exports['vrp-ui'].SendUIMessage(pData);
}

export function SetUIFocus(hasFocus, hasCursor) {
    exports['vrp-ui'].SetUIFocus(hasFocus, hasCursor);
}

export function GetUIFocus() {
    return exports['vrp-ui'].GetUIFocus();
}

AddEventHandler('_npx_uiReady', () => {
    registered.forEach((pName) => exports['vrp-ui'].RegisterUIEvent(pName));
});