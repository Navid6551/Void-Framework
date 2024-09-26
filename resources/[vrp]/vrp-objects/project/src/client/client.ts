import * as Controllers from './controllers';
import { Delay } from '@shared/utils/tools';

async function Init() {
    await Controllers.Init();
}

const resName = GetCurrentResourceName();
on('onClientResourceStart', async (resourceName: string) => {
    if (resourceName !== resName) return;
    await Init();
    setImmediate(async () => {
        await Delay(2000)
        await RPC.execute('vrp-objects:SeedObjects');
    });
});
