import { GenerateRadarMessage, GetUserData } from "../utils/tools";
import { Repository } from "./database/repository";
import { DoesPlateExist } from "./spawn";
import { FetchVehicleInfo } from "./state/vehicle";

export function InitLicensePlate(): void { }

const GeneratedLicensePlates = new Map<string, UserCharacterData>();
const FlaggedPlates = new Map<string, any>(); //VehicleFlagData

export async function CheckLicensePlate(pSource: number, pLicensePlate: string): Promise<void> {
    // const vehicleInfo = await GetVehicleInfoByPlate(pLicensePlate, true);
    // const isFlagged = FlaggedPlates.has(pLicensePlate);
    // const hasFakePlate = GetVehicleMetaData(vehicleInfo?.vin, 'fakePlate');
    // let userInfo: any;
    // if (vehicleInfo && !vehicleInfo.vinScratched) {
    //     // If playerOwned
    //     const serverId = FindServerId(vehicleInfo.cid);
    //     if (serverId) {
    //         userInfo = GetUserData(serverId)?.character;
    //     } else {
    //         userInfo = await Repository.generateFakeCharacterData();
    //     }
    // } else {
    //     // If 'local' vehicle
    //     if (!GeneratedLicensePlates.has(pLicensePlate)) {
    //         userInfo = await Repository.generateFakeCharacterData();
    //         GeneratedLicensePlates.set(pLicensePlate, userInfo);
    //     } else {
    //         userInfo = GeneratedLicensePlates.get(pLicensePlate);
    //     }
    // }
    // if (userInfo) {
    //     const message =
    //         vehicleInfo?.vinScratched && !hasFakePlate
    //             ? `10-99 (Flagged)\nNo vehicle identifier number found.\nPlate: ${pLicensePlate}`
    //             : GenerateRadarMessage(isFlagged, userInfo.first_name, userInfo.last_name, userInfo.phone_number, pLicensePlate);
    //     emitNet('chatMessage', pSource, 'DISPATCH ', 3, message);
    // }

    // if (isFlagged || (vehicleInfo?.vinScratched && !hasFakePlate)) {
    //     const flagData: any = FlaggedPlates.get(pLicensePlate);
    //     emit('dispatch:svNotifyOne', pSource, {
    //         priority: 1,
    //         dispatchMessage: 'Flagged vehicle: ' + pLicensePlate,
    //         isImportant: false,
    //         flagged_reason: vehicleInfo?.vinScratched ? 'Grant Theft Auto' : flagData.reason,
    //         flagged_by: {
    //             callsign: vehicleInfo?.vinScratched ? '000' : flagData.flagged_by.call_sign,
    //             name: vehicleInfo?.vinScratched ? 'Seizures Dept' : `${flagData.flagged_by.first_name} ${flagData.flagged_by.last_name}`,
    //         },
    //         recipientList: { police: true },
    //         flagged_at: vehicleInfo?.vinScratched ? new Date().getTime() / 1000 : flagData.flagged_by.flagged.getTime() / 1000,
    //         timestamp: new Date().getTime() / 1000,
    //     });
    // }
}

export async function IsPlateFlagged(pLicensePlate: string): Promise<boolean> {
    return FlaggedPlates.has(pLicensePlate);
}

export async function GetFlaggedPlate(pLicensePlate: string): Promise<any> { //VehicleFlagData
    return FlaggedPlates.get(pLicensePlate);
}

export async function AddFlaggedPlate(pLicensePlate: string, pFlagData: any): Promise<void> {
    FlaggedPlates.set(pLicensePlate, pFlagData);
}

export async function FlagLicensePlate(pSource: number, pLicensePlate: string, pReason: string): Promise<void> {
    const userData = await GetUserData(pSource);
    if (userData) {
        FlaggedPlates.set(pLicensePlate, await generateFlagData(userData, pReason));
        emitNet('chatMessage', pSource, 'DISPATCH ', 2, `${pLicensePlate} has been unflagged.`);
    }
}

export async function RemoveFlaggedPlate(pSource: number, pLicensePlate: string): Promise<void> {
    if (FlaggedPlates.delete(pLicensePlate)) {
        emitNet('chatMessage', pSource, 'DISPATCH ', 2, `${pLicensePlate} has been unflagged.`);
    }
}

export async function ServerRemoveFlaggedPlate(pLicensePlate: string): Promise<boolean> {
    return FlaggedPlates.delete(pLicensePlate);
}

export async function FlagPersonalVehicle(pSource: number, pCharacterId: number, pReason: string): Promise<void> {
    // const userData = await GetUserData(pSource);
    // if (userData) {
    //     const flagData = await generateFlagData(userData, pReason, pCharacterId);
    //     const added = await Repository.flagPersonalVehicles(pCharacterId, flagData)
    //     if (added) {
    //         const serverId = FindServerId(pCharacterId);
    //         if (serverId) {
    //             const playerVehicles = GetPlayerVehicles(serverId);
    //             for (const vehicle of playerVehicles) {
    //                 AddFlaggedPlate(vehicle.plate, flagData);
    //             }
    //         }
    //         emitNet('chatMessage', pSource, 'DISPATCH ', 2, `State ID ${pCharacterId} has been flagged.`);
    //     };
    // }
}

export async function RemoveFlagPersonalVehicles(pSource: number, pCharacterId: number): Promise<void> {
    // const removed = await Repository.removeFlagPersonalVehicles(pCharacterId);
    // if (removed) {
    //     emitNet('chatMessage', pSource, 'DISPATCH ', 2, `State ID ${pCharacterId} has been unflagged.`);
    //     FlaggedPlates.forEach((data, plate) => {
    //         if (data.owner_id && data.owner_id === pCharacterId) {
    //             FlaggedPlates.delete(plate);
    //         }
    //     });
    // }
}

export async function SystemFlagPlate(pLicensePlate: string, pReason: string): Promise<void> {
    let userInfo: any;

    if (!GeneratedLicensePlates.has(pLicensePlate)) {
        userInfo = await Repository.generateFakeCharacterData();
        GeneratedLicensePlates.set(pLicensePlate, userInfo);
    } else {
        userInfo = GeneratedLicensePlates.get(pLicensePlate);
    }

    const userData = { flagged_by: { id: 1, call_sign: 'N/A', flagged: new Date(), ...userInfo }, reason: pReason };

    FlaggedPlates.set(pLicensePlate, userData);
}

async function generateFlagData(pUserData: any, pReason: string, pOwnerId?: number): Promise<any> { //VehicleFlagData
    // const callSignData = await Repository.getCharacterCallsign(pUserData.character.id, pUserData.job);
    // return {
    //     flagged_by: {
    //         first_name: pUserData.character.first_name,
    //         last_name: pUserData.character.last_name,
    //         call_sign: callSignData?.call_sign ? callSignData.call_sign : 'TBD',
    //         id: pUserData.character.id,
    //         flagged: new Date(),
    //     },
    //     owner_id: pOwnerId,
    //     reason: pReason,
    // }
} 

export async function SetVehicleFakeLicensePlate(pSource: number, pVehicle: number, pSetFakePlate: boolean): Promise<boolean> {
    return true;
}

export async function SetVehiclePlate(pVin: string, pPlate: string, pUnique = true): Promise<boolean> {
    // const vehicle = await FetchVehicleInfo(pVin);

    // if (!vehicle) {
    //     return false;
    // }

    // if (pUnique) {
    //     const exists = await DoesPlateExist(pPlate);
    //     if (exists) {
    //         return false;
    //     }
    // }

    // vehicle.plate = pPlate;

    // if (!IsVehicleSpawned(pVin)) {

    // }

    return true;
}