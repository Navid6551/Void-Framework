const blips = new Map<string, number>();

export function AddBlip(pKey: string, pCoords: Vector3, pText: string, pOptions: BlipOptions) {
    if (blips.has(pKey)) RemoveBlip(pKey);

    const blip = AddBlipForCoord(pCoords.x, pCoords.y, pCoords.z);

    if (pOptions) {
        if (typeof pOptions.sprite !== "undefined") SetBlipSprite(blip, pOptions.sprite);
        if (typeof pOptions.color !== "undefined") SetBlipColour(blip, pOptions.color);
        if (typeof pOptions.scale !== "undefined") SetBlipScale(blip, pOptions.scale);
        if (typeof pOptions.category !== "undefined") SetBlipCategory(blip, pOptions.category);
        if (typeof pOptions.short !== "undefined") SetBlipAsShortRange(blip, pOptions.short);
    }

    if (pText) {
        BeginTextCommandSetBlipName("STRING");
        AddTextComponentString(pText);
        EndTextCommandSetBlipName(blip);
    }

    blips.set(pKey, blip);

    return blip;
}

export function RemoveBlip(pKey: string) {
    const blip: any = blips.get(pKey);

    if (blip) {
        RemoveBlip(blip);
    }


    return blips.delete(pKey);
}

export function RemoveAllBlips() {
    blips.forEach((pBlip: any) => RemoveBlip(pBlip));
}

export function ToggleBlip(pKey: string, pEnabled: boolean) {
    const blip = blips.get(pKey);
    if (!blip) return;

    if (pEnabled) {
        SetBlipAlpha(blip, 0);
        SetBlipHiddenOnLegend(blip, true);
    } else {
        SetBlipAlpha(blip, 255);
        SetBlipHiddenOnLegend(blip, false);
    }
}

export function GetBlipInfo() {
    const info = GetFirstBlipInfoId(8);
    if (!DoesBlipExist(info)) return;
    return GetBlipInfoIdCoord(info);
}