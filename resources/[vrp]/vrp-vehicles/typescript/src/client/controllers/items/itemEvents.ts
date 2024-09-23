const ItemCallbacks = new Map<string, Function>();

export async function InitItemEvents(): Promise<void> {};

export function RegisterItemCallback(pItem: string, pCallback: Function) {
    if (ItemCallbacks.has(pItem)) return;
    ItemCallbacks.set(pItem, pCallback);
}

onNet("RunUseItem", async (pItemId: string, pSlot: number, pInvName: string, pIsWeapon: boolean, pItemInfo: any[]) => {
    if (!ItemCallbacks.has(pItemId)) return;
    const pInfo = global.exports["vrp-inventory"].GetItemInfo(pSlot);
    const cb = ItemCallbacks.get(pItemId);
    if (!cb) {
        return
    }
    cb(pItemId, pSlot, pInvName, pInfo.quality, pIsWeapon, pItemInfo, pInfo);
});