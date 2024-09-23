import { InitItemEvents } from './itemEvents';
import { InitVehicleItems } from './itemFunctions';
import { InitDegradationItems } from './itemsData';
import { InitAnimationList } from './itemAnimations';

export async function InitItem(): Promise<void> {
    await InitVehicleItems();
    await InitItemEvents();
    await InitDegradationItems();
    await InitAnimationList();
}