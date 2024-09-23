import { Delay } from "@shared/utils/tools";
import { BlipSettings } from "../types/client";

export class BlipHandler {
    id: number;
    mode: string;
    type: string;
    active: boolean;
    handle: number;
    entity: number;
    settings: BlipSettings;
    timer: number;

    constructor(pType: string, pId: number, pSettings: BlipSettings) {
        this.id = null;
        this.mode = null;
        this.type = null;
        this.active = false;
        this.handle = null;
        this.entity = null;
        this.settings = null;
        this.timer = null;
        this.id = pId;
        this.mode = null;
        this.type = pType;
        this.active = false;
        this.handle = null;
        this.entity = global.exports['vrp-infinity'].GetLocalEntity(pType, pType);
        this.settings = pSettings;
    }
    setSettings() {
        if (!this.settings) return;
        if (this.settings.color) {
            SetBlipColour(this.handle, this.settings.color);
        }
        if (this.settings.route) {
            SetBlipRoute(this.handle, this.settings.route);
        }
        if (this.settings.short) {
            SetBlipAsShortRange(this.handle, this.settings.short);
        }
        if (this.settings.scale) {
            SetBlipScale(this.handle, this.settings.scale);
        }
        if (this.settings.heading) {
            ShowHeadingIndicatorOnBlip(this.handle, this.settings.heading);
        }
        if (this.settings.category) {
            SetBlipCategory(this.handle, this.settings.category);
        }
        if (this.settings.text) {
            BeginTextCommandSetBlipName('STRING');
            AddTextComponentString(this.settings.text);
            EndTextCommandSetBlipName(this.handle);
        }
    }
    onModeChange(pMode) {
        if (pMode == this.mode || !this.active) return;
        RemoveBlip(this.handle);
        if (pMode == 'coords') {
            const networkedCoords = global.exports['vrp-infinity'].GetNetworkedCoords(this.type, this.id);
            if (networkedCoords) {
                this.handle = AddBlipForCoord(networkedCoords[0], networkedCoords[1], networkedCoords[2]);
                this.mode = 'coords';
            }
        } else {
            if (pMode == 'entity') {
                const localEntity = global.exports['vrp-infinity'].GetLocalEntity(this.type, this.id);
                if (localEntity) {
                    this.handle = AddBlipForEntity(localEntity);
                    this.mode = 'entity';
                }
            }
        }
        this.setSettings();
    }
    onUpdateCoords(pCoords) {
        if (this.mode != 'coords' || !this.active) return;
        const coords = pCoords || global.exports['vrp-infinity'].GetNetworkedCoords(this.type, this.id);
        SetBlipCoords(this.handle, coords[0], coords[1], coords[2]);
    }
    entityExistLocally() {
        return DoesEntityExist(global.exports['vrp-infinity'].GetLocalEntity(this.type, this.id));
    }
    disable() {
        if (!this.active) return;
        this.active = false;
        RemoveBlip(this.handle);
        clearTick(this.timer);
    }
    enable(pEnabled) {
        if (this.active) return;
        this.active = true;
        const localEntity = global.exports['vrp-infinity'].GetLocalEntity(this.type, this.id);
        const mode = DoesEntityExist(localEntity) && 'entity' || 'coords';
        if (pEnabled) {
            this.onModeChange(mode);
        } else {
            if (this.active) {
                const delay = this.type == 'player' && 500 || 1000;
                this.timer = setTick(async () => {
                    this.blipTimer();
                    await Delay(delay);
                });
            }
        }
    }
    blipTimer() {
        const localEntity = global.exports['vrp-infinity'].GetLocalEntity(this.type, this.id);
        const mode = DoesEntityExist(localEntity) && 'entity' || 'coords';
        if (mode != this.mode) {
            this.onModeChange(mode);
        } else {
            if (mode == 'coords') this.onUpdateCoords(null);
        }
    }
}