//import { InitCheck } from './check';
import { Repository } from './database/repository';
import { InitEvents } from './events';
import { InitExports } from './exports';
import { GetDefaultDamage, GetDefaultDegradation, GetDefaultSpawnData, GetVehicleClass, GetVehicleType, InitSpawn } from './spawn';
import { InitFuel } from './systems/fuel';
import { GenerateIdentificationNumber } from './vin';

export async function Init(): Promise<void> {
  await Repository.seedGarages()
  await InitEvents();
  await InitFuel();
  await InitSpawn();
  await InitExports();
  //await InitCheck();
};

setImmediate(async () => { //vrp:vehicles:init
  await SQL.execute("UPDATE _vehicle SET state = 'stored' WHERE (state = 'out' OR state = 'showcase')");
});

// RegisterCommand("generatevins", async (source: number) => {
//   const vehicles = await SQL.execute<any[]>("SELECT * FROM _vehicle");
//   for (const vehicle of vehicles) {
//     const model = typeof vehicle.model === 'string' ? GetHashKey(vehicle.model) : vehicle.model;
//     const vehicleClass = await GetVehicleClass(source, model);
//     const vehicleType = GetVehicleType(vehicleClass);
//     const spawnData = GetDefaultSpawnData();
//     const degradation = GetDefaultDegradation();
//     const damage = GetDefaultDamage();
//     const vin = GenerateIdentificationNumber("owned", "pdm", vehicleClass, model);
//     await SQL.execute("UPDATE _vehicle SET vin = @vin, type = @type, size = @size, degradation = @degradation, metadata = @metadata, damage = @damage WHERE id = @id", {
//       vin: vin,
//       type: vehicleType,
//       size: 0,
//       degradation: JSON.stringify(degradation),
//       metadata: JSON.stringify(spawnData),
//       damage: JSON.stringify(damage),
//       id: vehicle.id
//     });
//   }
// }, false);