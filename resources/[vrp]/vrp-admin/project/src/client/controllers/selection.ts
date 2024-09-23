import { Delay } from "@shared/utils/tools";
import { IsAdmin, IsDev, commands } from "./adminMenu";
import { adminMode } from "./adminUI";
import { cameraToWorld, drawMarker, drawText, drawTextBox } from "client/util/util";
import { Vector } from "@shared/classes/vector";

let enabledSelection = false;
let _0x504c99 = false;
export let selection: any;

const entityTypes = {
    '1': 'ped',
    '2': 'vehicle',
    '3': 'object'
};

let entityType = 0;
let entityData;
let entitySelected = true;

const selectedEntities: any = new Set();
const _0x2829c9: any = new Map();

const rotateVectorAroundCenter = (pHeading, pCoords) => {
    const coords = Vector.fromObject(pCoords).sub(entityData.center);
    const x = coords.x * Math.cos(pHeading) - coords.y * Math.sin(pHeading);
    const y = coords.x * Math.sin(pHeading) + coords.y * Math.cos(pHeading);
    return new Vector(x, y, 0).add(entityData.center);
};

export const selectEntity = async (pSelection?: any) => {
    if (!await IsAdmin() || !adminMode) return;
    const isPlacingObject = global.exports["vrp-objects"].IsPlacingObject();
    enabledSelection = false;
    _0x504c99 = false;
    const isDev = await IsDev();
    await Delay(1);
    enabledSelection = true;
    SetEntityDrawOutlineShader(1);
    SetEntityDrawOutlineColor(0, 255, 0, 150);
    global.exports['vrp-ui'].sendAppEvent('hud', { crosshairShow: true });
    selection = pSelection;
    const _0xdb48b9 = setTick(async () => {
        var _0x29b49b;
        if (!enabledSelection) {
            clearTick(_0xdb48b9);
            return;
        }

        const [, hit, endCoords, , material, hitEntity] = cameraToWorld(31, PlayerPedId());

        if (!hit) return;
        const coords = Vector.fromArray(endCoords);
        const currentEntity = global.exports['vrp-target'].GetCurrentEntity();
        const raycastEntity = currentEntity ? currentEntity : hitEntity;
        const type = +GetEntityType(raycastEntity);
        const handle = type && (!entityType || type === entityType) && ((_0x29b49b = selection === null || selection === void 0 ? void 0 : selection.entity) === null || _0x29b49b === void 0 ? void 0 : _0x29b49b.handle) !== raycastEntity;
        const entity = type ? handle ? _0x284369(raycastEntity, type) : selection === null || selection === void 0 ? void 0 : selection.entity : null;
        if (handle) {
            RemoveAllOutlines();
        }
        selection = {
            coords: coords,
            entity: entity,
            material: material
        };
    });
    const selectionTextTick = setTick(() => {
        var _0x1cc3a4;
        var _0x5b6ecd;
        var _0x5cfa20;
        if (!enabledSelection && !_0x504c99) {
            RemoveAllOutlines();
            clearTick(selectionTextTick);
            return;
        }
        if (entityData) {
            const height = (_0x1cc3a4 = entityData.height) !== null && _0x1cc3a4 !== void 0 ? _0x1cc3a4 : 0;
            if (!entityData.endCoords) {
                const selectionCoords = selection === null || selection === void 0 ? void 0 : selection.coords;
                const startCoords = entityData.startCoords;
                if (selectionCoords) {
                    entityData.center = Vector.fromObject(startCoords).add(selectionCoords).multiplyScalar(0.5);
                    entityData.center.z = startCoords.z;
                    const _0x57ef42 = Math.PI / 180 * entityData.heading;
                    const _0xa68539 = rotateVectorAroundCenter(-_0x57ef42, startCoords);
                    const _0x50c2c0 = rotateVectorAroundCenter(-_0x57ef42, selectionCoords);
                    const _0x31da00 = _0xa68539.sub(_0x50c2c0);
                    entityData.width = Math.abs(_0x31da00.x);
                    entityData.length = Math.abs(_0x31da00.y);
                }
            }
            const color = entitySelected ? [
                0,
                255,
                0,
                150
            ] : [
                255,
                0,
                0,
                150
            ];
            drawMarker(43, entityData.center, color, entityData.width, entityData.length, height, entityData.heading);
        }
        if (!selection)
            return;
        drawText(0.5, 0.47, 'Entities: ~g~' + _0x2829c9.size, [
            255,
            255,
            255,
            255
        ], 0.4, 4);
        drawText(0.5, 0.5, 'Selecting: ' + ((_0x5b6ecd = entityTypes[entityType]) !== null && _0x5b6ecd !== void 0 ? _0x5b6ecd : 'all'), [
            255,
            255,
            255,
            255
        ], 0.4, 4);
        if (!selection.entity) {
            drawMarker(28, selection.coords, [
                0,
                0,
                255,
                150
            ], 0.2, 0.2, 0.2);
        }
        const playerCoords = Vector.fromArray(GetEntityCoords(PlayerPedId(), true));
        const _0x169063 = pData => {
            var _0x10eb46;
            const handle = pData.handle;
            const entityCoords = Vector.fromArray(GetEntityCoords(handle, true));
            const entityRotation = Vector.fromArray(GetEntityRotation(handle, 2));
            pData.coords = entityCoords;
            pData.rotation = entityRotation;
            const isTypeOne = pData.type === 1;
            if (!isTypeOne && !selectedEntities.has(handle)) {
                selectedEntities.add(handle);
                SetEntityDrawOutline(handle, true);
            }
            if (isTypeOne) {
                drawMarker(1, {
                    x: entityCoords.x,
                    y: entityCoords.y,
                    z: entityCoords.z + 1
                }, [
                    0,
                    255,
                    0,
                    150
                ], 0.5, 0.5, 0.5);
            }
            const _0x2cd524 = pData.type === 3 && (pData.mapName.includes('door') || pData.mapName.includes('garage'));
            const distance = playerCoords.getDistance(entityCoords);
            const _0x28d0bf = pData.dimensions[1][2] - pData.dimensions[0][2];
            if (distance < 20) {
                drawTextBox({
                    x: entityCoords.x,
                    y: entityCoords.y,
                    z: entityCoords.z + (isTypeOne ? 1 : _0x2cd524 ? _0x28d0bf / 2 : _0x28d0bf)
                }, distance, '~q~' + pData.handle + '   ~o~' + ((_0x10eb46 = pData.mapName) !== null && _0x10eb46 !== void 0 ? _0x10eb46 : pData.model) + ' ' + ('~g~ ' + pData.coords.x.toFixed(2) + ', ') + (pData.coords.y.toFixed(2) + ', ') + ('' + pData.coords.z.toFixed(2)), [
                    0,
                    0,
                    0,
                    255
                ]);
                drawTextBox({
                    x: entityCoords.x,
                    y: entityCoords.y,
                    z: entityCoords.z + (isTypeOne ? 1 : _0x2cd524 ? _0x28d0bf / 2 : _0x28d0bf) + 0.2
                }, distance, '~r~(' + GetEntityHealth(handle) + '/' + GetEntityMaxHealth(handle) + ')', [
                    0,
                    0,
                    0,
                    255
                ]);
            }
        };
        if (selection.entity) {
            const _0x3e2ae3 = _0x2829c9.has((_0x5cfa20 = selection.entity) === null || _0x5cfa20 === void 0 ? void 0 : _0x5cfa20.handle);
            if (!_0x3e2ae3) {
                _0x169063(selection.entity);
            }
            drawText(0.5, 0.53, _0x3e2ae3 ? '~g~Selected' : '~r~Not Selected', [
                255,
                255,
                255,
                255
            ], 0.4, 4);
        }
        for (const _0x174785 of _0x2829c9.values()) {
            if (!DoesEntityExist(_0x174785.handle)) {
                _0x2829c9.delete(_0x174785.handle);
                continue;
            }
            _0x169063(_0x174785);
        }
    });

    const selectionControlsTick = setTick(async () => {
        var _0x518d00;
        var _0x23a728;
        if (!enabledSelection && !_0x504c99) {
            clearTick(selectionControlsTick);
            global.exports['vrp-adminUI'].setCommandUI(null);
            return;
        }
        DisableControlAction(0, 24, true); //LMB
        DisableControlAction(0, 25, true); //RMB
        if (enabledSelection) {
            if (IsDisabledControlJustPressed(0, 24)) { //LMB
                if (!entityData) {
                    entityData = {
                        startCoords: Vector.fromObject(selection.coords),
                        heading: GetEntityHeading(PlayerPedId()),
                        height: 4
                    };
                } else if (entityData.startCoords && !entityData.endCoords) {
                    entityData.endCoords = Vector.fromObject(selection.coords);
                }
            }
        }
        DisableControlAction(0, 44, true); //Q
        DisableControlAction(0, 46, true); //E
        DisableControlAction(0, 140, true); //R
        DisableControlAction(0, 20, true); //Z
        DisableControlAction(0, 16, true); //Scroll Down
        DisableControlAction(0, 17, true); //Scroll Up
        DisableControlAction(0, 36, true); //Left Ctrl
        DisableControlAction(0, 19, true); //Left Alt
        DisableControlAction(0, 27, true); //Arrow up / scrollwheel button press
        const _0x2fac05 = IsControlPressed(2, 21); //Left Shift?
        const _0x3e7ae5 = IsDisabledControlPressed(2, 19); //Left Alt?
        const _0x31134f = IsDisabledControlPressed(2, 36); //Left Ctrl?
        const _0x2667ee = _0x31134f ? 0.1 : 0.5;
        if (IsDisabledControlJustPressed(0, 25)) { //RMB
            if (selection === null || selection === void 0 ? void 0 : selection.entity) {
                if (!_0x2829c9.has((_0x518d00 = selection.entity) === null || _0x518d00 === void 0 ? void 0 : _0x518d00.handle)) {
                    _0x2829c9.set(selection.entity.handle, selection.entity);
                } else
                    _0x2829c9.delete((_0x23a728 = selection.entity) === null || _0x23a728 === void 0 ? void 0 : _0x23a728.handle);
            }
            if (entityData) {
                const _0x580359 = GetGamePool('CPed');
                const _0x1db9b1 = GetGamePool('CVehicle');
                const _0xd9fe84 = GetGamePool('CObject');
                for (const _0x490a01 of [
                    ..._0x580359,
                    ..._0x1db9b1,
                    ..._0xd9fe84
                ]) {
                    const _0x40196e = Vector.fromArray(GetEntityCoords(_0x490a01, true));
                    const _0x5645f0 = rotateVectorAroundCenter(Math.PI / 180 * entityData.heading, _0x40196e);
                    const _0xad0985 = _0x5645f0.x >= entityData.center.x - entityData.width / 2 && _0x5645f0.x <= entityData.center.x + entityData.width / 2 && _0x5645f0.y >= entityData.center.y - entityData.length / 2 && _0x5645f0.y <= entityData.center.y + entityData.length / 2 && _0x5645f0.z >= entityData.center.z - 1 && _0x5645f0.z <= entityData.center.z + entityData.height;
                    if (_0xad0985 && _0x490a01 !== PlayerPedId()) {
                        if (!_0x2829c9.has(_0x490a01)) {
                            const _0x59fa23 = GetEntityType(_0x490a01);
                            if (!entityType || _0x59fa23 === entityType) {
                                _0x2829c9.set(_0x490a01, _0x284369(_0x490a01, _0x59fa23));
                            }
                        } else {
                            if (!_0x31134f) {
                                _0x2829c9.delete(_0x490a01);
                            }
                        }
                    }
                }
                entityData = null;
            }
        }
        const _0x44fee3 = _0x4ad196 => {
            if (entitySelected) {
                if (_0x2fac05) {
                    entityData.length += _0x4ad196 / 2;
                }
                if (_0x3e7ae5) {
                    entityData.width += _0x4ad196 / 2;
                }
                if (!_0x2fac05 && !_0x3e7ae5) {
                    entityData.heading += _0x4ad196 * 4;
                }
            } else {
                if (_0x2fac05)
                    entityData.height += _0x4ad196;
                else {
                    if (_0x3e7ae5) {
                        entityData.center.z += _0x4ad196;
                        entityData.height -= _0x4ad196;
                    } else {
                        entityData.center.z += _0x4ad196;
                    }
                }
            }
        };
        if (entityData) {
            const _0x10a9f7 = Vector.fromArray(GetGameplayCamRot(2)).z;
            if (IsDisabledControlPressed(2, 17)) //Scroll Up
                _0x44fee3(_0x2667ee);
            else if (IsDisabledControlPressed(2, 16)) { //Scroll Down
                _0x44fee3(-_0x2667ee);
            }
            if ((entityData === null || entityData === void 0 ? void 0 : entityData.heading) > 360)
                entityData.heading -= 360;
            else {
                if ((entityData === null || entityData === void 0 ? void 0 : entityData.heading) < 0) {
                    entityData.heading += 360;
                }
            }
            const _0x5d3bcb = (_0x31faf6, _0x5c11e3, _0x405853) => {
                entityData.center = rotateVectorAroundCenter(Math.PI / 180 * _0x405853, Vector.fromObject(entityData.center).add(new Vector(_0x31faf6, _0x5c11e3, 0)));
            };
            if (IsDisabledControlPressed(2, 172)) { //Up Arrow
                _0x5d3bcb(0, _0x2667ee / 10, _0x10a9f7);
            }
            if (IsDisabledControlPressed(2, 173)) { //Down Arrow
                _0x5d3bcb(0, -_0x2667ee / 10, _0x10a9f7);
            }
            if (IsDisabledControlPressed(2, 174)) { //Left Arrow
                _0x5d3bcb(-_0x2667ee / 10, 0, _0x10a9f7);
            }
            if (IsDisabledControlPressed(2, 175)) { //Right Arrow
                _0x5d3bcb(_0x2667ee / 10, 0, _0x10a9f7);
            }
        }
        if (IsDisabledControlJustPressed(0, 44)) { //Q
            _0x2829c9.clear();
            RemoveAllOutlines();
            entityData = null;
            _0x504c99 = false;
        }
        if (isDev && IsDisabledControlJustPressed(0, 46) && !isPlacingObject) { //E
            if (entityData === null || entityData === void 0 ? void 0 : entityData.endCoords) {
                setImmediate(async () => {
                    var _0x2d9772;
                    const prompt = await global.exports['vrp-ui'].OpenInputMenu([{
                        label: 'Name',
                        name: 'name'
                    }], values => {
                        return true;
                    });
                    if (prompt) {
                        const height = entityData.height;
                        const center = Vector.fromObject(entityData.center).add(new Vector(0, 0, height / 2));
                        emitNet('polyzone:printBox', {
                            name: (_0x2d9772 = prompt.name) !== null && _0x2d9772 !== void 0 ? _0x2d9772 : '',
                            center: center,
                            width: entityData.width.toFixed(1),
                            length: entityData.length.toFixed(1),
                            heading: entityData.heading.toFixed(0),
                            minZ: entityData.center.z.toFixed(2),
                            maxZ: (entityData.center.z + entityData.height).toFixed(2)
                        });
                        entityData = null;
                        _0x504c99 = false;
                        emit('chat:addMessage', {
                            color: 2,
                            multiline: true,
                            args: [
                                'Me',
                                'Saved to polyzone_created_zones.txt'
                            ]
                        });
                    }
                });
            }
        }
        if (IsDisabledControlJustPressed(0, 140)) { //R
            if (enabledSelection) {
                entityType = (entityType + 1) % 4;
            }
        }
        if (IsDisabledControlJustPressed(0, 20)) { //Z
            if (entityData) {
                entitySelected = !entitySelected;
            }
        }
        if (IsDisabledControlJustPressed(0, 200) && _0x504c99) { //ESC or (Backspace/Esc/Right mouse button) //IsDisabledControlJustReleased(0, 177)
            enabledSelection = false;
            _0x504c99 = false;
        }
    });
};

