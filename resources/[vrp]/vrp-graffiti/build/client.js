(() => {
  'use strict';

  var _0x4e5038 = {};
  (() => {
    _0x4e5038.g = function () {
      if (typeof globalThis === "object") {
        return globalThis;
      }
      try {
        return this || new Function("return this")();
      } catch (_0x3d2679) {
        if (typeof window === "object") {
          return window;
        }
      }
    }();
  })();
  var _0x4c2caf = {};
  ;
  const _0x521515 = globalThis.VPX;
  const _0x37809e = _0x521515.Hud;
  const _0x533fae = _0x521515.Utils;
  const _0x29d166 = _0x521515.Zones;
  const _0x29b0c3 = _0x521515.Events;
  const _0x2c41f5 = _0x521515.Streaming;
  const _0x39f349 = _0x521515.Procedures;
  const _0x576612 = _0x521515.Interface;
  const _0x5df9a6 = null && _0x521515;
  ;
  let _0x4b377b = {};
  on("vrp-config:configLoaded", (_0x391fb0, _0x1368bf) => {
    if (_0x391fb0 !== "vrp-graffiti:sprays") {
      return;
    }
    _0x4b377b = _0x1368bf;
  });
  on("on" + (IsDuplicityVersion() ? "Server" : "Client") + "ResourceStart", _0x526822 => {
    if (GetCurrentResourceName() !== _0x526822) {
      return;
    }
    const _0x5b096e = exports["vrp-config"].GetModuleConfig("vrp-graffiti:sprays");
    if (!_0x5b096e) {
      return;
    }
    _0x4b377b = _0x5b096e ?? {};
  });
  const _0x1d016d = [GetHashKey("np_billboard_01"), GetHashKey("np_billboard_02"), GetHashKey("np_billboard_03")];
  ;
  let _0x1fd3f0 = [];
  const _0xe16186 = {
    distance: {
      radius: 6
    },
    isEnabled: () => true
  };
  const _0x1fcd43 = {
    menu: [{
      event: "vrp-graffiti:scrub",
      id: "scrub_graffiti",
      icon: "soap",
      label: "Scrub",
      parameters: {}
    }],
    options: _0xe16186
  };
  const _0x4a402b = [_0x1fcd43, {
    menu: [{
      NPXEvent: "vrp-gangsystem:handOverSpray",
      id: "hand_graffiti",
      icon: "hand-holding",
      label: "Hand over graffiti",
      parameters: {}
    }],
    options: {
      distance: {
        radius: 6
      },
      isEnabled: async (_0xdefe8, _0x21eb4b) => {
        const _0x54be06 = _0x21eb4b.meta?.data?.metadata;
        if (!_0x54be06?.gangId) {
          return false;
        }
        const _0x2a803c = await _0x1a2afc["vrp-gangsystem"].GetCurrentGangInfo();
        if (!_0x2a803c) {
          return false;
        }
        return _0x54be06?.gangId === _0x2a803c.id && _0x2a803c.isLeader;
      }
    }
  }, {
    menu: [{
      event: "vrp-graffiti:claimSpray",
      id: "claim_graffiti",
      icon: "hand-holding",
      label: "Claim graffiti",
      parameters: {}
    }],
    options: {
      distance: {
        radius: 6
      },
      isEnabled: async (_0x54afe3, _0xfe0cf6) => {
        const _0x3bd5f6 = _0xfe0cf6.meta?.data?.metadata;
        if (!_0x3bd5f6?.gangId || !_0x3bd5f6?.upForGrabs) {
          return false;
        }
        const _0x304bea = await _0x1a2afc["vrp-gangsystem"].GetCurrentGang();
        if (!_0x304bea) {
          return false;
        }
        return _0x3bd5f6?.upForGrabs;
      }
    }
  }, {
    menu: [{
      event: "vrp-graffiti:contestGraffiti",
      id: "contest_graffiti",
      icon: "hand-holding",
      label: "Contest graffiti",
      parameters: {}
    }],
    options: {
      distance: {
        radius: 6
      },
      isEnabled: async (_0xaecef9, _0x373e0c) => {
        const _0x2a191c = _0x373e0c.meta?.data?.metadata;
        if (!_0x2a191c?.gangId) {
          return false;
        }
        const _0xd337f8 = await _0x1a2afc["vrp-gangsystem"].GetCurrentGang();
        if (!_0xd337f8) {
          return false;
        }
        return _0x2a191c?.gangId !== _0xd337f8;
      }
    }
  }, {
    menu: [{
      event: "vrp-graffiti:cancelContestGraffiti",
      id: "cancel_contest_graffiti",
      icon: "hand-holding",
      label: "Cancel Contest",
      parameters: {}
    }],
    options: {
      distance: {
        radius: 6
      },
      isEnabled: async (_0x1133e2, _0x5aa63e) => {
        const _0xb366ad = _0x5aa63e.meta?.data?.metadata;
        if (!_0xb366ad?.gangId) {
          return false;
        }
        const _0x5654df = await _0x1a2afc["vrp-gangsystem"].GetCurrentGang();
        if (!_0x5654df) {
          return false;
        }
        return _0xb366ad?.gangId === _0x5654df && _0xb366ad?.contestStarted;
      }
    }
  }, {
    menu: [{
      NPXEvent: "vrp-gangsystem:discoverGraffiti",
      id: "discover_graffiti",
      icon: "eye",
      label: "Discover graffiti",
      parameters: {}
    }],
    options: {
      distance: {
        radius: 6
      },
      isEnabled: async (_0x56b929, _0x16165) => {
        const _0xaa94a2 = _0x16165.meta?.data?.metadata;
        if (!_0xaa94a2?.gangId) {
          return false;
        }
        const _0x3cb6b0 = await _0x1a2afc["vrp-gangsystem"].GetCurrentGangInfo();
        if (!_0x3cb6b0) {
          return false;
        }
        return true;
      }
    }
  }];
  function _0x888a9b(_0x4bbab2) {
    for (const _0x44fffe of _0x4a402b) {
      _0x4e5038.g.exports["vrp-interact"].AddPeekEntryByModel(_0x4bbab2, _0x44fffe.menu, _0x44fffe.options);
    }
  }
  on("vrp-config:configLoaded", (_0x4c3c87, _0x2de1f9) => {
    if (_0x4c3c87 !== "vrp-graffiti:sprays") {
      return;
    }
    _0x1fd3f0 = Object.values(_0x2de1f9).map(_0x42253c => GetHashKey(_0x42253c.model));
    _0x888a9b(_0x1fd3f0);
  });
  on("onClientResourceStart", _0x22bab1 => {
    if (_0x22bab1 !== "vrp-graffiti") {
      return;
    }
    const _0x44c80c = exports["vrp-config"].GetModuleConfig("vrp-graffiti:sprays");
    if (!_0x44c80c) {
      return;
    }
    _0x1fd3f0 = Object.values(_0x44c80c).map(_0x2ecccf => GetHashKey(_0x2ecccf.model));
    _0x888a9b(_0x1fd3f0);
  });
  const _0x1a2afc = _0x4e5038.g.exports;
  let _0x328e96 = [];
  setImmediate(() => {
    _0x328e96 = _0x4e5038.g.exports["vrp-doors"].GetDoorLocations();
  });
  const _0x1b13b3 = _0x3f8dbd => _0x328e96.some(_0x40a789 => _0x40a789.reduce((_0x50f594, _0x3d0dee, _0x15345e) => _0x50f594 += (_0x3d0dee - _0x3f8dbd[_0x15345e]) ** 2, 0) <= 16);
  const _0x3f7b81 = (_0x5a509e, _0x54c39c) => {
    const _0x226cbc = GetEntityCoords(_0x5a509e, false);
    const _0xc03d56 = GetEntityHeading(_0x5a509e);
    const _0x41c1ef = Math.atan2(_0x54c39c[1] - _0x226cbc[1], _0x54c39c[0] - _0x226cbc[0]) * 180 / Math.PI - 90;
    const _0x480f09 = Math.abs((_0xc03d56 - _0x41c1ef + 180) % 360 - 180);
    return _0x480f09 * 12;
  };
  const _0x388bd3 = async (pModel, _0x39a2e7, pGang) => {
    const _0x44345c = _0x4b377b[_0x39a2e7] ? _0x4b377b[_0x39a2e7] : _0x4b377b[pGang];
    if (!_0x44345c) {
      return;
    }
    if (_0x44345c.servers) {
      const _0x31bebc = exports["vrp-config"].GetServerCode();
      if (!_0x44345c.servers.includes(_0x31bebc.toLowerCase())) {
        return emit("DoLongHudText", "Seems like I cant use this...", 2);
      }
    }
    if (pGang) {
      const [_0x52b2e1, _0x5e9670] = await _0x1a2afc["vrp-gangsystem"].IsValidGraffitiPlacement(pGang, pModel);
      if (!_0x52b2e1) {
        return emit("DoLongHudText", _0x5e9670, 2);
      }
      const _0x469732 = exports["vrp-config"].GetModuleConfig("vrp-gangsystem").minMembersOnline;
      const _0x25d9ca = await RPC.execute("vrp-gangsystem:hasEnoughMembersAround", pGang, _0x469732);
      if (!_0x25d9ca) {
        return emit("DoLongHudText", "Seems like I cant do that at the moment...", 2, 12000, {
          i18n: ["Seems like I cant do that at the moment..."]
        });
      }
    }
    const [_0x4c015e, pObject] = await _0x1a2afc["vrp-objects"].PlaceObject(GetHashKey(pModel), {
      collision: false,
      groundSnap: false,
      adjustZ: false,
      distance: 3,
      alignToSurface: true,
      surfaceOffset: 0.025,
      afterRender: (_0x54db8d, _0xea53fd, _0x36be8a) => {
        const _0x5bd322 = GetEntityForwardVector(_0x54db8d);
        const [_0x4d9d42, _0x9d5d18, _0x5f494c] = GetEntityCoords(_0x54db8d, false);
        if (_0xea53fd) {
          DrawMarker(23, _0x4d9d42 - _0x5bd322[0] * 0.03, _0x9d5d18 - _0x5bd322[1] * 0.03, _0x5f494c - _0x5bd322[2] * 0.03, ..._0x5bd322, 90, 0, 0, 1, 1, 1, _0x36be8a ? 0 : 255, _0x36be8a ? 255 : 0, 0, 50, false, false, 2, false, null, null, false);
        }
        SetEntityAlpha(_0x54db8d, _0xea53fd ? 200 : 0, false);
      }
    }, (_0x2a8c5e, _0x52e254, _0x593ef, _0x5215f9) => {
      const _0x397409 = GetEntityType(_0x5215f9);
      let _0x308494 = false;
      if (_0x397409 !== 0) {
        if (_0x397409 === 3 && _0x1d016d.includes(GetEntityModel(_0x5215f9))) {
          _0x308494 = true;
        } else {
          return false;
        }
      }
      if (_0x4e5038.g.exports["vrp-doors"].GetCurrentDoor() !== undefined) {
        return false;
      }
      const _0x11988e = GetEntityModel(_0x593ef);
      const [[_0x293400,, _0x1066e7], [_0xd6f133, _0x28238d, _0x2793f6]] = GetModelDimensions(_0x11988e);
      const _0x11962c = GetEntityForwardVector(_0x593ef).map(_0x463e0a => _0x463e0a * 0.2);
      return [GetOffsetFromEntityInWorldCoords(_0x593ef, _0x293400 * 0.8, _0x28238d, _0x1066e7 * 0.8), GetOffsetFromEntityInWorldCoords(_0x593ef, _0xd6f133 * 0.8, _0x28238d, _0x1066e7 * 0.8), GetOffsetFromEntityInWorldCoords(_0x593ef, _0x293400 * 0.8, _0x28238d, _0x2793f6 * 0.8), GetOffsetFromEntityInWorldCoords(_0x593ef, _0xd6f133 * 0.8, _0x28238d, _0x2793f6 * 0.8)].every(_0x48a404 => {
        const _0x1be12b = StartShapeTestCapsule(..._0x48a404, _0x48a404[0] + _0x11962c[0], _0x48a404[1] + _0x11962c[1], _0x48a404[2] + _0x11962c[2], 0.02, -1, _0x593ef, 7);
        const [, _0x4db774,,, _0x28f86a] = GetShapeTestResult(_0x1be12b);
        const _0x49b315 = GetEntityType(_0x28f86a);
        return _0x4db774 && (_0x49b315 === 0 || _0x308494);
      }) && !_0x1b13b3([_0x2a8c5e.x, _0x2a8c5e.y, _0x2a8c5e.z]);
    });
    if (_0x4c015e) {
      if (pGang) {
        const [_0x4ed22d, _0x2db39a] = await _0x1a2afc["vrp-gangsystem"].IsValidGraffitiPlacement(pGang, pModel);
        if (!_0x4ed22d) {
          return emit("DoLongHudText", _0x2db39a, 2);
        }
      }
      const {
        coords: _0x3c46d7,
        rotation: _0x46e047
      } = pObject;
      const _0x471c47 = "spray_" + Math.floor(Math.random() * 100000);
      const _0x3e0b40 = PlayerPedId();
      let _0x59262c = false;
      const _0x2bb58f = CreateObjectNoOffset(GetHashKey(pModel), _0x3c46d7.x, _0x3c46d7.y, _0x3c46d7.z, false, false, false);
      SetEntityRotation(_0x2bb58f, _0x46e047.x, _0x46e047.y, _0x46e047.z, 2, true);
      SetEntityAlpha(_0x2bb58f, 0, false);
      const _0x5eca7e = Date.now();
      let _0x32a924 = setInterval(() => {
        SetEntityAlpha(_0x2bb58f, Math.min(240, Math.round((Date.now() - _0x5eca7e) / 40000 * 240)), false);
      }, 1000);
      const [, _0x121191] = await Promise.all([(async () => {
        const _0x54da43 = _0x3f7b81(_0x3e0b40, [_0x3c46d7.x, _0x3c46d7.y]);
        TaskTurnPedToFaceCoord(_0x3e0b40, _0x3c46d7.x, _0x3c46d7.y, _0x3c46d7.z, _0x54da43);
        await new Promise(_0x565ecc => setTimeout(_0x565ecc, _0x54da43));
        FreezeEntityPosition(_0x3e0b40, true);
        const _0x56910f = "switch@franklin@lamar_tagging_wall";
        RequestAnimDict(_0x56910f);
        while (!HasAnimDictLoaded(_0x56910f)) {
          await new Promise(_0x29c10b => setTimeout(_0x29c10b, 10));
        }
        emit("attachItem", "spraycan");
        const [_0x184857, _0x54866b, _0x5a9280] = GetEntityCoords(PlayerPedId(), false);
        setTimeout(() => {
          if (!_0x59262c) {
            const _0x12ecec = {
              x: _0x184857,
              y: _0x54866b,
              z: _0x5a9280
            };
            emitNet("vrp-fx:graffiti:spray", _0x471c47, _0x12ecec);
          }
        }, 6000);
        const _0x4dccbb = OpenSequenceTask();
        TaskPlayAnim(0, _0x56910f, "lamar_tagging_wall_loop_lamar", 8, -8, -1, 8192, 0, false, false, false);
        TaskPlayAnim(0, _0x56910f, "lamar_tagging_exit_loop_lamar", 8, -2, -1, 8193, 0, false, false, false);
        CloseSequenceTask(_0x4dccbb);
        TaskPerformSequence(_0x3e0b40, _0x4dccbb);
        ClearSequenceTask();
      })(), new Promise(_0x1b0d00 => _0x4e5038.g.exports["vrp-taskbar"].taskBar(40000, "Spraying...", false, true, null, false, _0x1b0d00))]);
      _0x59262c = true;
      clearInterval(_0x32a924);
      emit("destroyProp");
      ClearPedTasksImmediately(_0x3e0b40);
      ClearPedSecondaryTask(_0x3e0b40);
      FreezeEntityPosition(_0x3e0b40, false);
      emitNet("vrp-fx:graffiti:stopSpray", _0x471c47);
      DeleteEntity(_0x2bb58f);
      if (_0x121191 !== 100) {
        return;
      }
      if (pModel && typeof pModel === "string") {
        emit("inventory:removeItemByMetaKV", "spraycan", 1, "model", pModel);
      } else {
        emit("inventory:removeItem", "spraycan", 1);
      }
      await RPC.execute("vrp-graffiti:spray", pModel, pObject.coords, pObject.rotation, pGang);
    }
  };
  on("vrp-objects:objectCreated", (_0x54da6f, _0x4de485) => {
    if (_0x54da6f.ns === "graffiti") {
      SetEntityAlpha(_0x4de485, 240, false);
    }
  });
  on("vrp-graffiti:scrub", async (_0x3b2aac, _0x3b2131) => {
    const _0x1a65c9 = _0x1a2afc["vrp-objects"].GetObjectByEntity(_0x3b2131);
    if (!_0x1a65c9) {
      return;
    }
    let _0x45cd65 = 30000;
    if (_0x1a65c9.data.metadata?.gangId) {
      return false;
    }
    const _0x32ee6a = _0x1a2afc["vrp-inventory"].hasEnoughOfItem("paint_thinner", 1, false, true);
    if (!_0x32ee6a) {
      return emit("DoLongHudText", "You need paint thinner to scrub this..", 2);
    }
    const _0x3a797e = PlayerPedId();
    const [, _0x147f15] = await Promise.all([(async () => {
      const _0x3b8cfa = _0x3f7b81(_0x3a797e, [_0x1a65c9.x, _0x1a65c9.y]);
      TaskTurnPedToFaceCoord(_0x3a797e, _0x1a65c9.x, _0x1a65c9.y, _0x1a65c9.z, _0x3b8cfa);
      await new Promise(_0x434a39 => setTimeout(_0x434a39, _0x3b8cfa));
      FreezeEntityPosition(_0x3a797e, true);
      TaskStartScenarioInPlace(_0x3a797e, "WORLD_HUMAN_MAID_CLEAN", 0, true);
    })(), new Promise(_0x275b82 => _0x4e5038.g.exports["vrp-taskbar"].taskBar(_0x45cd65, "Cleaning...", false, true, null, false, _0x275b82))]);
    ClearPedTasksImmediately(_0x3a797e);
    ClearPedSecondaryTask(_0x3a797e);
    FreezeEntityPosition(_0x3a797e, false);
    const _0x1b2b68 = exports["vrp-flags"].GetPedFlags(PlayerPedId());
    if (_0x1b2b68.isDead) {
      return;
    }
    if (_0x147f15 === 100) {
      _0x1a2afc["vrp-objects"].DeleteObject(_0x1a65c9.id);
      emit("inventory:removeItem", "paint_thinner", 1);
    }
  });
  setImmediate(() => {
    RPC.execute("vrp-datagrid:subscribe", "graffiti");
  });
  on("vrp-inventory:itemUsed", async (_0x265eac, _0xdc96f, _0x5d185a, _0x4dd0f3) => {
    if (_0x265eac !== "spraycan") {
      return;
    }
    const _0x26d9e2 = _0x4e5038.g.exports["vrp-inventory"].GetItemInfo(_0x4dd0f3);
    if (_0x26d9e2.quality <= 0) {
      return;
    }
    const _0xd7722e = JSON.parse(_0x26d9e2?.information);
    await _0x388bd3(_0xd7722e?.model, _0xd7722e?.sprayId, _0xd7722e?.gangId);
  });
  on("vrp-graffiti:openSprayMenu", () => {
    const _0xe839f5 = [{
      icon: "exclamation-circle",
      title: "Current Available Sprays",
      description: "",
      action: "",
      key: {},
      titleRight: ""
    }];
    const _0x3113cd = exports["vrp-config"].GetServerCode();
    for (const _0x597e4c in _0x4b377b) {
      const _0x3c4c31 = _0x4b377b[_0x597e4c];
      if (_0x3c4c31.isGang) {
        continue;
      }
      if (_0x3c4c31.servers && !_0x3c4c31.servers.includes(_0x3113cd.toLowerCase())) {
        continue;
      }
      if (_0x3c4c31.shopHidden) {
        continue;
      }
      const _0x4c3dfa = {
        spray: _0x597e4c
      };
      const _0x2992d7 = {
        icon: "check-square",
        title: "Confirm Purchase ($5000)",
        action: "vrp-graffiti:purchaseSpray",
        key: _0x4c3dfa
      };
      const _0x3e0e64 = {
        icon: "spray-can",
        title: _0x3c4c31.name + " Spray",
        description: "",
        action: "",
        key: {},
        children: [_0x2992d7, {
          icon: "window-close",
          title: "Cancel Purchase",
          action: "vrp-graffiti:ui:cancelPurchase",
          key: {}
        }]
      };
      _0xe839f5.push(_0x3e0e64);
    }
    exports["vrp-ui"].showContextMenu(_0xe839f5);
  });
  on("vrp-graffiti:cancelContestGraffiti", async (_0x1463e8, _0x4e3236, _0x510788) => {
    const _0x3442d3 = _0x510788.meta.id;
    if (!_0x3442d3) {
      return;
    }
    const _0x313238 = await _0x1a2afc["vrp-gangsystem"].GetCurrentGang();
    if (!_0x313238) {
      return;
    }
    const _0x38d820 = _0x510788.meta.data.metadata?.gangId;
    if (!_0x38d820) {
      return;
    }
    const _0x15a438 = await _0x576612.taskBar(240000, "Canceling Contesting...", true);
    if (_0x15a438 !== 100) {
      return;
    }
    const _0xf50811 = exports["vrp-flags"].GetPedFlags(PlayerPedId());
    if (_0xf50811.isDead) {
      return;
    }
    exports["vrp-objects"].UpdateObject(_0x3442d3, {
      contestStarted: null
    });
  });
  on("vrp-graffiti:contestGraffiti", async (_0x2c31ac, _0x46318a, _0x51db94) => {
    const _0x334a38 = _0x51db94.meta.id;
    if (!_0x334a38) {
      return;
    }
    const _0x5b4fa6 = await _0x1a2afc["vrp-gangsystem"].GetCurrentGang();
    if (!_0x5b4fa6) {
      return;
    }
    const _0x4af163 = _0x51db94.meta.data.metadata?.gangId;
    if (!_0x4af163) {
      return;
    }
    const _0x54652e = await RPC.execute("vrp-gangsystem:canUseScrubbingCloth", _0x5b4fa6);
    if (!_0x54652e) {
      return emit("DoLongHudText", "Seems like I need to wait before I can do this...", 2, 12000, {
        i18n: ["Seems like I need to wait before I can do this..."]
      });
    }
    const _0x42cea4 = _0x1a2afc["vrp-inventory"].hasEnoughOfItem("srubbingcloth", 1, false, true);
    if (!_0x42cea4) {
      return emit("DoLongHudText", "You need a scrubbing cloth to scrub this graffiti.", 2);
    }
    _0x29b0c3.emitNet("vrp-gangsystem:contestGraffiti", _0x4af163, _0x334a38, _0x5b4fa6);
  });
  on("vrp-graffiti:claimSpray", async (_0x563dea, _0x593bd9, _0x458b67) => {
    const _0x480615 = _0x458b67.meta.id;
    if (!_0x480615) {
      return;
    }
    const _0x18c754 = await _0x1a2afc["vrp-gangsystem"].GetCurrentGang();
    if (!_0x18c754) {
      return;
    }
    const _0x41bb0f = _0x458b67.meta?.data?.metadata?.upForGrabs;
    if (_0x41bb0f) {
      const _0x36e134 = exports["vrp-inventory"].GetItemsByItemMetaKV("spraycan", "gangId", _0x18c754).filter(_0x336441 => _0x336441.quality > 0);
      if (_0x36e134.length === 0) {
        return emit("DoLongHudText", "Seems like I need a spray can...", 2, 12000, {
          i18n: ["Seems like I need a spray can..."]
        });
      }
    }
    const _0x2736d8 = {
      x: _0x458b67.meta.x,
      y: _0x458b67.meta.y,
      z: _0x458b67.meta.z
    };
    const _0x5c7d32 = _0x2736d8;
    const _0x223b30 = "spray_" + Math.floor(Math.random() * 100000);
    const _0x3d7706 = PlayerPedId();
    let _0x1c34b2 = false;
    const [, _0x226de4] = await Promise.all([(async () => {
      const _0x1274e0 = _0x3f7b81(_0x3d7706, [_0x5c7d32.x, _0x5c7d32.y]);
      TaskTurnPedToFaceCoord(_0x3d7706, _0x5c7d32.x, _0x5c7d32.y, _0x5c7d32.z, _0x1274e0);
      await new Promise(_0x2245e6 => setTimeout(_0x2245e6, _0x1274e0));
      FreezeEntityPosition(_0x3d7706, true);
      const _0x789148 = "switch@franklin@lamar_tagging_wall";
      RequestAnimDict(_0x789148);
      while (!HasAnimDictLoaded(_0x789148)) {
        await new Promise(_0x1c6b48 => setTimeout(_0x1c6b48, 10));
      }
      emit("attachItem", "spraycan");
      const [_0x56a8d8, _0x351cb6, _0x1fe997] = GetEntityCoords(PlayerPedId(), false);
      setTimeout(() => {
        if (!_0x1c34b2) {
          const _0x34ec70 = {
            x: _0x56a8d8,
            y: _0x351cb6,
            z: _0x1fe997
          };
          emitNet("vrp-fx:graffiti:spray", _0x223b30, _0x34ec70);
        }
      }, 6000);
      const _0x3730c8 = OpenSequenceTask();
      TaskPlayAnim(0, _0x789148, "lamar_tagging_wall_loop_lamar", 8, -8, -1, 8192, 0, false, false, false);
      TaskPlayAnim(0, _0x789148, "lamar_tagging_exit_loop_lamar", 8, -2, -1, 8193, 0, false, false, false);
      CloseSequenceTask(_0x3730c8);
      TaskPerformSequence(_0x3d7706, _0x3730c8);
      ClearSequenceTask();
    })(), new Promise(_0x25efc9 => _0x4e5038.g.exports["vrp-taskbar"].taskBar(240000, "Claiming graffiti...", false, true, null, false, _0x25efc9))]);
    emit("destroyProp");
    ClearPedTasksImmediately(_0x3d7706);
    ClearPedSecondaryTask(_0x3d7706);
    FreezeEntityPosition(_0x3d7706, false);
    if (_0x226de4 === 100) {
      emitNet("vrp-graffiti:changeSpray", _0x480615, _0x18c754);
      emit("inventory:removeItemByMetaKV", "spraycan", 1, "gangId", _0x18c754);
    }
  });
  RegisterUICallback("vrp-graffiti:purchaseSpray", ({
    key: _0xd155dc
  }, _0x495ea9) => {
    emitNet("vrp-graffiti:completePurchase", _0xd155dc.spray);
    _0x495ea9({
      data: null,
      meta: {
        ok: true,
        message: ""
      }
    });
  });
  RegisterUICallback("vrp-graffiti:ui:cancelPurchase", (_0x32e513, _0x5cd829) => _0x5cd829({
    data: {},
    meta: {
      ok: true,
      message: ""
    }
  }));
})();