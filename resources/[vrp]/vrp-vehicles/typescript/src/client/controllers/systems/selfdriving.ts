import { Thread } from "../../classes/thread";
import { GetBlipInfo } from "../../utils/blips";
import { GetModuleConfig } from "../../utils/config";
import { GetDistance } from "../../utils/vectors";
import { DriverThread } from "../threads/driver";
import { CurrentVehicle } from "../vehicle";

let selfDrivingModels = new Set();
let ludicrousMode = false;

export function InitSelfDriving(): void {
    const models = GetModuleConfig<any[]>('vrp-vehicles', 'selfDrivingModels');
    if (models === undefined) return;
    SetSelfDrivingModels(models);
}

const GetVehicleSpeed = (pVehicle: number) => {
    if (ludicrousMode)
        return GetVehicleEstimatedMaxSpeed(pVehicle);
    else {
        const _0x4b2b03 = GetEntityModel(pVehicle);
        return GetVehicleModelMaxSpeed(_0x4b2b03);
    }
};

function StartAutoPilot(pMode = 0) {
    const vehicle = CurrentVehicle;
    if (vehicle === undefined || !DriverThread.isActive) return;
    const waypointCoords = GetBlipInfo();
    const speed = GetVehicleSpeed(vehicle);
    const playerPed = PlayerPedId();
    ClearPedTasks(playerPed);
    SetDriverAbility(playerPed, 1);
    SetDriverAggressiveness(playerPed, ludicrousMode ? 1 : 0);
    if (ludicrousMode) {
        SetDriveTaskMaxCruiseSpeed(playerPed, 120);
    }
    if (!DriverThread.data.selfDriving) {
        emit('vrp-vehicles:autopilot:status', 'started');
        emit('InteractSound_CL:PlayOnOne', 'autopilot-on', 0.4);
    }
    DriverThread.data.selfDriving = true;
    DriverThread.data.selfDrivingWander = false;
    DriverThread.data.selfDrivingWaypoint = false;
    DriverThread.data.selfDrivingWaypointCoords = undefined;
    DriverThread.data.selfDrivingMode = pMode;
    if (waypointCoords === undefined) {
        DriverThread.data.selfDrivingWander = true;
        return TaskVehicleDriveWander(playerPed, vehicle, speed, pMode);
    }
    DriverThread.data.selfDrivingWaypoint = true;
    DriverThread.data.selfDrivingWaypointCoords = waypointCoords;
    const [x, y, z] = waypointCoords;
    return TaskVehicleDriveToCoordLongrange(playerPed, vehicle, x, y, z, speed, pMode, 8);
}

function StopAutoPilot() {
    const { selfDriving } = DriverThread.data;
    if (!selfDriving) return;
    emit('vrp-vehicles:autopilot:status', 'stopped');
    emit('InteractSound_CL:PlayOnOne', 'autopilot-off', 0.4);
    DriverThread.data.selfDriving = false;
    DriverThread.data.selfDrivingWander = false;
    DriverThread.data.selfDrivingWaypoint = false;
    ClearPedTasks(PlayerPedId());
}

function AbortAutoPilot() {
    const { selfDriving } = DriverThread.data;
    if (!selfDriving) return;
    emit('vrp-vehicles:autopilot:status', 'aborted');
    emit('InteractSound_CL:PlayOnOne', 'autopilot-error', 0.4);
    DriverThread.data.selfDriving = false;
    DriverThread.data.selfDrivingWander = false;
    DriverThread.data.selfDrivingWaypoint = false;
    ClearPedTasks(PlayerPedId());
}

function SetSelfDrivingModels(models: any[]) {
    const modelSet = new Set();
    for (const model of models) {
        const hash = GetHashKey(model);
        modelSet.add(hash);
    }
    selfDrivingModels = modelSet;
}

on('vrp-config:configLoaded', (pModule: string, pConfig: { selfDrivingModels: any[] }) => {
    if (pModule !== 'vrp-vehicles') return;
    const models = pConfig.selfDrivingModels;
    if (!models) return;
    SetSelfDrivingModels(models);
});

DriverThread.addHook('preStart', function (this: Thread) {
    this.data.selfDrivingTick = 0;
    if (!this.data.selfDriving) return;
    StopAutoPilot();
});

DriverThread.addHook('preStop', function (this: Thread) {
    if (!this.data.selfDriving) return;
    StopAutoPilot();
});

DriverThread.addHook('active', function (this: Thread) {
    if (!this.data.selfDrivingWaypoint) return;
    const coords = this.data.selfDrivingWaypointCoords;
    const distance = GetDistance(GetEntityCoords(PlayerPedId(), false), coords);
    if (distance > 50 || IsWaypointActive()) return;
    AbortAutoPilot();
});

DriverThread.addHook('active', function (this: Thread) {
    if (!this.data.selfDriving) return;
    const selfDrivingTick = ++this.data.selfDrivingTick;
    if (selfDrivingTick < 5) return;
    this.data.selfDrivingTick = 0;
    const markerCoords = GetBlipInfo();
    const coords = this.data.selfDrivingWaypointCoords;
    if ((markerCoords === null || markerCoords === void 0 ? void 0 : markerCoords[0]) === (coords === null || coords === void 0 ? void 0 : coords[0]) && (markerCoords === null || markerCoords === void 0 ? void 0 : markerCoords[1]) === (coords === null || coords === void 0 ? void 0 : coords[1])) return;
    if (coords && !markerCoords || markerCoords && !coords) StartAutoPilot(this.data.selfDrivingMode);
    else if ((markerCoords === null || markerCoords === void 0 ? void 0 : markerCoords[0]) !== (coords === null || coords === void 0 ? void 0 : coords[0]) || (markerCoords === null || markerCoords === void 0 ? void 0 : markerCoords[1]) !== (coords === null || coords === void 0 ? void 0 : coords[1])) {
        StartAutoPilot(this.data.selfDrivingMode);
    }
});

const ToggleAutoPilot = () => {
    const vehicle = CurrentVehicle;
    if (vehicle === undefined || !DriverThread.isActive) return false;
    const model = GetEntityModel(vehicle);
    if (!selfDrivingModels.has(model)) return false;
    ClearPedTasks(PlayerPedId());
    DriverThread.data.selfDriving ? StopAutoPilot() : StartAutoPilot(ludicrousMode ? 787212 : 7);
    return true;
};

RegisterCommand('+autopilot', ToggleAutoPilot, false);
RegisterCommand('-autopilot', () => { }, false);
RegisterCommand('autopilot:ludicrousMode', async () => {
    const [isAdmin] = await RPC.execute('vrp:admin:isAdmin');
    if (isAdmin) {
        ludicrousMode = !ludicrousMode;
        console.log(`Ludicrous Mode is now: ${ludicrousMode ? 'on' : 'off'}`);
    }
}, false);

setImmediate(() => {
    global.exports['vrp-keybinds'].registerKeyMapping('', 'Vehicle', 'Toggle Autopilot', '+autopilot', '-autopilot');
});