import { Procedures } from '../utils/vpx';
import { FindPlayerIdById, getFormattedDate, getRegistrationText } from '../utils/tools';
import { Repository } from './database/repository';
import { GetLicensePlate, SetVehicleFakeLicensePlate } from './others/licenseplate';
import { BasicSpawn, GetSpawnInfo, SpawnPlayerVehicle } from './spawn';
import { StoreVehicleInGarage } from './state/garages';
import { AddKey } from './state/keys';
import { AddCarBomb, GenerateMetadata, GenerateVehicleInformation } from './state/vehicle';
import { AddVehicleCarPolish, RemoveVehicleCarPolish } from './systems/carpolish';
import { CanRepairDegradation, FixVehicleDegredation, SaveVehicleDamage, SetVehicleDegradation } from './systems/damage';
import { AddVehicleFuel, SetVehicleFuel } from './systems/fuel';
import { AddVehicleHarness, DoHarnessDamage } from './systems/harness';
import { AddVehicleMileage } from './systems/mileage';
import { AddVehicleNitrous, NitroUsed } from './systems/nitro';
import { SaveVehicleWheelFitment } from './systems/wheelfitment';
const QBCore = globalThis.exports['vrp-core'].GetCoreObject()


export async function InitEvents(): Promise<void> { };

RPC.register("vrp:vehicles:giveKey", (pSource: number, pVin: string, pServerId: number) => {
    AddKey(Number(pServerId), pVin)
    emitNet("DoLongHudText", Number(pServerId), "You just received keys to a vehicle!");
});

RPC.register("vrp:vehicles:sellPhone", async (pSource: number, pVin: string, pStateId: number, pPrice: number) => {
    const seller = QBCore.Functions.GetPlayer(pSource);
    if (!seller) return;

    const buyer = FindPlayerIdById(pStateId);
    if (!buyer) return;

    emitNet("vrp-ui:server-relay", buyer, {
        source: "vrp-nui",
        app: "phone",
        data: {
            action: "vehicle-purchase",
            _data: {
                title: 'Purchase',
                nuiCallback: "vrp:vehicles:phoneSale:accepted",
                vin: pVin,
                sellerCID: Number(seller.PlayerData.citizenid),
            },
            price: Number(pPrice),
            tax: 0
        }
    });
});

RPC.register("vrp:vehicles:transferOwnershipVehicle", async (pSource: number, pVin: string, pSellerCid: number, pBuyerCid: number, pPrice: number) => {
    const vehicle = await Repository.getVehicleByVin(pVin);

    if (!vehicle) return;

    const buyerSource = FindPlayerIdById(pBuyerCid);
    if (!buyerSource) return;

    const sellerSource = FindPlayerIdById(pSellerCid);
    if (!sellerSource) return;

    const buyer = QBCore.Functions.GetPlayer(buyerSource);
    if (!buyer) return;

    if (Number(buyer.PlayerData.money.bank) < Number(pPrice)) return;

    const seller = QBCore.Functions.GetPlayer(sellerSource);
    if (!seller) return;

    const success = await buyer.removeBank(Number(pPrice));
    if (!success) return;

    const transfer = await Repository.updateVehicleOwner(pVin, pBuyerCid);
    if (!transfer) return;

    const carSale = await SQL.execute("INSERT INTO _car_sale (vin, model, sell_price, buyer_name, seller_name, sell_date) VALUES (@vin, @model, @sell_price, @buyer_name, @seller_name, @sell_date)", {
        vin: pVin,
        model: vehicle[0].model,
        sell_price: pPrice,
        buyer_name: `${buyer.PlayerData.charinfo.firstname} ${buyer.PlayerData.charinfo.lastname}`,
        seller_name: `${seller.PlayerData.charinfo.firstname} ${seller.PlayerData.charinfo.lastname}`, //Date needs to be formatted: Y-m-d
        sell_date: getFormattedDate()
    });
    if (!carSale) return;

    const content = await getRegistrationText(vehicle[0].name, vehicle[0].model, vehicle[0].plate, vehicle[0].vin);
    if (!content) return;

    const registration = global.exports["vrp-phone"].CreateDocument(buyer.PlayerData.citizenid, content, `${vehicle[0].model} - ${vehicle[0].plate}`, 4);
    if (!registration) return;

    global.exports["vrp-vehicles"].AddKey(pSource, pVin);

    //TODO: Check seller's documents and remove the registration if it exists.
    //Need to match the title of the document to the vehicle's model and plate.
    const sellerDocuments = await SQL.execute<{ id: number }[]>(`
        SELECT d.id, d.editable, title, t.name as 'type', type_id, a.can_sign, a.signed FROM _document d
        INNER JOIN _document_type t on t.id = d.type_id
        INNER JOIN _document_access a ON a.document_id = d.id AND a.character_id = @characterId
        WHERE d.type_id = @typeId AND a.is_deleted = 0 AND d.title LIKE '%${vehicle[0].model} - ${vehicle[0].plate}%'
    `, {
        characterId: pSellerCid,
        typeId: 4
    });
    if (!sellerDocuments) return;

    const deleteSellerRegistration = await SQL.execute("DELETE FROM _document WHERE id = @id", {
        id: sellerDocuments[0].id
    });
    if (!deleteSellerRegistration) return;

    return true;
});

