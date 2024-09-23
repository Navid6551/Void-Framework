import { InitConfig } from "../utils/config";
import { InitEvents } from "./events";
import { InitGarages } from "./state/garages";
import { InitVehicle } from './vehicle';
import { InitThreads } from './threads/index';
import { InitSystems } from './systems/index';
import { InitVehicleStats } from "./others/stats";
import { InitUI } from "./ui";
import { InitItem } from "./items";

export const Init = async (): Promise<void> => {
  await InitConfig();
  await InitEvents();
  await InitGarages();
  await InitVehicle();
  await InitThreads();
  await InitSystems();
  await InitVehicleStats();
  await InitUI();
  await InitItem();
};

setImmediate(async () => {
  await Init();
});