export const deselectEntity = async () => {
    _0x504c99 = !!(selection === null || selection === void 0 ? void 0 : selection.entity) || !!entityData;
    //enabledSelection = false;
    global.exports['vrp-ui'].sendAppEvent('hud', { crosshairShow: false });
    if (!await IsAdmin() || !adminMode) return;
    if (entityData) {
        selection = null;
    }
    if (!(selection === null || selection === void 0 ? void 0 : selection.entity)) {
        enabledSelection = false;
        global.exports['vrp-adminUI'].setCommandUI(null);
        return;
    }
    const [commandUI, headingData] = await getDataForSelection(selection.entity);
    global.exports['vrp-adminUI'].setCommandUI(commandUI, headingData, 1);
};

export const setClosestObject = async pModel => {
    if (!await IsAdmin() || !adminMode) return;
    const coords = Vector.fromArray(GetEntityCoords(PlayerPedId(), true));
    const objects = GetGamePool('CObject');
    if (!objects || objects.length === 0) return;
    let currentObject = null;
    for (const object of objects) {
        if (pModel && !Number.isNaN(pModel) && GetEntityModel(object) !== pModel) continue;
        if (!currentObject) currentObject = object;
        else {
            const currentObjectCoords = Vector.fromArray(GetEntityCoords(currentObject, false));
            const objectCoords = Vector.fromArray(GetEntityCoords(object, false));
            if (coords.getDistance(objectCoords) < coords.getDistance(currentObjectCoords)) {
                currentObject = object;
            }
        }
    }
    if (!currentObject) return;
    const entity = _0x284369(currentObject, GetEntityType(currentObject));
    await selectEntity({
        entity: entity,
        coords: Vector.fromArray(GetEntityCoords(currentObject, false)),
        material: null
    });
    await deselectEntity();
};

