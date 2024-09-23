let showPrompt = false;
let listener;
let openedBait = false;

setImmediate(async () => {
    const spawnPublicZones = false//exports["vrp-config"].GetMiscConfig('crafting.spawn.public');
    const craftingSpots = await RPC.execute("vrp-inventory:getCraftingSpots");
    craftingSpots.forEach(spot => {
        if (spot.zoneData.options.data.public && !spawnPublicZones) return;

        const serverCode = "";
        if (spot.zoneData.options.data.disabledServers && spot.zoneData.options.data.disabledServers.includes(serverCode)) {
          return;
        }

        const name = `vrp-inventory:crafting:${spot.id}`;
        exports["vrp-polyzone"].AddBoxZone(name, spot.zoneData.position, spot.zoneData.length, spot.zoneData.width, spot.zoneData.options);
    })
})

on("vrp-polyzone:enter", async (zone, data) => {
    if (!zone.startsWith("vrp-inventory:crafting:")) return;

    if (data.gangOnly) {
        const currentGang = await exports['vrp-gangsystem'].GetCurrentGang();

        if (!currentGang) return;
    }

    listener = setTick(() => {
        if (openedBait && data.progression && data.inventories[0].id === "baitinventory") return;
        if (!showPrompt) {
            exports["vrp-ui"].showInteraction(data.prompt);
            showPrompt = true;
        }
        if (IsControlJustPressed(0, data.key)) {
            exports["vrp-ui"].hideInteraction();
            if (data.progression) {
                const progression = exports["vrp-progression"].GetProgression(data.progression);
                let inventory = data.inventories[0];
                data.inventories.forEach(inv => {
                    if (progression >= inv.progression && inv.progression > inventory.progression) inventory = inv;
                });
                emit("server-inventory-open", inventory.id, `Crafting:${inventory.id}`);
                if (inventory.id == "baitinventory") openedBait = true;
            }else {
                emit("server-inventory-open", data.inventory, "Craft");
            }
        }
    });
});

on("vrp-polyzone:exit", (zone, data) => {
    if (!zone.startsWith("vrp-inventory:crafting:") || !listener) return;
    clearTick(listener);
    listener = null;
    showPrompt = false;
    exports["vrp-ui"].hideInteraction();
});
