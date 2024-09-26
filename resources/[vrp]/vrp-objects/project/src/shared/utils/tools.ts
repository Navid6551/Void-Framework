import { Vector3 } from "../classes/vector";

export let Delay = (ms: any) => new Promise(res => setTimeout(res, ms));

export async function loadAnimDict(dict: string) {
    while (!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict)
        await Delay(5)
    }
}


export async function loadModel(_0x4f95ce: number) {
    if (IsModelValid(_0x4f95ce)) {
      RequestModel(_0x4f95ce);
      let _0x565ff1 = false;
      setTimeout(() => _0x565ff1 = true, 3000);
      while (!HasModelLoaded(_0x4f95ce) && !_0x565ff1) {
        await Delay(10);
      }
      return !_0x565ff1;
    }
    return false;
  }

export function updateEntityTransformation(entityId: number, matrix: number[]) {
    // Set the transformation matrix of the entity
    SetEntityMatrix(
        entityId,
        matrix[4], matrix[5], matrix[6],  // Rotation
        matrix[0], matrix[1], matrix[2],  // Position
        matrix[8], matrix[9], matrix[10], // Scale
        matrix[12], matrix[13], matrix[14] // Coordinates
    );

    // Set the position of the entity
    SetEntityCoords(
        entityId,
        matrix[12], matrix[13], matrix[14], // Position
        false, false, false, false
    );
}

export function getEntityMatrixAsFloat32Array(entityId: number): Float32Array {
    // Retrieve the matrix components from the entity
    const [right, up, forward, position] = GetEntityMatrix(entityId);

    // Create and return the matrix as a Float32Array in column-major order
    return new Float32Array([
        right[0], up[0], forward[0], 0,
        right[1], up[1], forward[1], 0,
        right[2], up[2], forward[2], 0,
        position[0], position[1], position[2], 1
    ]);
}

export const removeEntity = (entity: any) => {
    if (DoesEntityExist(entity)) {
      DeleteObject(entity);
    }
};