const _0x446b6b = () => {
    _0x504c99 = false;
};

export const RemoveAllOutlines = () => {
    for (const _0x5044d1 of selectedEntities) {
        SetEntityDrawOutline(_0x5044d1, false);
    }
    selectedEntities.clear();
};

const _0x284369 = (pEntity, pType) => {
    const model = GetEntityModel(pEntity);
    return {
        handle: pEntity,
        model: model,
        coords: Vector.fromArray(GetEntityCoords(pEntity, true)),
        rotation: Vector.fromArray(GetEntityRotation(pEntity, 2)),
        dimensions: GetModelDimensions(model),
        type: pType,
        mapName: GetEntityArchetypeName(pEntity)
    };
};

export const getDataForSelection = async pData => {
    var _0x1a3f3c;
    var _0x271741;
    var _0x79f767;
    var _0x3b7e35;
    var _0xd4fc6e;
    const handle = pData.handle;
    const isPlayer = IsPedAPlayer(handle);
    const doorId = pData.type === 3 ? global.exports['vrp-doors'].GetTargetDoorId(handle) : 0;
    const object = (_0x1a3f3c = global.exports['vrp-objects'].GetObjectByEntity(handle)) === null || _0x1a3f3c === void 0 ? void 0 : _0x1a3f3c.id;
    const commandUI = getCommandUI(pData.type === 1 ? isPlayer ? 1 : -1 : pData.type, -1, doorId, object);
    let headingData: any = {};
    switch (pData.type) {
        case 1:
            if (isPlayer) {
                const serverId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(handle));
                const userData = await RPC.execute<{ name, steamid, character: { id, cash } }>('vrp:admin:getUserData', serverId);
                headingData = {
                    name: userData.name,
                    steamid: userData.steamid,
                    serverID: serverId,
                    charID: userData.character.id,
                    cash: userData.character.cash
                };
                return [commandUI, headingData];
            }
            if (NetworkGetEntityIsNetworked(handle)) {
                //const netId = NetworkGetNetworkIdFromEntity(handle);
                const serverId = GetPlayerServerId(NetworkGetEntityOwner(handle));
                //const entitySpawnData = await getEntitySpawnData(netId);
                //const vector = entitySpawnData.vector;
                headingData = {
                    name: 'Local',
                    //model: entitySpawnData.model,
                    //originSource: entitySpawnData.originSource,
                    //origin: entitySpawnData.origin,
                    //originSteamId: entitySpawnData.originSteamId,
                    currentOwner: serverId,
                    //spawnVector: vector[0].toFixed(2) + ', ' + vector[1].toFixed(2) + ', ' + vector[2].toFixed(2)
                };
            } else {
                headingData = { name: 'Local' };
            }
            return [commandUI, headingData];
        case 2:
            headingData = { name: GetLabelText(GetDisplayNameFromVehicleModel(GetEntityModel(handle))) };
            const vin = global.exports['vrp-vehicles'].GetVehicleIdentifier(handle);
            const vehicleInfo = vin ? await RPC.execute<{ vin, cid, size, garage, metadata }>('vrp:admin:getVehicleInfo', vin) : null;
            if (NetworkGetEntityIsNetworked(handle)) {
                //const netId = NetworkGetNetworkIdFromEntity(handle);
                const serverId = GetPlayerServerId(NetworkGetEntityOwner(handle));
                // const entitySpawnData = await getEntitySpawnData(netId);
                // const vector = entitySpawnData.vector;
                // headingData.model = entitySpawnData.model;
                // headingData.originSource = entitySpawnData.originSource;
                // headingData.origin = entitySpawnData.origin;
                // headingData.steamid = entitySpawnData.originSteamId;
                headingData.currentOwner = serverId;
                //headingData.spawnVector = vector[0].toFixed(2) + ', ' + vector[1].toFixed(2) + ', ' + vector[2].toFixed(2);
            }
            if (vehicleInfo) {
                headingData.vin = vehicleInfo.vin ?? vin;
                headingData.plate = GetVehicleNumberPlateText(handle);
                headingData.cid = vehicleInfo.cid;
                headingData.size = vehicleInfo.size;
                headingData.lastGarage = vehicleInfo.garage;
                headingData.mileage = vehicleInfo?.metadata?.mileage ?? 'Unknown';
                headingData.fuel = vehicleInfo?.metadata?.fuel ?? 'Unknown';
            }

            if (!vehicleInfo && vin) {
                headingData.vin = vin;
            }
            headingData.seats = GetVehicleModelNumberOfSeats(GetEntityModel(handle));
            headingData.passengers = GetVehicleNumberOfPassengers(handle);
            return [commandUI, headingData];
        case 3:
            const [x, y, z] = GetEntityCoords(handle, false);
            headingData = {
                name: '' + handle,
                model: pData.mapName + '; (' + GetEntityModel(handle) + ')',
                coords: x.toFixed(2) + ', ' + y.toFixed(2) + ', ' + z.toFixed(2),
                heading: '' + GetEntityHeading(handle).toFixed(2),
                health: GetEntityHealth(handle) + ' / ' + GetEntityMaxHealth(handle)
            };
            const object = global.exports['vrp-objects'].GetObjectByEntity(handle);
            if (object) {
                const objectSyncedData = await RPC.execute<{ ns, id, private }>('vrp:admin:getObjectSyncedData', object.id);
                headingData.ns = objectSyncedData.ns;
                headingData.objectId = objectSyncedData.id;
                headingData.private = JSON.stringify(objectSyncedData.private, null, 2);
            }
            if (NetworkGetEntityIsNetworked(handle)) {
                const netId = NetworkGetNetworkIdFromEntity(handle);
                const serverId = GetPlayerServerId(NetworkGetEntityOwner(handle));
                const entitySpawnData = await getEntitySpawnData(netId);
                if (entitySpawnData) {
                    // const vector = entitySpawnData.vector;
                    // headingData.model = entitySpawnData.model;
                    // headingData.ownerSource = entitySpawnData.originSource;
                    // headingData.origin = entitySpawnData.origin;
                    // headingData.steamid = entitySpawnData.originSteamId;
                    headingData.currentOwner = serverId;
                    //headingData.spawnVector = vector[0].toFixed(2) + ', ' + vector[1].toFixed(2) + ', ' + vector[2].toFixed(2);
                }
            }
            if (doorId) headingData.doorId = doorId;
            return [commandUI, headingData];
        default:
            return null;
    }
};

