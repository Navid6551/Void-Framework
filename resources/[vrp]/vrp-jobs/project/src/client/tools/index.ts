export const SendUIMessage = (pData: any) => {
    exports['vrp-ui'].SendUIMessage(pData);
}

export class Tools {
    static addPeekEntryByModel = (pModels: any, pData: any, pOptions: any) => {
        globalThis.exports["vrp-interact"].AddPeekEntryByModel(pModels, pData, pOptions);
    }
    
    static addPeekEntryByTarget = (pEvent: any, pData: any, pOptions: any) => {
        globalThis.exports["vrp-interact"].AddPeekEntryByPolyTarget(pEvent, pData, pOptions);
    }

    static addPeekEntryByFlag = (pFlags: any, pData: any, pOptions: any) => {
        globalThis.exports["vrp-interact"].AddPeekEntryByFlag(pFlags, pData, pOptions);
    }

    static addPeekEntryByType = (pType: any, pData: any, pOptions: any) => {
        globalThis.exports["vrp-interact"].AddPeekEntryByEntityType(pType, pData, pOptions);
    }

    static taskBar = (pLength: any, pName: any, pRunCheck = false, pDistCheck: any = null, pKeepWeapon = true, pVehicle = null) => {
        return new Promise((resolve) => {
            globalThis.exports["vrp-taskbar"].taskBar(
                pLength,
                pName,
                pRunCheck,
                pKeepWeapon,
                pVehicle,
                false,
                resolve,
                pDistCheck == null ? void 0 : pDistCheck.distance,
                pDistCheck == null ? void 0 : pDistCheck.entity
            );
        });
    }

    static phoneConfirmation = (pTitle: any, pText: any, pIcon: any, pTimeout = 30000) => {
        return new Promise((resolve) => {
            globalThis.exports["vrp-phone"].DoPhoneConfirmation(pTitle, pText, pIcon, resolve, pTimeout);
        });
    }

    static phoneNotification = (pTitle: any, pBody: any, pForced = true, pApp = "home-screen") => {
        globalThis.exports["vrp-ui"].SendUIMessage({
            source: "vrp-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: pApp,
                title: pTitle,
                body: pBody,
                show_even_if_app_active: pForced
            }
        });
    }
}