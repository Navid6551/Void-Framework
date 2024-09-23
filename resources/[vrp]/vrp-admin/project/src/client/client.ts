import * as Controllers from './controllers';

const ResourceName = GetCurrentResourceName();

on('onClientResourceStart', async resource => {
    if (resource !== ResourceName) return;
    await Controllers.Init();
    emit("vrp-admin:hotreload");
});