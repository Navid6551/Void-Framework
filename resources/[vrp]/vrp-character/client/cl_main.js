((() => {
    'use strict';
    ;
    var _0x4bf89d = {
        g: (function () {
            ;
            if (typeof globalThis === 'object') {
                return globalThis;
            }
            try {
                return this || new Function('return this')();
            } catch (_0x5ad494) {
                if (typeof window === 'object') {
                    return window;
                }
            }
        }())
    };
    ((() => {
        ;
    })());
    var _0x17e2fe = {};
    ;
    let _0x510418 = exports['vrp-config'].GetModuleConfig('main');
    const _0x12492a = new Map(), _0x3ee82a = GetCurrentResourceName();
    async function _0x5690dd() {
    }
    on('vrp-config:configLoaded', (_0x5d8d8d, _0xac70c7) => {
        ;
        if (_0x5d8d8d === 'main') {
            _0x510418 = _0xac70c7;
        } else {
            _0x12492a.has(_0x5d8d8d) && _0x12492a.set(_0x5d8d8d, _0xac70c7);
        }
    });
    function _0x428c09(_0xc72f9d) {
        ;
        return _0x510418[_0xc72f9d];
    }
    function _0x49f9a5(_0x1addd1, _0x4cfdaa) {
        ;
        if (!_0x12492a.has(_0x1addd1)) {
            const _0x37c855 = exports['vrp-config'].GetModuleConfig(_0x1addd1);
            if (_0x37c855 === undefined) {
                return;
            }
            _0x12492a.set(_0x1addd1, _0x37c855);
        }
        const _0x488fd0 = _0x12492a.get(_0x1addd1);
        return _0x4cfdaa ? _0x488fd0 === null || _0x488fd0 === void 0 ? void 0 : _0x488fd0[_0x4cfdaa] : _0x488fd0;
    }
    function _0x21e874(_0x1e628b) {
        return _0x49f9a5(_0x3ee82a, _0x1e628b);
    }
    ;
    const _0x5a3c05 = _0x423c0c => {
            ;
            const _0x2aef0a = _0x49f9a5('vrp-character:types', _0x423c0c);
            if (!_0x2aef0a) {
                return 1;
            }
            return _0x2aef0a.factors.fineAmount;
        }, _0x56e5fb = _0x9724c2 => {
            const _0xbb0ac3 = _0x49f9a5('vrp-character:types', _0x9724c2);
            if (!_0xbb0ac3) {
                return 1;
            }
            return _0xbb0ac3.factors.jailTime;
        }, _0x4da1f4 = _0x36ca5f => {
            const _0xacd783 = _0x49f9a5('vrp-character:types', _0x36ca5f);
            if (!_0xacd783) {
                return 1;
            }
            return _0xacd783.factors.heistPayout;
        }, _0x29de2b = _0x1427bb => {
            ;
            const _0x314ff9 = _0x49f9a5('vrp-character:types', _0x1427bb);
            if (!_0x314ff9) {
                return 1;
            }
            return _0x314ff9.factors.drugPayout;
        };
    ;
    const _0x5e706e = globalThis.VPX, _0x4abe0f = _0x5e706e.Hud, _0x1bb2e2 = _0x5e706e.Utils, _0x1c3786 = _0x5e706e.Zones, _0x510e35 = _0x5e706e.Events, _0x20f406 = _0x5e706e.Streaming, _0x4e67b9 = _0x5e706e.Procedures, _0x4b045d = _0x5e706e.Interface, _0x34c2d4 = null && _0x5e706e;
    ;
    async function _0x20898e(_0x658c72) {
        return new Promise(_0x4e5865 => setTimeout(() => _0x4e5865(), _0x658c72));
    }
    const _0x4f9252 = _0x1c82ac => {
        ;
        return _0x1c82ac[Math.floor(Math.random() * _0x1c82ac.length)];
    };
    ;
    let _0x1100b3 = 0.1, _0x140848 = 25, _0x46aeac;
    const _0x1f31a6 = async () => {
        ;
        on('vrp-spawn:characterSpawned', async () => {
            const _0x375412 = await _0x16a865() === 'hardcore', _0x3d532c = { isHardcore: _0x375412 };
            ;
            _0x4bf89d.g.exports['vrp-ui'].sendAppEvent('game', _0x3d532c);
            ;
            if (!_0x375412) {
                return;
            }
            const _0x359fa4 = await RPC.execute('vrp-character:isICUPatient');
            if (_0x359fa4) {
                _0x39590b(false);
                return;
            }
            _0x46aeac = setTick(async () => {
                const _0x2015ca = _0x12ffb0();
                _0x4bf89d.g.exports['vrp-ui'].sendAppEvent('hud', { 'hardcoreScore': 100 - Math.min(100, _0x2015ca / 10) });
                if (_0x2015ca >= 10) {
                    _0x3da26b(_0x140848);
                }
                await _0x20898e(600000);
            });
        });
    };
    on('vrp-config:configReady', () => {
        ;
        var _0x30f6a5, _0x52ccb8;
        _0x140848 = (_0x30f6a5 = _0x49f9a5('vrp-character', 'falloffPer10Min')) !== null && _0x30f6a5 !== void 0 ? _0x30f6a5 : 25;
        _0x1100b3 = (_0x52ccb8 = _0x49f9a5('vrp-character', 'icuChancePer100')) !== null && _0x52ccb8 !== void 0 ? _0x52ccb8 : 0.1;
        ;
    });
    const _0x12ffb0 = () => {
            ;
            var _0x9ef4b0;
            return (_0x9ef4b0 = _0x4bf89d.g.exports['vrp-progression'].GetProgression('hardcore:score')) !== null && _0x9ef4b0 !== void 0 ? _0x9ef4b0 : 0;
        }, _0xb20c2f = _0x1ec857 => {
            ;
            _0x510e35.emitNet('vrp-character:addHCScore', _0x1ec857);
        }, _0x3da26b = _0x298dec => {
            ;
            _0x510e35.emitNet('vrp-character:reduceHCScore', _0x298dec);
        }, _0x1697db = async () => {
            const _0x495f9c = _0x12ffb0(), _0x35a2af = _0x495f9c <= 100 ? false : Math.random() < _0x1100b3 * (_0x495f9c / 100);
            if (!_0x35a2af) {
                return false;
            }
            return await RPC.execute('vrp-character:dropICUCrate'), _0x39590b(), true;
        }, _0x53e413 = {
            x: 356.71,
            y: -1417.5,
            z: 36.07
        };
    ;
    ;
    ;
    ;
    const _0x48c868 = {
        x: 361.26,
        y: -1421.32,
        z: 36.07
    };
    ;
    ;
    ;
    ;
    const _0x1f2826 = {
        x: 365.88,
        y: -1425.19,
        z: 36.08
    };
    ;
    ;
    ;
    ;
    const _0x5795cf = {
        x: 382.53,
        y: -1402.1,
        z: 36.08
    };
    ;
    ;
    ;
    ;
    const _0xf956f5 = {
        x: 379,
        y: -1399.13,
        z: 36.08
    };
    ;
    ;
    ;
    ;
    const _0x28cbb1 = {
        x: 372.38,
        y: -1394.78,
        z: 36.08
    };
    ;
    ;
    ;
    ;
    const _0x45bacf = [
            _0x53e413,
            _0x48c868,
            _0x1f2826,
            _0x5795cf,
            _0xf956f5,
            _0x28cbb1
        ], _0x39590b = async (_0x2b32b7 = true) => {
            ;
            DoScreenFadeOut(500);
            await _0x20898e(500);
            ;
            const _0x17e645 = _0x4f9252(_0x45bacf);
            if (_0x2b32b7) {
                emit('DoLongHudText', 'You have been placed in the ICU for 24 hours.', 2);
            }
            SetEntityVisible(PlayerPedId(), false, false);
            FreezeEntityPosition(PlayerPedId(), true);
            SetEntityCoords(PlayerPedId(), _0x17e645.x, _0x17e645.y, _0x17e645.z, false, false, false, false);
            await _0x20898e(1000);
            ;
            while (IsEntityWaitingForWorldCollision(PlayerPedId())) {
                await _0x20898e(10);
            }
            emit('client:bed', true);
            FreezeEntityPosition(PlayerPedId(), false);
            SetEntityVisible(PlayerPedId(), true, false);
            DoScreenFadeIn(500);
            _0x4bf89d.g.exports['vrp-taskbar'].taskbarDisableInventory(true);
            _0x4bf89d.g.exports['vrp-actionbar'].disableActionBar(true);
            _0x4bf89d.g.exports['vrp-ui'].showInteraction('[E] Swap Characters');
            ;
            const _0x4f9f37 = setTick(async () => {
                ;
                DrawRect(0, 0, 10, 10, 1, 1, 1, 128);
                DrawRect(0, 0, 10, 10, 1, 1, 1, 128);
                ;
                for (let _0x352fb2 = 8; _0x352fb2 <= 143; _0x352fb2++) {
                    DisableControlAction(0, _0x352fb2, true);
                }
                if (IsControlJustPressed(0, 38) || IsDisabledControlJustPressed(0, 38)) {
                    clearTick(_0x4f9f37);
                    emit('client:leavebed');
                    await _0x20898e(1000);
                    emit('apartments:Logout');
                    _0x4bf89d.g.exports['vrp-taskbar'].taskbarDisableInventory(false);
                    _0x4bf89d.g.exports['vrp-actionbar'].disableActionBar(false);
                    _0x4bf89d.g.exports['vrp-ui'].hideInteraction();
                    ;
                }
            });
        };
    _0x4bf89d.g.exports('GetHCScore', _0x12ffb0);
    _0x4bf89d.g.exports('AddHCScore', _0xb20c2f);
    _0x4bf89d.g.exports('ReduceHCScore', _0x3da26b);
    _0x4bf89d.g.exports('RollICU', _0x1697db);
    ;
    ;
    const _0x24c254 = { timeToLive: 43200000 };
    ;
    const _0x437d70 = _0x1bb2e2.cache(async () => {
        const _0x238d5d = await RPC.execute('vrp-character:getCharacterType');
        if (!_0x238d5d) {
            return [
                false,
                'normal'
            ];
        }
        return [
            true,
            _0x238d5d
        ];
    }, _0x24c254);
    ;
    on('vrp-base:spawnInitialized', () => {
        ;
        _0x437d70.reset();
        clearTick(_0x46aeac);
        ;
    });
    ;
    async function _0x2456e6() {
        await _0x5690dd();
        await _0x1f31a6();
        ;
    }
    const _0x16a865 = async () => {
            const _0x4bb1d8 = await _0x437d70.get();
            if (!_0x4bb1d8) {
                return 'normal';
            }
            return _0x4bb1d8;
        }, _0x158791 = async _0x4ce8cc => {
            ;
            const _0x1df254 = await _0x16a865();
            switch (_0x4ce8cc) {
            case 'FINE_AMOUNT':
                return _0x5a3c05(_0x1df254);
            case 'JAIL_TIME':
                return _0x56e5fb(_0x1df254);
            case 'HEIST_PAYOUT':
                return _0x4da1f4(_0x1df254);
            case 'DRUG_PAYOUT':
                return _0x29de2b(_0x1df254);
            default:
                console.log('[CHARACTER] Tried to fetch invalid factor (' + _0x4ce8cc + ')');
                return 1;
            }
        };
    _0x4bf89d.g.exports('GetFactor', _0x158791);
    _0x4bf89d.g.exports('GetCharacterType', _0x16a865);
    ;
    ;
    ((async () => {
        ;
        await _0x2456e6();
    })());
})());
;