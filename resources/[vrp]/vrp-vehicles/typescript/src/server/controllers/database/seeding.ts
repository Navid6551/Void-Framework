import { Repository } from "./repository";
import { isEqual } from "lodash";

function compareJSON(obj1: any, obj2: any) {
    return isEqual(obj1, obj2);
}

function getFileNameOnly(filePath: any) {
    return filePath.split('/').pop().split('.').shift();
}

function loadGarages() {
    const requireContext = require.context('../../../../../seeding/garages', false, /\.json$/);
    const json: any = {};
    requireContext.keys().forEach((key: any) => {
        const obj = requireContext(key);
        const simpleKey = getFileNameOnly(key);
        json[simpleKey] = obj;
    });
    return json;
}

export async function seed() {
    const garages: GarageInfo[] = loadGarages();

    if (!garages) return console.log("No garages to seed!");

    const garageIds = Object.values(garages).map((garageData: GarageInfo) => garageData.garage_id);

    const existingGarageIds = await SQL.execute<{ garage_id: string }[]>(
        "SELECT garage_id FROM _garage WHERE garage_id IN (?)",
        [garageIds]
    );

    if (!existingGarageIds) return console.log("No existing garages found!");

    const existingGarageIdsSet = new Set(existingGarageIds.map((row) => row.garage_id));

    for (const [garageId, garageData] of Object.entries(garages)) {
        if (!existingGarageIdsSet.has(garageId)) {
            console.log(`Garage is not in the database, seeding garage with ID: ${garageId}`);
            
            // Perform the necessary operations for seeding the garage
            await SQL.execute("INSERT INTO _garage (garage_id, name, type, business_id, shared, parking_limit, location, vehicle_types, parking_spots) VALUES (@garage_id, @name, @type, @business_id, @shared, @parking_limit, @location, @vehicle_types, @parking_spots)", {
                garage_id: garageData.garage_id,
                name: garageData.name,
                type: garageData.type,
                business_id: garageData.business_id || null,
                shared: garageData.shared || 0,
                parking_limit: garageData.parking_limit,
                location: JSON.stringify(garageData.location),
                vehicle_types: JSON.stringify(garageData.vehicle_types),
                parking_spots: JSON.stringify(garageData.parking_spots)
            });
            
            console.log(`Seeded garage with ID: ${garageId}`);
        } else { //TODO: Add update check
            console.log(`Garage is already in the database, skipping seeding garage with ID: ${garageId}`);
        }
    }
}