(() => {
    var _0x2c5eb5 = {
      636: (_0x3d1c64, _0x9e7a9c, _0x4efdf5) => {
        const _0x3012a3 = 46240;
        const _0x1d3964 = GetHashKey("w_am_baseball");
        let _0x5a42e2 = PlayerPedId();
        setImmediate(() => {
          const _0x2072c0 = {
            distance: {
              radius: 3
            },
            isEnabled: () => !LocalPlayer.state.attachedTennisBall
          };
          _0x4efdf5.g.exports["vrp-interact"].AddPeekEntryByModel([GetHashKey("prop_tennis_ball")], [{
            event: "vrp-companions:pickupBall",
            id: "companions_pickup_ball",
            icon: "circle",
            label: "Pickup Ball",
            parameters: {}
          }], _0x2072c0);
        });
        async function _0x403d77(_0x50c95c) {
          if (!HasAnimDictLoaded(_0x50c95c)) {
            RequestAnimDict(_0x50c95c);
            let _0x2bf3a2 = false;
            setTimeout(() => _0x2bf3a2 = true, 5000);
            while (!HasAnimDictLoaded(_0x50c95c) && !_0x2bf3a2) {
              await new Promise(_0x4428aa => setTimeout(_0x4428aa, 30));
            }
          }
        }
        const _0x18b123 = {
          [GetHashKey("a_c_westy_np")]: [0.08, 0, 0.01],
          [GetHashKey("a_c_shepherd_np")]: [0.1, 0, 0.02]
        };
        on("vrp-companions:pickupBall", async (_0x211e08, _0x24d026, _0x5a6758) => {
          const _0x376a1c = PlayerPedId();
          const _0x28037d = GetEntityModel(_0x376a1c);
          const _0x2b92eb = _0x4efdf5.g.exports["vrp-misc-code"].isAnimalModel(_0x28037d);
          if (_0x2b92eb) {
            if (!_0x18b123[_0x28037d]) {
              return;
            }
            const [_0x37ca3f, _0x204664, _0x5aee7c] = _0x18b123[_0x28037d];
            NetworkRequestControlOfEntity(_0x24d026);
            while (!NetworkHasControlOfEntity(_0x24d026)) {
              await new Promise(_0x1491b9 => setTimeout(_0x1491b9, 16));
            }
            AttachEntityToEntity(_0x24d026, _0x376a1c, GetPedBoneIndex(_0x376a1c, _0x3012a3), _0x37ca3f, _0x204664, _0x5aee7c, 0, 0, 0, false, true, false, true, 2, true);
            LocalPlayer.state.attachedTennisBall = _0x24d026;
          } else {
            const _0x993d32 = NetworkGetNetworkIdFromEntity(_0x24d026);
            if (_0x993d32 === 0) {
              return;
            }
            await _0x403d77("random@domestic");
            TaskPlayAnim(_0x376a1c, "random@domestic", "pickup_low", 5, 1, -1, 48, 0, false, false, false);
            await new Promise(_0x20a136 => setTimeout(_0x20a136, 650));
            emitNet("vrp-companions:server:pickupBall", _0x993d32);
          }
        });
        on("vrp-companions:dropBall", () => {
          DetachEntity(LocalPlayer.state.attachedTennisBall, true, true);
          LocalPlayer.state.attachedTennisBall = null;
        });
        async function _0x2a217e(_0xcb65cb) {
          SetEntityAsMissionEntity(_0xcb65cb, true, true);
          DeleteEntity(_0xcb65cb);
        }
        async function _0x18c177(_0x407e1e, _0x4de22f = 1) {
          const [_0x411b76, _0xce83fa, _0x2962fe] = GetEntityCoords(_0x407e1e, false);
          const [_0x4d6e75, _0x51ef6a, _0x579989] = GetEntityVelocity(_0x407e1e);
          const [_0x5c4e09, _0x422219, _0x3dca80] = GetEntityRotationVelocity(_0x407e1e);
          SetEntityAsMissionEntity(_0x407e1e, true, true);
          DeleteEntity(_0x407e1e);
          while (DoesEntityExist(_0x407e1e)) {
            await new Promise(_0x5fb4b4 => setTimeout(_0x5fb4b4, 16));
          }
          const _0x2e2e7c = CreateObjectNoOffset(GetHashKey("prop_tennis_ball"), _0x411b76, _0xce83fa, _0x2962fe, true, true, false);
          while (!DoesEntityExist(_0x2e2e7c)) {
            await new Promise(_0x4da9d1 => setTimeout(_0x4da9d1, 16));
          }
          await new Promise(_0x35dc69 => setTimeout(_0x35dc69, 16));
          ActivatePhysics(_0x2e2e7c);
          SetEntityVelocity(_0x2e2e7c, _0x4d6e75 * _0x4de22f, _0x51ef6a * _0x4de22f, _0x579989 * _0x4de22f);
          SetEntityAngularVelocity(_0x407e1e, _0x5c4e09, _0x422219, _0x3dca80);
        }
        const _0x404c05 = (_0x2c14f8, _0x127a35) => {
          const [_0x29715e, _0x5a44ec, _0x57254c] = [_0x2c14f8[0] - _0x127a35[0], _0x2c14f8[1] - _0x127a35[1], _0x2c14f8[2] - _0x127a35[2]];
          return Math.sqrt(_0x29715e * _0x29715e + _0x5a44ec * _0x5a44ec + _0x57254c * _0x57254c);
        };
        const _0x10b2b5 = _0x51ef64 => {
          let _0xb0a4e4 = null;
          let _0x3b5f4c = Number.MAX_SAFE_INTEGER;
          for (const _0x2f288b of GetActivePlayers()) {
            const _0x5766f6 = GetPlayerPed(_0x2f288b);
            const _0x163011 = _0x404c05(_0x51ef64, GetEntityCoords(_0x5766f6, false));
            if (_0x163011 < _0x3b5f4c) {
              _0xb0a4e4 = _0x5766f6;
              _0x3b5f4c = _0x163011;
            }
          }
          return _0xb0a4e4;
        };
        setTick(async () => {
          const _0x11a5eb = GetGamePool("CObject");
          const _0x1772e8 = _0x11a5eb.filter(_0x22d49a => _0x22d49a !== 0 && GetEntityModel(_0x22d49a) === _0x1d3964);
          if (_0x1772e8.length === 0) {
            _0x5a42e2 = PlayerPedId();
            await new Promise(_0x37a967 => setTimeout(_0x37a967, 500));
            return;
          }
          for (const _0x3e270d of _0x1772e8) {
            if (!IsEntityAttached(_0x3e270d) || GetEntitySpeed(_0x3e270d) > 0) {
              const _0x283ef4 = _0x10b2b5(GetEntityCoords(_0x3e270d, false)) === _0x5a42e2;
              if (_0x283ef4 && GetEntitySpeed(_0x3e270d) > 0) {
                await _0x18c177(_0x3e270d, 2);
              } else {
                _0x2a217e(_0x3e270d);
              }
            }
          }
        });
      }
    };
    var _0x116506 = {};
    function _0x4bf432(_0x3d6bec) {
      var _0x948cd6 = _0x116506[_0x3d6bec];
      if (_0x948cd6 !== undefined) {
        return _0x948cd6.exports;
      }
      var _0x567979 = _0x116506[_0x3d6bec] = {
        exports: {}
      };
      _0x2c5eb5[_0x3d6bec](_0x567979, _0x567979.exports, _0x4bf432);
      return _0x567979.exports;
    }
    (() => {
      _0x4bf432.d = (_0x5ebb96, _0x2f073b) => {
        for (var _0x129a16 in _0x2f073b) {
          if (_0x4bf432.o(_0x2f073b, _0x129a16) && !_0x4bf432.o(_0x5ebb96, _0x129a16)) {
            Object.defineProperty(_0x5ebb96, _0x129a16, {
              enumerable: true,
              get: _0x2f073b[_0x129a16]
            });
          }
        }
      };
    })();
    (() => {
      _0x4bf432.g = function () {
        if (typeof globalThis === "object") {
          return globalThis;
        }
        try {
          return this || new Function("return this")();
        } catch (_0x1e4f88) {
          if (typeof window === "object") {
            return window;
          }
        }
      }();
    })();
    (() => {
      _0x4bf432.o = (_0x552fd0, _0x4d42f3) => Object.prototype.hasOwnProperty.call(_0x552fd0, _0x4d42f3);
    })();
    (() => {
      _0x4bf432.r = _0x5c4440 => {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(_0x5c4440, Symbol.toStringTag, {
            value: "Module"
          });
        }
        Object.defineProperty(_0x5c4440, "__esModule", {
          value: true
        });
      };
    })();
    var _0xbe650b = {};
    (() => {
      'use strict';
  
      var _0x154ae6 = {};
      _0x4bf432.r(_0x154ae6);
      const _0xac27e4 = {
        attack: () => _0x485086,
        bark: () => _0x35fd7c,
        beg: () => _0x58557e,
        follow: () => _0x5b1c98,
        graze: () => _0x148b08,
        howl: () => _0x221a7b,
        laydown: () => _0x34fcea,
        move: () => _0x46aa73,
        paw: () => _0x4f3e6d,
        peck: () => _0x153f34,
        playdead: () => _0x1e2179,
        sit: () => _0x20066f,
        sniff: () => _0x381a64,
        stretch: () => _0x250e88,
        taunt: () => _0x19f6bd,
        track: () => _0x1842dc,
        untrack: () => _0xe5776e,
        vehicle: () => _0x550959,
        wander: () => _0x94141d,
        watch: () => _0x38dc09
      };
      _0x4bf432.d(_0x154ae6, _0xac27e4);
      ;
      const _0x177811 = (_0x49226e, _0x3957ad) => {
        let _0x74d0f3 = 0;
        return async _0x5997d7 => {
          const _0x23a991 = Date.now();
          if (_0x23a991 - _0x74d0f3 < 1000) {
            return;
          }
          _0x74d0f3 = _0x23a991;
          RequestAnimDict(_0x49226e);
          let _0x451acf = 0;
          while (!HasAnimDictLoaded(_0x49226e) && _0x451acf++ < 50) {
            await new Promise(_0x221ccb => setTimeout(_0x221ccb, 10));
          }
          TaskPlayAnim(_0x5997d7, _0x49226e, _0x3957ad, 2.7, 2.7, 1000, 49, 0, false, false, false);
        };
      };
      ;
      var _0x37ffa2;
      (function (_0xeb3be5) {
        _0xeb3be5.ped = "ped";
        _0xeb3be5.prop = "prop";
      })(_0x37ffa2 ||= {});
      ;
      ;
      const _0x412f07 = {
        sit: {
          dictionary: "creatures@rottweiler@amb@world_dog_sitting@base",
          anim: "base",
          exitDictionary: "creatures@rottweiler@amb@world_dog_sitting@exit",
          exitAnim: "exit"
        },
        bark: {
          dictionary: "creatures@rottweiler@amb@world_dog_barking@idle_a",
          anim: "idle_a",
          exitDictionary: "creatures@rottweiler@amb@world_dog_barking@exit",
          exitAnim: "exit"
        },
        laydown: {
          dictionary: "creatures@rottweiler@amb@sleep_in_kennel@",
          anim: "sleep_in_kennel",
          exitDictionary: "creatures@rottweiler@amb@sleep_in_kennel@",
          exitAnim: "exit_kennel"
        },
        beg: {
          dictionary: "creatures@rottweiler@tricks@",
          anim: "beg_loop",
          exitDictionary: "creatures@rottweiler@tricks@",
          exitAnim: "beg_exit"
        },
        taunt: {
          dictionary: "creatures@rottweiler@melee@streamed_taunts@",
          anim: "taunt_02"
        },
        paw: {
          dictionary: "creatures@rottweiler@tricks@",
          anim: "paw_right_enter",
          exitDictionary: "creatures@rottweiler@tricks@",
          exitAnim: "paw_right_exit"
        },
        pet: {
          dictionary: "creatures@rottweiler@tricks@",
          anim: "petting_chop"
        },
        playdead: {
          dictionary: "creatures@rottweiler@move",
          anim: "dying",
          exitDictionary: "creatures@rottweiler@amb@world_dog_sitting@exit",
          exitAnim: "exit"
        },
        sitCar: {
          dictionary: "creatures@rottweiler@in_vehicle@std_car",
          anim: "sit",
          exitDictionary: "creatures@rottweiler@amb@world_dog_sitting@exit",
          exitAnim: "exit"
        }
      };
      const _0x1821b8 = {
        bark: {
          dictionary: "creatures@pug@amb@world_dog_barking@idle_a",
          anim: "idle_a",
          exitDictionary: "creatures@pug@amb@world_dog_barking@exit",
          exitAnim: "exit"
        },
        sit: {
          dictionary: "creatures@pug@amb@world_dog_sitting@base",
          anim: "base",
          exitDictionary: "creatures@pug@amb@world_dog_sitting@exit",
          exitAnim: "exit"
        },
        playdead: {
          dictionary: "creatures@pug@move",
          anim: "dying",
          exitDictionary: "creatures@pug@amb@world_dog_sitting@exit",
          exitAnim: "exit"
        }
      };
      const _0x587954 = {
        laydown: {
          dictionary: "creatures@cougar@amb@world_cougar_rest@base",
          anim: "base",
          exitDictionary: "creatures@cougar@amb@world_cougar_rest@exit",
          exitAnim: "exit"
        },
        taunt: {
          dictionary: "creatures@cougar@melee@",
          anim: "growling"
        }
      };
      const _0x4fbf3a = {
        laydown: {
          dictionary: "creatures@cat@amb@world_cat_sleeping_ground@base",
          anim: "base",
          exitDictionary: "creatures@cat@amb@world_cat_sleeping_ground@exit",
          exitAnim: "exit"
        },
        stretch: {
          dictionary: "creatures@cat@amb@peyote@enter",
          anim: "enter",
          exitDictionary: "creatures@cat@amb@world_cat_sleeping_ledge@exit",
          exitAnim: "exit"
        },
        sitCar: {
          dictionary: "creatures@cat@amb@world_cat_sleeping_ledge@base",
          anim: "base",
          exitDictionary: "creatures@cat@amb@world_cat_sleeping_ledge@exit",
          exitAnim: "exit"
        }
      };
      const _0x185cd0 = {
        sitCar: {
          dictionary: "anim@amb@code_human_in_car_idles@arm@generic@ds@base",
          anim: "base"
        }
      };
      const _0x574e0d = {
        [GetHashKey("a_c_rottweiler")]: _0x412f07,
        [GetHashKey("a_c_chop")]: _0x412f07,
        [GetHashKey("a_c_retriever")]: Object.assign(Object.assign({}, _0x412f07), {
          bark: {
            dictionary: "creatures@retriever@amb@world_dog_barking@idle_a",
            anim: "idle_a",
            exitDictionary: "creatures@retriever@amb@world_dog_barking@exit",
            exitAnim: "exit"
          },
          playdead: {
            dictionary: "creatures@retriever@move",
            anim: "dying",
            exitDictionary: "creatures@retriever@getup",
            exitAnim: "getup_l"
          }
        }),
        [GetHashKey("a_c_retriever_np")]: Object.assign(Object.assign({}, _0x412f07), {
          bark: {
            dictionary: "creatures@retriever@amb@world_dog_barking@idle_a",
            anim: "idle_a",
            exitDictionary: "creatures@retriever@amb@world_dog_barking@exit",
            exitAnim: "exit"
          },
          playdead: {
            dictionary: "creatures@retriever@move",
            anim: "dying",
            exitDictionary: "creatures@retriever@getup",
            exitAnim: "getup_l"
          }
        }),
        [GetHashKey("a_c_husky")]: _0x412f07,
        [GetHashKey("a_c_husky_2")]: _0x412f07,
        [GetHashKey("a_c_husky_np")]: _0x412f07,
        [GetHashKey("a_c_shepherd")]: _0x412f07,
        [GetHashKey("a_c_shepherd_np")]: _0x412f07,
        [GetHashKey("a_c_pit_np")]: _0x412f07,
        [GetHashKey("a_c_pug_np")]: _0x1821b8,
        [GetHashKey("a_c_pug")]: _0x1821b8,
        [GetHashKey("a_c_poodle")]: _0x1821b8,
        [GetHashKey("a_c_westy")]: _0x1821b8,
        [GetHashKey("a_c_cat_01")]: _0x4fbf3a,
        [GetHashKey("a_c_raccoon_01")]: _0x4fbf3a,
        [GetHashKey("a_c_mtlion")]: _0x587954,
        [GetHashKey("a_c_panther")]: _0x587954,
        [GetHashKey("a_c_leopard")]: _0x587954,
        [GetHashKey("a_c_coyote")]: Object.assign(Object.assign({}, _0x587954), {
          howl: {
            dictionary: "creatures@coyote@amb@world_coyote_howl@idle_a",
            anim: "idle_a",
            exitDictionary: "creatures@coyote@amb@world_coyote_howl@exit",
            exitAnim: "exit"
          }
        }),
        [GetHashKey("a_c_hen")]: {
          peck: {
            dictionary: "creatures@hen@amb@world_hen_pecking@base",
            anim: "base",
            exitDictionary: "creatures@hen@amb@world_hen_pecking@exit",
            exitAnim: "exit"
          },
          sitCar: {
            dictionary: "creatures@hen@amb@world_hen_standing@base",
            anim: "base"
          }
        },
        [GetHashKey("a_c_cow")]: {
          graze: {
            dictionary: "creatures@cow@amb@world_cow_grazing@base",
            anim: "base",
            exitDictionary: "creatures@cow@amb@world_cow_grazing@exit",
            exitAnim: "exit"
          }
        },
        [GetHashKey("a_c_boar")]: {
          graze: {
            dictionary: "creatures@boar@amb@world_boar_grazing@base",
            anim: "base",
            exitDictionary: "creatures@boar@amb@world_boar_grazing@exit",
            exitAnim: "exit"
          }
        },
        [GetHashKey("a_c_deer")]: {
          graze: {
            dictionary: "creatures@deer@amb@world_deer_grazing@base",
            anim: "base",
            exitDictionary: "creatures@deer@amb@world_deer_grazing@exit",
            exitAnim: "exit"
          }
        },
        [GetHashKey("a_c_pig")]: {
          graze: {
            dictionary: "creatures@pig@amb@world_pig_grazing@base",
            anim: "base",
            exitDictionary: "creatures@pig@amb@world_pig_grazing@exit",
            exitAnim: "exit"
          },
          sitCar: {
            dictionary: "creatures@pig@move",
            anim: "idle"
          }
        },
        [GetHashKey("a_c_rat")]: {
          sitCar: {
            dictionary: "creatures@rat@move",
            anim: "idle"
          }
        },
        [GetHashKey("a_c_rabbit_01")]: {
          sitCar: {
            dictionary: "creatures@rabbit@amb@world_rabbit_eating@exit",
            anim: "exit"
          }
        },
        [GetHashKey("s_m_y_blackops_01")]: _0x185cd0,
        [GetHashKey("s_m_y_blackops_02")]: _0x185cd0,
        [GetHashKey("s_m_y_blackops_03")]: _0x185cd0,
        [GetHashKey("chupacabra")]: _0x185cd0
      };
      ;
      const _0xd11c96 = async (_0x3a52f5, _0x5288ef, _0xb4e2b9) => {
        RequestAnimDict(_0x5288ef);
        let _0x3ac52b = 0;
        while (!HasAnimDictLoaded(_0x5288ef) && _0x3ac52b++ < 50) {
          await new Promise(_0x1a583a => setTimeout(_0x1a583a, 10));
        }
        TaskPlayAnim(_0x3a52f5, _0x5288ef, _0xb4e2b9, 2.7, 2.7, 1000, 2, 0, false, false, false);
        await new Promise(_0x5f3dbd => setTimeout(_0x5f3dbd, 100));
        while (IsEntityPlayingAnim(_0x3a52f5, _0x5288ef, _0xb4e2b9, 3)) {
          await new Promise(_0x37e98f => setTimeout(_0x37e98f, 200));
        }
      };
      const _0xadf949 = (_0x324690, _0x3ce401 = 2, _0x5c9e46 = -1) => (_0x17d20d, {} = {}, {} = {}) => {
        let _0x121288 = false;
        const _0x408d10 = GetEntityModel(_0x17d20d);
        const _0x267869 = _0x574e0d[_0x408d10];
        const _0x85651 = async () => {
          if (_0x267869) {
            const _0x339eb6 = _0x267869[_0x324690];
            if (_0x339eb6) {
              const {
                dictionary: _0x5d18a4,
                anim: _0x26b8a7,
                exitDictionary: _0x8f7166,
                exitAnim: _0x4c5d81
              } = _0x339eb6;
              RequestAnimDict(_0x5d18a4);
              let _0x418c74 = 0;
              while (!HasAnimDictLoaded(_0x5d18a4) && _0x418c74++ < 50) {
                await new Promise(_0x181645 => setTimeout(_0x181645, 10));
              }
              if (!_0x121288) {
                TaskPlayAnim(_0x17d20d, _0x5d18a4, _0x26b8a7, -1, -1, -1, _0x3ce401, 0, false, false, false);
                await new Promise(_0x1a5b98 => setTimeout(_0x1a5b98, 100));
                let _0x554e33 = Date.now();
                while (!_0x121288 && IsEntityPlayingAnim(_0x17d20d, _0x5d18a4, _0x26b8a7, 3) && (_0x5c9e46 === -1 || Date.now() - _0x554e33 < _0x5c9e46)) {
                  await new Promise(_0x411d25 => setTimeout(_0x411d25, 200));
                }
                if (_0x8f7166 && _0x4c5d81) {
                  await _0xd11c96(_0x17d20d, _0x8f7166, _0x4c5d81);
                }
              }
              ClearPedTasks(_0x17d20d);
            }
          }
        };
        const _0x3eec91 = {
          perform: _0x85651,
          cancel: () => _0x121288 = true
        };
        return _0x3eec91;
      };
      ;
      const _0x485086 = (_0x5a279b, {
        targetEntity: _0x74c79d
      }, {}) => {
        let _0x6e5fe8 = false;
        const _0x4b7668 = async () => {
          if (_0x74c79d) {
            try {
              SetCanAttackFriendly(_0x5a279b, true, false);
              TaskCombatPed(_0x5a279b, _0x74c79d, 0, 16);
              while (!_0x6e5fe8 && GetScriptTaskStatus(_0x5a279b, 780511057) !== 7 && [0, _0x74c79d].includes(GetMeleeTargetForPed(_0x5a279b))) {
                await new Promise(_0x23600a => setTimeout(_0x23600a, 100));
              }
              SetCanAttackFriendly(_0x5a279b, false, false);
            } catch (_0x65486c) {
              console.error(_0x65486c);
            }
            ClearPedTasks(_0x5a279b);
          }
        };
        const _0x3f55c6 = {
          perform: _0x4b7668,
          cancel: () => _0x6e5fe8 = true
        };
        return _0x3f55c6;
      };
      ;
      const _0x46aa73 = (_0x52b255, {
        targetCoords: _0x425e30,
        targetEntity: _0x55025f,
        repeatMove = true
      }, {
        speed = 4
      } = {}) => {
        let _0x5a6a1d = false;
        const _0x1e3ec2 = async () => {
          const _0x5a1d51 = GetPlayerPed(GetNearestPlayerToEntity(_0x52b255));
          const _0x338094 = IsEntityAttachedToEntity(_0x5a1d51, _0x52b255);
          let _0x495421 = false;
          try {
            if (_0x55025f) {
              TaskGoToEntity(_0x52b255, _0x55025f, -1, 3, speed, 0, 0);
              while (!_0x5a6a1d && DoesEntityExist(_0x55025f)) {
                if (GetScriptTaskStatus(_0x52b255, 1227113341) === 7 && !_0x5a6a1d) {
                  if (repeatMove) {
                    TaskGoToEntity(_0x52b255, _0x55025f, -1, 3, speed, 0, 0);
                  } else {
                    break;
                  }
                }
                await new Promise(_0x590b5e => setTimeout(_0x590b5e, 100));
                if (!_0x495421 && _0x425e30) {
                  _0x495421 = true;
                  const [,, _0x367f46] = GetNavmeshRouteDistanceRemaining(_0x52b255);
                  if (!_0x367f46) {
                    const [_0x1129ee, _0x30db5b] = GetSafeCoordForPed(_0x425e30[0], _0x425e30[1], _0x425e30[2], false, 16);
                    if (_0x1129ee) {
                      TaskFollowNavMeshToCoord(_0x52b255, _0x30db5b[0], _0x30db5b[1], _0x30db5b[2], speed, -1, 1, false, 40000);
                      while (GetScriptTaskStatus(_0x52b255, 713668775) !== 7 && !_0x5a6a1d) {
                        await new Promise(_0x227ea3 => setTimeout(_0x227ea3, 100));
                      }
                      TaskTurnPedToFaceEntity(_0x52b255, _0x55025f, -1);
                      await new Promise(_0x1ad358 => setTimeout(_0x1ad358, 2000));
                      return;
                    }
                  }
                }
              }
            } else if (_0x425e30) {
              if (_0x338094) {
                const _0xe59a7e = GetEntityCoords(_0x52b255, false);
                const _0x4a4781 = Math.atan2(_0x425e30[1] - _0xe59a7e[1], _0x425e30[0] - _0xe59a7e[0]) * 180 / Math.PI - 90;
                TaskGoStraightToCoord(_0x52b255, ..._0x425e30, speed, -1, _0x4a4781, 0);
                while (GetScriptTaskStatus(_0x52b255, 2106541073) !== 7 && !_0x5a6a1d) {
                  await new Promise(_0x5268aa => setTimeout(_0x5268aa, 100));
                }
              } else {
                TaskFollowNavMeshToCoord(_0x52b255, ..._0x425e30, speed, -1, 1, false, 40000);
                while (GetScriptTaskStatus(_0x52b255, 713668775) !== 7 && !_0x5a6a1d) {
                  await new Promise(_0x9ad434 => setTimeout(_0x9ad434, 100));
                }
              }
            }
          } catch (_0x9084a2) {
            console.error(_0x9084a2);
          }
          ClearPedTasks(_0x52b255);
        };
        const _0xa0cbb6 = {
          perform: _0x1e3ec2,
          cancel: () => _0x5a6a1d = true
        };
        return _0xa0cbb6;
      };
      ;
      const _0x5b1c98 = (_0x5954c0, {
        targetEntity = PlayerPedId()
      }, {
        speed = 5
      } = {}) => {
        let _0x552004 = false;
        const _0x2b2372 = async () => {
          try {
            TaskGoToEntity(_0x5954c0, targetEntity, -1, 2, speed, 0, 0);
            while (!_0x552004) {
              if (GetScriptTaskStatus(_0x5954c0, 1227113341) === 7 && !_0x552004) {
                TaskGoToEntity(_0x5954c0, targetEntity, -1, 2, speed, 0, 0);
              }
              await new Promise(_0x356db5 => setTimeout(_0x356db5, 500));
            }
          } catch (_0x1d9c24) {
            console.error(_0x1d9c24);
          }
          ClearPedTasks(_0x5954c0);
        };
        const _0x2af494 = {
          perform: _0x2b2372,
          cancel: () => _0x552004 = true
        };
        return _0x2af494;
      };
      ;
      const _0x1bbf39 = _0x81a5fd => {
        let _0x102513 = GetVehicleMaxNumberOfPassengers(_0x81a5fd);
        while (_0x102513--) {
          if (IsVehicleSeatFree(_0x81a5fd, _0x102513)) {
            return _0x102513;
          }
        }
        return null;
      };
      ;
      const _0x550959 = (_0x41d5ab, {
        targetVehicle: _0x26f548,
        instant: _0x1d400a
      }, {
        speed = 4,
        animate = true
      } = {}) => {
        let _0x4774bd = false;
        const _0x3ba3e3 = GetModelDimensions(GetEntityModel(_0x26f548));
        const _0x54b199 = async () => {
          try {
            const _0x281b2d = _0x574e0d[GetEntityModel(_0x41d5ab)];
            const _0x3ae364 = _0x281b2d?.sitCar?.dictionary || _0x281b2d?.sit?.dictionary || "creatures@rottweiler@in_vehicle@std_car";
            const _0x4ae312 = _0x281b2d?.sitCar?.anim || _0x281b2d?.sit?.anim || "sit";
            let _0x2dcd92 = _0x1bbf39(_0x26f548);
            const [[_0x30488d, _0x11e3d7], [_0x16fb84, _0x320430]] = _0x3ba3e3;
            const _0x46e020 = Math.max(_0x16fb84 - _0x30488d, _0x320430 - _0x11e3d7);
            if (_0x2dcd92 !== null) {
              if (!_0x1d400a) {
                TaskGoToEntity(_0x41d5ab, _0x26f548, 5000, _0x46e020, speed, 0, 0);
                while (GetScriptTaskStatus(_0x41d5ab, 1227113341) !== 7 && !_0x4774bd) {
                  await new Promise(_0x362514 => setTimeout(_0x362514, 100));
                }
              }
              _0x2dcd92 = _0x1bbf39(_0x26f548);
              if (_0x2dcd92 !== null) {
                let _0x38c04e = 0;
                while (!IsPedInAnyVehicle(_0x41d5ab, true) && _0x38c04e++ < 5) {
                  _0x2dcd92 = _0x1bbf39(_0x26f548);
                  TaskWarpPedIntoVehicle(_0x41d5ab, _0x26f548, _0x2dcd92);
                  await new Promise(_0x1d0398 => setTimeout(_0x1d0398, 10));
                }
                if (animate) {
                  RequestAnimDict(_0x3ae364);
                  await new Promise(_0x3a2156 => setTimeout(_0x3a2156, 1000));
                  while (!HasAnimDictLoaded(_0x3ae364)) {
                    await new Promise(_0x32276e => setTimeout(_0x32276e, 100));
                  }
                  if (!_0x4774bd) {
                    TaskPlayAnim(_0x41d5ab, _0x3ae364, _0x4ae312, 8, -8, -1, 2, 0, false, false, false);
                    await new Promise(_0x23a1dc => setTimeout(_0x23a1dc, 100));
                  }
                }
                while (!_0x4774bd && IsPedInAnyVehicle(_0x41d5ab, false)) {
                  await new Promise(_0x311f0e => setTimeout(_0x311f0e, 100));
                }
                if (IsPedInAnyVehicle(_0x41d5ab, false)) {
                  const [_0x242f4c, _0x397ebc, _0x57a612] = GetEntryPositionOfDoor(_0x26f548, _0x2dcd92);
                  SetEntityCoords(_0x41d5ab, _0x242f4c, _0x397ebc, _0x57a612, true, false, false, false);
                  TaskPlayAnim(_0x41d5ab, _0x3ae364, "get_out", 8, -8, -1, 2, 0, false, false, false);
                  await new Promise(_0xe95942 => setTimeout(_0xe95942, 100));
                }
              }
            }
          } catch (_0x3e848e) {
            console.error(_0x3e848e);
          }
          ClearPedTasks(_0x41d5ab);
        };
        const _0x29387f = {
          perform: _0x54b199,
          cancel: () => _0x4774bd = true
        };
        return _0x29387f;
      };
      ;
      const _0x94141d = (_0x303c69, {
        radius = 15,
        minLength = 3,
        timeBetweenWalks = 10
      }, {} = {}) => {
        let _0x2054a6 = false;
        const _0x27bb37 = async () => {
          try {
            const [_0x5275c0, _0x34f3e6, _0x2c8bc2] = GetEntityCoords(PlayerPedId(), true);
            TaskWanderInArea(_0x303c69, _0x5275c0, _0x34f3e6, _0x2c8bc2, radius, minLength, timeBetweenWalks);
            while (!_0x2054a6 && GetScriptTaskStatus(_0x303c69, 923520851) !== 7) {
              await new Promise(_0x4c1699 => setTimeout(_0x4c1699, 100));
            }
          } catch (_0x4e7d5c) {
            console.error(_0x4e7d5c);
          }
          ClearPedTasks(_0x303c69);
        };
        const _0x260fcb = {
          perform: _0x27bb37,
          cancel: () => _0x2054a6 = true
        };
        return _0x260fcb;
      };
      ;
      const _0x38dc09 = (_0x4bf8f0, {
        targetEntity: _0x2cacd1
      }, {} = {}) => {
        let _0x30e430 = false;
        const _0x221849 = async () => {
          try {
            TaskTurnPedToFaceEntity(_0x4bf8f0, _0x2cacd1, -1);
            while (!_0x30e430 && GetScriptTaskStatus(_0x4bf8f0, 3419293077) !== 7) {
              await new Promise(_0x45d21a => setTimeout(_0x45d21a, 100));
            }
          } catch (_0x321503) {
            console.error(_0x321503);
          }
          ClearPedTasks(_0x4bf8f0);
        };
        const _0x25f314 = {
          perform: _0x221849,
          cancel: () => _0x30e430 = true
        };
        return _0x25f314;
      };
      ;
      const _0x381a64 = (_0x1ac4ce, {
        targetEntity: _0x26e4bf
      }, {
        speed = 4
      } = {}) => {
        let _0x29cca4 = false;
        const _0x5f4d8f = {
          targetEntity: _0x26e4bf,
          repeatMove: false
        };
        const _0x5d96e9 = {
          speed: speed
        };
        const _0x37fabb = _0x46aa73(_0x1ac4ce, _0x5f4d8f, _0x5d96e9);
        const _0x483695 = _0x35fd7c(_0x1ac4ce);
        const _0x5a2049 = _0x20066f(_0x1ac4ce);
        const _0x3f7145 = async () => {
          try {
            await _0x37fabb.perform();
            if (_0x29cca4) {
              return;
            }
            let _0x511e33 = false;
            const _0xc89e43 = GetEntityType(_0x26e4bf);
            if (_0xc89e43 === 1) {
              _0x511e33 = await RPC.execute("vrp-companions:sniffTarget", "ped", GetPlayerServerId(NetworkGetPlayerIndexFromPed(_0x26e4bf)));
            } else if (_0xc89e43 === 2) {
              const _0x596a57 = _0x4bf432.g.exports["vrp-vehicles"].GetVehicleIdentifier(_0x26e4bf);
              if (_0x596a57) {
                const _0x3e2c67 = [...Array(10)].map((_0x1c75d5, _0x3d02c5) => {
                  const _0x58b91f = GetPedInVehicleSeat(_0x26e4bf, _0x3d02c5 - 1);
                  if (_0x58b91f) {
                    const _0x3c29bd = NetworkGetPlayerIndexFromPed(_0x58b91f);
                    return GetPlayerServerId(_0x3c29bd);
                  }
                }).filter(_0xf665da => !!_0xf665da);
                _0x511e33 = await RPC.execute("vrp-companions:sniffTarget", "vehicle", _0x596a57, _0x3e2c67);
              }
            } else if (_0xc89e43 === 3) {
              const _0x4631eb = GetEntityCoords(_0x26e4bf, true);
              _0x511e33 = await RPC.execute("vrp-companions:sniffTarget", "dumpster", parseInt(String(_0x4631eb[0])), parseInt(String(_0x4631eb[1])));
            }
            if (_0x29cca4) {
              return;
            }
            if (_0x511e33) {
              emit("DoLHudText", 1, "companions-sniff-found", "Your animal found something!");
              setTimeout(() => _0x483695.cancel(), 1000);
              await _0x483695.perform();
              if (_0x29cca4) {
                return;
              }
              await _0x5a2049.perform();
            } else {
              emit("DoLHudText", 1, "companions-sniff-not-found", "Your animal didn't seem to find anything.");
            }
          } catch (_0x1b8324) {
            console.error(_0x1b8324);
          }
          ClearPedTasks(_0x1ac4ce);
        };
        return {
          perform: _0x3f7145,
          cancel: () => {
            _0x37fabb.cancel();
            _0x5a2049.cancel();
            _0x483695.cancel();
            _0x29cca4 = true;
          }
        };
      };
      ;
      const _0x1842dc = (_0x1cc78f, {
        ignoreServerIds: pIgnor
      }, {
        speed = 4
      } = {}) => {
        let _0x4bd197 = false;
        let _0x24ebaa = null;
        const _0x449003 = _0x20066f(_0x1cc78f);
        const _0x1f76f0 = async () => {
          const pCoords = GetEntityCoords(_0x1cc78f, true);
          const _0x159f90 = {
            x: pCoords[0],
            y: pCoords[1],
            z: pCoords[2]
          };
          const pEvidence = _0x4bf432.g.exports["vrp-evidence"].getNearbyEvidence(_0x159f90, 3);
          let _0x34fa58 = null;
          let _0x2dd3a5 = null;
          if (Array.isArray(pEvidence) && pEvidence.length > 0) {
            const _0x584f57 = pEvidence.map(_0x50ab44 => {
              const _0x50e7bd = _0x4bf432.g.exports["vrp-evidence"].getEvidenceById(_0x50ab44);
              if (_0x50e7bd && _0x50e7bd.serverId) {
                const _0x222c50 = GetPlayerPed(GetPlayerFromServerId(_0x50e7bd.serverId));
                if (_0x222c50 && DoesEntityExist(_0x222c50) && DecorGetInt(_0x222c50, "EmergencyType") < 1) {
                  return _0x222c50;
                }
              }
            }).filter((_0x402b76, _0x40e589, _0x35212f) => _0x402b76 && _0x35212f.indexOf(_0x402b76) === _0x40e589);
            if (_0x584f57.length > 0) {
              _0x2dd3a5 = _0x584f57[0];
              _0x34fa58 = GetEntityCoords(_0x2dd3a5, false);
            }
          }
          if (!_0x2dd3a5) {
            const _0x1b90a7 = await RPC.execute("vrp-companions:getClosestPlayer", pCoords, pIgnor);
            if (!_0x1b90a7) {
              TriggerEvent("DoLongHudText", "They don't seem interested in any tracks");
              await _0x449003.perform();
              return;
            }
            _0x34fa58 = _0x1b90a7.coords;
            _0x2dd3a5 = GetPlayerPed(GetPlayerFromServerId(_0x1b90a7.serverId));
          }
          const _0x418dd4 = {
            speed: speed
          };
          _0x24ebaa = _0x46aa73(_0x1cc78f, _0x2dd3a5 ? {
            targetEntity: _0x2dd3a5,
            targetCoords: _0x34fa58 || undefined,
            repeatMove: true
          } : {
            targetCoords: _0x34fa58
          }, _0x418dd4);
          await _0x24ebaa.perform();
        };
        return {
          perform: _0x1f76f0,
          cancel: () => {
            _0x4bd197 = true;
            if (_0x24ebaa) {
              _0x24ebaa.cancel();
            }
            _0x449003.cancel();
          }
        };
      };
      ;
      const _0x20066f = _0xadf949("sit");
      const _0x35fd7c = _0xadf949("bark", 3);
      const _0x58557e = _0xadf949("beg", 3, 3000);
      const _0x34fcea = _0xadf949("laydown");
      const _0x19f6bd = _0xadf949("taunt", 3);
      const _0x250e88 = _0xadf949("stretch");
      const _0x4f3e6d = _0xadf949("paw", 2, 3000);
      const _0x153f34 = _0xadf949("peck", 3);
      const _0x148b08 = _0xadf949("graze", 3);
      const _0x221a7b = _0xadf949("howl");
      const _0x1e2179 = _0xadf949("playdead");
      const _0x23867c = () => ({
        perform: async () => null,
        cancel: () => null
      });
      const _0xe5776e = _0x23867c;
      ;
      const _0x1e1a75 = ({
        type: _0x4f6658,
        name: _0x51fa4b,
        model: _0xe3b913,
        numVariations = 0,
        variableComponent: _0x65ddb7,
        components: _0x5bf275,
        image: _0x247c74,
        baseConfig: _0x5e84e9,
        behaviourConfig: _0x4fc6f1,
        accessories = [],
        weapon: _0x1f3cb0,
        restricted = false
      }) => ({
        pedConfig: {
          type: _0x4f6658,
          name: _0x51fa4b,
          appearance: {
            model: _0xe3b913,
            components: _0x5bf275.map(([_0x2afd03, _0x24ad97, _0x4548a3, _0x203610]) => ({
              componentId: _0x2afd03,
              drawableId: _0x24ad97,
              textureId: _0x4548a3,
              paletteId: _0x203610
            }))
          }
        },
        numVariations: numVariations,
        variableComponent: _0x65ddb7 ? {
          componentId: _0x65ddb7[0],
          drawableId: _0x65ddb7[1],
          textureId: _0x65ddb7[2],
          paletteId: _0x65ddb7[3]
        } : undefined,
        image: _0x247c74,
        baseConfig: _0x5e84e9,
        behaviourConfig: _0x4fc6f1,
        accessories: accessories,
        weapon: _0x1f3cb0,
        restricted: restricted
      });
      const _0x11c108 = {
        move: true,
        follow: true,
        wander: true
      };
      const _0x48d555 = Object.assign(Object.assign({}, _0x11c108), {
        bark: true,
        playdead: true,
        sit: true,
        vehicle: true
      });
      const _0xd15a8b = Object.assign(Object.assign({}, _0x48d555), {
        attack: true,
        beg: true,
        laydown: true,
        playdead: true,
        taunt: true,
        paw: true
      });
      const _0x3bb767 = Object.assign(Object.assign({}, _0xd15a8b), {
        track: {
          speed: 3
        },
        untrack: true,
        sniff: true
      });
      const _0x11cd5c = [_0x1e1a75({
        type: "chop_lspd",
        name: _L("companions-name-lspd-chop", "LSPD Chop"),
        model: "a_c_chop",
        components: [[3, 1, 0, 0]],
        image: "https://i.imgur.com/rwKGt2b.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "chop_troopers",
        name: _L("companions-name-troopers-chop", "Troopers Chop"),
        model: "a_c_chop",
        components: [[3, 1, 1, 0]],
        image: "https://i.imgur.com/rwKGt2b.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "chop_bcso",
        name: _L("companions-name-bcso-chop", "BCSO Chop"),
        model: "a_c_chop",
        components: [[3, 1, 2, 0]],
        image: "https://i.imgur.com/rwKGt2b.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "chop_doc",
        name: _L("companions-name-doc-chop", "DOC Chop"),
        model: "a_c_chop",
        components: [[3, 1, 3, 0]],
        image: "https://i.imgur.com/rwKGt2b.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "chop_rangers",
        name: _L("companions-name-rangers-chop", "Rangers Chop"),
        model: "a_c_chop",
        components: [[3, 1, 4, 0]],
        image: "https://i.imgur.com/rwKGt2b.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "chop_therapy",
        name: _L("companions-name-therapy-chop", "Therapy Chop"),
        model: "a_c_chop",
        components: [[3, 1, 5, 0]],
        image: "https://i.imgur.com/rwKGt2b.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "husky_lspd",
        name: _L("companions-name-lspd-husky", "LSPD Husky"),
        model: "a_c_husky_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 0, 0]],
        image: "https://i.imgur.com/Kc51atn.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "husky_troopers",
        name: _L("companions-name-troopers-husky", "Troopers Husky"),
        model: "a_c_husky_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 1, 0]],
        image: "https://i.imgur.com/Kc51atn.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "husky_bcso",
        name: _L("companions-name-bcso-husky", "BCSO Husky"),
        model: "a_c_husky_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 2, 0]],
        image: "https://i.imgur.com/Kc51atn.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "husky_doc",
        name: _L("companions-name-doc-husky", "DOC Husky"),
        model: "a_c_husky_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 3, 0]],
        image: "https://i.imgur.com/Kc51atn.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "husky_rangers",
        name: _L("companions-name-rangers-husky", "Rangers Husky"),
        model: "a_c_husky_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 4, 0]],
        image: "https://i.imgur.com/Kc51atn.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "husky_therapy",
        name: _L("companions-name-therapy-husky", "Therapy Husky"),
        model: "a_c_husky_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 5, 0]],
        image: "https://i.imgur.com/Kc51atn.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "retriever_lspd",
        name: _L("companions-name-lspd-retriever", "LSPD Retriever"),
        model: "a_c_retriever_np",
        numVariations: 3,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 0, 0]],
        image: "https://i.imgur.com/U2EjWoU.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "retriever_troopers",
        name: _L("companions-name-troopers-retriever", "Troopers Retriever"),
        model: "a_c_retriever_np",
        numVariations: 3,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 1, 0]],
        image: "https://i.imgur.com/U2EjWoU.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "retriever_bcso",
        name: _L("companions-name-bcso-retriever", "BCSO Retriever"),
        model: "a_c_retriever_np",
        numVariations: 3,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 2, 0]],
        image: "https://i.imgur.com/U2EjWoU.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "retriever_doc",
        name: _L("companions-name-doc-retriever", "DOC Retriever"),
        model: "a_c_retriever_np",
        numVariations: 3,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 3, 0]],
        image: "https://i.imgur.com/U2EjWoU.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "retriever_rangers",
        name: _L("companions-name-rangers-retriever", "Rangers Retriever"),
        model: "a_c_retriever_np",
        numVariations: 3,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 4, 0]],
        image: "https://i.imgur.com/U2EjWoU.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "retriever_therapy",
        name: _L("companions-name-therapy-retriever", "Therapy Retriever"),
        model: "a_c_retriever_np",
        numVariations: 3,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 5, 0]],
        image: "https://i.imgur.com/U2EjWoU.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "shepherd_lspd",
        name: _L("companions-name-lspd-shepherd", "LSPD Shepherd"),
        model: "a_c_shepherd_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 0, 0]],
        image: "https://i.imgur.com/ZK58r7W.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "shepherd_troopers",
        name: _L("companions-name-troopers-shepherd", "Troopers Shepherd"),
        model: "a_c_shepherd_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 1, 0]],
        image: "https://i.imgur.com/ZK58r7W.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "shepherd_bcso",
        name: _L("companions-name-bcso-shepherd", "BCSO Shepherd"),
        model: "a_c_shepherd_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 2, 0]],
        image: "https://i.imgur.com/ZK58r7W.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "shepherd_doc",
        name: _L("companions-name-doc-shepherd", "DOC Shepherd"),
        model: "a_c_shepherd_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 3, 0]],
        image: "https://i.imgur.com/ZK58r7W.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "shepherd_rangers",
        name: _L("companions-name-rangers-shepherd", "Rangers Shepherd"),
        model: "a_c_shepherd_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 4, 0]],
        image: "https://i.imgur.com/ZK58r7W.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "shepherd_therapy",
        name: _L("companions-name-therapy-shepherd", "Therapy Shepherd"),
        model: "a_c_shepherd_np",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 1, 5, 0]],
        image: "https://i.imgur.com/ZK58r7W.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "pit_lspd",
        name: _L("companions-name-lspd-pit", "LSPD Pit"),
        model: "a_c_pit_np",
        numVariations: 2,
        variableComponent: [4, 0, 0, 0],
        components: [[3, 1, 0, 0]],
        image: "https://i.imgur.com/ID7Q0rC.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "pit_bcso",
        name: _L("companions-name-bcso-pit", "BCSO Pit"),
        model: "a_c_pit_np",
        numVariations: 2,
        variableComponent: [4, 0, 0, 0],
        components: [[3, 1, 1, 0]],
        image: "https://i.imgur.com/ID7Q0rC.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "pit_troopers",
        name: _L("companions-name-troopers-pit", "Troopers Pit"),
        model: "a_c_pit_np",
        numVariations: 2,
        variableComponent: [4, 0, 0, 0],
        components: [[3, 1, 2, 0]],
        image: "https://i.imgur.com/ID7Q0rC.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "pit_doc",
        name: _L("companions-name-doc-pit", "DOC Pit"),
        model: "a_c_pit_np",
        numVariations: 2,
        variableComponent: [4, 0, 0, 0],
        components: [[3, 1, 3, 0]],
        image: "https://i.imgur.com/ID7Q0rC.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "pit_rangers",
        name: _L("companions-name-rangers-pit", "Rangers Pit"),
        model: "a_c_pit_np",
        numVariations: 2,
        variableComponent: [4, 0, 0, 0],
        components: [[3, 1, 4, 0]],
        image: "https://i.imgur.com/ID7Q0rC.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "pit_therapy",
        name: _L("companions-name-therapy-pit", "Therapy Pit"),
        model: "a_c_pit_np",
        numVariations: 2,
        variableComponent: [4, 0, 0, 0],
        components: [[3, 1, 5, 0]],
        image: "https://i.imgur.com/ID7Q0rC.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: _0x3bb767
      }), _0x1e1a75({
        type: "pug_lspd",
        name: _L("companions-name-lspd-pug", "LSPD Pug"),
        model: "a_c_pug_np",
        numVariations: 3,
        variableComponent: [4, 0, 0, 0],
        components: [[2, 0, 0, 0], [3, -1, 0, 0], [10, 1, 0, 0], [11, 1, 0, 0]],
        image: "https://i.imgur.com/POlVhoO.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: Object.assign(Object.assign({}, _0xd15a8b), {
          attack: false
        })
      }), _0x1e1a75({
        type: "panther",
        name: _L("companions-name-panther", "Panther"),
        model: "a_c_panther",
        numVariations: 1,
        components: [],
        variableComponent: [0, 0, 0, 0],
        image: "https://i.imgur.com/XyEEplC.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true,
          laydown: true,
          attack: {},
          taunt: true
        })
      }), _0x1e1a75({
        type: "leopard",
        name: _L("companions-name-leopard", "Leopard"),
        model: "a_c_leopard",
        components: [],
        variableComponent: [0, 0, 0, 0],
        image: "https://i.imgur.com/MLpm8CM.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true,
          laydown: true,
          attack: {},
          taunt: true
        })
      }), _0x1e1a75({
        type: "Lostdog",
        name: _L("companions-name-lostdog", "Lostdog"),
        model: "a_c_lostdog",
        components: [],
        variableComponent: [0, 0, 0, 0],
        image: "https://i.imgur.com/ID7Q0rC.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true,
          laydown: true,
          taunt: true
        })
      }), _0x1e1a75({
        type: "lion",
        name: _L("companions-name-lion", "Lion"),
        model: "a_c_mtlion",
        components: [],
        image: "https://i.imgur.com/rlzWKNN.png",
        baseConfig: {
          speed: 6
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true,
          laydown: true,
          taunt: true
        })
      }), _0x1e1a75({
        type: "coyote",
        name: _L("companions-name-coyote", "Coyote"),
        model: "a_c_coyote",
        numVariations: 3,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/DSLIlIW.png",
        baseConfig: {
          speed: 4
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true,
          laydown: true,
          howl: true
        })
      }), _0x1e1a75({
        type: "pit",
        name: _L("companions-name-pit", "Pit"),
        numVariations: 2,
        model: "a_c_pit_np",
        variableComponent: [4, 0, 0, 0],
        components: [[3, 0, 0, 0]],
        image: "https://i.imgur.com/ID7Q0rC.png",
        baseConfig: {
          speed: 5
        },
        behaviourConfig: Object.assign(Object.assign({}, _0xd15a8b), {
          attack: false
        }),
        accessories: [{
          name: "Leather Pit collar",
          type: "ped",
          image: "https://i.imgur.com/zOfXwyx.png",
          componentId: 3,
          drawableId: 0,
          textureId: 0
        }, {
          name: "Black & White Pit collar",
          type: "ped",
          image: "https://i.imgur.com/GUn2XAh.png",
          componentId: 3,
          drawableId: 0,
          textureId: 1
        }, {
          name: "White Pit collar",
          type: "ped",
          image: "https://i.imgur.com/a6iOYas.png",
          componentId: 3,
          drawableId: 0,
          textureId: 2
        }, {
          name: "Yellow Pit collar",
          type: "ped",
          image: "https://i.imgur.com/0HUyJlO.png",
          componentId: 3,
          drawableId: 0,
          textureId: 3
        }, {
          name: "Green Pit collar",
          type: "ped",
          image: "https://i.imgur.com/XLOlYcE.png",
          componentId: 3,
          drawableId: 0,
          textureId: 4
        }, {
          name: "Pink Pit collar",
          type: "ped",
          image: "https://i.imgur.com/Qvzq9SO.png",
          componentId: 3,
          drawableId: 0,
          textureId: 5
        }]
      }), _0x1e1a75({
        type: "husky",
        name: _L("companions-name-husky", "Husky"),
        numVariations: 5,
        model: "a_c_husky",
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/bDmN843.png",
        baseConfig: {
          speed: 5
        },
        behaviourConfig: Object.assign(Object.assign({}, _0xd15a8b), {
          attack: false
        })
      }), _0x1e1a75({
        type: "chop",
        name: _L("companions-name-chop", "Rottweiler"),
        numVariations: 0,
        model: "a_c_chop",
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/rwKGt2b.png",
        baseConfig: {
          speed: 5
        },
        behaviourConfig: Object.assign(Object.assign({}, _0xd15a8b), {
          attack: false
        }),
        accessories: [{
          name: "Leather Rottweiler collar",
          type: "ped",
          image: "https://i.imgur.com/zOfXwyx.png",
          componentId: 3,
          drawableId: 0,
          textureId: 0
        }, {
          name: "Black & White Rottweiler collar",
          type: "ped",
          image: "https://i.imgur.com/GUn2XAh.png",
          componentId: 3,
          drawableId: 0,
          textureId: 1
        }, {
          name: "White Rottweiler collar",
          type: "ped",
          image: "https://i.imgur.com/a6iOYas.png",
          componentId: 3,
          drawableId: 0,
          textureId: 2
        }, {
          name: "Yellow Rottweiler collar",
          type: "ped",
          image: "https://i.imgur.com/0HUyJlO.png",
          componentId: 3,
          drawableId: 0,
          textureId: 3
        }, {
          name: "Green Rottweiler collar",
          type: "ped",
          image: "https://i.imgur.com/XLOlYcE.png",
          componentId: 3,
          drawableId: 0,
          textureId: 4
        }, {
          name: "Pink Rottweiler collar",
          type: "ped",
          image: "https://i.imgur.com/Qvzq9SO.png",
          componentId: 3,
          drawableId: 0,
          textureId: 5
        }]
      }), _0x1e1a75({
        type: "shepherd",
        name: _L("companions-name-shepherd", "Shepherd"),
        numVariations: 2,
        model: "a_c_shepherd_np",
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/ZK58r7W.png",
        baseConfig: {
          speed: 5
        },
        behaviourConfig: Object.assign(Object.assign({}, _0xd15a8b), {
          attack: false
        })
      }), _0x1e1a75({
        type: "retriever",
        name: _L("companions-name-retriever", "Retriever"),
        numVariations: 3,
        model: "a_c_retriever_np",
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/U2EjWoU.png",
        baseConfig: {
          speed: 5
        },
        behaviourConfig: Object.assign(Object.assign({}, _0xd15a8b), {
          attack: false
        })
      }), _0x1e1a75({
        type: "cat",
        name: _L("companions-name-cat", "Cat"),
        model: "a_c_cat_01",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/pOrdQNC.png",
        baseConfig: {
          speed: 3
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true,
          stretch: true,
          laydown: true
        })
      }), _0x1e1a75({
        type: "pug",
        name: _L("companions-name-pug", "Pug"),
        model: "a_c_pug",
        numVariations: 3,
        variableComponent: [4, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/POlVhoO.png",
        baseConfig: {
          speed: 4
        },
        behaviourConfig: _0x48d555,
        accessories: [{
          name: "Leather Pug collar",
          type: "ped",
          image: "https://i.imgur.com/zOfXwyx.png",
          componentId: 3,
          drawableId: 0,
          textureId: 0
        }, {
          name: "Black & White Pug collar",
          type: "ped",
          image: "https://i.imgur.com/GUn2XAh.png",
          componentId: 3,
          drawableId: 0,
          textureId: 1
        }, {
          name: "White Pug collar",
          type: "ped",
          image: "https://i.imgur.com/a6iOYas.png",
          componentId: 3,
          drawableId: 0,
          textureId: 2
        }, {
          name: "Yellow Pug collar",
          type: "ped",
          image: "https://i.imgur.com/0HUyJlO.png",
          componentId: 3,
          drawableId: 0,
          textureId: 3
        }, {
          name: "Green Pug collar",
          type: "ped",
          image: "https://i.imgur.com/XLOlYcE.png",
          componentId: 3,
          drawableId: 0,
          textureId: 4
        }, {
          name: "Pink Pug collar",
          type: "ped",
          image: "https://i.imgur.com/Qvzq9SO.png",
          componentId: 3,
          drawableId: 0,
          textureId: 5
        }]
      }), _0x1e1a75({
        type: "poodle",
        name: _L("companions-name-poodle", "Poodle"),
        model: "a_c_poodle",
        components: [],
        image: "https://i.imgur.com/fTgoZFW.png",
        baseConfig: {
          speed: 4
        },
        behaviourConfig: _0x48d555
      }), _0x1e1a75({
        type: "westy",
        name: _L("companions-name-westy", "Westy"),
        model: "a_c_westy",
        numVariations: 2,
        variableComponent: [4, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/IeClsnO.png",
        baseConfig: {
          speed: 4
        },
        behaviourConfig: _0x48d555,
        accessories: [{
          name: "Leather Westy collar",
          type: "ped",
          image: "https://i.imgur.com/zOfXwyx.png",
          componentId: 3,
          drawableId: 0,
          textureId: 0
        }, {
          name: "Black & White Westy collar",
          type: "ped",
          image: "https://i.imgur.com/GUn2XAh.png",
          componentId: 3,
          drawableId: 0,
          textureId: 1
        }, {
          name: "White Westy collar",
          type: "ped",
          image: "https://i.imgur.com/a6iOYas.png",
          componentId: 3,
          drawableId: 0,
          textureId: 2
        }, {
          name: "Yellow Westy collar",
          type: "ped",
          image: "https://i.imgur.com/0HUyJlO.png",
          componentId: 3,
          drawableId: 0,
          textureId: 3
        }, {
          name: "Green Westy collar",
          type: "ped",
          image: "https://i.imgur.com/XLOlYcE.png",
          componentId: 3,
          drawableId: 0,
          textureId: 4
        }, {
          name: "Pink Westy collar",
          type: "ped",
          image: "https://i.imgur.com/Qvzq9SO.png",
          componentId: 3,
          drawableId: 0,
          textureId: 5
        }]
      }), _0x1e1a75({
        type: "cow",
        name: _L("companions-name-cow", "Cow"),
        model: "a_c_cow",
        numVariations: 3,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/TdSko7H.png",
        baseConfig: {
          speed: 2
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          graze: true
        }),
        accessories: [{
          name: "Cow bell",
          type: "ped",
          image: "https://i.imgur.com/Z81QvV8.png",
          componentId: 3,
          drawableId: 1,
          textureId: 0
        }]
      }), _0x1e1a75({
        type: "hen",
        name: _L("companions-name-hen", "Hen"),
        model: "a_c_hen",
        components: [],
        image: "https://i.imgur.com/igYm4Mi.png",
        baseConfig: {
          speed: 1
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true,
          peck: true
        })
      }), _0x1e1a75({
        type: "rabbit",
        name: _L("companions-name-rabbit", "Rabbit"),
        model: "a_c_rabbit_01",
        numVariations: 8,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/PRt9vi4.png",
        baseConfig: {
          speed: 2
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true
        })
      }), _0x1e1a75({
        type: "rat",
        name: _L("companions-name-rat", "Rat"),
        model: "a_c_rat",
        numVariations: 0,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/n8s2KEI.png",
        baseConfig: {
          speed: 2
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true
        })
      }), _0x1e1a75({
        type: "deer",
        name: _L("companions-name-deer", "Deer"),
        model: "a_c_deer",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/Ej9Ze76.png",
        baseConfig: {
          speed: 4
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          graze: true
        }),
        accessories: [{
          name: "Deer Antlers",
          image: "https://i.imgur.com/l8Hm5TI.png",
          type: "ped",
          componentId: 8,
          drawableId: 1,
          textureId: 0
        }]
      }), _0x1e1a75({
        type: "pig",
        name: _L("companions-name-pig", "Pig"),
        model: "a_c_pig",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/Wf5jpe0.png",
        baseConfig: {
          speed: 2
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          graze: true
        })
      }), _0x1e1a75({
        type: "boar",
        name: _L("companions-name-boar", "Boar"),
        model: "a_c_boar",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/RG4tTdj.png",
        baseConfig: {
          speed: 3
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          graze: true
        })
      }), _0x1e1a75({
        type: "chimp",
        name: _L("companions-name-chimp", "Chimp"),
        model: "a_c_chimp",
        numVariations: 0,
        variableComponent: [0, 0, 0, 0],
        components: [[11, 0, 2, 0]],
        image: "https://i.imgur.com/41BE6bk.png",
        baseConfig: {
          speed: 5
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: {
            animate: false
          }
        })
      }), _0x1e1a75({
        type: "francis",
        name: _L("companions-name-francis", "Francis"),
        model: "mini_francis",
        numVariations: 0,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/41BE6bk.png",
        baseConfig: {
          speed: 5
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          attack: true,
          vehicle: true
        })
      }), _0x1e1a75({
        type: "crow",
        name: _L("companions-name-crow", "Crow"),
        model: "a_c_crow",
        numVariations: 0,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/XNpo1WL.png",
        baseConfig: {
          speed: 1
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true
        })
      }), _0x1e1a75({
        type: "gigacrow",
        name: _L("companions-name-gigacrow", "Gigacrow"),
        model: "np_crow",
        numVariations: 2,
        variableComponent: [5, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/Fo9aNpV.png",
        baseConfig: {
          speed: 1
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true
        })
      }), _0x1e1a75({
        type: "cormorant",
        name: _L("companions-name-cormorant", "Cormorant"),
        model: "a_c_cormorant",
        numVariations: 0,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/MoQIMaV.png",
        baseConfig: {
          speed: 1
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true
        })
      }), _0x1e1a75({
        type: "raccoon",
        name: _L("companions-name-raccoon", "Raccoon"),
        model: "a_c_raccoon_01",
        numVariations: 2,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/NWIlg0V.png",
        baseConfig: {
          speed: 3
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true,
          stretch: true,
          laydown: true
        })
      }), _0x1e1a75({
        type: "blackops",
        name: _L("companions-name-human", "Human"),
        model: "s_m_m_chemsec_01",
        numVariations: 0,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/rNEmYkS.png",
        baseConfig: {
          speed: 3
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          attack: true,
          vehicle: true
        }),
        weapon: "weapon_assaultrifle",
        restricted: true
      }), _0x1e1a75({
        type: "chupacabra",
        name: _L("companions-name-chupacabra", "Chupacabra"),
        model: "chupacabra",
        numVariations: 0,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/kYGQEeB.png",
        baseConfig: {
          speed: 3
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          vehicle: true
        }),
        restricted: true
      }), _0x1e1a75({
        type: "zombie",
        name: _L("companions-name-zombie", "Zombie"),
        model: ["zombie01", "zombie02", "zombie03", "zombie04", "zombie05", "zombie06", "zombie07"],
        numVariations: 0,
        variableComponent: [0, 0, 0, 0],
        components: [],
        image: "https://i.imgur.com/hc1clpx.png",
        baseConfig: {
          speed: 3
        },
        behaviourConfig: Object.assign(Object.assign({}, _0x11c108), {
          attack: true,
          vehicle: true
        }),
        restricted: true
      })];
      const _0x5d79fb = _0x11cd5c.reduce((_0x111130, _0x63d018) => {
        _0x111130[_0x63d018.pedConfig.type] = _0x63d018;
        return _0x111130;
      }, {});
      ;
      const _0x387649 = async (_0x5b52e8, _0x412ace) => {
        let {
          type: _0x3a2327,
          appearance: _0x5d1fd2,
          maxHealth = 200
        } = _0x412ace;
        let _0x1e5b91 = null;
        let _0x38cdf5 = {
          ped: {},
          prop: {}
        };
        let _0x3ba753 = null;
        let _0x16ab33 = null;
        let _0x340a22 = null;
        let _0x4a315d = null;
        const _0x38baa9 = () => _0x3ba753;
        const _0x1c09fe = () => _0x3a2327;
        const _0x656005 = async (_0x3d991c, _0x586920, _0x55f1be, _0x553e60 = true) => {
          var _0x353022;
          var _0x19bfe0;
          const _0xd7b6fd = Array.isArray(_0x5d1fd2.model) ? _0x5d1fd2.model[Math.floor(Math.random() * _0x5d1fd2.model.length) - 1] : _0x5d1fd2.model;
          const _0x30c7e4 = GetHashKey(_0xd7b6fd);
          RequestModel(_0x30c7e4);
          while (!HasModelLoaded(_0x30c7e4)) {
            await new Promise(_0x4c94e5 => setTimeout(_0x4c94e5, 10));
          }
          _0x3ba753 = CreatePed(28, _0x30c7e4, _0x3d991c, _0x586920, _0x55f1be, 0, _0x553e60, false);
          if (_0x412ace.weapon) {
            GiveWeaponToPed(_0x3ba753, _0x412ace.weapon, 1000, false, true);
          }
          if ((_0x353022 = _0x412ace.appearance.components) === null || _0x353022 === undefined) {
            undefined;
          } else {
            _0x353022.forEach(_0x2b4dbe => {
              _0x272ce7(_0x37ffa2.ped, _0x2b4dbe, true);
            });
          }
          if ((_0x19bfe0 = _0x412ace.appearance.props) === null || _0x19bfe0 === undefined) {
            undefined;
          } else {
            _0x19bfe0.forEach(_0x3d59d2 => {
              _0x272ce7(_0x37ffa2.prop, _0x3d59d2, true);
            });
          }
          _0x16fdb2();
          SetBlockingOfNonTemporaryEvents(_0x3ba753, true);
          SetEntityMaxSpeed(_0x3ba753, 1000);
          SetPedFleeAttributes(_0x3ba753, 0, true);
          SetEntityMaxHealth(_0x3ba753, maxHealth);
          SetEntityHealth(_0x3ba753, maxHealth);
          return _0x3ba753;
        };
        const _0x272ce7 = (_0x371c63, _0x35c793, _0x318932 = false) => {
          let {
            componentId: _0x159820,
            drawableId: _0x20a1dc,
            textureId: _0x548fa5,
            paletteId: _0x1d5f61
          } = _0x35c793;
          if (!_0x318932) {
            if (_0x38cdf5[_0x371c63][_0x159820] && _0x38cdf5[_0x371c63][_0x159820].drawableId === _0x20a1dc && _0x38cdf5[_0x371c63][_0x159820].textureId === _0x548fa5) {
              _0x20a1dc = 0;
              _0x548fa5 = 0;
              _0x1d5f61 = 0;
            }
            _0x38cdf5[_0x371c63][_0x159820] = {
              componentId: _0x159820,
              drawableId: _0x20a1dc,
              textureId: _0x548fa5,
              paletteId: _0x1d5f61
            };
          }
          if (_0x371c63 === _0x37ffa2.ped) {
            SetPedComponentVariation(_0x3ba753, _0x159820, _0x20a1dc, _0x548fa5, _0x1d5f61 || 0);
          } else {
            SetPedPropIndex(_0x3ba753, _0x159820, _0x20a1dc, _0x548fa5, true);
          }
        };
        const _0x18f276 = () => {
          SetResourceKvp("COMPANION_" + _0x5b52e8, JSON.stringify(_0x38cdf5));
        };
        const _0x16fdb2 = () => {
          const _0x4a2e12 = GetResourceKvpString("COMPANION_" + _0x5b52e8);
          let _0x5ad038 = null;
          try {
            _0x5ad038 = JSON.parse(_0x4a2e12);
          } catch (_0x110b63) {
            console.log(_0x110b63);
          }
          if (!_0x5ad038) {
            _0x5ad038 = {
              ped: {},
              prop: {}
            };
          }
          Object.entries(_0x5ad038).forEach(([_0x57a2b7, _0x3ffe0b]) => {
            Object.values(_0x3ffe0b).forEach(_0x249d46 => {
              _0x272ce7(_0x57a2b7, _0x249d46);
            });
          });
        };
        const _0x4b9834 = async (_0x38a58e = false) => {
          emit("vrp-companions:dismissed", _0x5b52e8, _0x38a58e);
          clearInterval(_0x4a315d);
          _0x4a315d = null;
          if (_0x3ba753 && DoesEntityExist(_0x3ba753)) {
            const _0x1dd4e7 = NetworkGetNetworkIdFromEntity(_0x3ba753);
            emitNet("vrp-companions:destroyed", _0x1dd4e7);
            DeleteEntity(_0x3ba753);
            _0x3ba753 = null;
            return true;
          }
          return false;
        };
        const _0x3a10d1 = _0x26d729 => _0x5d79fb[_0x3a2327].behaviourConfig.hasOwnProperty(_0x26d729) && _0x5d79fb[_0x3a2327].behaviourConfig[_0x26d729];
        const _0x267d8f = async (_0x191d2e, _0x4c2e76) => {
          if (!_0x3a10d1(_0x191d2e)) {
            return;
          }
          const _0x2b7862 = _0x154ae6[_0x191d2e];
          const _0x5420a6 = _0x5d79fb[_0x3a2327].baseConfig;
          const _0x36cbd6 = _0x5d79fb[_0x3a2327].behaviourConfig;
          const _0x3b65b3 = Object.assign(Object.assign({}, _0x5420a6), _0x36cbd6[_0x191d2e] === true ? {} : _0x36cbd6[_0x191d2e]);
          if (!_0x16ab33) {
            _0x16ab33 = _0x2b7862(_0x3ba753, _0x4c2e76, _0x3b65b3);
            await _0x16ab33.perform();
            _0x16ab33 = null;
            while (_0x340a22) {
              _0x16ab33 = _0x340a22;
              _0x340a22 = null;
              await _0x16ab33.perform();
              _0x16ab33 = null;
            }
          } else {
            _0x340a22 = _0x2b7862(_0x3ba753, _0x4c2e76, _0x3b65b3);
            _0x16ab33.cancel();
          }
        };
        const _0x2df383 = () => {
          if (!_0x3ba753) {
            return null;
          }
          return GetEntityCoords(_0x3ba753, false);
        };
        GetGamePool("CPed").forEach(_0x59de2c => {
          if (DecorGetInt(_0x59de2c, "COMPANION_ID") === Number(_0x5b52e8)) {
            emitNet("vrp-companions:remove", NetworkGetNetworkIdFromEntity(_0x59de2c));
          }
        });
        const [_0x4b8875, _0x475ba8, _0x56b0a4] = GetEntityCoords(PlayerPedId(), true);
        _0x3ba753 = await _0x656005(_0x4b8875 - 2 + Math.random() * 4, _0x475ba8 - 2 + Math.random() * 4, _0x56b0a4);
        DecorSetInt(_0x3ba753, "COMPANION_ID", Number(_0x5b52e8));
        const _0x4e5414 = {
          id: _0x5b52e8,
          canPerform: _0x3a10d1,
          dismiss: _0x4b9834,
          getPedId: _0x38baa9,
          getPedCoords: _0x2df383,
          perform: _0x267d8f,
          applyAccessory: _0x272ce7,
          saveAccessories: _0x18f276,
          getType: _0x1c09fe
        };
        _0x1e5b91 = _0x4e5414;
        _0x4a315d = setInterval(() => {
          if (_0x3ba753 && !DoesEntityExist(_0x3ba753)) {
            _0x4b9834(true);
          }
        }, 1000);
        const _0x319200 = NetworkGetNetworkIdFromEntity(_0x3ba753);
        SetNetworkIdCanMigrate(_0x319200, false);
        emitNet("vrp-companions:created", _0x319200);
        emit("vrp-companions:summoned", _0x5b52e8, _0x3ba753);
        return _0x1e5b91;
      };
      ;
      const _0x2599cc = _0x177811("rcmnigel1c", "hailing_whistle_waive_a");
      const _0x263581 = new Map();
      on("gameEventTriggered", (_0x407c0d, _0x357449) => {
        if (_0x407c0d == "CEventNetworkEntityDamage" && _0x357449[0]) {
          const _0x587806 = _0x32c86a(_0x357449[0]);
          if (!_0x587806) {
            return;
          }
          emit("vrp-companions:damageTaken", _0x357449[0], _0x587806);
        }
      });
      const _0x26948f = async (_0x10f158, _0x534c7f) => {
        _0x263581.set(_0x10f158, await _0x387649(_0x10f158, _0x534c7f));
        _0x2599cc(PlayerPedId());
      };
      const _0x22a513 = _0x2037bd => {
        var _0x586101;
        if ((_0x586101 = _0x263581.get(_0x2037bd)) === null || _0x586101 === undefined) {
          undefined;
        } else {
          _0x586101.dismiss();
        }
        _0x263581.delete(_0x2037bd);
      };
      const _0x5a408b = (_0x126369, _0x2c247c, _0x14ef76 = {}) => {
        var _0x4e0306;
        if ((_0x4e0306 = _0x263581.get(_0x2c247c)) === null || _0x4e0306 === undefined) {
          return undefined;
        } else {
          return _0x4e0306.perform(_0x126369, _0x14ef76);
        }
      };
      const _0x541baf = (_0x46b536, _0x362adb = {}) => {
        Array.from(_0x263581.values()).forEach(_0x5bd481 => _0x5bd481.perform(_0x46b536, _0x362adb));
      };
      const _0x3369e7 = _0x36e9c1 => {
        var _0x183558;
        if ((_0x183558 = _0x263581.get(_0x36e9c1)) === null || _0x183558 === undefined) {
          return undefined;
        } else {
          return _0x183558.getPedId();
        }
      };
      const _0x3c5b12 = _0xe73a23 => {
        var _0x3e2625;
        if ((_0x3e2625 = _0x263581.get(_0xe73a23)) === null || _0x3e2625 === undefined) {
          return undefined;
        } else {
          return _0x3e2625.getPedCoords();
        }
      };
      const _0x5a7bdd = _0x1e6293 => {
        const _0x137044 = PlayerPedId();
        const _0x52e291 = GetEntityCoords(_0x137044, true);
        const _0x1cfcb5 = GetEntityHeading(_0x137044);
        const _0x52211a = Array.from(_0x263581.values()).filter(_0x3efe4d => _0x3efe4d.getType() === _0x1e6293).map(_0x5bcb7b => {
          const _0x58d738 = GetEntityCoords(_0x5bcb7b.getPedId(), false);
          const _0xf77fed = (_0x58d738[0] - _0x52e291[0]) ** 2 + (_0x58d738[1] - _0x52e291[1]) ** 2;
          const _0xea4486 = Math.atan2(_0x58d738[1] - _0x52e291[1], _0x58d738[0] - _0x52e291[0]) * 180 / Math.PI - 90;
          const _0x1f3dc8 = Math.abs((_0x1cfcb5 - _0xea4486 + 180) % 360 - 180);
          const _0x473ce9 = {
            companion: _0x5bcb7b,
            distance: _0xf77fed,
            diff: _0x1f3dc8
          };
          return _0x473ce9;
        }).filter(({
          distance: _0x8f2df2,
          diff: _0x5c5512
        }) => _0x8f2df2 < 3 && _0x5c5512 < 40).sort((_0x176040, _0x3dee99) => _0x176040.diff - _0x3dee99.diff)[0];
        if (_0x52211a) {
          const {
            companion: _0x576ed2
          } = _0x52211a;
          return _0x576ed2;
        }
        return null;
      };
      const _0x32c86a = _0x1b22ae => {
        return Array.from(_0x263581.values()).find(_0x5457c2 => _0x5457c2.getPedId() === _0x1b22ae)?.id;
      };
      const _0x3e0099 = (_0x28b9b0, _0x4ce84d) => {
        var _0x1aa05e;
        return ((_0x1aa05e = _0x263581.get(_0x28b9b0)) === null || _0x1aa05e === undefined ? undefined : _0x1aa05e.canPerform(_0x4ce84d)) || false;
      };
      const _0x1d045c = _0xfd0557 => Array.from(_0x263581.values()).some(_0x214df3 => _0x214df3.canPerform(_0xfd0557));
      ;
      const _0x29d987 = [];
      function _0x4d3f87(_0x3daa3e, _0x32ef21) {
        AddEventHandler("_npx_uiReq:" + _0x3daa3e, _0x32ef21);
        exports["vrp-ui"].RegisterUIEvent(_0x3daa3e);
        _0x29d987.push(_0x3daa3e);
      }
      function _0x25c4ae(_0x45eab3) {
        exports["vrp-ui"].SendUIMessage(_0x45eab3);
      }
      function _0x2a69db(_0x16f549, _0x3ead98) {
        exports["vrp-ui"].SetUIFocus(_0x16f549, _0x3ead98);
      }
      function _0x4aa5af() {
        return exports["vrp-ui"].GetUIFocus();
      }
      AddEventHandler("_npx_uiReady", () => {
        _0x29d987.forEach(_0x1fc0d7 => exports["vrp-ui"].RegisterUIEvent(_0x1fc0d7));
      });
      var _0x301c7e = _0x4bf432(636);
      ;
      let _0x316b00 = 0;
      let _0x4a2ac5 = null;
      let _0x2c2344 = null;
      let _0x38fd1c = true;
      let _0x31f89d = false;
      DecorRegister("COMPANION_ID", 3);
      let _0xb77cc1 = {
        [GetPlayerServerId(PlayerId())]: null
      };
      const _0x2f3df2 = () => Object.keys(_0xb77cc1).filter(_0x37fa57 => !_0xb77cc1[_0x37fa57] || _0xb77cc1[_0x37fa57] >= Date.now());
      const _0x8a2445 = [666561306, 218085040, -58485588, 682791951, -206690185, 364445978, 143369, 344662182, 1923262137, -686494084, 1419852836, -1149940374, -41273338, -686494084];
      _0x4d3f87("vrp-ui:pets:companionAction", (_0x2384e8, _0x3736db) => {
        _0x3736db({
          data: {},
          meta: {
            ok: true,
            message: ""
          }
        });
        if (_0x2384e8.key.action === "move" || _0x2384e8.key.action === "attack") {
          _0x2c2344 = _0x2384e8.key.companionId;
          _0x4a2ac5 = _0x2384e8.key.action;
          return;
        }
        if (_0x2384e8.key.action === "track") {
          _0x5a408b("track", _0x2384e8.key.companionId, {
            ignoreServerIds: _0x2f3df2()
          });
          exports["vrp-selector"].deselect();
          return;
        }
        _0x5a408b(_0x2384e8.key.action, _0x2384e8.key.companionId);
        exports["vrp-selector"].deselect();
      });
      _0x4d3f87("vrp-ui:pets:companionTargetAction", ({
        key: {
          action: _0x4f09eb,
          params: _0xe4881f
        }
      }, _0x3e188f) => {
        _0x3e188f({
          data: {},
          meta: {
            ok: true,
            message: ""
          }
        });
        if (_0x4f09eb === "untrack") {
          const _0x3c21ec = GetPlayerServerId(NetworkGetPlayerIndexFromPed(_0xe4881f.targetEntity));
          _0xb77cc1[_0x3c21ec] = Date.now() + 1800000;
          return;
        }
        _0x541baf(_0x4f09eb, _0xe4881f);
        _0x4bf432.g.exports["vrp-selector"].deselect();
      });
      const _0x40fee6 = _0x3492a3 => {
        const _0x34d5ca = [{
          behaviour: "move",
          title: _L("companions-pet-skill-move", "Move"),
          description: _L("companions-pet-skill-move-description", "Have them move to your next target")
        }, {
          behaviour: "follow",
          title: _L("companions-pet-skill-follow", "Follow"),
          description: _L("companions-pet-skill-follow-description", "Have them follow you")
        }, {
          behaviour: "sit",
          title: _L("companions-pet-skill-sit", "Sit"),
          description: _L("companions-pet-skill-sit-description", "Sit down!")
        }, {
          behaviour: "laydown",
          title: _L("companions-pet-skill-laydown", "Lay Down"),
          description: _L("companions-pet-skill-laydown-description", "Take a break :)")
        }, {
          behaviour: "bark",
          title: _L("companions-pet-skill-bark", "Bark"),
          description: _L("companions-pet-skill-bark-description", "Woof woof")
        }, {
          behaviour: "wander",
          title: _L("companions-pet-skill-wander", "Wander"),
          description: _L("companions-pet-skill-wander-description", "Keep themselves busy")
        }, {
          behaviour: "track",
          title: _L("companions-pet-skill-track", "Track"),
          description: _L("companions-pet-skill-track-description", "Start tracking for someone")
        }, {
          behaviour: "taunt",
          title: _L("companions-pet-skill-taunt", "Taunt"),
          description: _L("companions-pet-skill-taunt-description", "Show them boss")
        }, {
          behaviour: "stretch",
          title: _L("companions-pet-skill-stretch", "Stretch"),
          description: _L("companions-pet-skill-stretch-description", "Get ready for a workout")
        }, {
          behaviour: "beg",
          title: _L("companions-pet-skill-beg", "Beg"),
          description: _L("companions-pet-skill-beg-description", "It's a hard life")
        }, {
          behaviour: "paw",
          title: _L("companions-pet-skill-paw", "Paw"),
          description: _L("companions-pet-skill-paw-description", "A real crowd pleaser")
        }, {
          behaviour: "peck",
          title: _L("companions-pet-skill-peck", "Peck"),
          description: _L("companions-pet-skill-peck-description", "Look for crumbs to eat")
        }, {
          behaviour: "graze",
          title: _L("companions-pet-skill-graze", "Graze"),
          description: _L("companions-pet-skill-graze-description", "Nom nom nom")
        }, {
          behaviour: "howl",
          title: _L("companions-pet-skill-howl", "Howl"),
          description: _L("companions-pet-skill-howl-description", "Awooooooooo")
        }, {
          behaviour: "playdead",
          title: _L("companions-pet-skill-playdead", "Play Dead"),
          description: _L("companions-pet-skill-playdead-description", "Pretend to be dead")
        }, {
          behaviour: "attack",
          title: _L("companions-pet-skill-attack", "Attack"),
          description: _L("companions-pet-skill-attack-description", "Attack your next target")
        }].reduce((_0x1b5556, {
          behaviour: _0x180b74,
          title: _0x7fe827,
          description: _0x1e087a
        }) => {
          if (_0x3e0099(_0x3492a3, _0x180b74)) {
            const _0x4d3f6e = {
              companionId: _0x3492a3,
              action: _0x180b74
            };
            const _0x3b4647 = {
              title: _0x7fe827,
              description: _0x1e087a,
              action: "vrp-ui:pets:companionAction",
              key: _0x4d3f6e
            };
            _0x1b5556.push(_0x3b4647);
          }
          return _0x1b5556;
        }, []);
        exports["vrp-ui"].showContextMenu(_0x34d5ca);
      };
      const _0x35a575 = _0x3a80d3 => {
        const _0x2d069e = [];
        if (_0x1d045c("move")) {
          const _0x23a0ab = {
            targetEntity: _0x3a80d3
          };
          const _0x43b89c = {
            action: "move",
            params: _0x23a0ab
          };
          _0x2d069e.push({
            title: _L("companions-player-skill-move", "Move"),
            description: _L("companions-player-skill-move-description", "Move to this person"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x43b89c
          });
        }
        if (_0x1d045c("watch")) {
          const _0x1b5341 = {
            targetEntity: _0x3a80d3
          };
          const _0x37bd95 = {
            action: "watch",
            params: _0x1b5341
          };
          _0x2d069e.push({
            title: _L("companions-player-skill-watch", "Watch"),
            description: _L("companions-player-skill-watch-description", "Keep an 'eye out'"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x37bd95
          });
        }
        if (_0x1d045c("sniff")) {
          const _0xf63998 = {
            targetEntity: _0x3a80d3
          };
          const _0x3b2620 = {
            action: "sniff",
            params: _0xf63998
          };
          _0x2d069e.push({
            title: _L("companions-player-skill-sniff", "Sniff"),
            description: _L("companions-player-skill-sniff-description", "Any contraband?"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x3b2620
          });
        }
        if (_0x1d045c("untrack")) {
          const _0x480ba2 = {
            targetEntity: _0x3a80d3
          };
          const _0x8b3628 = {
            action: "untrack",
            params: _0x480ba2
          };
          _0x2d069e.push({
            title: _L("companions-player-skill-untrack", "Ignore Track"),
            description: _L("companions-player-skill-untrack-description", "Don't track this person's scent"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x8b3628
          });
        }
        if (_0x1d045c("attack")) {
          const _0x1217ae = {
            targetEntity: _0x3a80d3
          };
          const _0x574938 = {
            action: "attack",
            params: _0x1217ae
          };
          _0x2d069e.push({
            title: _L("companions-player-skill-attack", "Attack"),
            description: _L("companions-player-skill-attack-description", "Attack!"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x574938
          });
        }
        _0x4bf432.g.exports["vrp-ui"].showContextMenu(_0x2d069e);
      };
      const _0x146c70 = _0x5d2b6f => {
        const _0x356137 = [];
        if (_0x1d045c("move")) {
          const _0x198921 = {
            targetEntity: _0x5d2b6f
          };
          const _0x4075e6 = {
            action: "follow",
            params: _0x198921
          };
          _0x356137.push({
            title: _L("companions-vehicle-skill-move", "Move"),
            description: _L("companions-vehicle-skill-move-description", "Go to the vehicle"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x4075e6
          });
        }
        if (_0x1d045c("vehicle")) {
          const _0x22c092 = {
            targetVehicle: _0x5d2b6f
          };
          const _0x2f3d6f = {
            action: "vehicle",
            params: _0x22c092
          };
          _0x356137.push({
            title: _L("companions-vehicle-skill-vehicle", "Get in"),
            description: _L("companions-vehicle-skill-vehicle-description", "Get to da chopper"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x2f3d6f
          });
        }
        if (_0x1d045c("watch")) {
          const _0x147a0f = {
            targetEntity: _0x5d2b6f
          };
          const _0x41b9b9 = {
            action: "watch",
            params: _0x147a0f
          };
          _0x356137.push({
            title: _L("companions-vehicle-skill-watch", "Watch"),
            description: _L("companions-vehicle-skill-watch-description", "Keep an 'eye out'"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x41b9b9
          });
        }
        if (_0x1d045c("sniff")) {
          const _0x561ed6 = {
            targetEntity: _0x5d2b6f
          };
          const _0x2ccbf5 = {
            action: "sniff",
            params: _0x561ed6
          };
          _0x356137.push({
            title: _L("companions-vehicle-skill-sniff", "Sniff"),
            description: _L("companions-vehicle-skill-sniff-description", "Any contraband?"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x2ccbf5
          });
        }
        _0x4bf432.g.exports["vrp-ui"].showContextMenu(_0x356137);
      };
      const _0x2f65b7 = _0x49c336 => {
        const _0x777558 = [];
        if (_0x1d045c("sniff")) {
          const _0x12cbb7 = {
            targetEntity: _0x49c336
          };
          const _0x5bc1cd = {
            action: "sniff",
            params: _0x12cbb7
          };
          _0x777558.push({
            title: _L("companions-dumpster-skill-sniff", "Sniff"),
            description: _L("companions-dumpster-skill-sniff-description", "Any contraband?"),
            action: "vrp-ui:pets:companionTargetAction",
            key: _0x5bc1cd
          });
        }
        _0x4bf432.g.exports["vrp-ui"].showContextMenu(_0x777558);
      };
      async function _0x4e5469(_0xed2313) {
        var _0x33df32;
        const _0x43846f = JSON.parse(_0xed2313);
        const _0x5dbe9a = _0x4bf432.g.exports.isPed.isPed("cid");
        if (Number(_0x43846f.Owner) !== Number(_0x5dbe9a)) {
          return emit("DoLHudText", 2, "companions-dont-recognize", "They don't recognize you.");
        }
        const {
          id: _0xb74ebc
        } = _0x43846f;
        if (_0x263581.has(_0xb74ebc)) {
          ClearPedTasks(PlayerPedId());
          _0x22a513(_0xb74ebc);
          _0x4bf432.g.exports["vrp-selector"].deselect();
          return;
        }
        const {
          pedConfig: _0x5a670c,
          weapon: _0x346fe1
        } = _0x5d79fb[_0x43846f.key];
        await _0x26948f(_0xb74ebc, Object.assign(Object.assign({}, _0x5a670c), {
          weapon: _0x346fe1,
          appearance: Object.assign(Object.assign({}, _0x5a670c.appearance), {
            components: [...[...Array(12)].map((_0xe5e036, _0x548d6f) => ({
              componentId: _0x548d6f,
              drawableId: 0,
              textureId: 0,
              paletteId: 0
            })), ..._0x5a670c.appearance.components, ...(((_0x33df32 = _0x43846f.components) === null || _0x33df32 === undefined ? undefined : _0x33df32.map(([_0x1217b5, _0x15ab99, _0x5dacd0, _0x56663b]) => ({
              componentId: _0x1217b5,
              drawableId: _0x15ab99,
              textureId: _0x5dacd0,
              paletteId: _0x56663b
            }))) ?? []), ...(_0x5d79fb[_0x43846f.key].variableComponent ? [Object.assign(Object.assign({}, _0x5d79fb[_0x43846f.key].variableComponent), {
              textureId: _0x43846f.cVariation === -1 ? 0 : _0x43846f.cVariation
            })] : [])]
          })
        }));
        const _0x3a2d25 = GetVehiclePedIsIn(PlayerPedId(), false);
        if (_0x3a2d25) {
          const _0x1304b6 = {
            targetVehicle: _0x3a2d25,
            instant: true
          };
          _0x5a408b("vehicle", _0xb74ebc, _0x1304b6);
        } else {
          _0x5a408b("follow", _0xb74ebc, {
            targetEntity: PlayerPedId()
          });
        }
      }
      on("vrp-inventory:itemUsed", async (_0x548675, _0x164d1b) => {
        if (_0x548675 === "petaccessory") {
          _0x23aaa5(_0x164d1b);
          return;
        }
        if (_0x548675 === "summonablepet") {
          await _0x4e5469(_0x164d1b);
          return;
        }
      });
      let _0x62eedf = null;
      on("vrp-inventory:closed", async _0x40a66c => {
        if (!_0x40a66c.includes("-Protected-protected")) {
          return;
        }
        _0x62eedf = await RPC.execute("vrp-companions:getPetInProtectedInventory");
      });
      on("vrp-spawn:characterSpawned", async () => {
        _0x62eedf = await RPC.execute("vrp-companions:getPetInProtectedInventory");
      });
      RegisterCommand("+summonUnsummonPet", async () => {
        if (_0x62eedf) {
          await _0x4e5469(_0x62eedf.information);
          return;
        }
        const _0xaaf096 = exports["vrp-inventory"].GetInfoForFirstItemOfName("summonablepet");
        if (!_0xaaf096) {
          return;
        }
        await _0x4e5469(_0xaaf096.information);
      }, false);
      RegisterCommand("-summonUnsummonPet", () => {}, false);
      RegisterCommand("+petAction", () => {
        if (!_0x38fd1c || _0x263581.size === 0) {
          return;
        }
        const _0x2960d5 = GetVehiclePedIsIn(PlayerPedId(), false);
        if (!_0x2960d5) {
          _0x316b00 = Date.now();
          _0x4bf432.g.exports["vrp-selector"].startSelecting(-1, PlayerPedId(), (_0x48db1a, _0x968894, _0x56ca11) => _0x968894 === 1 || _0x968894 === 2 || _0x968894 === 3 && _0x8a2445.includes(_0x56ca11));
        }
      }, false);
      RegisterCommand("-petAction", () => {
        if (!_0x4bf432.g.exports["vrp-selector"].isSelecting()) {
          return;
        }
        const {
          selectedCoords: _0x2bb3ba,
          selectedEntity: _0x1bfcfc
        } = _0x4bf432.g.exports["vrp-selector"].stopSelecting();
        if (_0x316b00 + 250 > Date.now()) {
          return exports["vrp-selector"].deselect();
        }
        if (_0x2bb3ba !== null) {
          const _0x10181d = {
            targetCoords: _0x2bb3ba
          };
          const _0x5eaf76 = _0x10181d;
          if (_0x2c2344 !== null) {
            _0x5a408b("move", _0x2c2344, _0x5eaf76);
            _0x2c2344 = null;
            return;
          }
          _0x541baf("move", _0x5eaf76);
          return;
        }
        if (_0x1bfcfc !== null) {
          const _0x2b355c = GetEntityType(_0x1bfcfc);
          if (_0x2b355c === 0) {
            return;
          }
          if (_0x2b355c === 2) {
            return _0x146c70(_0x1bfcfc);
          }
          if (_0x2b355c === 3 && _0x8a2445.includes(GetEntityModel(_0x1bfcfc))) {
            return _0x2f65b7(_0x1bfcfc);
          }
          const _0x6e456 = _0x32c86a(_0x1bfcfc);
          if (_0x6e456) {
            return _0x40fee6(_0x6e456);
          }
          if (_0x2c2344 !== null) {
            if (_0x4a2ac5 === "attack") {
              const _0x6d16df = {
                targetEntity: _0x1bfcfc
              };
              _0x5a408b(_0x4a2ac5, _0x2c2344, _0x6d16df);
            } else {
              _0x5a408b(_0x4a2ac5, _0x2c2344);
            }
            _0x2c2344 = null;
            return exports["vrp-selector"].deselect();
          }
          if (_0x31f89d) {
            const _0x416cc5 = {
              targetEntity: _0x1bfcfc
            };
            _0x541baf("attack", _0x416cc5);
            _0x31f89d = false;
            return exports["vrp-selector"].deselect();
          }
          if (IsPedAPlayer(_0x1bfcfc)) {
            _0x35a575(_0x1bfcfc);
          }
        }
      }, false);
      RegisterCommand("+petActionToggle", () => _0x38fd1c = !_0x38fd1c, false);
      RegisterCommand("-petActionToggle", () => {}, false);
      RegisterCommand("+petActionFollow", () => _0x541baf("follow"), false);
      RegisterCommand("-petActionFollow", () => {}, false);
      RegisterCommand("+petActionVehicle", () => {
        const _0x2cb00a = GetVehiclePedIsIn(PlayerPedId(), true);
        if (_0x2cb00a) {
          const _0x46123e = {
            targetVehicle: _0x2cb00a,
            instant: false
          };
          _0x541baf("vehicle", _0x46123e);
        }
      }, false);
      RegisterCommand("-petActionVehicle", () => {}, false);
      RegisterCommand("+petActionAttack", () => {
        _0x31f89d = true;
        _0x2c2344 = null;
      }, false);
      RegisterCommand("-petActionAttack", () => {}, false);
      RegisterCommand("+petActionTrack", () => _0x541baf("track", {
        ignoreServerIds: _0x2f3df2()
      }), false);
      RegisterCommand("-petActionTrack", () => {}, false);
      _0x4bf432.g.exports["vrp-keybinds"].registerKeyMapping("", "Pets", "Summon/Unsummon Pet", "+summonUnsummonPet", "-summonUnsummonPet", "");
      _0x4bf432.g.exports["vrp-keybinds"].registerKeyMapping("", "Pets", "Action Pet", "+petAction", "-petAction", "");
      _0x4bf432.g.exports["vrp-keybinds"].registerKeyMapping("", "Pets", "Action Enable / Disable", "+petActionToggle", "-petActionToggle", "");
      _0x4bf432.g.exports["vrp-keybinds"].registerKeyMapping("", "Pets", "Follow Self", "+petActionFollow", "-petActionFollow", "");
      _0x4bf432.g.exports["vrp-keybinds"].registerKeyMapping("", "Pets", "Get in Vehicle", "+petActionVehicle", "-petActionVehicle", "");
      _0x4bf432.g.exports["vrp-keybinds"].registerKeyMapping("", "Pets", "Attack Next Target", "+petActionAttack", "-petActionAttack", "");
      _0x4bf432.g.exports["vrp-keybinds"].registerKeyMapping("", "Pets", "Track Target", "+petActionTrack", "-petActionTrack", "");
      const _0x23aaa5 = async _0x7c168e => {
        try {
          const _0x5491ad = JSON.parse(_0x7c168e);
          const _0x3574f2 = _0x5a7bdd(_0x5491ad.companionType);
          if (!_0x3574f2) {
            return;
          }
          ClearPedSecondaryTask(PlayerPedId());
          ClearPedTasksImmediately(PlayerPedId());
          TriggerEvent("animation:PlayAnimation", "petting");
          await new Promise(_0x2fe46a => setTimeout(_0x2fe46a, 3000));
          _0x3574f2.applyAccessory(_0x5491ad.componentType || "ped", _0x5491ad);
          _0x3574f2.saveAccessories();
          TriggerEvent("animation:cancel");
        } catch (_0x357aab) {}
      };
      const _0x528b8 = ["chop", "husky", "retriever", "shepherd", "pit", "pug"];
      const _0x2acd69 = ["lspd", "bcso", "troopers", "rangers", "doc", "therapy"];
      onNet("vrp-pets:k9create", (_0x584ad8, _0x832b13, _0x29507f, _0x21578c, _0x529e75) => {
        const _0x297d94 = _0x4bf432.g.exports.isPed.isPed("cid");
        const _0x4f8a3e = _0x4bf432.g.exports["vrp-config"].GetModuleConfig("vrp-companions");
        const _0x2f3a85 = [..._0x4f8a3e.devWhitelist, ..._0x4f8a3e.whitelist];
        if (!_0x2f3a85.includes(_0x297d94)) {
          return emit("DoLHudText", 2, "companions-ineligible-k9s", "You are not eligible to create k9s.");
        }
        const _0x27fcf5 = _0x528b8.includes(_0x832b13) ? _0x832b13 : _0x528b8[Number(_0x832b13) - 1] || _0x528b8[0];
        const _0x12ebf7 = _0x2acd69.includes(_0x29507f) ? _0x29507f : _0x2acd69[Number(_0x29507f) - 1] || _0x2acd69[0];
        const _0x4b7442 = _0x27fcf5 + "_" + _0x12ebf7;
        if (!_0x5d79fb[_0x4b7442]) {
          return emit("DoLHudText", 2, "companions-invalid-k9-type", "Not a valid k9 type");
        }
        const _0x4503e6 = Number(_0x529e75 || "-1");
        if (_0x4503e6 > _0x5d79fb[_0x4b7442].numVariations) {
          return emit("DoLHudText", 2, "companions-invalid-variation", "Invalid variation");
        }
        emit("player:receiveItem", "summonablepet", 1, false, {
          Owner: _0x584ad8,
          Name: _0x21578c || "No Name",
          type: _0x27fcf5,
          key: _0x4b7442,
          k9: true,
          id: String(Math.floor(Math.random() * 8999999 + 1000000)),
          cVariation: _0x4503e6,
          _image_url: _0x5d79fb[_0x4b7442].image,
          _hideKeys: ["_image_url", "type", "key", "id", "k9", "cVariation", "components"]
        });
      });
      
      RegisterCommand('pedCreate', (s, args) => {
        emit('vrp-pets:petCreate', 1, args[0], args[1])
      })
      onNet("vrp-pets:petCreate", (_0x2fb203, _0x2a4fdd, _0x58c629, _0x5eeae1) => {
        // const _0x4a78c6 = _0x4bf432.g.exports.isPed.isPed("cid");
        // const _0xb3845 = _0x4bf432.g.exports["vrp-config"].GetModuleConfig("vrp-companions");
        // const _0x325c76 = [..._0xb3845.devWhitelist, ..._0xb3845.whitelist];
        // if (!_0x325c76.includes(_0x4a78c6)) {
        //   return emit("DoLHudText", 2, "companions-ineligible", "You are not eligible to create pets.");
        // }
        if (!_0x5d79fb[_0x2a4fdd]) {
          return emit("DoLHudText", 2, "companions-invalid-pet-type", "Not a valid pet type");
        }
        if (_0x528b8.some(_0x179008 => _0x2acd69.some(_0x324fcf => _0x179008 + "_" + _0x324fcf === _0x2a4fdd))) {
          return emit("DoLHudText", 2, "companions-use-k9create", "Use /k9create to create k9s");
        }
        const _0x511fe8 = Number(_0x5eeae1 || "-1");
        if (_0x511fe8 > _0x5d79fb[_0x2a4fdd].numVariations) {
          return emit("DoLHudText", 2, "companions-invalid-variation", "Invalid variation");
        }
        // const _0x49e8ea = _0x4bf432.g.exports["vrp-config"].GetModuleConfig("vrp-companions");
        // if (_0x5d79fb[_0x2a4fdd].restricted && !_0x49e8ea.devWhitelist.includes(_0x4a78c6)) {
        //   return emit("DoLHudText", 2, "companions-dev-restricted", "Restricted");
        // }
        emit("player:receiveItem", "summonablepet", 1, false, {
          Owner: _0x2fb203,
          Name: _0x58c629 || "No Name",
          type: _0x2a4fdd,
          key: _0x2a4fdd,
          k9: false,
          id: String(Math.floor(Math.random() * 8999999 + 1000000)),
          cVariation: _0x511fe8,
          _image_url: _0x5d79fb[_0x2a4fdd].image,
          _hideKeys: ["_image_url", "type", "key", "id", "k9", "cVariation", "components"]
        });
      });
      _0x4d3f87("vrp-companions:createAccessory", (_0x4b0c33, _0x126598) => {
        _0x126598({
          data: {},
          meta: {
            ok: true,
            message: ""
          }
        });
        const {
          companionType: _0x1c219b
        } = _0x4b0c33.key;
        const {
          componentId: _0xc63e30,
          drawableId: _0xfa480,
          textureId: _0x1e218a,
          type: _0x2015b7,
          name: _0x263d82,
          image: _0x28315b
        } = _0x4b0c33.key.accessory;
        const _0x1628ce = {
          companionType: _0x1c219b,
          type: _0x2015b7,
          componentId: _0xc63e30,
          drawableId: _0xfa480,
          textureId: _0x1e218a,
          _name: _0x263d82,
          _image_url: _0x28315b,
          _hideKeys: ["_image_url", "_name", "type", "companionType", "componentId", "drawableId", "textureId"]
        };
        emit("player:receiveItem", "petaccessory", 1, false, _0x1628ce);
      });
      on("vrp-companions:client:mountCompanion", async (_0x1257db, _0x18bec8) => {
        const _0x2f33f0 = GetEntityModel(_0x18bec8);
        const _0x3c6eeb = {
          [String(GetHashKey("a_c_cow"))]: [0.5, 0, 0.52, 0, 0, -90],
          [String(GetHashKey("a_c_deer"))]: [0.7, 0, 0.45, -20, 0, -90],
          [String(GetHashKey("a_c_horse"))]: [0.7, 0, 0.45, -20, 0, -90],
          [String(GetHashKey("a_c_boar"))]: [0.6, 0, 0.45, -20, 0, -90],
          [String(GetHashKey("a_c_mtlion"))]: [0.5, -0.05, 0.4, -20, 0, -90],
          [String(GetHashKey("BrnBear"))]: [1.5, 0, 0.91, -20, 0, -90]
        };
        AttachEntityToEntity(PlayerPedId(), _0x18bec8, GetPedBoneIndex(_0x18bec8, 23553), ..._0x3c6eeb[String(_0x2f33f0)], true, true, true, true, 0, true);
        const _0x1afeb4 = "timetable@ron@ig_5_p3";
        const _0x4e13fb = "ig_5_p3_base";
        RequestAnimDict(_0x1afeb4);
        while (!HasAnimDictLoaded(_0x1afeb4)) {
          await new Promise(_0x31b682 => setTimeout(_0x31b682, 10));
        }
        const _0x10b793 = GetAnimDuration(_0x1afeb4, _0x4e13fb);
        TaskPlayAnim(PlayerPedId(), _0x1afeb4, _0x4e13fb, 1, 4, _0x10b793, 1, 0, false, false, false);
      });
      on("vrp-companions:client:unmountCompanion", async (_0x4dc485, _0x106a5c) => {
        DetachEntity(PlayerPedId(), true, true);
        ClearPedTasksImmediately(PlayerPedId());
      });
      const _0x3a7fba = (_0x5dc618, _0x4b8885) => {
        const _0x181589 = _0x4bf432.g.exports.isPed.isPed("cid");
        const _0xa6a8be = _0x4bf432.g.exports["vrp-config"].GetModuleConfig("vrp-companions");
        // const _0x55fc40 = [..._0xa6a8be.devWhitelist, ..._0xa6a8be.whitelist];
        // if (!_0x55fc40.includes(_0x181589)) {
        //   return emit("DoLongHudText", "You are not eligible to use this.", 2);
        // }
        const _0x22bb4a = _0x5d79fb[_0x5dc618].accessories.map(_0x49dd44 => ({
          title: _0x49dd44.name,
          action: "vrp-companions:createAccessory",
          key: {
            companionType: _0x5dc618,
            accessory: _0x49dd44
          }
        }));
        _0x4bf432.g.exports["vrp-ui"].showContextMenu(_0x22bb4a);
      };
      const _0x1035b1 = () => {
        return Object.values(_0x5d79fb).filter(_0x10f859 => _0x10f859.accessories && _0x10f859.accessories.length > 0).map(_0x47276b => ({
          type: _0x47276b.pedConfig.type,
          name: _0x47276b.pedConfig.name
        }));
      };
      _0x4bf432.g.exports("openAccessoryMenu", _0x3a7fba);
      _0x4bf432.g.exports("getPetsWithAccessories", _0x1035b1);
      RegisterCommand("dismount_player", () => {
        const _0x5c4531 = GetEntityModel(PlayerPedId());
        if (["a_c_cow", "a_c_deer", "a_c_horse", "a_c_boar", "a_c_mtlion", "BrnBear"].some(_0xcc3c12 => GetHashKey(_0xcc3c12) === _0x5c4531)) {
          GetActivePlayers().forEach(_0x401fe0 => {
            if (IsEntityAttachedToEntity(GetPlayerPed(_0x401fe0), PlayerPedId())) {
              _0x4bf432.g.exports["vrp-sync"].SyncedExecution("DetachEntity", GetPlayerPed(_0x401fe0), false, false);
            }
          });
        }
      }, false);
    })();
  })();
  