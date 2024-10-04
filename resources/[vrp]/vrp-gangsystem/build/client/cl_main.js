(() => {
  'use strict';

  var _0x4b30f9 = {};
  (() => {
    _0x4b30f9.g = function () {
      if (typeof globalThis === "object") {
        return globalThis;
      }
      try {
        return this || new Function("return this")();
      } catch (_0x163358) {
        if (typeof window === "object") {
          return window;
        }
      }
    }();
  })();
  var _0x43bf89 = {};
  ;
  const _0x26f135 = globalThis.VPX;
  const _0x32e1f0 = _0x26f135.Hud;
  const _0xffe918 = _0x26f135.Utils;
  const _0x52c13c = _0x26f135.Zones;
  const _0x2605ef = _0x26f135.Events;
  const _0x3351b8 = _0x26f135.Streaming;
  const _0x316b44 = _0x26f135.Procedures;
  const _0x55f7f6 = _0x26f135.Interface;
  const _0x934666 = null && _0x26f135;
  ;
  let _0x5361dd = exports["vrp-config"].GetModuleConfig("main");
  let _0x3e7c52 = null;
  const _0x4f0058 = new Map();
  const _0x4057ba = GetCurrentResourceName();
  async function _0x218706() {
    while (_0x3e7c52 === null) {
      await new Promise(_0x2b3b61 => setTimeout(_0x2b3b61, 2000));
      _0x3e7c52 = _0x2d60e9();
    }
  }
  on("vrp-config:configLoaded", (_0x174d00, _0x4ba440) => {
    if (_0x174d00 === "main") {
      _0x5361dd = _0x4ba440;
    } else if (_0x4f0058.has(_0x174d00)) {
      _0x4f0058.set(_0x174d00, _0x4ba440);
    }
  });
  function _0x10d921(_0x472d1a) {
    return _0x5361dd[_0x472d1a];
  }
  function _0x275400(_0x3f316a, _0x54d30e) {
    if (!_0x4f0058.has(_0x3f316a)) {
      const _0x5b98ac = exports["vrp-config"].GetModuleConfig(_0x3f316a);
      if (_0x5b98ac === undefined) {
        return;
      }
      _0x4f0058.set(_0x3f316a, _0x5b98ac);
    }
    const _0x2ad8a9 = _0x4f0058.get(_0x3f316a);
    if (_0x54d30e) {
      return _0x2ad8a9?.[_0x54d30e];
    } else {
      return _0x2ad8a9;
    }
  }
  function _0x2d60e9(_0x4d4574) {
    return _0x275400(_0x4057ba, _0x4d4574);
  }
  ;
  const _0x215b3c = _0xffe918.cache(async () => {
    const _0x3f77ce = await RPC.execute("vrp-gangsystem:getGangsPedModels");
    return [true, _0x3f77ce];
  }, {
    timeToLive: 3600000
  });
  const _0x1760a3 = _0xffe918.cache(async () => {
    const _0x1f5b77 = await RPC.execute("vrp-gangsystem:getCurrentGang");
    return [true, _0x1f5b77];
  }, {
    timeToLive: 600000
  });
  const _0x41ef46 = _0xffe918.cache(async () => {
    const _0x116bbf = await RPC.execute("vrp-gangsystem:getGanginfo");
    return [true, _0x116bbf];
  }, {
    timeToLive: 300000
  });
  const _0x205bd9 = _0xffe918.cache(async () => {
    const _0x13ea83 = await _0x1760a3.get();
    if (!_0x13ea83) {
      return [false, null];
    }
    const _0x5f5635 = await RPC.execute("vrp-gangsystem:getGangFlagLocation", _0x13ea83);
    return [true, _0x5f5635];
  }, {
    timeToLive: 300000
  });
  const _0x42faff = () => {
    _0x1760a3.reset();
    _0x205bd9.reset();
    _0x41ef46.reset();
  };
  const _0x5f2ae8 = async () => await _0x1760a3.get();
  const _0x3905ab = async () => await _0x205bd9.get();
  const _0x5daafc = async () => await _0x41ef46.get();
  const _0x2975b1 = async () => await _0x215b3c.get();
  ;
  const _0x199de7 = globalThis;
  const _0x20afe0 = _0x509a08 => new Promise(_0x372dd5 => setTimeout(() => _0x372dd5(), _0x509a08));
  const _0x27fe51 = (_0x49a67a, _0x6a2564) => {
    const [_0x478c5a, _0x211dfb, _0x329d09] = [_0x49a67a.x - _0x6a2564.x, _0x49a67a.y - _0x6a2564.y, _0x49a67a.z - _0x6a2564.z];
    return Math.sqrt(_0x478c5a * _0x478c5a + _0x211dfb * _0x211dfb + _0x329d09 * _0x329d09);
  };
  const _0x26f8ac = (_0x5dc97e, _0x264c71) => {
    return _0x5dc97e.sort((_0xfe5361, _0x5be931) => _0x27fe51(_0x264c71, {
      x: _0xfe5361.x,
      y: _0xfe5361.y,
      z: _0xfe5361.z
    }) - _0x27fe51(_0x264c71, {
      x: _0x5be931.x,
      y: _0x5be931.y,
      z: _0x5be931.z
    })).map(_0x5f2832 => _0x27fe51(_0x264c71, {
      x: _0x5f2832.x,
      y: _0x5f2832.y,
      z: _0x5f2832.z
    }));
  };
  function _0x3a5627(_0x2756fe, _0x1819d5) {
    return Math.floor(_0x1819d5 ? Math.random() * (_0x1819d5 - _0x2756fe) + _0x2756fe : Math.random() * _0x2756fe);
  }
  const _0x4e967b = (_0x5f28aa, _0x55035b) => {
    return _0x5f28aa.slice(0, _0x55035b).map(function () {
      return this.splice(Math.floor(Math.random() * this.length), 1)[0];
    }, _0x5f28aa.slice());
  };
  const _0x47318b = _0x42e5bb => {
    let _0x34a110 = 0;
    let _0xf9134e = 0;
    const _0xa8befc = GetResourceConfig("progressions");
    for (const _0x56d09b of _0xa8befc) {
      if (_0x42e5bb >= _0x56d09b.requiredGraffitis) {
        _0x34a110 = _0x56d09b.inventorySlots;
        _0xf9134e = _0x56d09b.inventoryWeight;
      }
    }
    return [_0x34a110, _0xf9134e];
  };
  const _0x4cc8e7 = _0x812945 => {
    for (let _0x56d414 = _0x812945.length - 1; _0x56d414 > 0; _0x56d414--) {
      const _0x3d4ea8 = Math.floor(Math.random() * (_0x56d414 + 1));
      [_0x812945[_0x56d414], _0x812945[_0x3d4ea8]] = [_0x812945[_0x3d4ea8], _0x812945[_0x56d414]];
    }
    return _0x812945;
  };
  ;
  function _0x1b5273(_0x2004c5, _0x4b2528, _0x60805c = false) {
    return new Promise(_0x1f2162 => {
      if (_0x4b2528) {
        exports["vrp-taskbar"].taskBar(_0x2004c5, _0x4b2528, _0x60805c, true, null, false, _0x1f2162);
      } else {
        setTimeout(() => _0x1f2162(100), _0x2004c5);
      }
    });
  }
  function _0x3167de(_0x586ada, _0x2023fc, _0x2144db) {
    return new Promise(_0x1af602 => {
      exports["vrp-phone"].DoPhoneConfirmation(_0x586ada, _0x2023fc, _0x2144db, _0x1af602);
    });
  }
  ;
  let _0x14d3d3 = [];
  setImmediate(() => {
    _0x14d3d3 = _0x4b30f9.g.exports["vrp-doors"].GetDoorLocations();
  });
  on("vrp-inventory:itemUsed", (_0x52d28a, _0xb83d9) => {
    if (_0x52d28a !== "gangflag") {
      return;
    }
    if (_0x5144c6()) {
      return emit("DoLongHudText", "You cannot place a flag here", 2);
    }
    const _0x4bec67 = JSON.parse(_0xb83d9);
    _0x34ef58(_0x4bec67.gangId, _0x4bec67?.upgraded);
  });
  const _0x34ef58 = async (_0x2e16d3, _0x25a745 = false) => {
    if (!_0x2e16d3) {
      return emit("DoLongHudText", "Unknown flag", 2);
    }
    const _0x568c59 = await _0x4b30f9.g.exports["vrp-objects"].PlaceAndSaveObject(_0x25a745 ? GetHashKey("np_gangflag_" + _0x2e16d3) : GetHashKey("np_gangflag"), {
      gangId: _0x2e16d3
    }, {
      collision: false,
      groundSnap: false,
      adjustZ: false,
      distance: 3,
      alignToSurface: true,
      surfaceOffset: 0.1
    }, _0x449ae0, "gang-flags");
    if (!_0x568c59) {
      return emit("DoLongHudText", "Failed to place down flag", 2);
    }
    const [_0xa50e8d, _0xd75936] = await RPC.execute("vrp-gangs:addFlag", _0x568c59, _0x2e16d3, _0x25a745);
    emit("DoLongHudText", _0xd75936, _0xa50e8d ? 1 : 2);
    if (!_0xa50e8d) {
      globalThis.exports["vrp-objects"].DeleteObject(_0x568c59);
    }
    emit("inventory:removeItem", "gangflag", 1);
  };
  const _0x80637d = _0x46f1e4 => _0x14d3d3.some(_0x46cba2 => _0x46cba2.reduce((_0x3b8458, _0x351aeb, _0x145b10) => _0x3b8458 += (_0x351aeb - _0x46f1e4[_0x145b10]) ** 2, 0) <= 16);
  const _0x449ae0 = (_0x2bf09c, _0x47c598, _0x4ebf34, _0x8fb5d8) => {
    if (GetEntityType(_0x8fb5d8) !== 0) {
      return false;
    }
    if (_0x4b30f9.g.exports["vrp-doors"].GetCurrentDoor() !== undefined) {
      return false;
    }
    const _0x4ae007 = GetEntityModel(_0x4ebf34);
    const [[_0x490036,, _0x4ae540], [_0x5da76c, _0x434dc6, _0x2d4675]] = GetModelDimensions(_0x4ae007);
    const _0x36f82d = GetEntityForwardVector(_0x4ebf34).map(_0x4f65c1 => _0x4f65c1 * 0.2);
    return [GetOffsetFromEntityInWorldCoords(_0x4ebf34, _0x490036 * 0.8, _0x434dc6, _0x4ae540 * 0.8), GetOffsetFromEntityInWorldCoords(_0x4ebf34, _0x5da76c * 0.8, _0x434dc6, _0x4ae540 * 0.8), GetOffsetFromEntityInWorldCoords(_0x4ebf34, _0x490036 * 0.8, _0x434dc6, _0x2d4675 * 0.8), GetOffsetFromEntityInWorldCoords(_0x4ebf34, _0x5da76c * 0.8, _0x434dc6, _0x2d4675 * 0.8)].every(_0x5c59f3 => {
      const _0x4d2686 = StartShapeTestCapsule(..._0x5c59f3, _0x5c59f3[0] + _0x36f82d[0], _0x5c59f3[1] + _0x36f82d[1], _0x5c59f3[2] + _0x36f82d[2], 0.02, -1, _0x4ebf34, 7);
      const [, _0x160e57,,, _0x599edf] = GetShapeTestResult(_0x4d2686);
      const _0x49863c = GetEntityType(_0x599edf);
      return _0x160e57 && _0x49863c === 0;
    }) && !_0x80637d([_0x2bf09c.x, _0x2bf09c.y, _0x2bf09c.z]);
  };
  const _0x296ad5 = async (_0x767b4b, _0x49c34e) => {
    const _0x4426df = _0x49c34e.meta?.data?.metadata?.gangId;
    if (!_0x4426df) {
      return false;
    }
    const _0xd6cbdb = _0x49c34e.meta?.id;
    if (!_0xd6cbdb) {
      return false;
    }
    TaskTurnPedToFaceEntity(PlayerPedId(), _0x767b4b, -1);
    emit("animation:PlayAnimation", "hammering");
    const _0x5d4407 = await _0x1b5273(5000, "Destroying gang flag", true);
    ClearPedTasks(PlayerPedId());
    if (_0x5d4407 !== 100) {
      return false;
    }
    const _0x37563d = await _0x4b30f9.g.exports["vrp-objects"].DeleteObject(_0xd6cbdb);
    if (_0x37563d) {
      _0x2605ef.emitNet("vrp-gangsystem:flagDestroyed", _0x4426df);
    }
  };
  ;
  _0x2605ef.onNet("vrp-gangsystem:doPedHandOff", async _0x441a53 => {
    const _0x254339 = GetGamePool("CPed").filter(_0x436bcf => !IsPedAPlayer(_0x436bcf));
    const _0x378fc3 = _0x254339.filter(_0x3c15dd => GetEntityModel(_0x3c15dd) === GetHashKey(_0x441a53) && !IsPedInAnyVehicle(_0x3c15dd, false) && !IsEntityDead(_0x3c15dd));
    if (_0x378fc3.length <= 0) {
      return;
    }
    await _0x3351b8.loadAnim("mp_safehouselost@");
    const _0x1aca49 = _0x378fc3[Math.floor(Math.random() * _0x378fc3.length)];
    const _0x4670a7 = GetEntityCoords(_0x1aca49, true);
    const _0x5869f5 = {
      x: _0x4670a7[0],
      y: _0x4670a7[1],
      z: _0x4670a7[2]
    };
    const _0x3b055c = _0x5869f5;
    const _0x50c0a6 = _0x254339.filter(_0x59284a => {
      const _0x23731d = GetEntityCoords(_0x59284a, true);
      const _0x34436d = {
        x: _0x23731d[0],
        y: _0x23731d[1],
        z: _0x23731d[2]
      };
      const _0x3dab6b = _0x34436d;
      return GetEntityModel(_0x59284a) !== GetHashKey(_0x441a53) && _0x27fe51(_0x3dab6b, _0x3b055c) < 50 && !IsPedInAnyVehicle(_0x59284a, false);
    });
    const _0x33c915 = _0x50c0a6[Math.floor(Math.random() * _0x50c0a6.length)];
    if (!_0x33c915) {
      return;
    }
    NetworkRequestControlOfEntity(_0x33c915);
    NetworkRequestControlOfEntity(_0x1aca49);
    SetNetworkIdCanMigrate(NetworkGetNetworkIdFromEntity(_0x33c915), false);
    SetNetworkIdCanMigrate(NetworkGetNetworkIdFromEntity(_0x1aca49), false);
    TaskStartScenarioInPlace(_0x1aca49, "WORLD_HUMAN_DRUG_DEALER_HARD", 0, true);
    let _0x5ad1ce = false;
    const _0x291738 = Date.now() + 120000;
    while (!_0x5ad1ce) {
      if (Date.now() > _0x291738 || IsEntityDead(_0x1aca49) || IsEntityDead(_0x33c915)) {
        _0x5ad1ce = true;
        return;
      }
      const _0x59eee8 = GetEntityCoords(_0x33c915, true);
      const _0x53bf2e = {
        x: _0x59eee8[0],
        y: _0x59eee8[1],
        z: _0x59eee8[2]
      };
      const _0x10a2b7 = _0x53bf2e;
      const _0x2744f8 = _0x27fe51(_0x3b055c, _0x10a2b7);
      if (_0x2744f8 <= 2) {
        ClearPedTasksImmediately(_0x1aca49);
        await _0x20afe0(500);
        TaskTurnPedToFaceEntity(_0x33c915, _0x1aca49, -1);
        TaskTurnPedToFaceEntity(_0x1aca49, _0x33c915, -1);
        await _0x20afe0(1000);
        TaskPlayAnim(_0x33c915, "mp_safehouselost@", "package_dropoff", 8, -8, -1, 0, 0, false, false, false);
        TaskPlayAnim(_0x1aca49, "mp_safehouselost@", "package_dropoff", 8, -8, -1, 0, 0, false, false, false);
        _0x5ad1ce = true;
        return;
      }
      if (GetScriptTaskStatus(_0x33c915, 1227113341) === 7 && !_0x5ad1ce) {
        TaskGoToEntity(_0x33c915, _0x1aca49, -1, 2, 1, 0, 0);
      }
      await _0x20afe0(500);
    }
  });
  ;
  const _0x587d3e = new Set();
  function _0x17b23c(_0x421edc) {
    return _0x587d3e.has(_0x421edc);
  }
  on("vrp-polyzone:enter", _0x1bc26f => {
    _0x587d3e.add(_0x1bc26f);
  });
  on("vrp-polyzone:exit", _0x33c73d => {
    _0x587d3e.delete(_0x33c73d);
  });
  ;
  let _0x7fbe28 = null;
  let _0x1f3e12 = [];
  let _0x155cc0 = [];
  const _0x198e4f = async (_0x582344, _0x1a38a9) => {
    if (!_0x582344 || !_0x1a38a9) {
      return [false, "Where did I find this spray can..."];
    }
    if (_0x5144c6()) {
      return [false, "You cannot place graffiti here"];
    }
    const _0x7f5678 = await _0x5f2ae8();
    if (!_0x7f5678) {
      return [false, "You are not in a gang!"];
    }
    if (_0x7f5678 !== _0x582344) {
      return [false, "You are not in this gang!"];
    }
    const _0x31ad04 = GetEntityCoords(PlayerPedId(), false);
    const _0x19c448 = {
      x: _0x31ad04[0],
      y: _0x31ad04[1],
      z: _0x31ad04[2]
    };
    const _0x15800d = _0x19c448;
    const _0x2353ac = exports["vrp-objects"].GetObjectsByNamespace("graffiti");
    const _0x4da4cb = exports["vrp-objects"].GetObjectsByNamespace("gang-flags").sort((_0x27f007, _0x3ba14f) => _0x27fe51(_0x15800d, {
      x: _0x27f007.x,
      y: _0x27f007.y,
      z: _0x27f007.z
    }) - _0x27fe51(_0x15800d, {
      x: _0x3ba14f.x,
      y: _0x3ba14f.y,
      z: _0x3ba14f.z
    })).filter(_0x17fa9c => _0x27fe51(_0x15800d, {
      x: _0x17fa9c.x,
      y: _0x17fa9c.y,
      z: _0x17fa9c.z
    }) < _0x3e7c52.minDistanceFromFlag);
    const _0x6505a7 = _0x2353ac.filter(_0x200bbf => _0x200bbf.data.metadata.gangId && _0x200bbf.data.metadata.gangId === _0x582344);
    const _0x7b6ed4 = _0x2353ac.filter(_0x5de6a4 => _0x5de6a4.data.metadata.gangId && _0x5de6a4.data.metadata.gangId !== _0x582344);
    const _0x171432 = _0x4da4cb.find(_0x3d1f46 => _0x3d1f46.data.metadata.gangId !== _0x7f5678);
    const _0x48bbb7 = _0x26f8ac(_0x7b6ed4, _0x15800d).filter(_0x47c2be => _0x47c2be < _0x3e7c52.minDistanceFromEnemy).length > 0;
    if (_0x48bbb7 || _0x171432) {
      return [false, "You are too close to an enemy territory!"];
    }
    const _0x2ca83e = _0x26f8ac(_0x6505a7, _0x15800d).filter(_0x519389 => _0x519389 < _0x3e7c52.minDistanceFromFriendly).length > 0;
    if (_0x2ca83e) {
      return [false, "Need to spread out more!"];
    }
    const _0x365e09 = _0x26f8ac(_0x6505a7, _0x15800d).filter(_0x35e92b => _0x35e92b < _0x3e7c52.maxDistanceFromFriendly).length === 0;
    const _0x387c23 = _0x4da4cb.find(_0x495b91 => _0x495b91.data.metadata.gangId === _0x7f5678);
    if (_0x365e09 && !_0x387c23) {
      return [false, "You are too far from a friendly territory!"];
    }
    if (_0x387c23 || !_0x365e09) {
      return [true, ""];
    }
    return [true, ""];
  };
  const _0x10fe22 = _0x42e751 => {
    const _0x4d85ba = _0x4b30f9.g.exports["vrp-objects"].GetObjectsByNamespace("graffiti").filter(_0x1e8784 => _0x1e8784.data.metadata.gangId && _0x27fe51(_0x42e751, {
      x: _0x1e8784.x,
      y: _0x1e8784.y,
      z: _0x1e8784.z
    }) < 100).sort((_0x2b2531, _0x476efd) => _0x27fe51(_0x42e751, {
      x: _0x2b2531.x,
      y: _0x2b2531.y,
      z: _0x2b2531.z
    }) - _0x27fe51(_0x42e751, {
      x: _0x476efd.x,
      y: _0x476efd.y,
      z: _0x476efd.z
    }));
    if (_0x4d85ba.length > 0) {
      return _0x4d85ba[0].data.metadata.gangId;
    } else {
      return null;
    }
  };
  const _0x57b9b8 = async _0x5bae5e => {
    const _0x567a1b = await _0x5f2ae8();
    if (_0x567a1b === _0x5bae5e) {
      return;
    }
    const _0x9f8a30 = GetEntityCoords(PlayerPedId(), true);
    const _0xe5ea32 = {
      x: _0x9f8a30[0],
      y: _0x9f8a30[1],
      z: _0x9f8a30[2]
    };
    const _0xaeb4c9 = _0xe5ea32;
    const _0x5296aa = GetLabelText(GetNameOfZone(_0xaeb4c9.x, _0xaeb4c9.y, _0xaeb4c9.z));
    const [_0x225dbf, _0x3bbcfa] = GetStreetNameAtCoord(_0xaeb4c9.x, _0xaeb4c9.y, _0xaeb4c9.z);
    const _0x29142a = GetStreetNameFromHashKey(_0x225dbf) + ", " + _0x5296aa;
    _0x2605ef.emitNet("vrp-gangsystem:graffitiBeingRemoved", _0x5bae5e, _0x29142a);
  };
  const _0x303d28 = async _0x31d4c7 => {
    const _0x28e6df = await _0x5f2ae8();
    if (!_0x28e6df) {
      return;
    }
    const _0x40b7d9 = PlayerPedId();
    const _0x13172d = await RPC.execute("vrp-gangsystem:openTrapInventory", _0x28e6df);
    if (!_0x13172d) {
      return;
    }
    _0x7fbe28 = _0x31d4c7;
    SetEntityAsMissionEntity(_0x31d4c7, true, true);
    SetNetworkIdCanMigrate(_0x31d4c7, false);
    ClearPedTasks(_0x31d4c7);
    TaskLookAtEntity(_0x31d4c7, _0x40b7d9, -1, 2048, 3);
    TaskTurnPedToFaceEntity(_0x31d4c7, _0x40b7d9, 10000);
  };
  const _0x11ac6c = async () => {
    await _0x3351b8.loadAnim("mp_safehouselost@");
    TaskTurnPedToFaceEntity(_0x7fbe28, PlayerPedId(), 0);
    TaskTurnPedToFaceEntity(PlayerPedId(), _0x7fbe28, 0);
    TaskPlayAnim(_0x7fbe28, "mp_safehouselost@", "package_dropoff", 8, -8, -1, 0, 0, false, false, false);
    TaskPlayAnim(PlayerPedId(), "mp_safehouselost@", "package_dropoff", 8, -8, -1, 0, 0, false, false, false);
    await _0x20afe0(2000);
    SetEntityAsNoLongerNeeded(_0x7fbe28);
    _0x7fbe28 = null;
  };
  const _0x43c3bc = async () => {
    const _0x4d1673 = await _0x5f2ae8();
    if (!_0x4d1673) {
      return emit("DoLongHudText", "Looks at you confused...");
    }
    const _0x4f4cc8 = await RPC.execute("vrp-gangsystem:getCostOfSpray", _0x4d1673);
    const _0x2557b2 = {
      icon: "money-bill",
      title: "Purchase Spray ($" + _0x4f4cc8 + ")",
      description: "",
      action: "vrp-gangsystem:confirmPurchaseSpray",
      key: {}
    };
    _0x2557b2.key.gangId = _0x4d1673;
    _0x2557b2.key.cost = _0x4f4cc8;
    const _0x27a10b = [_0x2557b2];
    _0x4b30f9.g.exports["vrp-ui"].showContextMenu(_0x27a10b);
  };
  const _0x5bba5d = async () => {
    const _0x2c7204 = await _0x5f2ae8();
    if (!_0x2c7204) {
      return emit("DoLongHudText", "Looks at you confused...");
    }
    const _0x12f989 = await RPC.execute("vrp-gangsystem:getCostOfSpray", _0x2c7204);
    const _0x3ee3d1 = _0x12f989 + 100000;
    const _0x20320e = {
      icon: "money-bill",
      title: "Purchase Cloth ($" + _0x3ee3d1 + ")",
      description: "",
      action: "vrp-gangsystem:confirmPurchaseCloth",
      key: {}
    };
    _0x20320e.key.gangId = _0x2c7204;
    _0x20320e.key.cost = _0x3ee3d1;
    const _0x3967c7 = [_0x20320e];
    _0x4b30f9.g.exports["vrp-ui"].showContextMenu(_0x3967c7);
  };
  const _0x5144c6 = () => {
    const _0x4970a0 = _0x17b23c("vrp-gangsystem:blockedZone");
    return _0x4970a0;
  };
  const _0x395864 = async _0x2486d6 => {
    const _0x5bb0d6 = _0x2486d6.meta.id;
    const _0x38141d = _0x2486d6.meta.data?.metadata?.gangId;
    if (!_0x5bb0d6) {
      return;
    }
    const _0x2ed3e4 = await _0x5f2ae8();
    if (_0x2ed3e4 !== _0x38141d) {
      return;
    }
    exports["vrp-objects"].UpdateObject(_0x5bb0d6, {
      upForGrabs: true
    });
  };
  const _0x4f5bce = async _0x5d288d => {
    var _0x26f541;
    var _0x430a6b;
    const _0x4de47a = _0x5d288d.meta.id;
    const _0x507063 = (_0x26f541 = _0x5d288d?.meta?.data) === null || _0x26f541 === undefined ? undefined : _0x26f541.metadata.gangId;
    const _0x1a41d7 = ((_0x430a6b = _0x5d288d?.meta?.data) === null || _0x430a6b === undefined ? undefined : _0x430a6b.metadata.gangsDiscovered) ?? [];
    const _0x1b1e1e = await _0x5f2ae8();
    if (_0x507063 === _0x1b1e1e || _0x1a41d7 && _0x1a41d7.includes(_0x1b1e1e)) {
      return emit("DoLongHudText", "You already know of this graffiti!", 1, 12000, {
        i18n: ["You already know of this graffiti!"]
      });
    }
    emit("animation:PlayAnimation", "search");
    const _0x99ba9a = await _0x55f7f6.taskBar(30000, "Discovering Graffiti", true, {
      distance: 2,
      entity: PlayerPedId()
    });
    ClearPedTasks(PlayerPedId());
    if (_0x99ba9a !== 100) {
      return;
    }
    const _0x3c7cd7 = {
      gangsDiscovered: [..._0x1a41d7, _0x1b1e1e]
    };
    exports["vrp-objects"].UpdateObject(_0x4de47a, _0x3c7cd7);
    return emit("DoLongHudText", "Discovered graffiti!", 1, 12000, {
      i18n: ["Discovered graffiti!"]
    });
  };
  const _0x2a7071 = async (_0x96dc32 = false) => {
    if (_0x1f3e12.length > 0) {
      for (const _0x10063e of _0x1f3e12) {
        RemoveBlip(_0x10063e);
      }
      _0x1f3e12 = [];
      return emit("DoLongHudText", "Removed all blips", 1, 12000, {
        i18n: ["Removed all blips"]
      });
    }
    const _0x5e066f = await RPC.execute("vrp-gangsystem:getFoundGraffiti", _0x96dc32);
    for (const _0x342e0e of _0x5e066f) {
      const _0x3b57f7 = AddBlipForRadius(_0x342e0e.coords.x, _0x342e0e.coords.y, _0x342e0e.coords.z, 100);
      SetBlipAlpha(_0x3b57f7, 100);
      SetBlipSprite(_0x3b57f7, 9);
      SetBlipColour(_0x3b57f7, _0x342e0e.color);
      _0x1f3e12.push(_0x3b57f7);
    }
    if (_0x5e066f.length > 0) {
      return emit("DoLongHudText", "Discovered graffitis marked", 1, 12000, {
        i18n: ["Discovered graffitis marked"]
      });
    }
  };
  const _0x5d6faa = async () => {
    const _0x1ad6d4 = await _0x5f2ae8();
    if (!_0x1ad6d4) {
      return;
    }
    const _0x58f447 = await RPC.execute("vrp-gangsystem:getCollectHistory", _0x1ad6d4);
    const _0x1a9c53 = _0x58f447.map(_0x3eabe3 => {
      const _0x4c0fd4 = {
        icon: "info-circle",
        title: "" + _0x3eabe3.log,
        description: "" + _0x3eabe3.date,
        action: "",
        key: {}
      };
      return _0x4c0fd4;
    });
    if (_0x1a9c53.length === 0) {
      _0x1a9c53.push({
        icon: "info-circle",
        title: "No profit has been collected yet",
        description: "",
        action: "",
        key: {}
      });
    }
    _0x4b30f9.g.exports["vrp-ui"].showContextMenu(_0x1a9c53);
    return;
  };
  const _0x5812ad = async () => {
    if (_0x155cc0.length > 0) {
      for (const _0x1f6f60 of _0x155cc0) {
        RemoveBlip(_0x1f6f60);
      }
      _0x155cc0 = [];
      return emit("DoLongHudText", "Removed all blips", 1, 12000, {
        i18n: ["Removed all blips"]
      });
    }
    const _0x428fc0 = await _0x5f2ae8();
    if (!_0x428fc0) {
      return;
    }
    const _0x4ac256 = await RPC.execute("vrp-gangsystem:getContestedGraffiti", _0x428fc0);
    for (const _0x35113e of _0x4ac256) {
      const _0x83b9b7 = AddBlipForRadius(_0x35113e.coords.x, _0x35113e.coords.y, _0x35113e.coords.z, 100);
      SetBlipAlpha(_0x83b9b7, 100);
      SetBlipSprite(_0x83b9b7, 9);
      SetBlipColour(_0x83b9b7, _0x35113e.color);
      _0x155cc0.push(_0x83b9b7);
    }
    if (_0x4ac256.length > 0) {
      return emit("DoLongHudText", "Contested graffitis marked", 1, 12000, {
        i18n: ["Contested graffitis marked"]
      });
    } else {
      return emit("DoLongHudText", "No contested graffitis found", 1, 12000, {
        i18n: ["No contested graffitis found"]
      });
    }
  };
  ;
  const _0x1d2cb7 = [];
  const _0x4b6efe = _0xffe918.cache(async (_0x2936b7, _0x2d3179) => {
    const _0x5b9459 = await RPC.execute("vrp-gangsystem:getGangNPCWeapon", _0x2d3179);
    return [true, _0x5b9459];
  }, {
    timeToLive: 600000
  });
  const _0x13968a = async () => {
    const _0x59c973 = await _0x2975b1();
    for (const _0x1ebd0e in _0x59c973) {
      _0x1d2cb7.push({
        gangId: _0x1ebd0e,
        model: GetHashKey(_0x59c973[_0x1ebd0e])
      });
    }
  };
  const _0x1da7e1 = async (_0x15f5b7, _0x1dda5e) => {
    SetCanAttackFriendly(_0x15f5b7, true, false);
    SetPedAlertness(_0x15f5b7, 3);
    SetPedConfigFlag(_0x15f5b7, 100, true);
    SetPedCombatRange(_0x15f5b7, 1);
    SetPedSeeingRange(_0x15f5b7, 100);
    SetPedHearingRange(_0x15f5b7, 1000);
    SetPedDiesWhenInjured(_0x15f5b7, false);
    SetPedEnableWeaponBlocking(_0x15f5b7, true);
    SetPedSuffersCriticalHits(_0x15f5b7, false);
    SetPedAccuracy(_0x15f5b7, 90);
    SetPedCombatAbility(_0x15f5b7, 2);
    SetPedCombatMovement(_0x15f5b7, 3);
    SetPedCombatAttributes(_0x15f5b7, 5, true);
    SetPedCombatAttributes(_0x15f5b7, 16, true);
    SetPedCombatAttributes(_0x15f5b7, 17, false);
    SetPedCombatAttributes(_0x15f5b7, 46, true);
    SetPedCombatAttributes(_0x15f5b7, 1424, false);
    SetPedFleeAttributes(_0x15f5b7, 0, false);
    TaskWanderStandard(_0x15f5b7, 1, 10);
    RegisterHatedTargetsAroundPed(_0x15f5b7, 500);
    TaskCombatHatedTargetsAroundPed(_0x15f5b7, 500, 0);
    SetPedKeepTask(_0x15f5b7, true);
    SetBlockingOfNonTemporaryEvents(_0x15f5b7, true);
    const _0x2992f8 = await _0x4b6efe.get(_0x1dda5e);
    GiveWeaponToPed(_0x15f5b7, _0x2992f8 ?? -1024456158, 1000, false, true);
    SetPedDropsWeaponsWhenDead(_0x15f5b7, false);
  };
  const _0x188d77 = _0x3e29d4 => {
    const _0x3beba9 = GetEntityModel(_0x3e29d4);
    const _0x4c1b7a = _0x1d2cb7.find(_0x1022bd => _0x1022bd.model === _0x3beba9);
    return _0x4c1b7a;
  };
  const _0x556232 = (_0x336de3, _0x198bb5) => {
    const _0x5a63e3 = GetHashKey("PLAYER");
    const _0x346139 = GetHashKey("GANG_" + _0x198bb5);
    if (!DoesRelationshipGroupExist(_0x346139)) {
      AddRelationshipGroup("GANG_" + _0x198bb5);
    }
    SetRelationshipBetweenGroups(_0x336de3, _0x5a63e3, _0x346139);
    SetRelationshipBetweenGroups(_0x336de3, _0x346139, _0x5a63e3);
  };
  ;
  class _0x2b451d {
    constructor(_0x459f2c, _0x431787, _0x28bb89 = "interval") {
      this.callback = _0x459f2c;
      this.delay = _0x431787;
      this.mode = _0x28bb89;
      this.scheduled = {};
      this.tick = 0;
      this.data = {};
      this.hooks = new Map([["active", []], ["preStop", []], ["preStart", []], ["afterStop", []], ["afterStart", []], ["stopAborted", []], ["startAborted", []]]);
    }
    get isActive() {
      return this.active;
    }
    async start() {
      if (this.active) {
        return;
      }
      this.aborted = false;
      this.scheduled = {};
      const _0x3624e4 = this.hooks.get("preStart");
      try {
        for (const _0x52769f of _0x3624e4) {
          if (!this.aborted) {
            await _0x52769f.call(this);
          }
        }
      } catch (_0x4a3b9d) {
        this.aborted = true;
        console.log("Error while calling pre-start hook", _0x4a3b9d.message);
      }
      if (this.aborted) {
        try {
          const _0x5addc4 = this.hooks.get("startAborted");
          for (const _0x2e73c0 of _0x5addc4) {
            await _0x2e73c0.call(this);
          }
        } catch (_0x59a26b) {
          console.log("Error while calling start-aborted hook", _0x59a26b.message);
        }
        return;
      }
      this.active = true;
      const _0x203c7b = this.hooks.get("active");
      switch (this.mode) {
        case "tick":
          {
            this.threadId = _0x199de7.setTick(async () => {
              this.tick += 1;
              try {
                await this.callback.call(this);
                for (const _0x34284e of _0x203c7b) {
                  await _0x34284e.call(this);
                }
              } catch (_0xb521a6) {
                console.log("Error while calling active hook", _0xb521a6.message);
              }
              if (this.delay > 0) {
                await new Promise(_0x543381 => _0x199de7.setTimeout(_0x543381, this.delay));
              }
            });
            break;
          }
        case "interval":
          {
            this.threadId = _0x199de7.setInterval(async () => {
              this.tick += 1;
              try {
                await this.callback.call(this);
                for (const _0x1662e3 of _0x203c7b) {
                  await _0x1662e3.call(this);
                }
              } catch (_0x23789d) {
                console.log("Error while calling active hook", _0x23789d.message);
              }
            }, this.delay);
            break;
          }
        case "timeout":
          {
            const _0x4a9365 = () => {
              if (this.active) {
                this.threadId = _0x199de7.setTimeout(async () => {
                  this.tick += 1;
                  try {
                    await this.callback.call(this);
                    for (const _0x4c339a of _0x203c7b) {
                      await _0x4c339a.call(this);
                    }
                  } catch (_0x211d1f) {
                    console.log("Error while calling active hook", _0x211d1f.message);
                  }
                  return _0x4a9365();
                }, this.delay);
              }
            };
            _0x4a9365();
            break;
          }
      }
      const _0x3d1114 = this.hooks.get("afterStart");
      try {
        for (const _0x357097 of _0x3d1114) {
          await _0x357097.call(this);
        }
      } catch (_0x10d5ba) {
        console.log("Error while calling after-start hook", _0x10d5ba.message);
      }
    }
    async stop() {
      if (!this.active) {
        return;
      }
      const _0x24d110 = this.hooks.get("preStop");
      try {
        for (const _0x673e9f of _0x24d110) {
          if (!this.aborted) {
            await _0x673e9f.call(this);
          }
        }
      } catch (_0x41220b) {
        this.aborted = true;
        console.log("Error while calling pre-stop hook", _0x41220b.message);
      }
      this.active = false;
      switch (this.mode) {
        case "tick":
          {
            _0x199de7.clearTick(this.threadId);
            break;
          }
        case "interval":
          {
            _0x199de7.clearInterval(this.threadId);
            break;
          }
        case "timeout":
          {
            _0x199de7.clearTimeout(this.threadId);
            break;
          }
      }
      if (this.aborted) {
        try {
          const _0x1626a4 = this.hooks.get("stopAborted");
          for (const _0x13377c of _0x1626a4) {
            await _0x13377c.call(this);
          }
        } catch (_0x31bd5e) {
          console.log("Error while calling stop-aborted hook", _0x31bd5e.message);
        }
        return;
      }
      const _0x5d1a1d = this.hooks.get("afterStop");
      try {
        for (const _0x47dac8 of _0x5d1a1d) {
          await _0x47dac8.call(this);
        }
      } catch (_0x281256) {
        console.log("Error while calling after-stop hook", _0x281256.message);
      }
    }
    abort() {
      this.aborted = true;
    }
    addHook(_0x41a5a2, _0x95b2f9) {
      var _0x855895;
      if ((_0x855895 = this.hooks.get(_0x41a5a2)) === null || _0x855895 === undefined) {
        undefined;
      } else {
        _0x855895.push(_0x95b2f9);
      }
    }
    setNextTick(_0xfd5555, _0x5d35bd) {
      this.scheduled[_0xfd5555] = this.tick + _0x5d35bd;
    }
    canTick(_0x4e2202) {
      return this.scheduled[_0x4e2202] === undefined || this.tick >= this.scheduled[_0x4e2202];
    }
  }
  ;
  const _0x3f0f17 = new _0x2b451d(function () {}, 1000);
  _0x3f0f17.addHook("preStart", function () {});
  _0x3f0f17.addHook("active", function () {
    if (!this.canTick("ped")) {
      return;
    }
    this.setNextTick("ped", 5);
    this.data.playerId = PlayerId();
    this.data.playerPed = PlayerPedId();
  });
  ;
  const _0x5a5b32 = new Set();
  const _0x3b0233 = {};
  const _0x30fea3 = [-820634585, 2343591895, 1945849481, -2009644972, 727643628, 1834241177, 1064738331, -691061592, 571920712, 181559993];
  let _0x9566d0 = [];
  let _0x1020f2 = false;
  const _0x2209d7 = async () => {
    await _0x20afe0(10000);
    await _0x1ff5a2();
    await _0x2c4208();
    await _0x3c1ba5();
    if (_0x3f0f17.isActive) {
      await _0x3f0f17.stop();
    } else {
      await _0x3f0f17.start();
    }
  };
  const _0x1ff5a2 = async () => {
    const _0x1476dc = await _0x2975b1();
    for (const _0x277aa3 in _0x1476dc) {
      if (!IsModelValid(_0x1476dc[_0x277aa3])) {
        continue;
      }
      try {
        await _0x3351b8.loadModel(_0x1476dc[_0x277aa3]);
        _0x3b0233[_0x277aa3] = _0x1476dc[_0x277aa3];
        AddRelationshipGroup("GANG_" + _0x277aa3);
      } catch (_0x3ca63d) {
        console.log("Failed to load model", _0x277aa3);
      }
    }
  };
  const _0x2c4208 = () => {
    console.log("[GangSystem] Initializing ped creation event");
    if (_0x9566d0.length === 0) {
      console.log("[GangSystem] Loading blocked models");
      _0x9566d0 = [..._0x3e7c52.blockedModels.map(_0x3cd424 => GetHashKey(_0x3cd424))];
    }
    on("populationPedCreating", (_0x6a68ce, _0x8ce91e, _0x5714f9, _0x55ec0a, _0x5cfb1e) => {
      if (!_0x3b0233 || Math.random() <= 0.5 || _0x9566d0.includes(_0x55ec0a & 4294967295)) {
        return;
      }
      const _0x35ee11 = {
        x: _0x6a68ce,
        y: _0x8ce91e,
        z: _0x5714f9
      };
      const _0x156f3d = _0x10fe22(_0x35ee11);
      if (!_0x156f3d || !_0x3b0233[_0x156f3d]) {
        return;
      }
      const _0x316346 = GetGamePool("CPed").map(_0x217990 => GetEntityModel(_0x217990)).filter(_0x454f9e => GetHashKey(_0x3b0233[_0x156f3d]) === _0x454f9e);
      if (_0x316346.length >= 4) {
        return;
      }
      _0x5cfb1e.setModel(_0x3b0233[_0x156f3d]);
    });
  };
  let _0x3fbb66 = 0;
  const _0x3c1ba5 = () => {
    setInterval(async () => {
      const _0xcc685c = GetSelectedPedWeapon(PlayerPedId());
      const _0x1b85cf = _0x30fea3.includes(_0xcc685c);
      if (IsPedShooting(PlayerPedId()) && GetGameTimer() > _0x3fbb66 + 60000 && !_0x1b85cf) {
        const [_0x20e81e, _0x23d0c5] = GetEntityPlayerIsFreeAimingAt(PlayerId());
        if (_0x23d0c5 === 0) {
          return;
        }
        const _0x221c87 = Entity(_0x23d0c5).state;
        if (!_0x221c87.gangId) {
          return;
        }
        _0x3fbb66 = GetGameTimer();
        const _0x5d69a5 = GetEntityCoords(PlayerPedId(), false);
        const _0x182503 = {
          x: _0x5d69a5[0],
          y: _0x5d69a5[1],
          z: _0x5d69a5[2]
        };
        const _0x5e7a51 = _0x182503;
        const _0x20a3dc = _0x10fe22(_0x5e7a51);
        const _0x1914e1 = await _0x5f2ae8();
        if (!_0x20a3dc || _0x20a3dc === _0x1914e1 || _0x20a3dc !== _0x221c87.gangId) {
          return;
        }
        const _0x291acf = GetGamePool("CPed").filter(_0x11c418 => GetHashKey(_0x3b0233[_0x20a3dc]) === GetEntityModel(_0x11c418) && !IsPedAPlayer(_0x11c418)).filter((_0x28c2b1, _0x276087) => _0x276087 < 8);
        for (const _0x5465a1 of _0x291acf) {
          ClearPedTasks(_0x5465a1);
          NetworkRequestControlOfEntity(_0x5465a1);
          await _0x1da7e1(_0x5465a1, _0x20a3dc);
          SetPedKeepTask(_0x5465a1, true);
          TaskCombatPed(_0x5465a1, PlayerPedId(), 0, 16);
        }
      }
    }, 3);
  };
  const _0x1a0697 = async _0x200fa7 => {
    const _0x5c875f = await _0x5f2ae8();
    if (!_0x5c875f) {
      return;
    }
    const _0x50c35e = GetEntityCoords(_0x200fa7, false);
    const _0x213999 = {
      x: _0x50c35e[0],
      y: _0x50c35e[1],
      z: _0x50c35e[2]
    };
    const _0x3eb213 = _0x213999;
    const _0x3dccf1 = _0x10fe22(_0x3eb213);
    if (!_0x3dccf1) {
      return;
    }
    const _0x389415 = _0x188d77(_0x200fa7);
    if (_0x389415.gangId !== _0x3dccf1) {
      return;
    }
    const [_0x323c23, _0x42f2c1] = await RPC.execute("vrp-gangsystem:canRobGang", _0x3dccf1);
    if (!_0x323c23) {
      return emit("DoLongHudText", _0x42f2c1, 2);
    }
    ClearPedTasks(_0x200fa7);
    await _0x3351b8.loadAnim("missfbi5ig_22");
    await _0x3351b8.loadAnim("random@shop_robbery");
    NetworkRequestControlOfEntity(_0x200fa7);
    TaskSetBlockingOfNonTemporaryEvents(0, true);
    SetEntityAsMissionEntity(_0x200fa7, true, true);
    SetNetworkIdCanMigrate(NetworkGetNetworkIdFromEntity(_0x200fa7), false);
    TaskGoToEntity(_0x200fa7, PlayerPedId(), -1, 2, 4, 0, 0);
    TaskTurnPedToFaceEntity(_0x200fa7, PlayerPedId(), -1);
    TaskTurnPedToFaceEntity(PlayerPedId(), _0x200fa7, -1);
    TaskPlayAnim(_0x200fa7, "missfbi5ig_22", "hands_up_anxious_scientist", 8, 1, -1, 1, -1, false, false, false);
    TaskPlayAnim(PlayerPedId(), "random@shop_robbery", "robbery_action_b", 20, -8, -1, 49, 0, false, false, false);
    const _0x3c87fe = GetLabelText(GetNameOfZone(_0x3eb213.x, _0x3eb213.y, _0x3eb213.z));
    const [_0x30125e, _0x4cd49e] = GetStreetNameAtCoord(_0x3eb213.x, _0x3eb213.y, _0x3eb213.z);
    const _0x2441b7 = GetStreetNameFromHashKey(_0x30125e) + ", " + _0x3c87fe;
    _0x2605ef.emitNet("vrp-gangsystem:notifyGang", "Someone is robbing one of our members! " + _0x2441b7, _0x3dccf1, {
      i18n: ["Someone is robbing one of our members"]
    });
    _0x2605ef.emitNet("vrp-gangsystem:gangMemberBeingRobbed", _0x3dccf1);
    _0x1020f2 = true;
    const _0x343cf3 = GetGamePool("CPed").filter(_0x4ae3df => GetHashKey(_0x3b0233[_0x3dccf1]) === GetEntityModel(_0x4ae3df) && !IsPedAPlayer(_0x4ae3df));
    for (const _0x139056 of _0x343cf3) {
      if (_0x139056 === _0x200fa7) {
        continue;
      }
      ClearPedTasks(_0x139056);
      NetworkRequestControlOfEntity(_0x139056);
      SetNetworkIdCanMigrate(NetworkGetNetworkIdFromEntity(_0x139056), false);
      await _0x1da7e1(_0x139056, _0x3dccf1);
      TaskCombatPed(_0x139056, PlayerPedId(), 0, 16);
    }
    const _0x1ad60e = GetGameTimer();
    const _0xa59af6 = setInterval(async () => {
      const _0x5607a6 = exports["vrp-flags"].GetPedFlags(PlayerPedId());
      if (_0x1ad60e + 120000 < GetGameTimer() || !_0x1020f2 || _0x5607a6.isDead) {
        return clearInterval(_0xa59af6);
      }
      if (!IsEntityPlayingAnim(PlayerPedId(), "random@shop_robbery", "robbery_action_b", 3)) {
        TaskPlayAnim(PlayerPedId(), "random@shop_robbery", "robbery_action_b", 20, -8, -1, 49, 0, false, false, false);
      }
      if (!IsEntityPlayingAnim(_0x200fa7, "missfbi5ig_22", "hands_up_anxious_scientist", 3)) {
        TaskPlayAnim(_0x200fa7, "missfbi5ig_22", "hands_up_anxious_scientist", 8, 1, -1, 1, -1, false, false, false);
      }
    }, 1000);
    const _0x530852 = await _0x1b5273(240000, "Robbing gang member", true);
    _0x1020f2 = false;
    ClearPedTasks(PlayerPedId());
    ClearPedTasks(_0x200fa7);
    TaskWanderStandard(_0x200fa7, 1, 10);
    if (_0x530852 !== 100) {
      return;
    }
    const [_0x52e1c7, _0x5146f0] = await RPC.execute("vrp-gangsystem:robGangMember", _0x3dccf1);
    if (!_0x52e1c7) {
      emit("DoLongHudText", _0x5146f0, 2);
    }
  };
  _0x3f0f17.addHook("active", async function () {
    const _0x8c139b = GetGamePool("CPed");
    for (const _0x71b24f of _0x8c139b) {
      const _0x42691e = _0x188d77(_0x71b24f);
      if (_0x5a5b32.has(_0x71b24f) || !_0x42691e) {
        continue;
      }
      const _0x270704 = IsPedAPlayer(_0x71b24f);
      const _0x8f3066 = GetPedType(_0x71b24f) === 28;
      if (_0x270704 || _0x8f3066) {
        continue;
      }
      _0x5a5b32.add(_0x71b24f);
      TaskSetBlockingOfNonTemporaryEvents(_0x71b24f, true);
      SetPedFleeAttributes(_0x71b24f, 0, false);
      SetPedRelationshipGroupHash(_0x71b24f, GetHashKey("GANG_" + _0x42691e.gangId));
    }
  });
  ;
  let _0x444638 = false;
  on("vrp-admin:currentDevmode", _0x467b09 => {
    _0x444638 = _0x467b09;
  });
  _0x2605ef.onNet("vrp-gangsystem:refreshGangStatus", () => {
    return _0x42faff();
  });
  _0x2605ef.onNet("vrp-gangsystem:openGangStorage", (_0x218202, _0x2b8355) => {
    return _0x303d28(_0x2b8355);
  });
  _0x2605ef.on("vrp-gangsystem:collectTrapProfit", async () => {
    const _0x532f2b = await _0x5f2ae8();
    return _0x2605ef.emitNet("vrp-gangsystem:collectTrapProfit", _0x532f2b);
  });
  _0x2605ef.on("vrp-gangsystem:collectHistory", () => {
    return _0x5d6faa();
  });
  _0x2605ef.onNet("vrp-gangsystem:robGangMember", (_0x204f5f, _0x443c38) => {
    return _0x1a0697(_0x443c38);
  });
  _0x2605ef.on("vrp-gangsystem:destroyFlag", (_0x393517, _0x4e6ae7, _0x536c39) => {
    return _0x296ad5(_0x4e6ae7, _0x536c39);
  });
  _0x2605ef.on("vrp-gangsystem:purchaseGangSpray", () => {
    return _0x43c3bc();
  });
  _0x2605ef.on("vrp-gangsystem:purchaseScrubbingCloth", () => {
    return _0x5bba5d();
  });
  _0x2605ef.on("vrp-gangsystem:handOverSpray", (_0xbbeee8, _0x3d35dc, _0x52bede) => {
    return _0x395864(_0x52bede);
  });
  _0x2605ef.onNet("vrp-gangsystem:sendEmail", async (_0x4d7499, _0x9cd552) => {
    emit("phone:emailReceived", _0x9cd552 ?? "Unknown", "IMPORTANT!", _0x4d7499, {
      i18n: []
    });
    await _0x3167de("GANG", "READ EMAIL APP", "exclamation-triangle");
  });
  _0x2605ef.onNet("vrp-gangsystem:incomingInvite", async (pGang, pFrom, pName) => {
    const _0x52d653 = await _0x3167de("Gang invitation", pName + " is inviting you to join their group.", "user-ninja");
    if (!_0x52d653) {
      return;
    }
    const [_0x517e9c, _0x16ca33] = await RPC.execute("vrp-gangsystem:acceptGangInvite", pGang, pFrom);
    emit("DoLongHudText", _0x16ca33, _0x517e9c ? 1 : 2);
  });
  _0x2605ef.on("vrp-gangsystem:discoverGraffiti", (_0x3eac9a, _0x5d9db4, _0x445970) => {
    return _0x4f5bce(_0x445970);
  });
  on("vrp-inventory:closed", _0xd41713 => {
    if (!_0xd41713.endsWith("-Traphouse-Storage")) {
      return;
    }
    return _0x11ac6c();
  });
  RegisterUICallback("vrp-gangsystem:confirmPurchaseSpray", (_0x355b1c, _0xbc9c74) => {
    _0x2605ef.emitNet("vrp-gangsystem:purchaseGangSpray", _0x355b1c.key.gangId, _0x355b1c.key.cost);
    _0xbc9c74({
      data: null,
      meta: {
        ok: true,
        message: ""
      }
    });
  });
  RegisterUICallback("vrp-gangsystem:confirmPurchaseCloth", (_0x52975a, _0x1c6666) => {
    _0x2605ef.emitNet("vrp-gangsystem:purchaseScrubbingCloth", _0x52975a.key.cost);
    _0x1c6666({
      data: null,
      meta: {
        ok: true,
        message: ""
      }
    });
  });
  RegisterUICallback("vrp-gangsystem:ui:fetchGangInfo", async (_0x3d42fa, _0x1cf67a) => {
    const _0x2c06f8 = await RPC.execute("vrp-gangsystem:getGanginfo");
    const _0xd3a574 = {
      data: _0x2c06f8,
      meta: {
        ok: true,
        message: ""
      }
    };
    _0x1cf67a(_0xd3a574);
  });
  RegisterUICallback("vrp-gangsystem:ui:kickMember", async (_0x469b6b, _0x58ff8e) => {
    const _0x1a818b = await _0x5f2ae8();
    const [_0x3eed8e, _0x722102] = await RPC.execute("vrp-gangsystem:removeGangMember", _0x1a818b, Number(_0x469b6b.stateId));
    const _0x5d0519 = {
      ok: _0x3eed8e,
      message: _0x722102
    };
    const _0x16a93a = {
      data: {},
      meta: _0x5d0519
    };
    _0x58ff8e(_0x16a93a);
  });
  RegisterUICallback("vrp-gangsystem:ui:addMember", async (_0x357e72, _0x21a5b5) => {
    const pGang = await _0x5f2ae8();
    const [_0x2875ca, _0x5de93c] = await RPC.execute("vrp-gangsystem:addGangMember", pGang, Number(_0x357e72.stateId));
    const _0xde14ea = {
      ok: _0x2875ca,
      message: _0x5de93c
    };
    const _0x35b8e2 = {
      data: {},
      meta: _0xde14ea
    };
    _0x21a5b5(_0x35b8e2);
  });
  RegisterUICallback("vrp-gangsystem:ui:fetchGangProgression", async (_0x446ee6, _0x8fadfa) => {
    const _0x172a1e = await _0x5f2ae8();
    const _0x3fc98d = await RPC.execute("vrp-gangsystem:fetchGangProgression", _0x172a1e);
    const _0x13e7af = {
      data: _0x3fc98d,
      meta: {
        ok: true,
        message: "OK"
      }
    };
    _0x8fadfa(_0x13e7af);
  });
  RegisterUICallback("vrp-gangsystem:ui:fetchIsStaff", async (_0x2cb641, _0x242e00) => {
    const _0xd87562 = await RPC.execute("vrp-gangsystem:fetchIsStaff");
    const _0x4d1008 = {
      isStaff: _0xd87562 && _0x444638
    };
    const _0x2bd552 = {
      data: _0x4d1008,
      meta: {
        ok: true,
        message: "OK"
      }
    };
    _0x242e00(_0x2bd552);
  });
  RegisterUICallback("vrp-gangsystem:ui:fetchStaffInformation", async (_0x595d19, _0x3f3e43) => {
    const _0x303572 = await RPC.execute("vrp-gangsystem:fetchStaffInformation");
    const _0x4d68dc = {
      data: _0x303572,
      meta: {
        ok: true,
        message: "OK"
      }
    };
    _0x3f3e43(_0x4d68dc);
  });
  RegisterUICallback("vrp-gangsystem:ui:staffRemoveMember", async (_0x189a59, _0x1e9ee4) => {
    const [_0x41a0f2, _0x24ab99] = await RPC.execute("vrp-gangsystem:staffRemoveMember", _0x189a59.groupId, Number(_0x189a59.stateId));
    const _0x1cb92e = {
      ok: true,
      message: _0x24ab99
    };
    const _0x4c47ea = {
      data: _0x41a0f2,
      meta: _0x1cb92e
    };
    _0x1e9ee4(_0x4c47ea);
  });
  RegisterUICallback("vrp-gangsystem:ui:staffFetchGangLogs", async (_0x56e720, _0x18c5d1) => {
    const _0x1b0c29 = await RPC.execute("vrp-gangsystem:staffFetchGangLogs", _0x56e720.groupId);
    const _0x285bba = {
      logs: _0x1b0c29
    };
    const _0x410f9b = {
      data: _0x285bba,
      meta: {
        ok: true,
        message: ""
      }
    };
    _0x18c5d1(_0x410f9b);
  });
  RegisterUICallback("vrp-gangsystem:ui:toggleGangBlips", async (_0x138363, _0x3edbfe) => {
    await _0x2a7071();
    _0x3edbfe({
      data: {},
      meta: {
        ok: true,
        message: "ok"
      }
    });
  });
  RegisterUICallback("vrp-gangsystem:ui:toggleContestedGraffitis", async (_0xb97b7b, _0x44d616) => {
    await _0x5812ad();
    _0x44d616({
      data: {},
      meta: {
        ok: true,
        message: "ok"
      }
    });
  });
  ;
  _0x4b30f9.g.exports("GetCurrentGang", _0x5f2ae8);
  _0x4b30f9.g.exports("GetCurrentFlagLocation", _0x3905ab);
  _0x4b30f9.g.exports("IsValidGraffitiPlacement", _0x198e4f);
  _0x4b30f9.g.exports("RemovingGangSpray", _0x57b9b8);
  _0x4b30f9.g.exports("GetCurrentGangInfo", _0x5daafc);
  _0x4b30f9.g.exports("InRestrictedArea", _0x5144c6);
  _0x4b30f9.g.exports("GetGangsPedModels", _0x2975b1);
  ;
  RegisterCommand("vrp-gangsystem:toggleGangBlips", async (_0x4cbfe5, _0x307f8c) => {
    _0x2a7071(true);
  }, false);
  ;
  const _0x8288b6 = () => {
    _0x4b30f9.g.exports["vrp-interact"].AddPeekEntryByEntityType([1], [{
      VPXEvent: "vrp-gangsystem:openGangStorage",
      id: "gangs_hand_goods",
      icon: "hand-holding",
      label: "Hand Goods",
      parameters: {}
    }, {
      VPXEvent: "vrp-gangsystem:collectTrapProfit",
      id: "gangs_collect_profit",
      icon: "money-bill",
      label: "Collect Profit",
      parameters: {}
    }, {
      VPXEvent: "vrp-gangsystem:collectHistory",
      id: "gangs_collect_profit_history",
      icon: "history",
      label: "Who has collected profit?",
      parameters: {}
    }], {
      distance: {
        radius: 2
      },
      isEnabled: async (_0x471433, _0x3defad) => {
        const _0x3d2fcf = await _0x5f2ae8();
        if (!_0x3d2fcf) {
          return false;
        }
        const _0x6561f5 = await _0x2975b1();
        if (!_0x6561f5[_0x3d2fcf]) {
          return false;
        }
        const _0x1a9ef4 = GetHashKey(_0x6561f5[_0x3d2fcf]);
        const _0x31d786 = GetEntityCoords(_0x471433, false);
        const _0x30c29d = {
          x: _0x31d786[0],
          y: _0x31d786[1],
          z: _0x31d786[2]
        };
        const _0x5e6885 = _0x30c29d;
        const _0x2c1a88 = _0x10fe22(_0x5e6885);
        return _0x3defad.model === _0x1a9ef4 && _0x2c1a88 === _0x3d2fcf && !IsPedAPlayer(_0x471433) && !IsEntityDead(_0x471433);
      }
    });
    _0x4b30f9.g.exports["vrp-interact"].AddPeekEntryByEntityType([1], [{
      VPXEvent: "vrp-gangsystem:robGangMember",
      id: "gangs_rob_npc",
      icon: "bullseye",
      label: "Rob Member",
      parameters: {}
    }], {
      distance: {
        radius: 2
      },
      isEnabled: async (_0x3ca31a, _0x24fb61) => {
        const _0xb6bc8f = await _0x5f2ae8();
        if (!_0xb6bc8f) {
          return false;
        }
        const _0x18904d = GetEntityCoords(_0x3ca31a, false);
        const _0x1ef4c9 = {
          x: _0x18904d[0],
          y: _0x18904d[1],
          z: _0x18904d[2]
        };
        const _0x326dac = _0x1ef4c9;
        const _0x4b49e9 = _0x10fe22(_0x326dac);
        const _0x37df46 = await _0x2975b1();
        if (!_0x37df46[_0x4b49e9]) {
          return false;
        }
        const _0x31bc5e = GetHashKey(_0x37df46[_0x4b49e9]);
        return _0x24fb61.model === _0x31bc5e && _0x4b49e9 !== _0xb6bc8f && !IsPedAPlayer(_0x3ca31a) && !IsEntityDead(_0x3ca31a);
      }
    });
    _0x4b30f9.g.exports["vrp-interact"].AddPeekEntryByModel([GetHashKey("np_gangflag")], [{
      VPXEvent: "vrp-gangsystem:destroyFlag",
      id: "gangs_destroy_flag",
      icon: "trash",
      label: "Remove Flag",
      parameters: {}
    }], {
      distance: {
        radius: 2
      },
      isEnabled: async (_0x857432, _0x4a3c4c) => {
        const _0x5cffd0 = _0x4a3c4c.meta?.data?.metadata?.gangId;
        if (!_0x5cffd0) {
          return false;
        }
        const _0x23c195 = await _0x5f2ae8();
        if (!_0x23c195) {
          return false;
        }
        const _0x5f42a9 = GetEntityCoords(PlayerPedId(), false);
        const _0x2b1905 = {
          x: _0x5f42a9[0],
          y: _0x5f42a9[1],
          z: _0x5f42a9[2]
        };
        const _0x269c45 = _0x2b1905;
        const _0x351272 = _0x10fe22(_0x269c45);
        return _0x23c195 === _0x351272 && _0x351272 === _0x5cffd0;
      }
    });
  };
  ;
  const _0x1409af = () => {
    const _0x54b10f = _0x2d60e9("blockVinewoodArea") ?? false;
    if (_0x54b10f) {
      const _0x3e627d = {
        x: -2304.55,
        y: -353.03
      };
      const _0x1f71ec = {
        x: -2065.15,
        y: -65.15
      };
      const _0x1d96ec = {
        x: -1756.06,
        y: -277.27
      };
      const _0x528856 = {
        x: -1695.45,
        y: -346.97
      };
      const _0x23b2f8 = {
        x: -1577.27,
        y: -177.27
      };
      const _0x33ec9b = {
        x: -1877.27,
        y: 101.52
      };
      const _0x1a0278 = {
        x: -1813.64,
        y: 231.82
      };
      const _0x3b5960 = {
        x: -1677.27,
        y: 325.76
      };
      const _0x4caa0e = {
        x: -1586.36,
        y: 316.67
      };
      const _0x5a2455 = {
        x: -1495.45,
        y: 231.82
      };
      const _0x25f875 = {
        x: -1450,
        y: 295.45
      };
      const _0x19f95d = {
        x: -1380.3,
        y: 231.82
      };
      const _0x5ea217 = {
        x: -877.27,
        y: -556.06
      };
      const _0x50c270 = {
        x: 646.97,
        y: -565.15
      };
      const _0xd042a9 = {
        x: 786.36,
        y: -46.97
      };
      const _0x1871fe = {
        x: 1277.27,
        y: -265.15
      };
      const _0x31fdf7 = {
        x: 1537.88,
        y: -1007.58
      };
      const _0x474d87 = {
        x: 3353.03,
        y: -1046.97
      };
      const _0x3b4d11 = {
        x: -416.67,
        y: 2928.79
      };
      const _0x37e273 = {
        x: -3907.58,
        y: 2377.27
      };
      const _0x259fa9 = {
        x: -3919.7,
        y: -531.8
      };
      exports["vrp-polyzone"].AddPolyZone("vrp-gangsystem:blockedZone", [_0x3e627d, _0x1f71ec, _0x1d96ec, _0x528856, _0x23b2f8, _0x33ec9b, _0x1a0278, _0x3b5960, _0x4caa0e, _0x5a2455, _0x25f875, _0x19f95d, _0x5ea217, _0x50c270, _0xd042a9, _0x1871fe, _0x31fdf7, _0x474d87, {
        x: 3516.67,
        y: 1316.67
      }, {
        x: 3322.73,
        y: 2574.24
      }, {
        x: 1604.55,
        y: 2813.64
      }, {
        x: 1010.61,
        y: 2719.7
      }, {
        x: 1.52,
        y: 2625.76
      }, _0x3b4d11, _0x37e273, _0x259fa9], {
        minZ: 0,
        maxZ: 800,
        data: {
          id: "vrp-gangsystem:blockedZone"
        }
      });
    }
    const _0x5f6b46 = {
      x: -172.25,
      y: -426.8
    };
    const _0x5e1ca7 = {
      x: -300.07,
      y: -835.61
    };
    const _0x51efc6 = {
      x: -119,
      y: -1121.23
    };
    const _0x5f0a0d = {
      x: 90.91,
      y: -1124.24
    };
    const _0x7eba6c = {
      x: 590.91,
      y: -1133.33
    };
    const _0x1557ca = {
      x: 603.03,
      y: -624.24
    };
    const _0x188093 = {
      x: 540.91,
      y: -572.73
    };
    const _0x3e5478 = {
      minZ: -400,
      maxZ: 800,
      data: {
        id: "vrp-gangsystem:blockedZone_downtown"
      }
    };
    exports["vrp-polyzone"].AddPolyZone("vrp-gangsystem:blockedZone", [_0x5f6b46, _0x5e1ca7, _0x51efc6, _0x5f0a0d, _0x7eba6c, _0x1557ca, _0x188093], _0x3e5478);
  };
  ;
  async function _0x4ac7f0() {
    await _0x218706();
    // await RPC.execute("vrp-datagrid:subscribe", "gang-flags");
    _0x1409af();
    await _0x2209d7();
    await _0x13968a();
    _0x8288b6();
  }
  ;
  (async () => {
    await _0x4ac7f0();
  })();
})();