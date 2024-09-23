import { seed } from "./seeding";

const VehicleModels = new Map<string, any>();

export abstract class Repository {
    static async addVehicle(pVehicle: Vehicle): Promise<boolean> {
        if (await this.doesVehicleExist(pVehicle.vin)) return false;
        
        const result = await SQL.execute("INSERT INTO _vehicle (cid, vin, model, state, garage, plate, name, type, degradation, metadata, damage, mods, appearance) VALUES (@cid, @vin, @model, @state, @garage, @plate, @name, @type, @degradation, @metadata, @damage, @mods, @appearance)", {
            cid: pVehicle.cid,
            vin: pVehicle.vin,
            model: pVehicle.model,
            state: pVehicle.state,
            garage: pVehicle.garage,
            plate: pVehicle.plate,
            name: pVehicle.name,
            type: pVehicle.type,
            degradation: pVehicle.degradation,
            metadata: pVehicle.metadata,
            damage: pVehicle.damage,
            mods: pVehicle.mods,
            appearance: pVehicle.appearance
        });

        if (!result) return false;

        return true;
    }

    static async updateVehicle(pVIN: string): Promise<boolean> {
        if (!await this.doesVehicleExist(pVIN)) return false;

        return true;
    }

    static async updateVehicleState(pVIN: string, pState: VehicleState): Promise<boolean> {
        if (!await this.doesVehicleExist(pVIN)) return false;

        const result = await SQL.execute("UPDATE _vehicle SET state = @state WHERE vin = @vin", {
            state: pState,
            vin: pVIN
        });
        if (!result) return false;

        return true;
    }

    static async updateVehicleOwner(pVIN: string, pOwner: number): Promise<boolean> {
        if (!await this.doesVehicleExist(pVIN)) return false;

        const result = await SQL.execute("UPDATE _vehicle SET cid = @cid WHERE vin = @vin", {
            cid: pOwner,
            vin: pVIN
        });
        if (!result) return false;

        return true;
    }

    static async getVehicleByVin(pVIN: string): Promise<Vehicle> {
        const result = await SQL.execute<Vehicle>("SELECT * FROM _vehicle WHERE vin = @vin", { vin: pVIN });
        if (!result) return {} as Vehicle;

        return result;
    }

    static async getVehicleByPlate(pPlate: string): Promise<Vehicle> {
        const result = await SQL.execute<Vehicle>("SELECT * FROM _vehicle WHERE plate = @plate", { plate: pPlate });
        if (!result) return {} as Vehicle;

        return result;
    }

    static async getVehiclesByGarage(pGarage: string): Promise<Vehicle[]> {
        const result = await SQL.execute<Vehicle[]>("SELECT * FROM _vehicle WHERE garage = @garage", {
            garage: pGarage
        });
        if (!result) return [];

        return result;
    }

    static async doesVehicleExist(pVIN: string): Promise<boolean> {
        const result = await SQL.execute<Vehicle[]>("SELECT vin FROM _vehicle WHERE vin = @vin", { vin: pVIN });
        return result[0].vin === pVIN;
    }

    static async doesIdentifierExist(pVIN: string): Promise<boolean> {
        const result = await SQL.execute<Vehicle[]>("SELECT plate FROM _vehicle WHERE vin = @vin", { vin: pVIN });
        return result[0].vin === pVIN;
    }

    static async doesPlateExist(pPlate: string): Promise<boolean> {
        const result = await SQL.execute<Vehicle[]>("SELECT plate FROM _vehicle WHERE plate = @plate", { plate: pPlate });
        return result[0].plate === pPlate;
    }

    static async generateFakeCharacterData(): Promise<UserCharacterData> {
        return {
            first_name: "Unknown",
            last_name: "Unknown",
            phone_number: "000-000-0000",
        }
    }

    static getVehicleModelInfo(pModel: string | number) {

    }

    static getVehicleModelName(pModel: string): string {
        return pModel;
    }

    static async seedGarages(): Promise<void> {
        console.log("[VEHICLES] [REPOSITORY] Seeding garages...");
        await seed();
    }

    static async addParkingLog(pLog: ParkingLog): Promise<boolean> {
        const result = await SQL.execute("INSERT INTO _parking_log (vin, cid, action, engine, body, fuel, timestamp, garage) VALUES (@vin, @cid, @action, @engine, @body, @fuel, @timestamp, @garage)", {
            vin: pLog.vin,
            cid: pLog.cid,
            action: pLog.action,
            engine: pLog.engine,
            body: pLog.body,
            fuel: pLog.fuel,
            timestamp: Date.now(),
            garage: pLog.garage
        });

        if (!result) return false;

        return true;
    }

    static async getParkingLogs(pVIN: string, pGarage: string): Promise<ParkingLogSQL[]> {
        const result = await SQL.execute<ParkingLogSQL[]>("SELECT * FROM _parking_log WHERE vin = @vin AND garage = @garage ORDER BY id DESC", { vin: pVIN, garage: pGarage });
        if (!result) return [];

        return result;
    }
}

export function GetModelDataList(): void {

}