RPC.register("vrp:vehicles:getVehicles", async (pSource: number, pGarageId: string) => {
    const vehicles = await Repository.getVehiclesByGarage(pGarageId);
    if (!vehicles) return [];

    return vehicles;
});

RPC.register("vrp:vehicles:basicSpawn", async (pSource: number, pModel: string, pCoords?: Vector3, pHeading?: number, pOrigin = "menu", pLivery?: number, pAppearance?: string, pMods?: string) => {
    const result = await BasicSpawn(pSource, pModel, pCoords, pHeading, pOrigin, pLivery, pAppearance, pMods);

    return result;
});

RPC.register("vrp:vehicles:degradation:requestRepair", async (pSource: number, pNetId: number, pPart: string, pAmount: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const result = await CanRepairDegradation(vehicle, pPart, pAmount);

    if (result) {
        return true;
    }

    return false;
});

RPC.register("vrp:vehicles:degradation:doRepair", (pSource: number, pNetId: number, pPart: string, pAmount: number, pSuccess: boolean) => {
    if (pSuccess) {
        const vehicle = NetworkGetEntityFromNetworkId(pNetId);
        FixVehicleDegredation(vehicle, pPart, pAmount);
    }
});

RPC.register("vrp:vehicles:addDegradation", async (pSource: number, pNetId: number, pDegradation: VehicleDegradation) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    //AddVehicleDegredation(vehicle, pDegradation);
    const result = await SetVehicleDegradation(vehicle, pDegradation);

    if (result) {
        return true;
    }

    return false;
});

RPC.register("vrp:vehicles:spawnGarageVehicle", async (pSource: number, pVIN: string, pGarageId: string, pCoords: Vector4) => {
    const result = await SpawnPlayerVehicle(pSource, pVIN, [pCoords.x, pCoords.y, pCoords.z], Number(pCoords.h), true);

    if (result.success) {
        const update = await Repository.updateVehicleState(pVIN, "out");

        if (!update) return false;

        const user = QBCore.Functions.GetPlayer(pSource);
        if (!user) return;

        const vehicle = NetworkGetEntityFromNetworkId(result.netId);

        const spawnInfo = await GetSpawnInfo(vehicle);

        if (spawnInfo.vin) {
            const result2 = await Repository.addParkingLog({
                vin: pVIN,
                cid: user.PlayerData.citizenid,
                action: "out",
                engine: spawnInfo.damage.engine,
                body: spawnInfo.damage.body,
                fuel: spawnInfo.metadata.fuel,
                garage: pGarageId
            });

            if (!result2) return false;
        }

        return true;
    }

    return false;
});

RPC.register("vrp:vehicles:fetchParkingLogs", async (pSource: number, pVin: string, pGarageId: string) => {
    const result = await Repository.getParkingLogs(pVin, pGarageId);

    if (!result) return [];

    const data = result.map((row) => {
        return {
            cid: row.cid,
            action: row.action,
            timestamp: Number(row.timestamp),
            data: {
                engine: row.engine,
                body: row.body,
                fuel: row.fuel
            }
        };
    });

    return data;
});

RPC.register("vrp:vehicles:generateVehicleInformation", async (pNetId: number, pModel: number) => {
    const src = global.source;
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const result = await GenerateVehicleInformation(src, vehicle, pModel);
    if (result) {
        return true;
    }
});

RPC.register("vrp:vehicles:storeVehicle", async (pSource: number, pNetId: number, pGarageId: string) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const result = await StoreVehicleInGarage(pSource, vehicle, pGarageId);

    if (result) {
        return true;
    }

    return false;
});

RPC.register("vrp-vehicles:damage:saveDamage", (pSource: number, pNetId: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    SaveVehicleDamage(vehicle);
});

RPC.register("vrp:vehicles:getFuelPrice", (pSource: number, pNumber: number) => {
    return {
        taxLevel: 15,
        fuelPrice: 3
    }
});

RPC.register("vrp:vehicles:addFuel", (pSource: number, pNetId: number, pAmount: number, pNumber: number, pIsJerryCan: boolean, pIsHelicopter: boolean, p7: any) => {
    AddVehicleFuel(pNetId, pAmount);
});

