import { MathUtils as Shit } from "../../shared/math";

export const registered = [];

export function RegisterUICallback(pName: string, cb) {
  AddEventHandler(`_vpx_uiReq:${pName}`, cb);

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

AddEventHandler('_vpx_uiReady', () => {
  registered.forEach((pName) => exports['vrp-ui'].RegisterUIEvent(pName));
});


const DrawTextJS = (x, y, text, color, scale, font, justification = 0, outline = true) => {
    SetTextColour(color[0], color[1], color[2], color[3]);
    if (outline) {
      SetTextOutline();
    }
    SetTextScale(0, scale);
    SetTextFont(font != null ? font : 0);
    SetTextJustification(justification);
    if (justification === 2)
      SetTextWrap(0, 0.575);
    SetTextEntry("STRING");
    AddTextComponentString(text != null ? text : "Dummy text");
    EndTextCommandDisplayText(x, y);
};

export var MathUtils = Shit

export class Tools {
    static addPeekEntryByModel = (pModels, pData, pOptions) => {
        globalThis.exports["vrp-interact"].AddPeekEntryByModel(pModels, pData, pOptions);
    }
    static addPeekEntryByTarget = (pEvent, pData, pOptions) => {
        globalThis.exports["vrp-interact"].AddPeekEntryByPolyTarget(pEvent, pData, pOptions);
    }
    static addPeekEntryByFlag = (pFlags, pData, pOptions) => {
        globalThis.exports["vrp-interact"].AddPeekEntryByFlag(pFlags, pData, pOptions);
    }
    static addPeekEntryByType = (pType, pData, pOptions) => {
        globalThis.exports["vrp-interact"].AddPeekEntryByEntityType(pType, pData, pOptions);
    }
    static addInteraction = (id, coords, options, context) => {
        const data = {
            id,
            coords: [coords.x, coords.y, coords.z],
            options,
            context
        };
        globalThis.exports["interactions"].AddInteraction(data);
    }
    static addInteractionByModel = (id, models, options, context) => {
        const data = {
            id,
            options,
            context
        };
        globalThis.exports["interactions"].AddInteractionByModel(models, data);
    }
    static addPlayerInteraction = (id, options, context) => {
        const data = {
            id,
            options,
            context
        };
        data.context.isPlayer = true;
        globalThis.exports["interactions"].AddPedInteraction(data);
    }
    static addPedInteraction = (id, options, context) => {
        const data = {
            id,
            options,
            context
        };
        globalThis.exports["interactions"].AddPedInteraction(data);
    }
    static addVehicleInteraction = (id, options, context) => {
        const data = {
            id,
            options,
            context
        };
        globalThis.exports["interactions"].AddVehicleInteraction(data);
    }
    static removeInteraction = (id) => {
        globalThis.exports["interactions"].RemoveInteraction(id);
    }
    static removePlayerInteraction = (id) => {
        globalThis.exports["interactions"].RemovePedInteraction(id);
    }
    static removePedInteraction = (id) => {
        globalThis.exports["interactions"].RemovePedInteraction(id);
    }
    static taskBar = (pLength, pName, pRunCheck = false, pDistCheck = null, pKeepWeapon = true, pVehicle = null) => {
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
    static phoneConfirmation = (pTitle, pText, pIcon, pTimeout) => {
        return new Promise((resolve) => {
            globalThis.exports["vrp-phone"].DoPhoneConfirmation(pTitle, pText, pIcon, resolve, pTimeout);
        });
    }
    static phoneNotification = (pTitle, pBody, pForced = true, pApp = "home-screen") => {
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
    static drawText = (x, y, text, color, scale, font, justification = 0, outline = true) => {
        DrawTextJS(x, y, text, color, scale, font, justification = 0, outline = true) 
    }
    static drawText3D = (coords, distance, text, color, font = 4, outline = true, background) => {
        SetDrawOrigin(coords.x, coords.y, coords.z, 0);
        const scale = Math.max(MathUtils.getMapRange([0, 10], [0.4, 0.25], distance), 0.1);
        DrawTextJS(0, 0, text, color, scale, font, 0, outline);
        if (background) {
        DrawRect(
            2e-3,
            background.height / 2,
            background.width,
            background.height,
            background.color[0],
            background.color[1],
            background.color[2],
            background.color[3]
        );
        }
        ClearDrawOrigin();
    }
    static customContact = (contactInfo, entity, dialogue, progression) => {
        globalThis.exports["contacts"].open(contactInfo, entity, dialogue, progression);
    }   
}