export async function getEntitySpawnData(pNetId) {
    const entitySpawnData = await RPC.execute<any>('vrp-suppression:getEntitySpawnData', pNetId);
    for (const key in entitySpawnData) {
        const data = entitySpawnData[key];
        if (data != null) {
            return {
                model: data.model,
                originSteamId: data.steamid,
                origin: data.origin,
                originSource: data.serverid,
                vector: extractFloatValues(data.spawnCoords)
            };
        }
    }
}

export async function deleteEntity() {
    if (!await IsAdmin()) return;
    if (IsPedAPlayer(selection.entity.handle)) return;
    RPC.execute('vrp:admin:runCommandFromClient', 'deleteEntity', { Entity: selection.entity.handle });
}

const extractFloatValues = data => data.type === 21 && data.buffer ? [
    data.buffer.readFloatLE(0),
    data.buffer.readFloatLE(4),
    data.buffer.readFloatLE(8)
] : null;

export function getCommandUI(pEntType1, pEntType2, pDoorId, pObjectId) {
    const commandUI = [];
    for (const key in commands) {
        const selection = commands[key].selection;
        if (!selection) continue;
        if (selection.entityType !== pEntType1 && (pEntType2 === null || selection.entityType !== pEntType2)) continue;
        if (selection.lockedDoor || selection.unlockedDoor) {
            if (!pDoorId) continue;
            const isLocked = global.exports['vrp-doors'].IsDoorLocked(pDoorId);
            if (selection.lockedDoor && !isLocked || selection.unlockedDoor && isLocked) continue;
        }
        if (selection.syncedObject && !pObjectId) continue;
        commandUI.push(selection);
    }
    return commandUI;
}

RegisterNuiCallbackType('runCommand');
on('__cfx_nui:runCommand', (data, cb) => {
    var reason;
    var length;
    var seat;
    var model;
    cb('ok');
    if (!(selection === null || selection === void 0 ? void 0 : selection.entity)) return;
    data.Entity = selection.entity.handle;
    if ((reason = data.Data) === null || reason === void 0 ? void 0 : reason.Reason) {
        data.Reason = data.Data.Reason;
    }
    if ((length = data.Data) === null || length === void 0 ? void 0 : length.Length) {
        data.Length = data.Data.Length;
    }
    if ((seat = data.Data) === null || seat === void 0 ? void 0 : seat.Seat) {
        data.Seat = data.Data.Seat;
    }
    if ((model = data.Data) === null || model === void 0 ? void 0 : model.Model) {
        data.Model = data.Data.Model;
    }
    selection.entity.type === 1 && IsPedAPlayer(data.Entity) ? data.targetSrc = GetPlayerServerId(NetworkGetPlayerIndexFromPed(data.Entity)) : data.targetNetId = NetworkGetNetworkIdFromEntity(data.Entity);
    RPC.execute('vrp:admin:runCommandFromClient', data.Action, data);
});
global.exports('selectEntity', selectEntity);