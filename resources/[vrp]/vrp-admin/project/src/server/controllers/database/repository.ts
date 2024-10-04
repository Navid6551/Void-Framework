import { QBCore } from "server/server";

export abstract class Repository {
    static async getUserData(pServerId: number): Promise<SUserData> {
        const user = QBCore.Functions.GetPlayer(pServerId);
        if (!user) return null;

        return {
            name: GetPlayerName(pServerId),
            steamid: QBCore.Functions.GetIdentifier(pServerId, 'steam'),
            character: {
                id: Number(user.PlayerData.citizenid),
                owner: GetPlayerName(pServerId),
                first_name: user.PlayerData.charinfo.firstname,
                last_name: user.PlayerData.charinfo.lastname,
                date_created: user.PlayerData.charinfo.birthday,
                dob: user.PlayerData.charinfo.birthday,
                cash: user.PlayerData.money.cash,
                bank: user.PlayerData.money.bank,
                phone_number: user.PlayerData.charinfo.phone,
                story: '',
                new: false,
                deleted: false,
                gender: user.PlayerData.charinfo.gender,
                jail_time: user.PlayerData.metadata.jail,
                stress_level: user.PlayerData.metadata.stress
            }
        };
    }

    static async getVehicleInfo(pVin: string): Promise<SVehicleInfo> {
        const data = await SQL.execute<[SVehicleInfo]>("SELECT * FROM _vehicle WHERE vin = @vin", {
            vin: pVin
        });
        if (!data) return null;

        return {
            vin: data[0].vin,
            cid: data[0].cid,
            size: data[0].size,
            garage: data[0].garage,
            model: data[0].model,
            metadata: JSON.parse(data[0].metadata ?? [])
        };
    }

    static async fetchGarages(): Promise<SGarage[]> {
        const results = await SQL.execute<any[]>("SELECT * FROM _garage");
        if (!results) return [];

        return results.map((garage: any) => {
            return {
                garage_id: garage.garage_id,
                name: garage.name
            }
        });
    }

    static async getObjectSyncedData(pId: string): Promise<any> {
        const results = global.exports['vrp-objects'].GetObject(pId);
        if (!results) return null;

        return {
            id: results.id,
            model: results.data.model,
            ns: results.ns,
            coords: {
                x: results.x,
                y: results.y,
                z: results.z
            },
            rotation: results.data.rotation,
            persistent: results.data.builde,
            public: {},
            private: {},
            world: 'default',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            expiresAt: Date.now() + 600000
        };
    }
}