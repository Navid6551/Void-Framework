export abstract class Repository {
    static async getObjects() {
        const objects = await SQL.execute<any[]>(`SELECT * FROM _objects ORDER BY id DESC`);
        return objects;
    }

    static async getObjectById(pObjectID: any) {
        const object = await SQL.execute<any[]>(`SELECT * FROM _objects WHERE id = ?`, [pObjectID]);
        if (!object) return [false, {}];

        return [true, object];
    }

    static async updateObjectByID(pObjectID: any, pObjectData: any) {
        // TODO UPDATE OBJECT (:
        const update = await SQL.execute('UPDATE _objects SET data = @data, coords = @coords WHERE id = @id', {
            data: JSON.stringify(pObjectData),
            coords: JSON.stringify(pObjectData.coords),
            id: pObjectID,
        });
        if (!update) return [false, {}];

        return [true, update];
    }

    static async addObject(object: any) {
        const addobjects: any = await SQL.execute<any[]>("INSERT INTO _objects (ns, coords, data) VALUES (?, ?, ?)", [
            object.ns,
            JSON.stringify(object.coords),
            JSON.stringify(object.data)
        ]);

        if (!addobjects) return [false, []];
        
        return [true, {
            id: addobjects.insertId,
        }];
    }

    static async removeObjectById(pId: number) {
        const remove = await SQL.execute<any[]>(`DELETE FROM _objects WHERE id = ?`, [pId]);
        if (!remove) {
            return [false, 'Failed to remove object from database']
        }

        return [true, '']
    }
}