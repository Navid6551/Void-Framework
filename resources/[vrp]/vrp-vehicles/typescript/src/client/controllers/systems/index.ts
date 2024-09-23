import { InitHandling } from './handling';
import { InitDamage } from './damage';
import { InitFuel } from './fuel';
import { InitNosRefil } from './nitro';
import { InitHarness } from './harness';
import { InitMileage } from './mileage';
import { InitHotwire } from './lockpicking';
import { InitAfterMarkets } from './aftermarkets';
import { InitPursuit } from './pursuitModes';
import { InitCarPolish } from './carpolish';
import { InitElectric } from './electric';
import { InitSelfDriving } from './selfdriving';

export async function InitSystems(): Promise<void> {
    await InitHandling();
    await InitDamage();
    await InitFuel();
    await InitNosRefil();
    await InitHarness();
    await InitMileage();
    await InitHotwire();
    await InitAfterMarkets();
    //await InitWheelfitment();
    await InitPursuit();
    await InitCarPolish();
    //await InitXenonLights();
    //await InitInvisibleVehicles();
    await InitElectric();
    await InitSelfDriving();
}