export const genNumbers = (length: number) => {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 1; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const calculateDistance = (
    referencePosition: [number, number, number],
    position: [number, number, number]
): number => {
    const [dx, dy, dz] = [
        referencePosition[0] - position[0],
        referencePosition[1] - position[1],
        referencePosition[2] - position[2]
    ];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const _0xbeccb0 = (_0x3da3f1: any, _0xbf6a32: any, _0x1f9c12: any, _0xc5dbc3: any, _0x3dae65: any) => (_0x3da3f1 - _0xbf6a32) * (_0x3dae65 - _0xc5dbc3) / (_0x1f9c12 - _0xbf6a32) + _0xc5dbc3;

export const _0x57bcce = (_0x18ec14: any, _0x561c18: any) => {
    const [_0x509607, _0x15392f, _0x17ffe5] = [
        _0x18ec14[0] - _0x561c18[0],
        _0x18ec14[1] - _0x561c18[1],
        _0x18ec14[2] - _0x561c18[2]
    ];
    return Math.sqrt(_0x509607 * _0x509607 + _0x15392f * _0x15392f + _0x17ffe5 * _0x17ffe5);
};

export function _0x3d4734(_0x461ccc: any[]) {
    const _0x5837ec: any = [];
    _0x461ccc.forEach((_0x2a0daa, _0x108c95) => _0x5837ec.push({
        key: _0x108c95,
        value: _0x2a0daa
    }));
    return _0x5837ec;
}

export function _0x3db090(_0x579745: any) {
    const _0x4404bc = new Map();
    _0x579745.forEach((_0x53a61c: any) => _0x4404bc.set(_0x53a61c.key, _0x53a61c.value));
    return _0x4404bc;
}

export async function _0x56da3d(_0xf9d6b3: any) {
    const _0x479fd3 = /s?(-?\d{1,}\.?,?\d{1,})/g;
    const _0x6cb4d3 = _0xf9d6b3.match(/s?(-?\d{1,}\.?,?\d{1,})/g);
    const _0x20edc5 = new Vector3(+_0x6cb4d3[0], +_0x6cb4d3[1], +_0x6cb4d3[2]);
    return _0x20edc5;
}

export const _0xb3d3d7 = (_0x513421: any, _0x57f961: any, _0x2e836e: any, _0x32dff4 = 0.4, _0x429358 = 0.4, _0x3d8348 = 0.4, _0x4e6b89 = 0) => {
    DrawMarker(_0x513421, _0x57f961.x, _0x57f961.y, _0x57f961.z, 0, 0, 0, 0, 0, _0x4e6b89, _0x32dff4, _0x429358, _0x3d8348, _0x2e836e[0], _0x2e836e[1], _0x2e836e[2], _0x2e836e[3], false, false, 2, false, null, null, false);
};

export const _0x5c60b1 = (_0x223ee2: any, _0x456164: any, _0x2c9352: any, _0x598a43: any, _0x1d8c36: any, _0x1abc57: any, _0x4a8d90 = 0) => {
    SetTextColour(_0x598a43[0], _0x598a43[1], _0x598a43[2], _0x598a43[3]);
    SetTextOutline();
    SetTextScale(0, _0x1d8c36);
    SetTextFont(_0x1abc57 !== null && _0x1abc57 !== void 0 ? _0x1abc57 : 0);
    SetTextJustification(_0x4a8d90);
    if (_0x4a8d90 === 2)
        SetTextWrap(0, 0.575);
    SetTextEntry('STRING');
    AddTextComponentString(_0x2c9352 !== null && _0x2c9352 !== void 0 ? _0x2c9352 : 'Dummy text');
    EndTextCommandDisplayText(_0x223ee2, _0x456164);
};

export const _0x3926e6 = (_0x425a92: any, _0x57cb01: any, _0x5a2811: any, _0x2b574e: any, _0x1d322c = 4) => {
    SetDrawOrigin(_0x425a92.x, _0x425a92.y, _0x425a92.z, 0);
    const _0x45db60 = Math.max(_0xbeccb0(_0x57cb01, 0, 10, 0.4, 0.25), 0.1);
    _0x5c60b1(0, 0, _0x5a2811, _0x2b574e, _0x45db60, _0x1d322c);
    ClearDrawOrigin();
};

export const _0x3436d8 = (_0x4de146: any, _0x32aa73: any, _0x8284fa: any) => {
    BeginTextCommandGetWidth('STRING');
    AddTextComponentString(_0x4de146);
    SetTextFont(_0x32aa73);
    SetTextScale(_0x8284fa, _0x8284fa);
    return EndTextCommandGetWidth(true);
};

export const _0x5e5244 = (_0x26f223: any, _0x5d8e50: any) => {
    const _0x5943b6 = GetGameplayCamCoord();
    const [_0x6dc37, , _0x2ec0cb] = GetGameplayCamRot(0).map(_0x37c88f => Math.PI / 180 * _0x37c88f);
    const _0xcd5bdb = Math.abs(Math.cos(_0x6dc37));
    const _0x3a2c30 = [
        -Math.sin(_0x2ec0cb) * _0xcd5bdb,
        Math.cos(_0x2ec0cb) * _0xcd5bdb,
        Math.sin(_0x6dc37)
    ];
    const _0x31928 = _0x3a2c30.map((_0x33e36f, _0x2a51e6) => _0x5943b6[_0x2a51e6] + _0x33e36f);
    const _0x58dd3f = _0x3a2c30.map((_0x5b8687, _0x26aed4) => _0x5943b6[_0x26aed4] + _0x5b8687 * 200);
    const _0x96892b = StartShapeTestSweptSphere(_0x31928[0], _0x31928[1], _0x31928[2], _0x58dd3f[0], _0x58dd3f[1], _0x58dd3f[2], 0.2, _0x26f223, _0x5d8e50, 7);
    return GetShapeTestResultIncludingMaterial(_0x96892b);
};
