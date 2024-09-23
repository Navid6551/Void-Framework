export class Inventory {
    static async HasItem(pItem: any, pAmount: any) {
        return await globalThis.exports.inventory.HasItem(pItem, pAmount);
    }

    static async GetItemStacks(pItem: any, pAmount: any) {
        return await globalThis.exports.inventory.GetItemStacks(pItem, pAmount);
    }

    static async GetAllItemStacks(pItem: any) {
        return await globalThis.exports.inventory.GetAllItemStacks(pItem);
    }

    static async GetItemList() {
        return await globalThis.exports.inventory.GetItemList();
    }

    static async GetPlayerInventories() {
        return await globalThis.exports.inventory.GetPlayerInventories();
    }

    static async GetWeaponsList() {
        return globalThis.exports.inventory.GetWeaponsList();
    }

    static async GetWeapon(pWeapon: any) {
        return globalThis.exports.inventory.GetWeapon(pWeapon);
    }

    static async OpenInventory(pName: any, pState: any) {
        return await globalThis.exports.inventory.OpenInventory(pName, pState);
    }

    static async UseBodySlot(pName: any) {
        return globalThis.exports.inventory.UseBodySlot(pName);
    }

    static async SetBodySlotDisabled(pSlot: any, pState: any, pIDK: any) {
        globalThis.exports.inventory.SetBodySlotDisabled(pSlot, pState, pIDK);
    }

    static async isPlayerSlotDisabled(pSlot: any, pState: any) {
        return globalThis.exports.inventory.isPlayerSlotDisabled(pSlot, pState);
    }
}