RPC.register("vrp:vehicles:setFakeLicensePlate", async (pSource: number, pNetId: number, pSetFakeLicensePlate: boolean) => {
    const result = await SetVehicleFakeLicensePlate(pSource, pNetId, pSetFakeLicensePlate);
    return result;
});

RPC.register("vrp:vehicles:getLicensePlate", async (pSource: number, pVin: string) => {
    const result = await GetLicensePlate(pVin);
    return result;
});

RPC.register("vrp-vehicles:chargeForNOSRefill", async (pSource: number, pCost: number) => {

});

RPC.register("vrp-vehicles:chargeForFuelRefill", async (pSource: number, pAmount: number) => {
    const user = QBCore.Functions.GetPlayer(pSource);
    if (!user) return;

    const result = user.Functions.RemoveMoney('bank', pAmount);

    return result;
});

RPC.register("vrp-vehicles:getVehicleMods", async (pSource: number, pVIN: string) => {
    const result = await SQL.execute<{ mods: string }[]>("SELECT mods FROM _vehicle WHERE vin = @vin", {
        vin: pVIN
    });

    if (!result[0]) {
        return []
    };

    return JSON.parse(result[0].mods);
});

Procedures.register("vrp:vehicles:respawnVehicle", async (pSource: number, pVIN: string, pCoords: Vector3, pHeading: number, pUnique: boolean) => {
    const result = await SpawnPlayerVehicle(pSource, pVIN, [pCoords.x, pCoords.y, pCoords.z], Number(pHeading), pUnique);

    if (result.success) {
        return true;
    }

    return false;
});

Procedures.register("vrp:vehicles:basicSpawn", async (pSource: number, pModel: string, pCoords?: Vector3, pHeading?: number, pOrigin = "menu", pLivery?: number, pAppearance?: string, pMods?: string) => {
    const result = await BasicSpawn(pSource, pModel, pCoords, pHeading, pOrigin, pLivery, pAppearance, pMods);

    return result.netId ? result.netId : false;
});

onNet("vrp:vehicles:addCarBomb", (pNetId: number, pMinSpeed: number, pTicksBeforeExplode: number, pTicksForRemoval: number, pGridSize: number, pColoredSquares: number, pTimeToComplete: number) => {
    AddCarBomb(pNetId, pMinSpeed, pTicksBeforeExplode, pTicksForRemoval, pGridSize, pColoredSquares, pTimeToComplete);
});

onNet('vrp-vehicles:updateVehicle', async (pPlate: string, pAppearance: string, pMods: string) => {
    if (!pPlate) return;

    const update = await SQL.execute("UPDATE _vehicle SET appearance = @appearance, mods = @mods WHERE plate = @plate", {
        appearance: JSON.stringify(pAppearance) || null,
        mods: JSON.stringify(pMods) || null,
        plate: pPlate
    })

    if (!update) return;
});

onNet("vrp:vehicles:DoHarnessDamage", (pNetId: number, pAmount: number) => {
    DoHarnessDamage(pNetId, pAmount);
});

onNet("vrp:vehicles:reduceFuel", (pNetId: number, pAmount: number) => {
    SetVehicleFuel(pNetId, pAmount);
});

onNet("vrp:vehicles:addMileage", (pNetId: number, pAmount: number) => {
    AddVehicleMileage(pNetId, pAmount);
});

onNet("vrp:vehicles:addNitro", (pNetId: number, pSize: string) => {
    AddVehicleNitrous(pNetId, pSize);
});

onNet("vrp:vehicles:addHarness", (pNetId: number, pSize: string) => {
    AddVehicleHarness(pNetId, pSize);
});

onNet("vrp:vehicles:addCarPolish", (pNetId: number, pDays: number) => {
    AddVehicleCarPolish(pNetId, pDays);
});

onNet("vrp:vehicles:removeCarPolish", (pNetId: number) => {
    RemoveVehicleCarPolish(pNetId);
});

onNet("vrp:vehicles:nitroUsed", (pNetId: number, pAmount: number) => {
    NitroUsed(pNetId, pAmount);
});

onNet("vrp:vehicles:gotKeys", async (pNetId: number, pModel: number, pSource?: number) => {
    let src: any = global.source;
    if (src === "" || src === undefined || src === null) {
        src = pSource;
    }

    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag.state.vin) {
        AddKey(src, bag.state.vin);
    } else {
        const result = await GenerateVehicleInformation(src, vehicle, pModel);
        if (result) {
            AddKey(src, result.vin);
        }
    }
});

onNet("vrp:vehicles:generateMetadata", (pNetId: number) => {
    GenerateMetadata(pNetId);
});

globalThis.exports('SaveVehicleWheelFitment', SaveVehicleWheelFitment)