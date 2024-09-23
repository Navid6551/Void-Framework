const registered = [];

function RegisterUICallback(name, cb) {
    AddEventHandler(`_vpx_uiReq:${name}`, cb);

    if (GetResourceState('vrp-ui') === 'started') exports['vrp-ui'].RegisterUIEvent(name);

    registered.push(name);
}

function SendUIMessage(data) {
    exports['vrp-ui'].SendUIMessage(data);
}

function SetUIFocus(hasFocus, hasCursor) {
    exports['vrp-ui'].SetUIFocus(hasFocus, hasCursor);
}

function GetUIFocus() {
    return exports['vrp-ui'].GetUIFocus();
}

AddEventHandler('_vpx_uiReady', () => {
    registered.forEach((eventName) => exports['vrp-ui'].RegisterUIEvent(eventName));
});