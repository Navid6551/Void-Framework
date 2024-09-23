((() => {
    'use strict';
    ;
    var _0x1cb0d8 = {
        d: (_0x4e1fff, _0x37421e) => {
            ;
            for (var _0x25e778 in _0x37421e) {
                _0x1cb0d8.o(_0x37421e, _0x25e778) && !_0x1cb0d8.o(_0x4e1fff, _0x25e778) && Object.defineProperty(_0x4e1fff, _0x25e778, {
                    'enumerable': true,
                    'get': _0x37421e[_0x25e778]
                });
            }
        },
        g: (function () {
            ;
            if (typeof globalThis === 'object') {
                return globalThis;
            }
            try {
                return this || new Function('return this')();
            } catch (_0x2bddd1) {
                if (typeof window === 'object') {
                    return window;
                }
            }
        }()),
        o: (_0x3e32a9, _0x336234) => Object.prototype.hasOwnProperty.call(_0x3e32a9, _0x336234)
    };
    ((() => {
        ;
        ;
    })());
    ((() => {
        ;
    })());
    ((() => {
        ;
        ;
    })());
    ;
    var _0x382548 = {};
    const _0x1bb9bb = {
        RQ: () => _0x3a69f6,
        xI: () => _0x29b8ae,
        JL: () => _0x45118d
    };
    ;
    ;
    ;
    _0x1cb0d8.d(_0x382548, _0x1bb9bb);
    ;
    ;
    let _0x20e7fd = _0x1cb0d8.g.exports['vrp-config'].GetModuleConfig('main'), _0x4f40e7 = null;
    const _0x4039d0 = new Map(), _0x3ec3ea = GetCurrentResourceName();
    async function _0x5c38d7() {
        while (_0x4f40e7 === null) {
            await new Promise(_0x3c2a1f => setTimeout(_0x3c2a1f, 1000));
            _0x4f40e7 = _0x509cad();
            _0x4c9dcf(_0x4f40e7);
            ;
        }
    }
    function _0x4c9dcf(_0x599a9d) {
        ;
        // Object.keys(_0x599a9d.boostingContracts).map(_0x5ae2c2 => {
        //     const _0x1da7a5 = _0x599a9d.boostingContracts[_0x5ae2c2].contracts * _0x599a9d.restartLength;
        //     _0x599a9d.boostingContracts[_0x5ae2c2].contracts = _0x1da7a5;
        // });
    }
    on('vrp-config:configLoaded', async (_0x23945a, _0x18ded4) => {
        ;
        if (_0x23945a === 'main') {
            _0x20e7fd = _0x18ded4;
        } else {
            if (_0x23945a === 'vrp-boosting') {
                await _0x5c38d7();
            } else {
                _0x4039d0.has(_0x23945a) && _0x4039d0.set(_0x23945a, _0x18ded4);
            }
        }
    });
    function _0x14d4cd(_0x4c3fd2) {
        ;
        return _0x20e7fd[_0x4c3fd2];
    }
    function _0x347901(_0x4cadbc, _0x184b29) {
        ;
        if (!_0x4039d0.has(_0x4cadbc)) {
            const _0x291d94 = _0x1cb0d8.g.exports['vrp-config'].GetModuleConfig(_0x4cadbc);
            if (_0x291d94 === undefined) {
                return;
            }
            _0x4039d0.set(_0x4cadbc, _0x291d94);
        }
        const _0x13a0b3 = _0x4039d0.get(_0x4cadbc);
        return _0x184b29 ? _0x13a0b3 === null || _0x13a0b3 === void 0 ? void 0 : _0x13a0b3[_0x184b29] : _0x13a0b3;
    }
    function _0x509cad(_0xd73441) {
        ;
        return _0x347901(_0x3ec3ea, _0xd73441);
    }
    ;
    const _0xafb752 = globalThis.VPX, _0x2b0a1a = _0xafb752.Hud, _0x5f11e9 = _0xafb752.Utils, _0x12f290 = _0xafb752.Zones, _0x21104f = _0xafb752.Events, _0x3d6c2d = _0xafb752.Streaming, _0x4918be = _0xafb752.Procedures, _0x3a06a7 = _0xafb752.Interface, _0x5acc96 = null && _0xafb752;
    ;
    async function _0x41771c() {
        ;
        const _0x32b62e = _0x509cad('vinScratchStations');
        for (const _0xa8b775 in _0x32b62e) {
            const _0x1b50aa = _0x32b62e[_0xa8b775];
            _0x12f290.addBoxTarget('1', _0xa8b775, _0x1b50aa.coords, _0x1b50aa.length, _0x1b50aa.width, {
                'minZ': _0x1b50aa.minZ,
                'maxZ': _0x1b50aa.maxZ,
                'heading': _0x1b50aa.heading
            });
            const _0x4a9625 = { radius: 5 };
            ;
            const _0x5ddece = {
                distance: _0x4a9625,
                isEnabled: () => {
                    ;
                    return _0x29b8ae && _0x29b8ae.contractType === 'vinScratch';
                }
            };
            ;
            ;
            _0x3a06a7.addPeekEntryByTarget(_0xa8b775, [{
                    'event': 'vrp-boosting:client:scratchOnlineVin',
                    'id': _0xa8b775,
                    'icon': 'laptop',
                    'label': 'Prepare Vin Scratch',
                    'parameters': { 'id': _0xa8b775 }
                }], _0x5ddece);
            ;
        }
    }
    ;
    const _0x22ef15 = () => {
        ;
        const _0x17302 = _0x509cad('vinScratchLocations');
        for (const _0x25c323 in _0x17302) {
            const _0x580b00 = _0x17302[_0x25c323];
            _0x1cb0d8.g.exports['vrp-polyzone'].AddBoxZone('boost_dropoff_zone_' + _0x25c323, _0x580b00.coords, _0x580b00.length, _0x580b00.width, {
                'minZ': _0x580b00.minZ,
                'maxZ': _0x580b00.maxZ,
                'heading': _0x580b00.heading,
                'data': { 'id': _0x25c323 }
            });
        }
        return;
    };
    ;
    const _0x4e5204 = globalThis.VPX, _0x145497 = _0x4e5204.Utils, _0x44989c = _0x4e5204.Base, _0x3b96bc = _0x4e5204.Events, _0x49fe58 = _0x4e5204.Procedures, _0x2b54f7 = _0x4e5204.DB, _0x4c4ab9 = _0x4e5204.API, _0x468775 = _0x4e5204.Tebex, _0x1e1df9 = _0x4e5204.Discord, _0x3d88d2 = _0x4e5204.Hooks, _0x4c79ad = null && _0x4e5204;
    ;
    const _0x230e37 = globalThis, _0x11c8ce = _0x43aa1e => {
            return new Promise(_0x255cbe => setTimeout(() => _0x255cbe(), _0x43aa1e));
        };
    function _0x3837ec(_0x5aa302) {
        ;
        switch (_0x5aa302) {
        case 'AUpgraded':
            return 'A+';
        case 'SUpgraded':
            return 'S+';
        case 'SUpgraded2':
            return 'S++';
        default:
            return _0x5aa302;
        }
    }
    function _0x5c4ef4(_0x411efd, _0xe71107) {
        const _0x242fdc = [];
        for (let _0x3ceba6 = 0; _0x3ceba6 < _0x411efd.length; ++_0x3ceba6) {
            if (!!_0xe71107(_0x411efd[_0x3ceba6], _0x3ceba6)) {
                _0x242fdc.push(..._0x411efd.splice(_0x3ceba6, 1));
                --_0x3ceba6;
                ;
            }
        }
        return _0x242fdc;
    }
    const _0x35e318 = () => {
            ;
            return Math.floor(Date.now() / 1000);
        }, _0xd25b1e = (_0x52ad2d, _0x85f7c1) => {
            const _0xe56d9 = Math.min(_0x52ad2d, _0x85f7c1 * 60);
            return Utils.getRandomNumber(_0x52ad2d * 0.75, _0xe56d9) * 60;
        }, _0x382956 = async (_0xb1b258, _0x4cee87) => {
            ;
            const _0xfefd55 = Base.getModule('Player');
            for (const _0x4c61e6 of _0xb1b258) {
                const _0x3da0e3 = _0xfefd55.GetUserByCharacter(_0x4c61e6.id);
                await _0x4cee87(_0x4c61e6, _0x3da0e3);
            }
        }, _0x4c861e = async (_0x47d0b6, _0x42d7fc) => {
            ;
            _0x382956(_0x47d0b6, async (_0x247caa, _0x50a22f) => {
                if (_0x50a22f) {
                    await _0x42d7fc(_0x247caa, _0x50a22f);
                }
            });
        }, _0x5b81eb = (_0x51e40b, _0x5da96a) => {
            ;
            const _0x1929d2 = [];
            for (let _0x553f67 = 0; _0x553f67 < _0x5da96a; _0x553f67++) {
                _0x1929d2.push(_0x51e40b[Math.floor(Math.random() * _0x51e40b.length)]);
            }
            return _0x1929d2;
        }, _0x2ee5fc = (_0x2d89b9, _0x5422d1) => {
            ;
            const [_0x4073c9, _0x13faba, _0x53aa54] = [
                _0x2d89b9.x - _0x5422d1.x,
                _0x2d89b9.y - _0x5422d1.y,
                _0x2d89b9.z - _0x5422d1.z
            ];
            return Math.sqrt(_0x4073c9 * _0x4073c9 + _0x13faba * _0x13faba + _0x53aa54 * _0x53aa54);
        }, _0x51564b = async _0x3929b9 => {
            ;
            let _0x6eac25 = 0;
            const _0x9073a3 = _0x509cad('upgradeMap'), _0x23022e = _0x9073a3.sort((_0x27965c, _0x39b908) => _0x27965c.expRequired - _0x39b908.expRequired);
            _0x23022e.forEach((_0x4f1a15, _0x385144) => {
                ;
                _0x3929b9 >= _0x4f1a15.expRequired && (_0x6eac25 = _0x385144);
            });
            const _0x18ac26 = _0x23022e[_0x6eac25].class;
            if (_0x23022e[_0x6eac25].class === _0x23022e[_0x23022e.length - 1].class) {
                const _0x4efafa = {};
                return _0x4efafa.currClass = _0x18ac26, _0x4efafa.nextClass = _0x18ac26, _0x4efafa;
            }
            const _0x263d62 = _0x23022e[_0x6eac25 + 1].class, _0x3bfa91 = {};
            return _0x3bfa91.currClass = _0x18ac26, _0x3bfa91.nextClass = _0x263d62, _0x3bfa91;
        }, _0x39bc95 = _0x101509 => {
            ;
            let _0xb4eb36 = _0x101509.length, _0x5e70c7;
            while (_0xb4eb36 != 0) {
                _0x5e70c7 = Math.floor(Math.random() * _0xb4eb36);
                _0xb4eb36--;
                [_0x101509[_0xb4eb36], _0x101509[_0x5e70c7]] = [
                    _0x101509[_0x5e70c7],
                    _0x101509[_0xb4eb36]
                ];
                ;
            }
            return _0x101509;
        }, _0x22bd6f = _0x3e2fc9 => {
            const _0x13a7f3 = _0x4f40e7.boostingContracts[_0x3e2fc9];
            return _0x13a7f3;
        };
    ;
    const _0x534427 = {
        model: 'CALICO',
        class: 'S',
        name: null,
        stock: 9
    };
    ;
    ;
    ;
    ;
    ;
    const _0x25907a = {
        model: 'COMET6',
        class: 'S',
        name: null,
        stock: 7
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3f3183 = {
        model: 'CYPHER',
        class: 'S',
        name: null,
        stock: 10
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2f8c91 = {
        model: 'DOMINATOR7',
        class: 'S',
        name: null,
        stock: 7
    };
    ;
    ;
    ;
    ;
    ;
    const _0x371cc0 = {
        model: 'DOMINATOR8',
        class: 'S',
        name: null,
        stock: 9
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2d2232 = {
        model: 'EUROS',
        class: 'S',
        name: null,
        stock: 6
    };
    ;
    ;
    ;
    ;
    ;
    const _0x260d9a = {
        model: 'FUTO2',
        class: 'S',
        name: null,
        stock: 7
    };
    ;
    ;
    ;
    ;
    ;
    const _0x35f574 = {
        model: 'GROWLER',
        class: 'S',
        name: null,
        stock: 9
    };
    ;
    ;
    ;
    ;
    ;
    const _0xf2851d = {
        model: 'JESTER4',
        class: 'S',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x64965b = {
        model: 'PREVION',
        class: 'S',
        name: null,
        stock: 8
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4933fe = {
        model: 'REMUS',
        class: 'S',
        name: null,
        stock: 10
    };
    ;
    ;
    ;
    ;
    ;
    const _0x15d93b = {
        model: 'RT3000',
        class: 'S',
        name: null,
        stock: 8
    };
    ;
    ;
    ;
    ;
    ;
    const _0x501904 = {
        model: 'SULTAN3',
        class: 'S',
        name: null,
        stock: 4
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2b45ba = {
        model: 'TAILGATER2',
        class: 'S',
        name: null,
        stock: 11
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2ae685 = {
        model: 'VECTRE',
        class: 'S',
        name: null,
        stock: 6
    };
    ;
    ;
    ;
    ;
    ;
    const _0x152cc6 = {
        model: 'WARRENER2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4fd5de = {
        model: 'ZR350',
        class: 'S',
        name: null,
        stock: 8
    };
    ;
    ;
    ;
    ;
    ;
    const _0x22e458 = {
        model: 'futo3',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4f793f = {
        model: 'ruiner6str',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3e3ad6 = {
        model: 'SULTANRSV8',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x47e0fb = {
        model: 'SENTINEL6STR',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1ad62f = {
        model: 'STRATUMC',
        class: 'S',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2fec74 = {
        model: 'REVOLUTION6STR2',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1c312a = {
        model: 'lp700',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x43cddd = {
        model: 'gt17',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x30a835 = {
        model: 'ITALIRSX',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x35c89e = {
        model: 'GAUNTLET5',
        class: 'S',
        name: null,
        stock: 4
    };
    ;
    ;
    ;
    ;
    ;
    const _0x7a4407 = {
        model: 'DUKES3',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x50fbd7 = {
        model: 'COQUETTE4',
        class: 'S',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x58367a = {
        model: 'Tigon',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3d573a = {
        model: 'rmodmustang',
        class: 'S',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x33d908 = {
        model: 'ellie6str',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x167b7d = {
        model: 'gauntlet6str',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5cb2d6 = {
        model: 'GAUNTLET3',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x388fa8 = {
        model: 'GAUNTLET4',
        class: 'S',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x38a645 = {
        model: 'HUSTLER6STR',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x59d74a = {
        model: 'SCHWARZER2',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x50b75a = {
        model: 'sentinel6str2',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0xc96df9 = {
        model: 'zr3806str',
        class: 'S',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3866b5 = {
        model: 'elegy',
        class: 'S',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x23a8f1 = {
        model: 'BANSHEE2fix',
        class: 'S',
        name: null,
        stock: 6
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3dfd5f = {
        model: 'HOTRING',
        class: 'S',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x305f17 = {
        model: 'CHEETAH2',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4a26c9 = {
        model: 'FURIA',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x15535c = {
        model: 'ITALIGTO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4ad434 = {
        model: 'TURISMO2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x33e87a = {
        model: 'gt63',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x497cec = {
        model: 'GTRC',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x448466 = {
        model: 'r35',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1f48cb = {
        model: 'gtr',
        class: 'S',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x6b84fc = {
        model: 'fnf4r34',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x48e256 = {
        model: 'INFERNUS2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5e071b = {
        model: 'TORERO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0xb632d0 = {
        model: 'deviant',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x596281 = {
        model: 'SULTANRS',
        class: 'S',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x380f3a = {
        model: 'PEYOTE2',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x526a1a = {
        model: '66fastback',
        class: 'S',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x20f976 = {
        model: 'zentorno',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2c62e5 = {
        model: 'ADDER',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1a36fe = {
        model: 'turismor',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x472b80 = {
        model: 'PENUMBRA3',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x616cfc = {
        model: 'FUROREGT',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x497972 = {
        model: 'jester',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4fc5fc = {
        model: 'PENUMBRA',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x378c64 = {
        model: 'KANJO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1d04b9 = {
        model: 'ELEGY2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3d1b57 = {
        model: 'z190',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5344d0 = {
        model: 'banshee',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1ee23d = {
        model: 'sentinelsg4',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x122585 = {
        model: 'ninef',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0xae05c2 = {
        model: 'DRAFTER',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2e2e9a = {
        model: 'alpha',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x544709 = {
        model: 'BESTIAGTS',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x186caa = {
        model: 'COMET3',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4e2667 = {
        model: 'COMET5',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x56267a = {
        model: 'COQUETTE',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x221a36 = {
        model: 'RAPIDGT',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x352aa9 = {
        model: 'SURANO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2eb5c0 = {
        model: 'COGCABRIO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x13f668 = {
        model: 'F620',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x130c5f = {
        model: 'FELON2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x21c96f = {
        model: 'ZION',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x553d36 = {
        model: 'PARAGON',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x485ef7 = {
        model: 'WINDSOR',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x37b305 = {
        model: 'BRIOSO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x108f77 = {
        model: 'TOROS',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1aa86c = {
        model: 'PRIMOARD',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x50dd7a = {
        model: 'DOMINATOR',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2a54e2 = {
        model: 'GAUNTLET',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2f1ed0 = {
        model: 'DOMINATOR3',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x21b69d = {
        model: 'JESTER3',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0xb0f2c9 = {
        model: 'SPECTER',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2776c9 = {
        model: 'SPECTER2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x52ba67 = {
        model: 'RUSTON',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3d3a75 = {
        model: 'JUGULAR',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2f5ba2 = {
        model: 'LYNX',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x51c647 = {
        model: 'LOCUST',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1cae8d = {
        model: 'massacro',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x350af4 = {
        model: 'SEVEN70',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5a6816 = {
        model: 'STAFFORD',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4e2dc1 = {
        model: 'SLAMVAN',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2be283 = {
        model: 'YOSEMITE',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x45d673 = {
        model: 'VAMOS',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x37558e = {
        model: 'DUKES',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x373f97 = {
        model: 'blade',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x10c396 = {
        model: 'TAMPA',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x86bf4 = {
        model: 'TORNADO6',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0xb8ed72 = {
        model: 'RUINER',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x15e86a = {
        model: 'SABREGT',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2a2c29 = {
        model: 'SLAMVAN3',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2f7541 = {
        model: 'ELLIE',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4878a4 = {
        model: 'NEBULA',
        class: 'S',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3eab6d = {
        model: 'CLUB',
        class: 'C',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x56c6f7 = {
        model: 'KOMODA',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3c232b = {
        model: 'VSTR',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x22663d = {
        model: 'BLISTA',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x335dc2 = {
        model: 'SUGOI',
        class: 'B',
        name: null,
        stock: 10
    };
    ;
    ;
    ;
    ;
    ;
    const _0x172943 = {
        model: 'PRAIRIE',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3125e3 = {
        model: 'SENTINEL',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x49cb01 = {
        model: 'ZION3',
        class: 'B',
        name: null,
        stock: 15
    };
    ;
    ;
    ;
    ;
    ;
    const _0x536496 = {
        model: 'BUFFALO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5476ac = {
        model: 'FUSILADE',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x124a25 = {
        model: 'FUTO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4aa5e9 = {
        model: 'KURUMA',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x31bc40 = {
        model: 'SCHAFTER2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1eafb9 = {
        model: 'FELON',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x32beb0 = {
        model: 'SENTINEL3',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4cf074 = {
        model: 'COG55',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x124692 = {
        model: 'SAVESTRA',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1ab495 = {
        model: 'REVOLTER',
        class: 'A',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5b1f1f = {
        model: 'JACKAL',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4c0298 = {
        model: 'SULTAN',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x654e84 = {
        model: 'SULTAN2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3a4d12 = {
        model: 'SCHAFTER3',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5a537a = {
        model: 'SCHAFTER4',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1fb57e = {
        model: 'BUFFALO2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x42741 = {
        model: 'FUGITIVE',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2086ac = {
        model: 'PREMIER',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1b1128 = {
        model: 'STRATUM',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0xbc03a3 = {
        model: 'superd',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2e8239 = {
        model: 'ORACLE',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x52a3ce = {
        model: 'ORACLE2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2c7147 = {
        model: 'EXEMPLAR',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2d7b3e = {
        model: 'REBLA',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0xd03ffc = {
        model: 'BALLER3',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4f6643 = {
        model: 'XLS',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x35e282 = {
        model: 'MINIVAN2',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xd69f7b = {
        model: 'WINDSOR2',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5ddc5b = {
        model: 'huntley',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x6763fe = {
        model: 'SURGE',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x21e235 = {
        model: '22G63',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2a9373 = {
        model: 'DUBSTA',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x270461 = {
        model: 'MWGRANGER',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4f0e6b = {
        model: 'GRESLEY',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x324384 = {
        model: 'ROCOTO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3eab5c = {
        model: 'SERRANO',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x175584 = {
        model: 'INTRUDER',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x528f06 = {
        model: 'STINGER',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x477121 = {
        model: 'STINGERGT',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x510f7f = {
        model: 'VIGERO',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1eeda6 = {
        model: 'PICADOR',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xf6e1d2 = {
        model: 'PHOENIX',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x486ae9 = {
        model: 'STALION',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5e1b19 = {
        model: 'STALION2',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x141b05 = {
        model: 'RAPIDGT3',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x38fc1c = {
        model: 'VIRGO',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xc51ab6 = {
        model: 'FELTZER3',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3df24e = {
        model: 'SABREGT2',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1537ce = {
        model: 'FACTION',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x8a7c20 = {
        model: 'SLAMVAN2',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4c03cd = {
        model: 'CASCO',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4312f7 = {
        model: 'TULIP',
        class: 'B',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2eed33 = {
        model: 'IMPALER',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2989bd = {
        model: 'CLIQUE',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1751c8 = {
        model: 'SWINGER',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x33fdd7 = {
        model: 'CHEBUREK',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3be13e = {
        model: 'VISERIS',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x24f439 = {
        model: 'COQUETTE2',
        class: 'B',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x38240a = {
        model: 'COQUETTE3',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2918b9 = {
        model: 'GT500',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3a96c8 = {
        model: 'MAMBA',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x31a675 = {
        model: 'SQUADDIE',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0xc4f9cd = {
        model: 'OUTLAW',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x335537 = {
        model: 'VAGRANT',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x469671 = {
        model: 'EVERON',
        class: 'B',
        name: null,
        stock: 6
    };
    ;
    ;
    ;
    ;
    ;
    const _0x55df4a = {
        model: 'TROPOS',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4d814c = {
        model: 'OMNIS',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x45a097 = {
        model: 'RETINUE',
        class: 'B',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x364f21 = {
        model: 'MICHELLI',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x360173 = {
        model: 'GB200',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3eafac = {
        model: 'RETINUE2',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5b31e6 = {
        model: 'FLASHGT',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5743df = {
        model: 'WEEVIL',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x43a55f = {
        model: 'WINKY',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x591180 = {
        model: 'BRIOSO2',
        class: 'B',
        name: null,
        stock: 2
    };
    ;
    ;
    ;
    ;
    ;
    const _0x595057 = {
        model: 'DELUXO2',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x48d89b = {
        model: 'YOSEMITE3',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x48ddc5 = {
        model: 'SEMINOLE2',
        class: 'C',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x94b276 = {
        model: 'GLENDALE2',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x14c7f4 = {
        model: 'BLISTA2',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5dc613 = {
        model: 'ASBO',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1ff5eb = {
        model: 'PATRIOT2',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x43d1a9 = {
        model: 'PRIMO',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x34cc54 = {
        model: 'PRIMO2',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x405825 = {
        model: 'warrener',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1062ed = {
        model: 'PANTO',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x12449c = {
        model: 'INGOT',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x309a5a = {
        model: 'ASTEROPE',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3cb65c = {
        model: 'STANIER',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3c16c2 = {
        model: 'STRETCH',
        class: 'C',
        name: null,
        stock: 3
    };
    ;
    ;
    ;
    ;
    ;
    const _0x200b51 = {
        model: 'WASHINGTON',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5e7b06 = {
        model: 'ISSI7',
        class: 'A',
        name: null,
        stock: 5
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4ccf3e = {
        model: 'BALLER',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x293e0e = {
        model: 'BALLER2',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2598c5 = {
        model: 'BJXL',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xcbe85 = {
        model: 'FQ2',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3a476d = {
        model: 'GRANGER',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3b6e41 = {
        model: 'LGUARD',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1617af = {
        model: 'HABANERO',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xa1adef = {
        model: 'LANDSTALKER',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x34136e = {
        model: 'PATRIOT',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5a164c = {
        model: 'RADI',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x440a9 = {
        model: 'SEMINOLE',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x548d57 = {
        model: 'YOUGA',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x48de87 = {
        model: 'ztype',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x58f42f = {
        model: 'HOTKNIFE',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0xdf9265 = {
        model: 'GLENDALE',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x14fcb8 = {
        model: 'CHINO',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4d76b8 = {
        model: 'MOONBEAM',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x16cd1e = {
        model: 'FACTION3',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x568674 = {
        model: 'CHINO2',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x18b2a8 = {
        model: 'ISSI3',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x508cff = {
        model: 'FAGALOA',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x866602 = {
        model: 'CARACARA2',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3b6d98 = {
        model: 'BOBCATXL',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2fa57f = {
        model: 'REBEL',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x501da0 = {
        model: 'BISON',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x14a625 = {
        model: 'DUNE',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x52830a = {
        model: 'DUBSTA3',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x44592d = {
        model: 'bifta',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x58f46b = {
        model: 'CONTENDER',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x28c1f4 = {
        model: 'BRAWLER',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x403ef5 = {
        model: 'GUARDIAN',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3db995 = {
        model: 'RUMPO3',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xd99c4e = {
        model: 'FREECRAWLER',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x19c70d = {
        model: 'STREITER',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x308e15 = {
        model: 'RIATA',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x57820a = {
        model: 'KAMACHO',
        class: 'B',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x126ff1 = {
        model: 'MESA',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4a7b7c = {
        model: 'COMET4',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xac1eac = {
        model: 'RALLYTRUCK',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1c71f1 = {
        model: 'SLAMTRUCK',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5c1adf = {
        model: 'YOUGA3',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5d3f36 = {
        model: 'MANANA2',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2f59b0 = {
        model: 'PEYOTE3',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1d9fee = {
        model: 'VETO',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x592ec3 = {
        model: 'VETO2',
        class: 'B',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x40ca7f = {
        model: 'GBURRITO2',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x155d16 = {
        model: 'paradise',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xa37dee = {
        model: 'ASEA',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2cd658 = {
        model: 'EMPEROR',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x241433 = {
        model: 'REGINA',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2147be = {
        model: 'ROMERO',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xc4139d = {
        model: 'MINIVAN',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1a9f1a = {
        model: 'PONY',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x38697c = {
        model: 'RUMPO',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4b1cc5 = {
        model: 'NEWSVAN',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x593258 = {
        model: 'speedo',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3934fc = {
        model: 'TACO',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x12c6d5 = {
        model: 'CAMPER',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x36e631 = {
        model: 'DILETTANTE',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xd7ccf3 = {
        model: 'BURRITO',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xf73c62 = {
        model: 'GBURRITO',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x11f02f = {
        model: 'JOURNEY',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x28df14 = {
        model: 'DYNASTY',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x54f61d = {
        model: 'SURFER',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x41e4b4 = {
        model: 'MANANA',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3d6f74 = {
        model: 'PEYOTE',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x8c44a0 = {
        model: 'TORNADO',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0xc864f8 = {
        model: 'PIGALLE',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5f2dba = {
        model: 'VIRGO2',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1a3020 = {
        model: 'VIRGO3',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x26d0bb = {
        model: 'TORNADO5',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x48fbf4 = {
        model: 'VOODOO2',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x410912 = {
        model: 'VOODOO',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x7cc7e = {
        model: 'YOUGA2',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3f90d3 = {
        model: 'HERMES',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4db509 = {
        model: 'HUSTLER',
        class: 'C',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x302b1f = {
        model: 'BODHI2',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x29fd64 = {
        model: 'RANCHERXL',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3aebc1 = {
        model: 'SADLER',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2f471e = {
        model: 'DLOADER',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3d448c = {
        model: 'SANDKING',
        class: 'C',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x3c6039 = {
        model: 'kalahari',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x16faa7 = {
        model: 'COACH',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x51dd51 = {
        model: 'FLATBED',
        class: 'D',
        name: null,
        stock: null
    };
    ;
    ;
    ;
    ;
    ;
    const _0x1cd553 = {
        model: 'MIXER',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x38de01 = {
        model: 'MIXER2',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x543bc5 = {
        model: 'RUBBLE',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x47d5bf = {
        model: 'TIPTRUCK',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4d129a = {
        model: 'TIPTRUCK2',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x889725 = {
        model: 'BUS',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4f2f55 = {
        model: 'TOURBUS',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x127f85 = {
        model: 'trash',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x19e49c = {
        model: 'TRASH2',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5080ec = {
        model: 'AIRTUG',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2981c1 = {
        model: 'caddy',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x42e8e8 = {
        model: 'CADDY2',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2311a5 = {
        model: 'DOCKTUG',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x277bb4 = {
        model: 'forklift',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x462a33 = {
        model: 'MOWER',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x285ea2 = {
        model: 'RIPLEY',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x49485d = {
        model: 'SCRAP',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x13e997 = {
        model: 'BOXVILLE',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x9f08bf = {
        model: 'benson',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x53416f = {
        model: 'BIFF',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x249d53 = {
        model: 'hauler',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4f24f8 = {
        model: 'MULE',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x25a62a = {
        model: 'PACKER',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4b98d3 = {
        model: 'PHANTOM',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x4d7a54 = {
        model: 'POUNDER',
        class: 'D',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x5d25b2 = {
        model: 'WASTELANDER',
        class: 'A',
        name: null,
        stock: 1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x2ff9f8 = {
        model: 'SAVANNA',
        class: 'B',
        name: null,
        stock: -1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x16efda = {
        model: 'MONSTER',
        class: 'A',
        name: null,
        stock: -1
    };
    ;
    ;
    ;
    ;
    ;
    const _0x18b227 = [
            _0x534427,
            _0x25907a,
            _0x3f3183,
            _0x2f8c91,
            _0x371cc0,
            _0x2d2232,
            _0x260d9a,
            _0x35f574,
            _0xf2851d,
            _0x64965b,
            _0x4933fe,
            _0x15d93b,
            _0x501904,
            _0x2b45ba,
            _0x2ae685,
            _0x152cc6,
            _0x4fd5de,
            _0x22e458,
            _0x4f793f,
            _0x3e3ad6,
            _0x47e0fb,
            _0x1ad62f,
            _0x2fec74,
            _0x1c312a,
            _0x43cddd,
            _0x30a835,
            _0x35c89e,
            _0x7a4407,
            _0x50fbd7,
            _0x58367a,
            _0x3d573a,
            _0x33d908,
            _0x167b7d,
            _0x5cb2d6,
            _0x388fa8,
            _0x38a645,
            _0x59d74a,
            _0x50b75a,
            _0xc96df9,
            _0x3866b5,
            _0x23a8f1,
            _0x3dfd5f,
            _0x305f17,
            _0x4a26c9,
            _0x15535c,
            _0x4ad434,
            _0x33e87a,
            _0x497cec,
            _0x448466,
            _0x1f48cb,
            _0x6b84fc,
            _0x48e256,
            _0x5e071b,
            _0xb632d0,
            _0x596281,
            _0x380f3a,
            _0x526a1a,
            _0x20f976,
            _0x2c62e5,
            _0x1a36fe,
            _0x472b80,
            _0x616cfc,
            _0x497972,
            _0x4fc5fc,
            _0x378c64,
            _0x1d04b9,
            _0x3d1b57,
            _0x5344d0,
            _0x1ee23d,
            _0x122585,
            _0xae05c2,
            _0x2e2e9a,
            _0x544709,
            _0x186caa,
            _0x4e2667,
            _0x56267a,
            _0x221a36,
            _0x352aa9,
            _0x2eb5c0,
            _0x13f668,
            _0x130c5f,
            _0x21c96f,
            _0x553d36,
            _0x485ef7,
            _0x37b305,
            _0x108f77,
            _0x1aa86c,
            _0x50dd7a,
            _0x2a54e2,
            _0x2f1ed0,
            _0x21b69d,
            _0xb0f2c9,
            _0x2776c9,
            _0x52ba67,
            _0x3d3a75,
            _0x2f5ba2,
            _0x51c647,
            _0x1cae8d,
            _0x350af4,
            _0x5a6816,
            _0x4e2dc1,
            _0x2be283,
            _0x45d673,
            _0x37558e,
            _0x373f97,
            _0x10c396,
            _0x86bf4,
            _0xb8ed72,
            _0x15e86a,
            _0x2a2c29,
            _0x2f7541,
            _0x4878a4,
            _0x3eab6d,
            _0x56c6f7,
            _0x3c232b,
            _0x22663d,
            _0x335dc2,
            _0x172943,
            _0x3125e3,
            _0x49cb01,
            _0x536496,
            _0x5476ac,
            _0x124a25,
            _0x4aa5e9,
            _0x31bc40,
            _0x1eafb9,
            _0x32beb0,
            _0x4cf074,
            _0x124692,
            _0x1ab495,
            _0x5b1f1f,
            _0x4c0298,
            _0x654e84,
            _0x3a4d12,
            _0x5a537a,
            _0x1fb57e,
            _0x42741,
            _0x2086ac,
            _0x1b1128,
            _0xbc03a3,
            _0x2e8239,
            _0x52a3ce,
            _0x2c7147,
            _0x2d7b3e,
            _0xd03ffc,
            _0x4f6643,
            _0x35e282,
            _0xd69f7b,
            _0x5ddc5b,
            _0x6763fe,
            _0x21e235,
            _0x2a9373,
            _0x270461,
            _0x4f0e6b,
            _0x324384,
            _0x3eab5c,
            _0x175584,
            _0x528f06,
            _0x477121,
            _0x510f7f,
            _0x1eeda6,
            _0xf6e1d2,
            _0x486ae9,
            _0x5e1b19,
            _0x141b05,
            _0x38fc1c,
            _0xc51ab6,
            _0x3df24e,
            _0x1537ce,
            _0x8a7c20,
            _0x4c03cd,
            _0x4312f7,
            _0x2eed33,
            _0x2989bd,
            _0x1751c8,
            _0x33fdd7,
            _0x3be13e,
            _0x24f439,
            _0x38240a,
            _0x2918b9,
            _0x3a96c8,
            _0x31a675,
            _0xc4f9cd,
            _0x335537,
            _0x469671,
            _0x55df4a,
            _0x4d814c,
            _0x45a097,
            _0x364f21,
            _0x360173,
            _0x3eafac,
            _0x5b31e6,
            _0x5743df,
            _0x43a55f,
            _0x591180,
            _0x595057,
            _0x48d89b,
            _0x48ddc5,
            _0x94b276,
            _0x14c7f4,
            _0x5dc613,
            _0x1ff5eb,
            _0x43d1a9,
            _0x34cc54,
            _0x405825,
            _0x1062ed,
            _0x12449c,
            _0x309a5a,
            _0x3cb65c,
            _0x3c16c2,
            _0x200b51,
            _0x5e7b06,
            _0x4ccf3e,
            _0x293e0e,
            _0x2598c5,
            _0xcbe85,
            _0x3a476d,
            _0x3b6e41,
            _0x1617af,
            _0xa1adef,
            _0x34136e,
            _0x5a164c,
            _0x440a9,
            _0x548d57,
            _0x48de87,
            _0x58f42f,
            _0xdf9265,
            _0x14fcb8,
            _0x4d76b8,
            _0x16cd1e,
            _0x568674,
            _0x18b2a8,
            _0x508cff,
            _0x866602,
            _0x3b6d98,
            _0x2fa57f,
            _0x501da0,
            _0x14a625,
            _0x52830a,
            _0x44592d,
            _0x58f46b,
            _0x28c1f4,
            _0x403ef5,
            _0x3db995,
            _0xd99c4e,
            _0x19c70d,
            _0x308e15,
            _0x57820a,
            _0x126ff1,
            _0x4a7b7c,
            _0xac1eac,
            _0x1c71f1,
            _0x5c1adf,
            _0x5d3f36,
            _0x2f59b0,
            _0x1d9fee,
            _0x592ec3,
            _0x40ca7f,
            _0x155d16,
            _0xa37dee,
            _0x2cd658,
            _0x241433,
            _0x2147be,
            _0xc4139d,
            _0x1a9f1a,
            _0x38697c,
            _0x4b1cc5,
            _0x593258,
            _0x3934fc,
            _0x12c6d5,
            _0x36e631,
            _0xd7ccf3,
            _0xf73c62,
            _0x11f02f,
            _0x28df14,
            _0x54f61d,
            _0x41e4b4,
            _0x3d6f74,
            _0x8c44a0,
            _0xc864f8,
            _0x5f2dba,
            _0x1a3020,
            _0x26d0bb,
            _0x48fbf4,
            _0x410912,
            _0x7cc7e,
            _0x3f90d3,
            _0x4db509,
            _0x302b1f,
            _0x29fd64,
            _0x3aebc1,
            _0x2f471e,
            _0x3d448c,
            _0x3c6039,
            _0x16faa7,
            _0x51dd51,
            _0x1cd553,
            _0x38de01,
            _0x543bc5,
            _0x47d5bf,
            _0x4d129a,
            _0x889725,
            _0x4f2f55,
            _0x127f85,
            _0x19e49c,
            _0x5080ec,
            _0x2981c1,
            _0x42e8e8,
            _0x2311a5,
            _0x277bb4,
            _0x462a33,
            _0x285ea2,
            _0x49485d,
            _0x13e997,
            _0x9f08bf,
            _0x53416f,
            _0x249d53,
            _0x4f24f8,
            _0x25a62a,
            _0x4b98d3,
            _0x4d7a54,
            _0x5d25b2,
            _0x2ff9f8,
            _0x16efda
        ], _0x1883d1 = () => {
            ;
            return _0x18b227.map(_0xae71aa => {
                ;
                return Object.assign(Object.assign({}, _0xae71aa), { 'model': _0xae71aa.model.toLocaleLowerCase() });
            });
        }, _0x2a1aea = _0x423a5a => {
            ;
            var _0x689e90;
            const _0x2fcff2 = typeof _0x423a5a === 'string' ? GetHashKey(_0x423a5a) : _0x423a5a, _0x27ddb2 = _0x1883d1(), _0x14a6d2 = _0x27ddb2.find(_0x4b005b => GetHashKey(_0x4b005b.model) === _0x2fcff2);
            return (_0x689e90 = _0x14a6d2 === null || _0x14a6d2 === void 0 ? void 0 : _0x14a6d2.class) !== null && _0x689e90 !== void 0 ? _0x689e90 : 'D';
        };
    _0x1cb0d8.g.exports('GetVehiclesWithClasses', () => {
        return _0x1883d1();
    });
    _0x1cb0d8.g.exports('GetVehicleClassByModel', _0x4e60aa => {
        return _0x2a1aea(_0x4e60aa);
    });
    ;
    const _0x107b28 = null && _0x18b227;
    ;
    const _0x8aec14 = async _0x1a674e => {
            const _0x81d57c = GetResourceConfig('upgradeMap'), _0x30b48b = _0x81d57c.find(_0x43bb7a => _0x43bb7a.expRequired === 0).class;
            let _0x1d55c3 = _0x30b48b;
            const _0x532f27 = await Experience.GetCharBoostingExperience(_0x1a674e);
            if (_0x532f27 <= 0 || !_0x532f27) {
                return _0x30b48b;
            }
            const _0x49e457 = _0x81d57c.sort((_0xaeab21, _0x35b730) => _0xaeab21.expRequired - _0x35b730.expRequired);
            for (const _0x3e2c63 of _0x49e457) {
                _0x532f27 >= _0x3e2c63.expRequired && (_0x1d55c3 = _0x3e2c63.class);
            }
            return _0x1d55c3;
        }, _0x583765 = _0x41d9ae => {
            ;
            const _0x28810e = GetResourceConfig('tierOrder'), _0x2e1cce = _0x28810e.findIndex(_0x2097b2 => _0x2097b2 === _0x41d9ae), _0x3731d6 = _0x28810e.slice(0, _0x2e1cce + 1);
            return _0x3731d6;
        }, _0x4824b6 = async (_0x11e776, _0x2e0d4b, _0x2b9b7c) => {
            const _0xe5c385 = _0x11e776.includes('Upgraded'), _0x1c069c = GetModuleConfig('vrp-boosting:vehicleSpawns', _0xe5c385 ? 'highend' : 'normal'), _0x1fc932 = _0x1c069c.filter(_0x43c2de => !_0x2e0d4b.includes(_0x43c2de.id));
            let _0x2e6e3c = null, _0x510170 = null, _0x27c06b = 0;
            if (_0x2b9b7c && _0x11e776 !== 'SUpgraded2') {
                const _0x199910 = await AsyncExports['vrp-vehicles'].GetGarage(_0x2b9b7c.garage), _0x4d9a72 = ['garage_num_3'];
                if (_0x199910 && !_0x4d9a72.includes(_0x199910.garage_id)) {
                    const _0x319695 = getRandomElements(_0x199910.parkingSpots, 1)[0];
                    _0x27c06b = _0x319695.heading;
                    _0x510170 = _0x319695.coords;
                    ;
                } else {
                    return _0x4824b6(_0x11e776, _0x2e0d4b);
                }
            } else {
                const _0x76c06c = Math.floor(Math.random() * _0x1fc932.length);
                _0x510170 = _0x1fc932[_0x76c06c].coords;
                _0x27c06b = _0x1fc932[_0x76c06c].heading;
                _0x2e6e3c = _0x1fc932[_0x76c06c].id;
                ;
            }
            const [_0x2db6f0, _0x357993] = exports['vrp-infinity'].GetPlayerClosestToCoord(_0x510170.x, _0x510170.y, _0x510170.z);
            if (_0x357993 < 150) {
                const _0x112390 = await RPC.execute('IsAnyVehicleNearPoint', _0x2db6f0, _0x510170.x, _0x510170.y, _0x510170.z, 3);
                if (_0x112390) {
                    return await _0x4824b6(_0x11e776, _0x2e0d4b, _0x2b9b7c);
                }
            }
            const _0x407311 = {};
            return _0x407311.coords = _0x510170, _0x407311.heading = _0x27c06b, _0x407311.id = _0x2e6e3c, _0x407311;
        }, _0x1b5746 = _0x2290d6 => {
            ;
            if (_0x2290d6 >= 100) {
                return true;
            }
            if (_0x2290d6 <= 0) {
                return false;
            }
            const _0x51cbbb = Math.floor(_0x2290d6 / 100 * 4294967295), _0x3d8486 = Math.floor(Math.random() * 4294967295);
            return _0x3d8486 <= _0x51cbbb;
        }, _0x5d6913 = async (_0x2cf496, _0x27582e) => {
            ;
            const _0x481e59 = GetClassConfig(_0x27582e), _0x1e2d7c = 'SELECT COUNT(*) as total FROM boosting_runs WHERE characterId=? AND carClass=? AND createdAt >= DATE_SUB(NOW(),INTERVAL 12 HOUR);', _0x5b5f4f = await SQL.execute(_0x1e2d7c, [
                    _0x2cf496,
                    _0x27582e
                ]);
            return _0x5b5f4f[0].total >= _0x481e59.maxPerDay;
        }, _0x27843c = async (_0x4aadec, _0x370233) => {
            ;
            const _0x111325 = GetClassConfig(_0x370233);
            if (_0x111325.maxPerHour === -1) {
                return false;
            }
            const _0x3626b4 = 'SELECT COUNT(*) as total FROM boosting_runs WHERE characterId=? AND carClass=? AND createdAt >= DATE_SUB(NOW(),INTERVAL 1 HOUR); ', _0x2a7642 = await SQL.execute(_0x3626b4, [
                    _0x4aadec,
                    _0x370233
                ]);
            return _0x2a7642[0].total >= _0x111325.maxPerHour;
        }, _0x5004b1 = async _0x23e2ec => {
            const _0x5a797b = 'SELECT createdAt FROM boosting_runs WHERE characterId=? AND createdAt >= DATE_SUB(NOW(),INTERVAL 30 MINUTE);', _0x261967 = await SQL.execute(_0x5a797b, [_0x23e2ec]);
            if (_0x261967.length <= 0) {
                return true;
            }
            return _0x261967[0].total <= 0;
        }, _0x2922c9 = async (_0x55b747, _0x5f20f4) => {
            const _0x363633 = await RPC.execute('GetVehicleName', _0x55b747, _0x5f20f4);
            return _0x363633 === 'NULL' ? _0x5f20f4 : _0x363633;
        }, _0x553a33 = async (_0x2b79d6, _0x14349a, _0x4f1ba7, _0x3a8ea7) => {
            ;
            var _0x5f2093;
            const _0x29c794 = _0x2b79d6.includes('SUpgraded');
            let _0x2216b4 = (_0x5f2093 = _0x2b79d6[0]) !== null && _0x5f2093 !== void 0 ? _0x5f2093 : 'D';
            _0x2b79d6 === 'SUpgraded2' && (_0x2216b4 = 'S2');
            let _0x75f6c7 = null;
            if (_0x4f1ba7) {
                const _0x277ad0 = {
                    model: _0x4f1ba7.model,
                    name: null,
                    class: _0x2216b4
                };
                ;
                ;
                ;
                _0x75f6c7 = _0x277ad0;
                ;
            } else {
                const _0x4d116c = shuffleArray(VEHICLES_WITH_CLASSES.filter(_0x43e97e => _0x43e97e.class === _0x2216b4));
                if (_0x4d116c.length <= 0) {
                    return null;
                }
                const _0x55eaed = Math.floor(Math.random() * _0x4d116c.length), _0x2ceaf0 = !_0x3a8ea7 ? _0x55eaed : _0x4d116c.findIndex(_0x11304d => _0x11304d.model.toLocaleLowerCase() === _0x3a8ea7.toLowerCase());
                _0x75f6c7 = _0x4d116c[_0x2ceaf0];
            }
            const _0x40831a = { gnePurchaseCost: null };
            ;
            const _0x3e4b57 = Object.assign(Object.assign({}, _0x75f6c7), _0x40831a), _0x49a7e6 = exports['vrp-showrooms'].getSingleCarConfig(_0x75f6c7.model), _0x12e83f = GetResourceConfig('minVinScratchCost'), _0x4f82c3 = _0x29c794 ? _0x12e83f * 3 : _0x12e83f, _0x5ab8bb = _0x29c794 ? 10000 : 12000;
            return _0x3e4b57.gnePurchaseCost = _0x49a7e6 ? Math.round(_0x49a7e6.retail_price / _0x5ab8bb) : _0x4f82c3, _0x3e4b57.name = (_0x49a7e6 === null || _0x49a7e6 === void 0 ? void 0 : _0x49a7e6.name) !== undefined ? _0x49a7e6.name : await _0x2922c9(_0x14349a, _0x75f6c7.model), _0x3e4b57;
        }, _0x17bd60 = _0x699b20 => {
            ;
            const _0x1f644e = Base.getModule('Player').GetUser(_0x699b20);
            return _0x1f644e ? _0x1f644e.job === 'police' : false;
        }, _0x491512 = _0x4ca11b => {
            ;
            if (_0x4ca11b.size < 1) {
                return null;
            }
            const _0x5aa2d9 = [];
            for (const [_0x5ea717, _0x41ddba] of _0x4ca11b) {
                const _0xa545f2 = {
                    charId: _0x41ddba.charId,
                    chance: _0x41ddba.chance
                };
                ;
                ;
                _0x5aa2d9.push(_0xa545f2);
                ;
            }
            const _0x1f0945 = weighted(_0x5aa2d9.map(_0x203bf3 => _0x203bf3.charId), _0x5aa2d9.map(_0x3f8853 => _0x3f8853.chance));
            return _0x1f0945;
        }, _0x22763f = (_0x1a17e1, _0x20e15b) => {
            const _0x1d65ed = new Map();
            for (const [_0x5a2b97, _0x33954f] of _0x1a17e1) {
                const _0x5f05d0 = _0x583765(_0x33954f.highestClass);
                _0x5f05d0.includes(_0x20e15b) && _0x1d65ed.set(_0x5a2b97, _0x33954f);
            }
            return _0x1d65ed;
        }, _0x544ba8 = async (_0x5c9146, _0x466f21) => {
            ;
            const _0x4c9bef = GetResourceConfig('skipLimit');
            if (_0x4c9bef.includes(_0x466f21)) {
                return true;
            }
            const _0x4a0842 = GetClassConfig(_0x466f21), _0xe08a98 = _0x4a0842.scratchCooldown, _0x55b06e = 'SELECT * FROM boosting_runs WHERE characterId=? and vinScratched=TRUE AND carClass=? and createdAt > DATE_SUB(NOW(), INTERVAL ? WEEK);', _0x5cc6cb = await SQL.execute(_0x55b06e, [
                    _0x5c9146,
                    _0x466f21,
                    _0xe08a98
                ]);
            return _0x5cc6cb.length === 0;
        }, _0x465929 = async (_0x16e373, _0x5a6d7a) => {
            const _0x5c7302 = _0x5a6d7a === 'SUpgraded' ? 16 : 4, _0x64412c = 'SELECT * FROM boosting_runs WHERE carModel=? and vinScratched=TRUE AND createdAt >= DATE_SUB(NOW(), INTERVAL ? WEEK) AND impounded=false;', _0x4f3947 = await SQL.execute(_0x64412c, [
                    _0x16e373,
                    _0x5c7302
                ]), _0xcf27a4 = VEHICLES_WITH_CLASSES.find(_0x44a8fa => _0x44a8fa.model === _0x16e373);
            if (!_0xcf27a4) {
                return true;
            }
            if (!_0xcf27a4.stock) {
                return true;
            }
            if (_0xcf27a4.stock === -1) {
                return false;
            }
            return _0x4f3947.length < _0xcf27a4.stock;
        }, _0x1089a1 = _0x26b48d => {
            ;
            const _0x2197c6 = [
                    'AUpgraded',
                    'SUpgraded',
                    'SUpgraded2'
                ], _0x237c99 = _0x2197c6.includes(_0x26b48d) ? _0x26b48d + ' Completed' : 'Completed';
            return exports['vrp-tracking'].increment(_0x237c99);
        }, _0x1d51db = async (_0x3554be, _0x1b14c6) => {
            const _0x312800 = exports['vrp-showrooms'].getSingleCarConfig(_0x3554be), _0x479aff = GetResourceConfig('minVinScratchCost'), _0x41533a = _0x1b14c6.includes('SUpgraded') ? 10000 : 12000, _0x5ce54f = _0x1b14c6.includes('SUpgraded') ? _0x479aff * 3 : _0x479aff, _0x43589c = _0x312800 ? Math.round(_0x312800.retail_price / _0x41533a) : _0x5ce54f;
            return _0x43589c;
        }, _0x51ae79 = (_0x9f9769, _0x372388, _0x400e8a, _0x42e845) => {
            ;
            emitNet('phone:emailReceived', _0x9f9769, _0x372388, _0x400e8a, _0x42e845, {});
        };
    ;
    const _0x555436 = async () => {
        ;
        var _0x5bafd0;
        const _0x228e19 = GetVehiclePedIsIn(PlayerPedId(), false);
        if (_0x228e19 === 0) {
            return;
        }
        if (GetPedInVehicleSeat(_0x228e19, -1) === PlayerPedId()) {
            return;
        }
        const _0x2dbd94 = GetEntitySpeed(_0x228e19) * 2.236936;
        if (_0x2dbd94 < 50) {
            emit('vrp-boosting:client:notifyPolicePing', 'Beep_Red', 'DLC_HEIST_HACKING_SNAKE_SOUNDS');
            return;
        }
        const _0x1a911b = NetworkGetNetworkIdFromEntity(_0x228e19), _0x5dc105 = await RPC.execute('vrp-boosting:server:attemptContractMinigame', _0x1a911b);
        if (!_0x5dc105.allowed && _0x5dc105.contractId) {
            return emit('DoLongHudText', 'Sorry, you can\'t do that yet.', 2);
        }
        if (!_0x5dc105.allowed || !_0x5dc105.contractId) {
            return;
        }
        const _0x77b84c = [
            'letters',
            'numbers',
            'letters_greek'
        ];
        let _0x5c07fb = false, _0x1cfc52 = false;
        if (_0x5dc105.vehClass.includes('Upgraded')) {
            _0x77b84c.push('runic');
            _0x77b84c.push('numandletters');
            _0x5c07fb = _0x1b5746(20);
            ;
            if (_0x5dc105.vehClass === 'SUpgraded') {
                _0x1cfc52 = _0x1b5746(60);
                _0x5c07fb = _0x1b5746(35);
            }
            if (_0x5dc105.vehClass === 'SUpgraded2') {
                _0x1cfc52 = false;
                _0x5c07fb = _0x1b5746(25);
                ;
            }
        }
        const _0x31daf4 = _0x5dc105.vehClass === 'SUpgraded2' ? 'symbols' : _0x77b84c[_0x5f11e9.getRandomNumber(0, _0x77b84c.length)], _0x20593d = {
                SUpgraded2: 10000,
                SUpgraded: 15000
            };
        ;
        ;
        ;
        const _0x13024a = _0x20593d, _0x13cfc5 = {
                tempShow: _0x1cfc52,
                upsideDown: _0x5c07fb,
                type: _0x31daf4,
                timeToComplete: (_0x5bafd0 = _0x13024a[_0x5dc105.vehClass]) !== null && _0x5bafd0 !== void 0 ? _0x5bafd0 : 22000,
                gameCompletedEvent: 'vrp-ui:minigame-sequence-completed:boosting',
                shiftInterval: 2000,
                parameters: {}
            };
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        _0x13cfc5.parameters.contractId = _0x5dc105.contractId;
        exports['vrp-ui'].openApplication('minigame-sequence', _0x13cfc5);
        exports['vrp-ui'].SetUIFocus(true, true);
        ;
    };
    ;
    const _0x260e2b = new Map();
    async function _0x4f6c87() {
        ;
        _0x30a41c('trackerdisabler', _0x555436);
    }
    function _0x30a41c(_0x493ee5, _0x4d009d) {
        ;
        _0x260e2b.set(_0x493ee5, _0x4d009d);
    }
    onNet('RunUseItem', async (_0x94a307, _0x403679, _0x3a4709, _0xd21be4, _0x179836) => {
        ;
        if (!_0x260e2b.has(_0x94a307)) {
            return;
        }
        const _0x4cc03b = exports['vrp-inventory'].GetItemInfo(_0x403679), _0x5e68a3 = _0x260e2b.get(_0x94a307);
        _0x5e68a3(_0x94a307, _0x403679, _0x3a4709, _0x4cc03b.quality, _0xd21be4, _0x179836, _0x4cc03b);
    });
    ;
    const _0x2f6dfa = async () => {
            ;
            _0x21104f.onNet('vrp-boosting:auction:UpdateAuction', () => {
                const _0x55199d = { id: 'refresh-auction-list' };
                ;
                exports['vrp-ui'].sendAppEvent('laptop', _0x55199d);
                ;
            });
            RegisterUICallback('vrp-boosting:ui:getAuctionItems', async (_0xcab297, _0x1069e3) => {
                ;
                var _0x322bd8;
                const _0x323c3e = (_0x322bd8 = await RPC.execute('vrp-boosting:auction:GetAuctionItems')) !== null && _0x322bd8 !== void 0 ? _0x322bd8 : [], _0x8891fc = {
                        ok: true,
                        message: ''
                    };
                ;
                ;
                ;
                const _0x57c18d = {
                    data: _0x323c3e,
                    meta: _0x8891fc
                };
                ;
                ;
                _0x1069e3(_0x57c18d);
                ;
            });
            RegisterUICallback('vrp-boosting:ui:createAuction', async (_0x5e1f0c, _0x40d52b) => {
                const _0x91f8bc = {
                    startingBid: _0x5e1f0c.startingBid,
                    contractId: _0x5e1f0c.contractId,
                    duration: _0x5e1f0c.duration
                };
                ;
                ;
                ;
                ;
                const [_0x48d797, _0x4ee9e8] = await RPC.execute('vrp-boosting:auction:CreateAuction', _0x91f8bc), _0x73d6c7 = { id: 'refresh-contracts' };
                ;
                if (_0x48d797) {
                    exports['vrp-ui'].sendAppEvent('laptop', _0x73d6c7);
                }
                const _0x415cd9 = {
                    ok: _0x48d797,
                    message: _0x4ee9e8
                };
                ;
                ;
                ;
                const _0x52ac5f = {
                    data: {},
                    meta: _0x415cd9
                };
                ;
                ;
                _0x40d52b(_0x52ac5f);
                ;
            });
            RegisterUICallback('vrp-boosting:ui:placeAuctionBid', async (_0x352664, _0x34f06f) => {
                const [_0x1a3e5e, _0x2d4317] = await RPC.execute('vrp-boosting:auction:PlaceAuctionBid', {
                        'bidAmount': Number(_0x352664.bidAmount),
                        'auctionId': _0x352664.auctionId
                    }), _0x25585c = {
                        ok: _0x1a3e5e,
                        message: _0x2d4317
                    };
                ;
                ;
                ;
                const _0x5d3f71 = {
                    data: {},
                    meta: _0x25585c
                };
                ;
                ;
                _0x34f06f(_0x5d3f71);
                ;
            });
            ;
        }, _0x2b8f24 = _0x2f6dfa;
    ;
    const _0x41b3a6 = async () => {
        ;
        await _0x2b8f24();
    };
    ;
    class _0x46476d {
        constructor(_0x2d7f54 = 0, _0x395b44 = 0, _0xfded00 = 0) {
            ;
            this.x = _0x2d7f54;
            this.y = _0x395b44;
            this.z = _0xfded00;
            ;
        }
        ['setFromArray'](_0x470137) {
            ;
            return this.x = _0x470137[0], this.y = _0x470137[1], this.z = _0x470137[2], this;
        }
        ['getArray']() {
            ;
            return [
                this.x,
                this.y,
                this.z
            ];
        }
        ['add'](_0x5b8210) {
            return this.x += _0x5b8210.x, this.y += _0x5b8210.y, this.z += _0x5b8210.z, this;
        }
        ['addScalar'](_0xb4b273) {
            ;
            return this.x += _0xb4b273, this.y += _0xb4b273, this.z += _0xb4b273, this;
        }
        ['sub'](_0x2a4cb3) {
            return this.x -= _0x2a4cb3.x, this.y -= _0x2a4cb3.y, this.z -= _0x2a4cb3.z, this;
        }
        ['equals'](_0x588e8e) {
            return this.x === _0x588e8e.x && this.y === _0x588e8e.y && this.z === _0x588e8e.z;
        }
        ['subScalar'](_0x32d669) {
            return this.x -= _0x32d669, this.y -= _0x32d669, this.z -= _0x32d669, this;
        }
        ['multiply'](_0x59cac3) {
            return this.x *= _0x59cac3.x, this.y *= _0x59cac3.y, this.z *= _0x59cac3.z, this;
        }
        ['multiplyScalar'](_0x176c56) {
            ;
            return this.x *= _0x176c56, this.y *= _0x176c56, this.z *= _0x176c56, this;
        }
        ['round']() {
            ;
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
        }
        ['floor']() {
            ;
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
        }
        ['ceil']() {
            ;
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
        }
        ['getDistance'](_0xb54b56) {
            ;
            const [_0x5cccd9, _0x3bd7b3, _0x488e37] = [
                this.x - _0xb54b56.x,
                this.y - _0xb54b56.y,
                this.z - _0xb54b56.z
            ];
            return Math.sqrt(_0x5cccd9 * _0x5cccd9 + _0x3bd7b3 * _0x3bd7b3 + _0x488e37 * _0x488e37);
        }
        ['getDistanceFromArray'](_0x3a04da) {
            const [_0x14b234, _0x86471b, _0x52d5b8] = [
                this.x - _0x3a04da[0],
                this.y - _0x3a04da[1],
                this.z - _0x3a04da[2]
            ];
            return Math.sqrt(_0x14b234 * _0x14b234 + _0x86471b * _0x86471b + _0x52d5b8 * _0x52d5b8);
        }
        static ['fromArray'](_0x249173) {
            ;
            return new _0x46476d(_0x249173[0], _0x249173[1], _0x249173[2]);
        }
        static ['fromObject'](_0x4a1b29) {
            ;
            return new _0x46476d(_0x4a1b29.x, _0x4a1b29.y, _0x4a1b29.z);
        }
    }
    ;
    const _0xee5706 = {};
    _0xee5706['0'] = 'Metallic Black';
    _0xee5706['1'] = 'Metallic Graphite Black';
    _0xee5706['2'] = 'Metallic Black Steel';
    _0xee5706['3'] = 'Metallic Dark Silver';
    _0xee5706['4'] = 'Metallic Silver';
    _0xee5706['5'] = 'Metallic Blue Silver';
    _0xee5706['6'] = 'Metallic Steel Gray';
    _0xee5706['7'] = 'Metallic Shadow Silver';
    _0xee5706['8'] = 'Metallic Stone Silver';
    _0xee5706['9'] = 'Metallic Midnight Silver';
    _0xee5706['10'] = 'Metallic Gun Metal';
    _0xee5706['11'] = 'Metallic Anthracite Grey';
    _0xee5706['12'] = 'Matte Black';
    _0xee5706['13'] = 'Matte Gray';
    _0xee5706['14'] = 'Matte Light Grey';
    _0xee5706['15'] = 'Util Black';
    _0xee5706['16'] = 'Util Black Poly';
    _0xee5706['17'] = 'Util Dark silver';
    _0xee5706['18'] = 'Util Silver';
    _0xee5706['19'] = 'Util Gun Metal';
    _0xee5706['20'] = 'Util Shadow Silver';
    _0xee5706['21'] = 'Worn Black';
    _0xee5706['22'] = 'Worn Graphite';
    _0xee5706['23'] = 'Worn Silver Grey';
    _0xee5706['24'] = 'Worn Silver';
    _0xee5706['25'] = 'Worn Blue Silver';
    _0xee5706['26'] = 'Worn Shadow Silver';
    _0xee5706['27'] = 'Metallic Red';
    _0xee5706['28'] = 'Metallic Torino Red';
    _0xee5706['29'] = 'Metallic Formula Red';
    _0xee5706['30'] = 'Metallic Blaze Red';
    _0xee5706['31'] = 'Metallic Graceful Red';
    _0xee5706['32'] = 'Metallic Garnet Red';
    _0xee5706['33'] = 'Metallic Desert Red';
    _0xee5706['34'] = 'Metallic Cabernet Red';
    _0xee5706['35'] = 'Metallic Candy Red';
    _0xee5706['36'] = 'Metallic Sunrise Orange';
    _0xee5706['37'] = 'Metallic Classic Gold';
    _0xee5706['38'] = 'Metallic Orange';
    _0xee5706['39'] = 'Matte Red';
    _0xee5706['40'] = 'Matte Dark Red';
    _0xee5706['41'] = 'Matte Orange';
    _0xee5706['42'] = 'Matte Yellow';
    _0xee5706['43'] = 'Util Red';
    _0xee5706['44'] = 'Util Bright Red';
    _0xee5706['45'] = 'Util Garnet Red';
    _0xee5706['46'] = 'Worn Red';
    _0xee5706['47'] = 'Worn Golden Red';
    _0xee5706['48'] = 'Worn Dark Red';
    _0xee5706['49'] = 'Metallic Dark Green';
    _0xee5706['50'] = 'Metallic Racing Green';
    _0xee5706['51'] = 'Metallic Sea Green';
    _0xee5706['52'] = 'Metallic Olive Green';
    _0xee5706['53'] = 'Metallic Green';
    _0xee5706['54'] = 'Metallic Gasoline Blue Green';
    _0xee5706['55'] = 'Matte Lime Green';
    _0xee5706['56'] = 'Util Dark Green';
    _0xee5706['57'] = 'Util Green';
    _0xee5706['58'] = 'Worn Dark Green';
    _0xee5706['59'] = 'Worn Green';
    _0xee5706['60'] = 'Worn Sea Wash';
    _0xee5706['61'] = 'Metallic Midnight Blue';
    _0xee5706['62'] = 'Metallic Dark Blue';
    _0xee5706['63'] = 'Metallic Saxony Blue';
    _0xee5706['64'] = 'Metallic Blue';
    _0xee5706['65'] = 'Metallic Mariner Blue';
    _0xee5706['66'] = 'Metallic Harbor Blue';
    _0xee5706['67'] = 'Metallic Diamond Blue';
    _0xee5706['68'] = 'Metallic Surf Blue';
    _0xee5706['69'] = 'Metallic Nautical Blue';
    _0xee5706['70'] = 'Metallic Bright Blue';
    _0xee5706['71'] = 'Metallic Purple Blue';
    _0xee5706['72'] = 'Metallic Spinnaker Blue';
    _0xee5706['73'] = 'Metallic Ultra Blue';
    _0xee5706['74'] = 'Metallic Bright Blue';
    _0xee5706['75'] = 'Util Dark Blue';
    _0xee5706['76'] = 'Util Midnight Blue';
    _0xee5706['77'] = 'Util Blue';
    _0xee5706['78'] = 'Util Sea Foam Blue';
    _0xee5706['79'] = 'Uil Lightning blue';
    _0xee5706['80'] = 'Util Maui Blue Poly';
    _0xee5706['81'] = 'Util Bright Blue';
    _0xee5706['82'] = 'Matte Dark Blue';
    _0xee5706['83'] = 'Matte Blue';
    _0xee5706['84'] = 'Matte Midnight Blue';
    _0xee5706['85'] = 'Worn Dark blue';
    _0xee5706['86'] = 'Worn Blue';
    _0xee5706['87'] = 'Worn Light blue';
    _0xee5706['88'] = 'Metallic Taxi Yellow';
    _0xee5706['89'] = 'Metallic Race Yellow';
    _0xee5706['90'] = 'Metallic Bronze';
    _0xee5706['91'] = 'Metallic Yellow Bird';
    _0xee5706['92'] = 'Metallic Lime';
    _0xee5706['93'] = 'Metallic Champagne';
    _0xee5706['94'] = 'Metallic Pueblo Beige';
    _0xee5706['95'] = 'Metallic Dark Ivory';
    _0xee5706['96'] = 'Metallic Choco Brown';
    _0xee5706['97'] = 'Metallic Golden Brown';
    _0xee5706['98'] = 'Metallic Light Brown';
    _0xee5706['99'] = 'Metallic Straw Beige';
    _0xee5706['100'] = 'Metallic Moss Brown';
    _0xee5706['101'] = 'Metallic Biston Brown';
    _0xee5706['102'] = 'Metallic Beechwood';
    _0xee5706['103'] = 'Metallic Dark Beechwood';
    _0xee5706['104'] = 'Metallic Choco Orange';
    _0xee5706['105'] = 'Metallic Beach Sand';
    _0xee5706['106'] = 'Metallic Sun Bleeched Sand';
    _0xee5706['107'] = 'Metallic Cream';
    _0xee5706['108'] = 'Util Brown';
    _0xee5706['109'] = 'Util Medium Brown';
    _0xee5706['110'] = 'Util Light Brown';
    _0xee5706['111'] = 'Metallic White';
    _0xee5706['112'] = 'Metallic Frost White';
    _0xee5706['113'] = 'Worn Honey Beige';
    _0xee5706['114'] = 'Worn Brown';
    _0xee5706['115'] = 'Worn Dark Brown';
    _0xee5706['116'] = 'Worn straw beige';
    _0xee5706['117'] = 'Brushed Steel';
    _0xee5706['118'] = 'Brushed Black steel';
    _0xee5706['119'] = 'Brushed Aluminium';
    _0xee5706['120'] = 'Chrome';
    _0xee5706['121'] = 'Worn Off White';
    _0xee5706['122'] = 'Util Off White';
    _0xee5706['123'] = 'Worn Orange';
    _0xee5706['124'] = 'Worn Light Orange';
    _0xee5706['125'] = 'Metallic Securicor Green';
    _0xee5706['126'] = 'Worn Taxi Yellow';
    _0xee5706['127'] = 'police car blue';
    _0xee5706['128'] = 'Matte Green';
    _0xee5706['129'] = 'Matte Brown';
    _0xee5706['130'] = 'Worn Orange';
    _0xee5706['131'] = 'Matte White';
    _0xee5706['132'] = 'Worn White';
    _0xee5706['133'] = 'Worn Olive Army Green';
    _0xee5706['134'] = 'Pure White';
    _0xee5706['135'] = 'Hot Pink';
    _0xee5706['136'] = 'Salmon pink';
    _0xee5706['137'] = 'Metallic Vermillion Pink';
    _0xee5706['138'] = 'Orange';
    _0xee5706['139'] = 'Green';
    _0xee5706['140'] = 'Blue';
    _0xee5706['141'] = 'Mettalic Black Blue';
    _0xee5706['142'] = 'Metallic Black Purple';
    _0xee5706['143'] = 'Metallic Black Red';
    _0xee5706['144'] = 'hunter green';
    _0xee5706['145'] = 'Metallic Purple';
    _0xee5706['146'] = 'Metaillic V Dark Blue';
    _0xee5706['147'] = 'MODSHOP BLACK1';
    _0xee5706['148'] = 'Matte Purple';
    _0xee5706['149'] = 'Matte Dark Purple';
    _0xee5706['150'] = 'Metallic Lava Red';
    _0xee5706['151'] = 'Matte Forest Green';
    _0xee5706['152'] = 'Matte Olive Drab';
    _0xee5706['153'] = 'Matte Desert Brown';
    _0xee5706['154'] = 'Matte Desert Tan';
    _0xee5706['155'] = 'Matte Foilage Green';
    _0xee5706['156'] = 'DEFAULT ALLOY COLOR';
    _0xee5706['157'] = 'Epsilon Blue';
    _0xee5706['158'] = 'Unknown';
    ;
    const _0xa452ee = _0xee5706, _0xda93fc = _0xa452ee;
    ;
    const _0x2d2d2d = (_0x56b3e2, _0x53c64f) => {
            ;
            if (!DoesEntityExist(_0x56b3e2)) {
                return;
            }
            const _0x43effc = GetVehicleNumberPlateText(_0x56b3e2), _0x5a3893 = GetDisplayNameFromVehicleModel(GetEntityModel(_0x56b3e2));
            let [_0x2df308, _0x5bcb84] = GetVehicleColours(_0x56b3e2);
            if (_0x2df308 == 0) {
                _0x2df308 = 1;
            }
            _0x5bcb84 == 0 && (_0x5bcb84 = 2);
            _0x2df308 == -1 && (_0x2df308 = 158);
            _0x5bcb84 == -1 && (_0x5bcb84 = 158);
            const _0x3e9035 = _0x3a4dda(_0x53c64f), _0x3c8fb8 = {
                    model: _0x5a3893,
                    plate: _0x43effc,
                    firstColor: _0xda93fc[_0x2df308],
                    secondColor: _0xda93fc[_0x5bcb84],
                    heading: _0x3e9035
                };
            ;
            ;
            ;
            ;
            ;
            ;
            const _0x1fa70d = _0x3c8fb8;
            return _0x1fa70d;
        }, _0x3a4dda = _0x2b852c => {
            ;
            if (_0x2b852c >= 315 || _0x2b852c < 45) {
                return 'North Bound';
            } else {
                if (_0x2b852c >= 45 && _0x2b852c < 135) {
                    return 'West Bound';
                } else {
                    if (_0x2b852c >= 135 && _0x2b852c < 225) {
                        return 'South Bound';
                    } else {
                        if (_0x2b852c >= 225 && _0x2b852c < 315) {
                            return 'East Bound';
                        }
                    }
                }
            }
        }, _0x128335 = (_0x2433a9 = 35) => {
            ;
            const _0x1c99ba = GetEntityCoords(PlayerPedId(), true), _0x2c0d04 = _0x1c99ba[0] + _0x5f11e9.getRandomNumber(-_0x2433a9, _0x2433a9), _0x29fcbc = _0x1c99ba[1] + _0x5f11e9.getRandomNumber(-_0x2433a9, _0x2433a9), [_0x2c37e0, _0x53f0d5] = GetSafeCoordForPed(_0x2c0d04, _0x29fcbc, _0x1c99ba[2], false, 16);
            if (!_0x2c37e0) {
                return _0x128335();
            }
            if (_0x2862e7(_0x1c99ba, _0x53f0d5) < 22) {
                return _0x128335();
            }
            return _0x53f0d5;
        }, _0x24ce74 = async (_0x536981, _0x5b366f, _0xce00cc, _0x50ba61) => {
            ;
            let _0x5f1db1, _0x6f2e09 = 0;
            while (_0x5f1db1 === undefined && ++_0x6f2e09 < _0x50ba61) {
                await _0x5f11e9.wait(0);
                const _0x1a920a = _0x536981.x + _0x5f11e9.getRandomNumber(_0x5b366f, _0xce00cc), _0x377c62 = _0x536981.y + _0x5f11e9.getRandomNumber(_0x5b366f, _0xce00cc), [_0x2bb16a, _0x506d8] = GetClosestVehicleNode(_0x1a920a, _0x377c62, _0x536981.y, 1, 3, 3);
                if (!_0x2bb16a) {
                    continue;
                }
                _0x5f1db1 = _0x506d8;
            }
            return _0x5f1db1;
        }, _0x2862e7 = (_0x59bb8d, _0x40d2e5) => {
            const [_0x4e2dcc, _0x16b414, _0x32225a] = [
                _0x59bb8d[0] - _0x40d2e5[0],
                _0x59bb8d[1] - _0x40d2e5[1],
                _0x59bb8d[2] - _0x40d2e5[2]
            ];
            return Math.sqrt(_0x4e2dcc * _0x4e2dcc + _0x16b414 * _0x16b414 + _0x32225a * _0x32225a);
        }, _0x4897c1 = _0xfc4956 => {
            ;
            const _0x184799 = PlayerId();
            SetMaxWantedLevel(_0xfc4956);
            SetPlayerWantedLevel(_0x184799, _0xfc4956, false);
            SetPlayerWantedLevelNow(_0x184799, false);
            SetPlayerWantedLevelNoDrop(_0x184799, _0xfc4956, false);
            ;
            for (let _0x49d70e = 0; _0x49d70e < 25; _0x49d70e++) {
                EnableDispatchService(_0x49d70e, true);
            }
        };
    ;
    const _0x151bb7 = async () => {
        }, _0x2945f7 = async _0x172f06 => {
            ;
            var _0xe1fa06, _0x2235aa;
            const _0x4ebddf = GetVehicleModelNumberOfSeats(_0x172f06.model), _0x75c862 = 1 + Math.floor(Math.random() * _0x4ebddf);
            (_0xe1fa06 = (_0x2235aa = _0x172f06.peds).amount) !== null && _0xe1fa06 !== void 0 ? _0xe1fa06 : _0x2235aa.amount = _0x75c862;
            const _0x4bcaea = await RPC.execute('vrp-boosting:peds:createVehicle', _0x172f06.model, _0x172f06.coords, _0x172f06.heading, _0x172f06);
            return _0x4bcaea;
        }, _0x277835 = async _0x3f32aa => {
            const _0x56231d = await RPC.execute('vrp-boosting:peds:createPed', _0x3f32aa);
            return _0x56231d;
        };
    _0x21104f.onNet('vrp-boosting:peds:vehicleCreated', async (_0x3a2fb3, _0x212850) => {
        ;
        await _0x5f11e9.waitForCondition(() => NetworkDoesEntityExistWithNetworkId(_0x3a2fb3), 30000);
        const _0x35a7e1 = NetworkGetEntityFromNetworkId(_0x3a2fb3);
        if (!_0x35a7e1) {
            return _0x21104f.emitNet('vrp-boosting:peds:deleteVehicle', _0x3a2fb3);
        }
        console.log('Created vehicle with netId ' + _0x3a2fb3 + ' | ' + _0x35a7e1 + ' | ' + _0x212850);
        for (let _0x573f7d = 0; _0x573f7d < _0x212850.peds.amount; _0x573f7d++) {
            const _0x37f839 = await _0x277835(Object.assign(Object.assign({}, _0x212850.peds), { 'metaData': Object.assign({}, _0x212850 === null || _0x212850 === void 0 ? void 0 : _0x212850.metaData) }));
            if (!_0x37f839) {
                await _0x5f11e9.wait(5000);
                _0x573f7d = _0x573f7d - 1;
                ;
                continue;
            }
            _0x21104f.emitNet('vrp-boosting:peds:seatIntoVehicle', _0x3a2fb3, NetworkGetNetworkIdFromEntity(_0x37f839), _0x573f7d - 1, _0x212850.seatOptions);
        }
    });
    _0x21104f.onNet('vrp-boosting:peds:pedCreated', async (_0x3be339, _0x134e63) => {
        ;
        var _0x2af808, _0x39e5f0, _0x2981a6, _0x51b591, _0x43be5e, _0x27b96f, _0x44fb3d, _0x19a9fa, _0x13abd5, _0x519b85, _0x47043e, _0x109fb8, _0x4fdc00, _0x2d05a8, _0x5947ff, _0x182471, _0x262d27, _0x1a4a1c, _0x4836c4, _0x2781a8, _0x560987, _0x3ec248, _0x194477, _0xd84c56, _0x25c8e3, _0x4aafe9;
        await _0x5f11e9.waitForCondition(() => NetworkDoesEntityExistWithNetworkId(_0x3be339), 30000);
        console.log('Created ped with netId: ' + _0x3be339);
        ;
        const _0x45abd2 = NetworkGetEntityFromNetworkId(_0x3be339);
        DecorSetBool(_0x45abd2, 'ScriptedPed', true);
        DecorSetBool(_0x45abd2, 'EventPed', true);
        ;
        const _0x3a1805 = _0x134e63.options;
        SetEntityMaxHealth(_0x45abd2, (_0x2af808 = _0x3a1805.health) !== null && _0x2af808 !== void 0 ? _0x2af808 : 200);
        SetEntityHealth(_0x45abd2, (_0x39e5f0 = _0x3a1805.health) !== null && _0x39e5f0 !== void 0 ? _0x39e5f0 : 200);
        SetPedArmour(_0x45abd2, (_0x2981a6 = _0x3a1805.armour) !== null && _0x2981a6 !== void 0 ? _0x2981a6 : 0);
        SetPedSuffersCriticalHits(_0x45abd2, (_0x51b591 = _0x3a1805.criticalHits) !== null && _0x51b591 !== void 0 ? _0x51b591 : true);
        ;
        for (const [_0x2767da, _0x3bc051] of (_0x43be5e = _0x3a1805.weapons) !== null && _0x43be5e !== void 0 ? _0x43be5e : []) {
            GiveWeaponToPed(_0x45abd2, _0x2767da, _0x3bc051, false, true);
            SetPedAmmo(_0x45abd2, _0x2767da, _0x3bc051);
            SetAmmoInClip(_0x45abd2, _0x2767da, _0x3bc051);
            ;
        }
        SetCanAttackFriendly(_0x45abd2, false, true);
        SetPedCombatAttributes(_0x45abd2, 5, true);
        SetPedCombatAttributes(_0x45abd2, 16, true);
        SetPedCombatAttributes(_0x45abd2, 17, false);
        SetPedCombatAttributes(_0x45abd2, 46, true);
        SetPedCombatAttributes(_0x45abd2, 1424, false);
        SetPedCombatAbility(_0x45abd2, 100);
        ;
        if (_0x3a1805.combatAttributes) {
            SetPedCombatMovement(_0x45abd2, (_0x27b96f = _0x3a1805.combatAttributes.movementType) !== null && _0x27b96f !== void 0 ? _0x27b96f : 0);
            SetPedCombatRange(_0x45abd2, (_0x44fb3d = _0x3a1805.combatAttributes.combatRange) !== null && _0x44fb3d !== void 0 ? _0x44fb3d : 0);
            SetPedAccuracy(_0x45abd2, (_0x19a9fa = _0x3a1805.combatAttributes.accuracy) !== null && _0x19a9fa !== void 0 ? _0x19a9fa : 0);
            SetPedCanRagdoll(_0x45abd2, (_0x13abd5 = _0x3a1805.combatAttributes.ragdoll) !== null && _0x13abd5 !== void 0 ? _0x13abd5 : true);
            SetPedCanRagdollFromPlayerImpact(_0x45abd2, (_0x519b85 = _0x3a1805.combatAttributes.ragdoll) !== null && _0x519b85 !== void 0 ? _0x519b85 : true);
            SetPedCanPeekInCover(_0x45abd2, (_0x47043e = _0x3a1805.combatAttributes.useCover) !== null && _0x47043e !== void 0 ? _0x47043e : true);
            SetPedCanSwitchWeapon(_0x45abd2, (_0x109fb8 = _0x3a1805.combatAttributes.swapWeapon) !== null && _0x109fb8 !== void 0 ? _0x109fb8 : true);
            SetPedCanEvasiveDive(_0x45abd2, (_0x4fdc00 = _0x3a1805.combatAttributes.dive) !== null && _0x4fdc00 !== void 0 ? _0x4fdc00 : true);
            ;
            for (const [_0x21a883, _0x4cc3d6] of (_0x2d05a8 = _0x3a1805.combatAttributes.pedFlags) !== null && _0x2d05a8 !== void 0 ? _0x2d05a8 : []) {
                SetPedConfigFlag(_0x45abd2, _0x21a883, _0x4cc3d6);
            }
        }
        const _0xd7dbce = (_0x5947ff = _0x3a1805.relationshipGroup) !== null && _0x5947ff !== void 0 ? _0x5947ff : 'CIVILIAN';
        SetPedRelationshipGroupHash(_0x45abd2, GetHashKey(_0xd7dbce));
        SetPedRelationshipGroupHash(PlayerPedId(), GetHashKey('PLAYER'));
        SetRelationshipBetweenGroups((_0x182471 = _0x3a1805.relationshipType) !== null && _0x182471 !== void 0 ? _0x182471 : 3, GetHashKey(_0xd7dbce), GetHashKey('PLAYER'));
        SetRelationshipBetweenGroups((_0x262d27 = _0x3a1805.relationshipType) !== null && _0x262d27 !== void 0 ? _0x262d27 : 3, GetHashKey('PLAYER'), GetHashKey(_0xd7dbce));
        SetPedDropsWeaponsWhenDead(_0x45abd2, (_0x1a4a1c = _0x3a1805.dropWeapon) !== null && _0x1a4a1c !== void 0 ? _0x1a4a1c : false);
        ;
        if (_0x3a1805.randomVariation) {
            SetPedRandomComponentVariation(_0x45abd2, 1);
        }
        _0x3a1805.randomProps && SetPedRandomProps(_0x45abd2);
        SetPedSeeingRange(_0x45abd2, (_0x2781a8 = (_0x4836c4 = _0x3a1805.combatAttributes) === null || _0x4836c4 === void 0 ? void 0 : _0x4836c4.seeingRange) !== null && _0x2781a8 !== void 0 ? _0x2781a8 : 200);
        SetPedHearingRange(_0x45abd2, (_0x3ec248 = (_0x560987 = _0x3a1805.combatAttributes) === null || _0x560987 === void 0 ? void 0 : _0x560987.hearingRange) !== null && _0x3ec248 !== void 0 ? _0x3ec248 : 150);
        SetPedAlertness(_0x45abd2, (_0xd84c56 = (_0x194477 = _0x3a1805.combatAttributes) === null || _0x194477 === void 0 ? void 0 : _0x194477.alertness) !== null && _0xd84c56 !== void 0 ? _0xd84c56 : 3);
        StopPedSpeaking(_0x45abd2, (_0x25c8e3 = _0x3a1805.stopSpeaking) !== null && _0x25c8e3 !== void 0 ? _0x25c8e3 : true);
        DisablePedPainAudio(_0x45abd2, (_0x4aafe9 = _0x3a1805.stopPainAudio) !== null && _0x4aafe9 !== void 0 ? _0x4aafe9 : true);
        ClearPedTasksImmediately(_0x45abd2);
        SetEntityLoadCollisionFlag(_0x45abd2, true);
        ;
        if (!HasCollisionLoadedAroundEntity(_0x45abd2)) {
            const [_0x10cd78, _0x2e6528, _0x396376] = GetEntityCoords(_0x45abd2, false);
            RequestCollisionAtCoord(_0x10cd78, _0x2e6528, _0x396376);
        }
        TaskWanderStandard(_0x45abd2, 1, 10);
        RegisterHatedTargetsAroundPed(_0x45abd2, 200);
        TaskCombatHatedTargetsAroundPed(_0x45abd2, 200, 0);
        SetPedKeepTask(_0x45abd2, true);
        ;
    });
    _0x21104f.onNet('vrp-boosting:peds:setPedIntoVehicle', async (_0x97603, _0xa87e5c, _0x6d4d03, _0x17bf46) => {
        ;
        console.log('Set ped into vehicle with netId: ' + _0xa87e5c + ', ' + _0x97603 + ', ' + _0x6d4d03 + ', ' + _0x17bf46);
        const _0x4501b0 = await _0x5f11e9.waitForCondition(() => {
            return NetworkDoesEntityExistWithNetworkId(_0xa87e5c) && NetworkDoesEntityExistWithNetworkId(_0x97603);
        }, 30000);
        if (_0x4501b0) {
            return;
        }
        const _0xa84afc = NetworkGetEntityFromNetworkId(_0xa87e5c), _0xc47ad9 = NetworkGetEntityFromNetworkId(_0x97603);
        SetPedIntoVehicle(_0xa84afc, _0xc47ad9, _0x6d4d03);
        const _0x31943e = GetPlayerFromServerId(_0x17bf46.targetPlayer), _0x201319 = _0x31943e ? GetPlayerPed(_0x31943e) : PlayerPedId();
        if (_0x17bf46.chase && _0x6d4d03 === -1) {
            TaskVehicleChase(_0xa84afc, _0x201319);
            SetTaskVehicleChaseBehaviorFlag(_0xa84afc, 1, true);
            SetPedKeepTask(_0xa84afc, true);
            ;
        } else {
            _0x17bf46.combat && TaskCombatPed(_0xa84afc, _0x201319, 0, 16);
        }
        const _0x31c8c3 = GetEntityModel(_0xc47ad9);
        if (IsThisModelAHeli(_0x31c8c3) || IsThisModelAPlane(_0x31c8c3)) {
            SetHeliBladesFullSpeed(_0xc47ad9);
        }
    });
    ;
    ;
    class _0x1ad066 {
        constructor(_0x1487df, _0x3372a2, _0x830de2 = 'interval', _0x326fc1 = {}) {
            ;
            this.callback = _0x1487df;
            this.delay = _0x3372a2;
            this.mode = _0x830de2;
            this.scheduled = {};
            this.tick = 0;
            this.data = _0x326fc1;
            this.hooks = new Map([
                [
                    'active',
                    []
                ],
                [
                    'preStop',
                    []
                ],
                [
                    'preStart',
                    []
                ],
                [
                    'afterStop',
                    []
                ],
                [
                    'afterStart',
                    []
                ],
                [
                    'stopAborted',
                    []
                ],
                [
                    'startAborted',
                    []
                ]
            ]);
            ;
        }
        get ['isActive']() {
            ;
            return this.active;
        }
        async ['start']() {
            ;
            if (this.active) {
                return;
            }
            this.aborted = false;
            this.scheduled = {};
            ;
            const _0x539450 = this.hooks.get('preStart');
            try {
                for (const _0x53359f of _0x539450) {
                    if (!this.aborted) {
                        await _0x53359f.call(this);
                    }
                }
            } catch (_0x21bee3) {
                this.aborted = true;
                console.log('Error while calling pre-start hook', _0x21bee3.message);
                ;
            }
            if (this.aborted) {
                try {
                    const _0x546cce = this.hooks.get('startAborted');
                    for (const _0x1b1ba0 of _0x546cce) {
                        await _0x1b1ba0.call(this);
                    }
                } catch (_0x3d4895) {
                    console.log('Error while calling start-aborted hook', _0x3d4895.message);
                }
                return;
            }
            this.active = true;
            const _0x3d2205 = this.hooks.get('active');
            switch (this.mode) {
            case 'tick': {
                    this.threadId = _0x230e37.setTick(async () => {
                        ;
                        this.tick += 1;
                        try {
                            await this.callback.call(this);
                            for (const _0x3f718e of _0x3d2205) {
                                await _0x3f718e.call(this);
                            }
                        } catch (_0x31b0ad) {
                            console.log('Error while calling active hook', _0x31b0ad.message);
                        }
                        this.delay > 0 && await new Promise(_0x38d446 => _0x230e37.setTimeout(_0x38d446, this.delay));
                    });
                    break;
                }
            case 'interval': {
                    this.threadId = _0x230e37.setInterval(async () => {
                        ;
                        this.tick += 1;
                        try {
                            await this.callback.call(this);
                            for (const _0x74239e of _0x3d2205) {
                                await _0x74239e.call(this);
                            }
                        } catch (_0x2bea13) {
                            console.log('Error while calling active hook', _0x2bea13.message);
                        }
                    }, this.delay);
                    break;
                }
            case 'timeout': {
                    const _0x37e35b = () => {
                        ;
                        if (this.active) {
                            this.threadId = _0x230e37.setTimeout(async () => {
                                ;
                                this.tick += 1;
                                try {
                                    await this.callback.call(this);
                                    for (const _0x17ef63 of _0x3d2205) {
                                        await _0x17ef63.call(this);
                                    }
                                } catch (_0x20dfdc) {
                                    console.log('Error while calling active hook', _0x20dfdc.message);
                                }
                                return _0x37e35b();
                            }, this.delay);
                        }
                    };
                    _0x37e35b();
                    break;
                }
            }
            const _0x5637c7 = this.hooks.get('afterStart');
            try {
                for (const _0x5edf62 of _0x5637c7) {
                    await _0x5edf62.call(this);
                }
            } catch (_0x37e2cc) {
                console.log('Error while calling after-start hook', _0x37e2cc.message);
            }
        }
        async ['stop']() {
            ;
            if (!this.active) {
                return;
            }
            const _0x57dea8 = this.hooks.get('preStop');
            try {
                for (const _0x1b7c2a of _0x57dea8) {
                    if (!this.aborted) {
                        await _0x1b7c2a.call(this);
                    }
                }
            } catch (_0x43aa28) {
                this.aborted = true;
                console.log('Error while calling pre-stop hook', _0x43aa28.message);
                ;
            }
            this.active = false;
            switch (this.mode) {
            case 'tick': {
                    _0x230e37.clearTick(this.threadId);
                    break;
                }
            case 'interval': {
                    _0x230e37.clearInterval(this.threadId);
                    break;
                }
            case 'timeout': {
                    _0x230e37.clearTimeout(this.threadId);
                    break;
                }
            }
            if (this.aborted) {
                try {
                    const _0x156dcf = this.hooks.get('stopAborted');
                    for (const _0x28eecb of _0x156dcf) {
                        await _0x28eecb.call(this);
                    }
                } catch (_0x2a7958) {
                    console.log('Error while calling stop-aborted hook', _0x2a7958.message);
                }
                return;
            }
            const _0x286732 = this.hooks.get('afterStop');
            try {
                for (const _0x496204 of _0x286732) {
                    await _0x496204.call(this);
                }
            } catch (_0x2ef094) {
                console.log('Error while calling after-stop hook', _0x2ef094.message);
            }
        }
        ['abort']() {
            ;
            this.aborted = true;
        }
        ['addHook'](_0x2bdd02, _0x18b62a) {
            ;
            var _0x4f3b9d;
            (_0x4f3b9d = this.hooks.get(_0x2bdd02)) === null || _0x4f3b9d === void 0 ? void 0 : _0x4f3b9d.push(_0x18b62a);
        }
        ['setNextTick'](_0xabf25f, _0x3610bf) {
            ;
            this.scheduled[_0xabf25f] = this.tick + _0x3610bf;
        }
        ['canTick'](_0xc29187) {
            ;
            return this.scheduled[_0xc29187] === undefined || this.tick >= this.scheduled[_0xc29187];
        }
    }
    ;
    const _0x50b954 = [
        'metagame',
        'firewall',
        'permaban',
        'hardware',
        'dawizard',
        'kylepred',
        'loserkid',
        'banhamas',
        'mcdonald',
        'football',
        'grinders'
    ];
    let _0x522233, _0x273816 = 0, _0xd51d67 = null, _0x1c35d3;
    const _0x11d76b = async _0x2bc37b => {
            const _0x716073 = _0x5b81eb(_0x50b954, 1)[0];
            return new Promise(async _0x33e08e => {
                ;
                const _0x3198c5 = RequestScaleformMovieInteractive('HACKING_PC');
                await _0x5f11e9.waitForCondition(() => HasScaleformMovieLoaded(_0x3198c5), 10000);
                PushScaleformMovieFunction(_0x3198c5, 'SET_LABELS');
                PushScaleformMovieFunctionParameterString('Local Disk (C:)');
                PushScaleformMovieFunctionParameterString('Network');
                PushScaleformMovieFunctionParameterString('External Device (J:)');
                PushScaleformMovieFunctionParameterString('HackConnect.exe');
                PushScaleformMovieFunctionParameterString('BruteForce.exe');
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_BACKGROUND');
                PushScaleformMovieFunctionParameterInt(0);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'ADD_PROGRAM');
                PushScaleformMovieFunctionParameterFloat(1);
                PushScaleformMovieFunctionParameterFloat(4);
                PushScaleformMovieFunctionParameterString('Server Rack #' + _0x2bc37b);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'ADD_PROGRAM');
                PushScaleformMovieFunctionParameterFloat(6);
                PushScaleformMovieFunctionParameterFloat(6);
                PushScaleformMovieFunctionParameterString('Power Off');
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_COLUMN_SPEED');
                PushScaleformMovieFunctionParameterInt(0);
                PushScaleformMovieFunctionParameterInt(255);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_COLUMN_SPEED');
                PushScaleformMovieFunctionParameterInt(1);
                PushScaleformMovieFunctionParameterInt(255);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_COLUMN_SPEED');
                PushScaleformMovieFunctionParameterInt(2);
                PushScaleformMovieFunctionParameterInt(255);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_COLUMN_SPEED');
                PushScaleformMovieFunctionParameterInt(3);
                PushScaleformMovieFunctionParameterInt(255);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_COLUMN_SPEED');
                PushScaleformMovieFunctionParameterInt(4);
                PushScaleformMovieFunctionParameterInt(255);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_COLUMN_SPEED');
                PushScaleformMovieFunctionParameterInt(5);
                PushScaleformMovieFunctionParameterInt(255);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_COLUMN_SPEED');
                PushScaleformMovieFunctionParameterInt(6);
                PushScaleformMovieFunctionParameterInt(255);
                PopScaleformMovieFunctionVoid();
                PushScaleformMovieFunction(_0x3198c5, 'SET_COLUMN_SPEED');
                PushScaleformMovieFunctionParameterInt(7);
                PushScaleformMovieFunctionParameterInt(255);
                PopScaleformMovieFunctionVoid();
                _0xd51d67 = setInterval(async () => {
                    ;
                    DrawScaleformMovieFullscreen(_0x3198c5, 255, 255, 255, 255, 0);
                    PushScaleformMovieFunction(_0x3198c5, 'SET_CURSOR');
                    PushScaleformMovieFunctionParameterFloat(GetControlNormal(0, 239));
                    PushScaleformMovieFunctionParameterFloat(GetControlNormal(0, 240));
                    PopScaleformMovieFunctionVoid();
                    ;
                    if (IsDisabledControlJustPressed(0, 24)) {
                        PushScaleformMovieFunction(_0x3198c5, 'SET_INPUT_EVENT_SELECT');
                        _0x1c35d3 = PopScaleformMovieFunction();
                        PlaySoundFrontend(-1, 'HACKING_CLICK', '', true);
                        ;
                    } else {
                        IsDisabledControlJustPressed(0, 25) && (PushScaleformMovieFunction(_0x3198c5, 'SET_INPUT_EVENT_BACK'), PopScaleformMovieFunctionVoid(), PlaySoundFrontend(-1, 'HACKING_CLICK', '', true));
                    }
                    if (!HasScaleformMovieLoaded(_0x3198c5)) {
                        return;
                    }
                    if (GetScaleformMovieFunctionReturnBool(_0x1c35d3)) {
                        _0x522233 = GetScaleformMovieFunctionReturnInt(_0x1c35d3);
                        switch (_0x522233) {
                        case 82:
                            PlaySoundFrontend(-1, 'HACKING_CLICK_BAD', '', false);
                            break;
                        case 83:
                            PushScaleformMovieFunction(_0x3198c5, 'RUN_PROGRAM'), PushScaleformMovieFunctionParameterFloat(83), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'SET_ROULETTE_WORD'), PushScaleformMovieFunctionParameterString(_0x716073), PopScaleformMovieFunctionVoid();
                            break;
                        case 87:
                            _0x273816++, PushScaleformMovieFunction(_0x3198c5, 'SET_ROULETTE_WORD'), PushScaleformMovieFunctionParameterString(_0x716073), PopScaleformMovieFunctionVoid(), PlaySoundFrontend(-1, 'HACKING_CLICK_BAD', '', false), PushScaleformMovieFunction(_0x3198c5, 'SET_LIVES'), PushScaleformMovieFunctionParameterInt(_0x273816), PushScaleformMovieFunctionParameterInt(5), PopScaleformMovieFunctionVoid();
                            break;
                        case 92:
                            PlaySoundFrontend(-1, 'HACKING_CLICK_GOOD', '', false);
                            break;
                        case 86:
                            PlaySoundFrontend(-1, 'HACKING_SUCCESS', '', true), PushScaleformMovieFunction(_0x3198c5, 'SET_ROULETTE_OUTCOME'), PushScaleformMovieFunctionParameterBool(true), PushScaleformMovieFunctionParameterString('BRUTEFORCE SUCCESSFUL!'), PopScaleformMovieFunctionVoid(), await _0x5f11e9.wait(2800), PushScaleformMovieFunction(_0x3198c5, 'CLOSE_APP'), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'OPEN_LOADING_PROGRESS'), PushScaleformMovieFunctionParameterBool(true), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'SET_LOADING_PROGRESS'), PushScaleformMovieFunctionParameterInt(35), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'SET_LOADING_TIME'), PushScaleformMovieFunctionParameterInt(35), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'SET_LOADING_MESSAGE'), PushScaleformMovieFunctionParameterString('Writing data to buffer..'), PushScaleformMovieFunctionParameterFloat(2), PopScaleformMovieFunctionVoid(), await _0x5f11e9.wait(1500), PushScaleformMovieFunction(_0x3198c5, 'SET_LOADING_MESSAGE'), PushScaleformMovieFunctionParameterString('Executing malicious code..'), PushScaleformMovieFunctionParameterFloat(2), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'SET_LOADING_TIME'), PushScaleformMovieFunctionParameterInt(15), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'SET_LOADING_PROGRESS'), PushScaleformMovieFunctionParameterInt(75), PopScaleformMovieFunctionVoid(), await _0x5f11e9.wait(1500), PushScaleformMovieFunction(_0x3198c5, 'OPEN_LOADING_PROGRESS'), PushScaleformMovieFunctionParameterBool(false), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'OPEN_ERROR_POPUP'), PushScaleformMovieFunctionParameterBool(true), PushScaleformMovieFunctionParameterString('MEMORY LEAK DETECTED, DEVICE SHUTTING DOWN'), PopScaleformMovieFunctionVoid(), await _0x5f11e9.wait(3500), SetScaleformMovieAsNoLongerNeeded(_0x3198c5), PopScaleformMovieFunctionVoid(), _0x4cda6c(), _0x33e08e(true);
                            break;
                        case 6:
                            await _0x5f11e9.wait(500), SetScaleformMovieAsNoLongerNeeded(_0x3198c5), _0x4cda6c();
                            return _0x33e08e(false);
                        }
                        if (_0x273816 >= 2) {
                            return PlaySoundFrontend(-1, 'HACKING_FAILURE', '', true), PushScaleformMovieFunction(_0x3198c5, 'SET_ROULETTE_OUTCOME'), PushScaleformMovieFunctionParameterBool(false), PushScaleformMovieFunctionParameterString('BRUTEFORCE FAILED!'), PopScaleformMovieFunctionVoid(), await _0x5f11e9.wait(3500), PushScaleformMovieFunction(_0x3198c5, 'CLOSE_APP'), PopScaleformMovieFunctionVoid(), PushScaleformMovieFunction(_0x3198c5, 'OPEN_ERROR_POPUP'), PushScaleformMovieFunctionParameterBool(true), PushScaleformMovieFunctionParameterString('MEMORY LEAK DETECTED, DEVICE SHUTTING DOWN'), PopScaleformMovieFunctionVoid(), await _0x5f11e9.wait(2500), SetScaleformMovieAsNoLongerNeeded(_0x3198c5), PopScaleformMovieFunctionVoid(), DisableControlAction(0, 24, false), DisableControlAction(0, 25, false), _0x4cda6c(), _0x33e08e(false);
                        }
                    }
                });
                ;
            });
        }, _0x4cda6c = () => {
            clearInterval(_0xd51d67);
            _0xd51d67 = null;
            _0x522233 = null;
            _0x273816 = 0;
            _0x1c35d3 = null;
            FreezeEntityPosition(PlayerPedId(), false);
            DisableControlAction(0, 24, false);
            DisableControlAction(0, 25, false);
            ;
        };
    ;
    const _0x4a50e1 = async () => {
        const _0x452ddb = []//_0x347901('vrp-boosting:s2', 'doorOptions');
        for (const _0x1007a7 of _0x452ddb) {
            _0x12f290.addBoxZone(String(_0x1007a7.id), 'boosting_s2_facility_door', _0x1007a7.coords, _0x1007a7.length, _0x1007a7.width, {
                'heading': _0x1007a7.heading,
                'minZ': _0x1007a7.minZ,
                'maxZ': _0x1007a7.maxZ
            });
        }
        const _0x509c4d = {
            id: 'server_farm_hub_box_hack',
            label: 'Hack Into Server',
            icon: 'network-wired',
            VPXEvent: 'vrp-boosting:s2:hackServer'
        };
        ;
        ;
        ;
        ;
        ;
        const _0x5db3d1 = { radius: 3.5 };
        ;
        const _0xa31c41 = {
            distance: _0x5db3d1,
            isEnabled: () => {
                ;
                return _0x5c83b6 && _0x5c83b6.step === 'find_facility_server';
            }
        };
        ;
        ;
        _0x3a06a7.addPeekEntryByTarget('server_farm_hub_box', [_0x509c4d], _0xa31c41);
        ;
        const _0x5ab137 = {
            VPXEvent: 'vrp-boosting:s2:lootDeadGuard',
            id: 'vrp-boosting:s2:lootDeadGuard',
            icon: 'circle',
            label: 'Grab Gear',
            parameters: {}
        };
        ;
        ;
        ;
        ;
        ;
        ;
        const _0x2506d1 = { radius: 1.5 };
        ;
        exports['vrp-interact'].AddPeekEntryByModel([
            GetHashKey('s_m_y_blackops_02'),
            -1920001264,
            -1320879687,
            -1920001264
        ], [_0x5ab137], {
            'distance': _0x2506d1,
            'isEnabled'(_0xb8bf83) {
                ;
                return IsPedDeadOrDying(_0xb8bf83, true) && _0x20daa8.isActive;
            }
        });
        ;
    };
    ;
    const _0x591930 = async () => {
            ;
            AddTextEntry('B_ROOF', 'Land on the ~y~facility~w~ roof and wait for your ~y~colleagues~y~.');
            AddTextEntry('B_BREAK_IN', 'Defend against the ~r~guards~w~ and break into the ~y~facility~w~');
            AddTextEntry('B_FIND_SERV', 'Find and ~r~destroy~w~ the ~b~GNE~w~ crypto servers [~y~~a~~w~]');
            AddTextEntry('B_ESCAPE', 'Use the getaway ~y~vehicle~w~ to Lose the ~r~police~w~ and finish the job');
            ;
        }, _0x26217f = (_0x52b37d, _0x4fa77d) => {
            ;
            BeginTextCommandDisplayText(_0x52b37d);
            if (_0x4fa77d) {
                AddTextComponentSubstringTextLabel(_0x4fa77d);
            }
            SetTextCentre(true);
            SetTextColour(255, 255, 255, 255);
            SetTextScale(0.5, 0.45);
            SetTextOutline();
            EndTextCommandDisplayText(0.5, 0.881);
            ;
        };
    ;
    const _0x4df619 = {
        item_id: 'rifleammo',
        amount: 15
    };
    ;
    ;
    ;
    const _0x231131 = {
        item_id: 'IFAK',
        amount: 15
    };
    ;
    ;
    ;
    const _0x518b6e = {
        item_id: '-72657034',
        amount: 1
    };
    ;
    ;
    ;
    const _0x267bc4 = {
        item_id: 'armor',
        amount: 3
    };
    ;
    ;
    ;
    const _0x1d3623 = {
        item_id: '-1074790547',
        amount: 1
    };
    ;
    ;
    ;
    const _0x4ef01d = [
        _0x4df619,
        _0x231131,
        _0x518b6e,
        _0x267bc4,
        _0x1d3623
    ];
    let _0x410fbc = null, _0x223ea9 = 0, _0x407c42 = null, _0x200648 = false, _0x476a74 = false, _0x5c83b6 = null;
    const _0x31cb8e = new Set(), _0x2972f9 = new Map(), _0x62ed8d = new _0x1ad066(() => {
        }, 1, 'interval', { 'facilityRoofCoords': _0x347901('vrp-boosting:s2', 'facilityRoofCoords') }), _0x20daa8 = new _0x1ad066(() => {
        }, 5000), _0x126b8f = async () => {
            ;
            await _0x591930();
            await _0x4a50e1();
            ;
        }, _0x4e21e4 = async _0x4b2991 => {
            ;
            var _0x226a71, _0x5f5bb7, _0x2fd6f3;
            _0x5c83b6 = _0x4b2991;
            if (!_0x5c83b6) {
                return;
            }
            if (!_0x62ed8d.isActive) {
                _0x62ed8d.start();
            }
            !_0x20daa8.isActive && _0x20daa8.start();
            switch (_0x5c83b6.step) {
            case 'plane_dropoff':
                await _0x1012ac();
                break;
            case 'find_facility_server':
                ((_0x226a71 = _0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.metadata) === null || _0x226a71 === void 0 ? void 0 : _0x226a71.targetServers) && AddTextEntry('B_SERV_IDS', (_0x2fd6f3 = (_0x5f5bb7 = _0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.metadata) === null || _0x5f5bb7 === void 0 ? void 0 : _0x5f5bb7.targetServers) === null || _0x2fd6f3 === void 0 ? void 0 : _0x2fd6f3.join(', '));
                _0x407c42 && exports['vrp-ui'].showInteraction('[E] Enter Facility');
                break;
            case 'escape_police':
                await _0x21bb1b();
                break;
            case 'completed_job':
                await _0x3e5584();
                break;
            default:
                break;
            }
        }, _0x1012ac = async () => {
            ;
            DoScreenFadeOut(200);
            await _0x5f11e9.wait(300);
            emit('vrp-weathersync:freezeWeatherLocally', 1, 'Heavy Thunderstorms');
            exports.police.DisableBleeding(true);
            exports['vrp-actionbar'].DisableGSR(true);
            exports.ragdoll.DisableReduceFactor(true);
            ;
            const _0x4c6fa6 = exports.isPed.isPed('cid'), _0x51b2dc = _0x4c6fa6 === (_0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.leader), _0x30b9fd = _0x46476d.fromArray(_0x51b2dc ? [
                    2850.08,
                    -334.27,
                    844.93
                ] : [
                    2838.56,
                    -423.22,
                    844.93
                ]);
            SetEntityCoords(PlayerPedId(), _0x30b9fd.x, _0x30b9fd.y, _0x30b9fd.z, true, false, false, false);
            FreezeEntityPosition(PlayerPedId(), true);
            AddCoverPoint(2554.71, -336.77, 93.99, 0, 3, 1, 2, false);
            SetDispatchIdealSpawnDistance(100);
            SetDispatchTimeBetweenSpawnAttempts(1, 2.5);
            SetInstancePriorityHint(1);
            SetDispatchSpawnLocation(2554.71, -336.77, 93.99);
            ClearAreaOfEverything(_0x30b9fd[0], _0x30b9fd[1], _0x30b9fd[2], 30, false, false, false, false);
            ;
            const _0x15a3f6 = _0x51b2dc ? 285.8 : 194.91, _0x488fd3 = {
                    movementType: 3,
                    combatRange: 3,
                    accuracy: 5,
                    ragdoll: false,
                    pedFlags: []
                };
            ;
            ;
            ;
            ;
            ;
            ;
            const _0xf664a6 = {
                health: 175,
                armour: 200,
                weapons: [],
                criticalHits: false,
                combatAttributes: _0x488fd3,
                relationshipGroup: null,
                relationshipType: 0,
                dropWeapon: false,
                randomVariation: true,
                randomProps: true
            };
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            const _0x8dd2 = { missionId: _0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.id };
            ;
            const _0xde58ef = await _0x2945f7({
                'peds': {
                    'model': GetHashKey('s_m_m_pilot_01'),
                    'amount': 1,
                    'coords': _0x30b9fd,
                    'heading': _0x15a3f6,
                    'options': _0xf664a6
                },
                'coords': _0x30b9fd,
                'heading': _0x15a3f6,
                'model': GetHashKey('avenger'),
                'seatOptions': {
                    'chase': false,
                    'combat': false,
                    'targetPlayer': GetPlayerServerId(PlayerId())
                },
                'metaData': _0x8dd2
            });
            _0x2972f9.set(_0xde58ef, _0xde58ef);
            for (const _0x41b15f of _0x4ef01d) {
                const _0x2f40d0 = { itemSource: 'boosting_s2' };
                ;
                _0x2f40d0['_hideKeys'] = ['itemSource'];
                ;
                const _0x5ec691 = _0x2f40d0;
                emit('player:receiveItem', _0x41b15f.item_id, _0x41b15f.amount, true, JSON.stringify(_0x5ec691), JSON.stringify(_0x5ec691), true);
            }
            const _0xf06e3e = NetworkGetEntityFromNetworkId(_0xde58ef);
            FreezeEntityPosition(_0xf06e3e, true);
            exports['vrp-sync'].SyncedExecution('SetVehicleDoorOpen', _0xf06e3e, 5, false, true);
            await _0x5f11e9.wait(1000);
            ;
            const [_0x115375, _0x132410, _0xddfde8] = GetOffsetFromEntityInWorldCoords(_0xf06e3e, 0, -7, -1);
            SetEntityCoords(PlayerPedId(), _0x115375, _0x132410, _0xddfde8, true, false, false, false);
            SetEntityHeading(PlayerPedId(), GetEntityHeading(_0xf06e3e) - 180);
            FreezeEntityPosition(PlayerPedId(), false);
            await _0x5f11e9.wait(5000);
            DoScreenFadeIn(2000);
            ;
        }, _0x3e5584 = async () => {
            ;
            SwitchOutPlayer(PlayerPedId(), 0, 1);
            await _0x5f11e9.wait(3000);
            SetEntityCoords(PlayerPedId(), 1545.01, 2190.66, 78.85, true, false, false, false);
            SetEntityHeading(PlayerPedId(), 305.01);
            _0x1feaf9();
            await _0x5f11e9.wait(500);
            emit('vrp-weathersync:unfreezeWeatherLocally');
            await _0x5f11e9.wait(3500);
            SwitchInPlayer(PlayerPedId());
            await _0x5f11e9.wait(9000);
            emit('phone:emailReceived', 'Boosting', 'Task Completed', 'You have successfully destroyed several GNE crypto servers and completed your mission. You have unlocked a new cryptocurrency known as XTF. Dont make the PM regret giving you access to this location...', null);
            _0x5ce195();
            _0x521849.reset();
            ;
        }, _0x5ce195 = () => {
            ;
            _0x5c83b6 = null;
            _0x223ea9 = 0;
            _0x200648 = false;
            _0x476a74 = false;
            _0x410fbc = null;
            _0x62ed8d.stop();
            _0x20daa8.stop();
            _0x4897c1(0);
            clearTick(_0x407c42);
            exports['vrp-ui'].hideInteraction();
            _0x407c42 = null;
            ;
            for (const _0x5ac6d5 of _0x31cb8e) {
                DeleteEntity(NetworkGetEntityFromNetworkId(_0x5ac6d5));
                _0x31cb8e.delete(_0x5ac6d5);
                ;
            }
        }, _0x1db3db = async () => {
            ;
            DoScreenFadeOut(500);
            await _0x5f11e9.wait(2000);
            ;
            const _0x3c4814 = await RPC.execute('vrp-boosting:s2:leaveMission', _0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.id);
            _0x3c4814 && (_0x5ce195(), _0x1feaf9(), SetEntityCoords(PlayerPedId(), 1545.01, 2190.66, 78.85, true, false, false, false), SetEntityHeading(PlayerPedId(), 305.01), emit('vrp-weathersync:unfreezeWeatherLocally'), exports.police.DisableBleeding(false), exports['vrp-actionbar'].DisableGSR(false), exports.ragdoll.DisableReduceFactor(false), await _0x5f11e9.wait(500), TriggerEvent('reviveFunction'));
            await _0x5f11e9.wait(2000);
            DoScreenFadeIn(2000);
            ;
        }, _0x9c9f89 = async _0x315fe3 => {
            ;
            const _0x51cdc2 = _0x347901('vrp-boosting:s2', 'doorOptions'), _0x41f78f = _0x51cdc2.find(_0x338392 => _0x338392.id === _0x315fe3), _0x188e24 = {
                    gameTimeoutDuration: 15000,
                    coloredSquares: 10,
                    gridSize: 6
                };
            ;
            ;
            ;
            ;
            const _0x5b2468 = await exports['vrp-heists'].ThermiteMinigame(_0x188e24);
            if (!_0x5b2468) {
                return;
            }
            await exports['vrp-heists'].ThermiteCharge(Object.assign(Object.assign({}, _0x41f78f.coords), { 'h': GetEntityHeading(PlayerPedId()) }), 0, _0x5b2468);
            _0x21104f.emitNet('vrp-boosting:s2:missionStepCompleted', _0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.id, 'break_into_facility');
            ;
        }, _0x4764a6 = async () => {
            ;
            DoScreenFadeOut(200);
            emit('vrp-heists-serverroom:enter-server-room');
            await _0x5f11e9.wait(250);
            SetEntityCoords(PlayerPedId(), 2154.67, 2921.05, -81.07, true, true, true, false);
            SetEntityHeading(PlayerPedId(), 267);
            _0x476a74 = true;
            _0x4897c1(0);
            await _0x5f11e9.wait(1000);
            DoScreenFadeIn(2000);
            ;
        }, _0x21bb1b = async () => {
            ;
            DoScreenFadeOut(1500);
            await _0x5f11e9.wait(2000);
            TriggerEvent('reviveFunction');
            emit('vrp-weathersync:freezeWeatherLocally', 1, 'Heavy Thunderstorms');
            SetEntityCoords(PlayerPedId(), 2512.19, -317.98, 93, true, false, false, false);
            SetEntityHeading(PlayerPedId(), 84.09);
            await _0x5f11e9.wait(3000);
            DoScreenFadeIn(2000);
            ResetDispatchIdealSpawnDistance();
            ResetDispatchSpawnBlockingAreas();
            ResetDispatchSpawnLocation();
            ;
        }, _0x3cc38f = async (_0x1a1142, _0x10ff24, _0x1bfd2e) => {
            ;
            var _0x15691f, _0x308649;
            const _0x3bbfb8 = _0x1bfd2e.zones.server_farm_hub_box, _0x19c294 = (_0x308649 = (_0x15691f = _0x5c83b6.metadata) === null || _0x15691f === void 0 ? void 0 : _0x15691f.targetServers) !== null && _0x308649 !== void 0 ? _0x308649 : [];
            if (!_0x19c294.includes(_0x3bbfb8 === null || _0x3bbfb8 === void 0 ? void 0 : _0x3bbfb8.code)) {
                return emit('DoLongHudText', 'Hmm this doesnt look like the correct server (' + (_0x3bbfb8 === null || _0x3bbfb8 === void 0 ? void 0 : _0x3bbfb8.code) + ')', 2);
            }
            const _0x5dcce8 = 'look_around_v5_monitor', _0x3c2912 = 'anim@amb@business@meth@meth_monitoring_cooking@monitoring@';
            await _0x3d6c2d.loadAnim(_0x3c2912);
            TaskPlayAnim(PlayerPedId(), _0x3c2912, _0x5dcce8, 8, -8, -1, 1, 1, false, false, false);
            ;
            const _0xb89011 = await _0x3a06a7.taskBar(5000, 'Prepairing to hack into server...', true);
            if (_0xb89011 !== 100) {
                return ClearPedTasks(PlayerPedId());
            }
            const _0x6edbb3 = await _0x11d76b(_0x3bbfb8 === null || _0x3bbfb8 === void 0 ? void 0 : _0x3bbfb8.code);
            _0x6edbb3 && await RPC.execute('vrp-boosting:s2:completedServerHack', _0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.id, _0x3bbfb8 === null || _0x3bbfb8 === void 0 ? void 0 : _0x3bbfb8.code);
            ClearPedTasks(PlayerPedId());
            ;
        }, _0x5ba052 = async () => {
            ;
            if (_0x31cb8e.size >= 5 || !_0x476a74) {
                return;
            }
            const _0x58ae61 = GetEntityHeading(PlayerPedId()), _0x35375c = {
                    'health': 225,
                    'armour': 225,
                    'weapons': [
                        [
                            1192676223,
                            9999
                        ],
                        [
                            -1813897027,
                            9999
                        ]
                    ],
                    'criticalHits': true,
                    'combatAttributes': {
                        'movementType': 3,
                        'combatRange': 3,
                        'accuracy': _0x5f11e9.getRandomNumber(75, 90),
                        'ragdoll': false,
                        'pedFlags': [[
                                208,
                                true
                            ]]
                    },
                    'relationshipGroup': 'HATES_PLAYER',
                    'relationshipType': 5,
                    'dropWeapon': false,
                    'randomVariation': true,
                    'randomProps': true
                }, _0x2f37ca = {
                    'model': GetHashKey('s_m_y_blackops_02'),
                    'coords': _0x46476d.fromArray(_0x128335()),
                    'heading': _0x58ae61,
                    'options': _0x35375c
                }, _0x1127dc = await _0x277835(_0x2f37ca);
            _0x31cb8e.add(_0x1127dc);
        }, _0x4ff209 = async (_0x4cbcee, _0x344f88) => {
            ;
            if (_0x200648) {
                return;
            }
            _0x200648 = true;
            emit('farm:weed');
            RPC.execute('vrp-boosting:s2:lootDeadGuard');
            await _0x5f11e9.wait(3000);
            exports['vrp-sync'].SyncedExecution('DeleteEntity', _0x344f88);
            await _0x5f11e9.wait(1000);
            _0x200648 = false;
            ;
        }, _0x365cc4 = async () => {
            const [_0x16bb20, _0x55a32f] = await RPC.execute('vrp-boosting:s2:startMission');
            emit('DoLongHudText', _0x55a32f, _0x16bb20 ? 1 : 2);
        }, _0x1feaf9 = () => {
            ;
            for (const _0x1d020e of _0x4ef01d) {
                emit('inventory:removeItem', _0x1d020e.item_id, 100);
            }
        };
    _0x62ed8d.addHook('active', function () {
        ;
        if (!_0x5c83b6) {
            return;
        }
        if (IsScreenFadedOut()) {
            return;
        }
        if (_0x5c83b6.step === 'plane_dropoff') {
            const _0xe872f = this.data.facilityRoofCoords;
            if (!_0xe872f) {
                this.data.facilityRoofCoords = _0x347901('vrp-boosting:s2', 'facilityRoofCoords');
            }
            ;
            DrawMarker(2, _0xe872f.x, _0xe872f.y, _0xe872f.z, 0, 0, 0, 0, 0, 0, 1.75, 1.75, 1.75, 255, 219, 88, 120, true, true, 2, false, null, null, false);
            _0x26217f('B_ROOF');
            ;
        }
        if (_0x5c83b6.step === 'break_into_facility') {
            _0x26217f('B_BREAK_IN');
        }
        if (_0x5c83b6.step === 'find_facility_server') {
            _0x26217f('B_FIND_SERV', 'B_SERV_IDS');
        }
        _0x5c83b6.step === 'escape_police' && _0x26217f('B_ESCAPE');
    });
    _0x20daa8.addHook('active', () => {
        const _0x5edf33 = exports['vrp-flags'].GetPedFlags(PlayerPedId());
        _0x5c83b6.step === 'find_facility_server' && _0x476a74 && (_0x5ba052(), GetPlayerWantedLevel(PlayerId()) !== 0 && _0x4897c1(0));
        (_0x5c83b6.step === 'break_into_facility' || _0x5c83b6.step === 'plane_dropoff') && (GetPlayerWantedLevel(PlayerId()) === 0 && _0x4897c1(4));
        if (_0x5c83b6.step === 'escape_police') {
            !_0x410fbc && (_0x410fbc = GetGameTimer());
            GetGameTimer() < _0x410fbc + 300000 && (GetPlayerWantedLevel(PlayerId()) === 0 && _0x4897c1(3));
            const _0x4b11c8 = exports.isPed.isPed('cid');
            if (_0x4b11c8 === _0x5c83b6.leader && !_0x5edf33.isDead) {
                const _0x4ad0f7 = GetPlayerWantedLevel(PlayerId());
                if (_0x4ad0f7 === 0) {
                    _0x223ea9++;
                } else {
                    _0x4ad0f7 > 0 && _0x223ea9 > 0 && (_0x223ea9 = 0);
                }
                if (_0x223ea9 >= 2) {
                    _0x21104f.emitNet('vrp-boosting:s2:missionStepCompleted', _0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.id, 'escape_police');
                }
            }
        }
        for (const _0x19f2ca of _0x31cb8e) {
            if (!NetworkDoesEntityExistWithNetworkId(_0x19f2ca)) {
                continue;
            }
            const _0x4d686c = NetworkGetEntityFromNetworkId(_0x19f2ca), _0x161cd7 = GetEntityCoords(PlayerPedId(), true), _0x238fba = GetEntityCoords(_0x4d686c, true), _0x504e7e = _0x5f11e9.getDistance(_0x161cd7, _0x238fba);
            if (_0x504e7e > 45) {
                _0x31cb8e.delete(_0x19f2ca);
                exports['vrp-sync'].SyncedExecution('DeleteEntity', _0x4d686c);
            }
            if (!DoesEntityExist(_0x4d686c) || !IsPedDeadOrDying(_0x4d686c, true) || GetGameTimer() - GetPedTimeOfDeath(_0x4d686c) < 20000) {
                continue;
            }
            _0x31cb8e.delete(_0x19f2ca);
            exports['vrp-sync'].SyncedExecution('DeleteEntity', _0x4d686c);
            ;
        }
    });
    on('vrp-polyzone:enter', (_0x3c6a13, _0x48ee25) => {
        ;
        var _0x19f7f6, _0x72878e;
        if (_0x3c6a13 !== 'boosting_s2_facility_door') {
            return;
        }
        const _0x2f89e2 = Number(_0x48ee25 === null || _0x48ee25 === void 0 ? void 0 : _0x48ee25.id), _0x158e59 = ((_0x19f7f6 = _0x5c83b6.metadata) === null || _0x19f7f6 === void 0 ? void 0 : _0x19f7f6.targetDoor) && Number((_0x72878e = _0x5c83b6.metadata) === null || _0x72878e === void 0 ? void 0 : _0x72878e.targetDoor) === _0x2f89e2;
        if (!_0x158e59) {
            return;
        }
        (_0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.step) === 'break_into_facility' && exports['vrp-ui'].showInteraction('[E] Break Into Facility');
        (_0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.step) === 'find_facility_server' && exports['vrp-ui'].showInteraction('[E] Enter Facility');
        _0x407c42 = setTick(async () => {
            ;
            if (IsControlJustReleased(0, 38)) {
                if ((_0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.step) === 'break_into_facility') {
                    _0x9c9f89(Number(_0x48ee25 === null || _0x48ee25 === void 0 ? void 0 : _0x48ee25.id));
                }
                (_0x5c83b6 === null || _0x5c83b6 === void 0 ? void 0 : _0x5c83b6.step) === 'find_facility_server' && _0x4764a6();
            }
        });
        ;
    });
    on('vrp-polyzone:exit', _0x3686e2 => {
        ;
        if (_0x3686e2 !== 'boosting_s2_facility_door') {
            return;
        }
        clearTick(_0x407c42);
        exports['vrp-ui'].hideInteraction();
        _0x407c42 = null;
        ;
    });
    on('onResourceStop', _0x16f633 => {
        ;
        if (_0x16f633 !== GetCurrentResourceName()) {
            return;
        }
        for (const _0x4c4a1f of _0x31cb8e) {
            DeleteEntity(NetworkGetEntityFromNetworkId(_0x4c4a1f));
            _0x31cb8e.delete(_0x4c4a1f);
            ;
        }
    });
    ;
    ;
    const _0x2a0357 = async () => {
        ;
        _0x21104f.on('vrp-boosting:s2:breakIntoFacility', _0x9c9f89);
        _0x21104f.on('vrp-boosting:s2:exitGarage', _0x382c58);
        _0x21104f.on('vrp-boosting:s2:enterGarage', _0xa30de6);
        _0x21104f.on('vrp-boosting:s2:hackServer', _0x3cc38f);
        _0x21104f.on('vrp-boosting:s2:enterFacility', _0x4764a6);
        _0x21104f.on('vrp-boosting:s2:lootDeadGuard', _0x4ff209);
        _0x21104f.on('vrp-boosting:s2:startMission', _0x365cc4);
        _0x21104f.on('vrp-boosting:s2:purchaseVehicle', _0x12c859);
        _0x21104f.on('vrp-boosting:s2:viewContracts', _0x129150);
        _0x21104f.onNet('vrp-boosting:s2:syncMissionState', _0x4e21e4);
        RegisterUICallback('vrp-boosting:s2:ui:confirmPurchase', async (_0x2276e3, _0x133664) => {
            const _0x152b47 = {
                ok: true,
                message: ''
            };
            ;
            ;
            ;
            const _0x4d0db8 = {
                data: {},
                meta: _0x152b47
            };
            ;
            ;
            _0x133664(_0x4d0db8);
            ;
            if (_0x2276e3.key.type === 's2_purchase') {
                const [_0x145fd9, _0x4368a4] = await RPC.execute('vrp-boosting:s2:purchaseVehicle', _0x2276e3.key.vin, _0x2276e3.alias);
                emit('DoLongHudText', _0x4368a4, _0x145fd9 ? 1 : 2);
            } else {
                if (_0x2276e3.key.type === 'normal_contract') {
                    const [_0xcd887d, _0x3656c9] = await RPC.execute('vrp-boosting:s2:purchaseMarketplaceContract', _0x2276e3.key.model);
                    emit('DoLongHudText', _0x3656c9, _0xcd887d ? 1 : 2);
                }
            }
        });
        RegisterUICallback('vrp-boosting:s2:ui:cancelPurchase', async (_0x26cbde, _0x3ebe6f) => {
            ;
            const _0x5bc93e = {
                ok: true,
                message: ''
            };
            ;
            ;
            ;
            const _0x42b328 = {
                data: {},
                meta: _0x5bc93e
            };
            ;
            ;
            _0x3ebe6f(_0x42b328);
            ;
        });
        RegisterUICallback('vrp-boosting:s2:ui:confirmContractPurchase', async (_0x1ec366, _0x2bc647) => {
            return await _0x323604(_0x1ec366, _0x2bc647);
        });
        on('vrp-boosting:s2:leaveMission', async () => {
            await _0x1db3db();
        });
        ;
    };
    ;
    const _0x2dffad = async () => {
        ;
        const _0x3385b8 = {
            x: -1522.31,
            y: -2978.68,
            z: -80.38
        };
        ;
        ;
        ;
        ;
        const _0x4a71fb = {
            heading: 0,
            minZ: -81.38,
            maxZ: -77.38
        };
        ;
        ;
        ;
        _0x12f290.addBoxTarget('1', 'boosting_s2_garage_exit', _0x3385b8, 6.4, 0.6, _0x4a71fb);
        ;
        const _0xcbb23e = {
            id: 'boosting_s2_exit',
            label: 'Exit Garage',
            icon: 'door-open',
            VPXEvent: 'vrp-boosting:s2:exitGarage'
        };
        ;
        ;
        ;
        ;
        ;
        const _0x35d9bd = { radius: 1.5 };
        ;
        _0x3a06a7.addPeekEntryByTarget('boosting_s2_garage_exit', [_0xcbb23e], {
            'distance': _0x35d9bd,
            'isEnabled'(_0x24f757, _0x8b29f7) {
                const _0x48e74d = exports['vrp-racing'].getHasRaceUsbAndAlias(), _0x445b65 = _0x48e74d.has_usb_racing && _0x48e74d.racingAlias;
                return _0x445b65;
            }
        });
        ;
        const _0x29f53a = {
            x: 1552.17,
            y: 2189.48,
            z: 78.87
        };
        ;
        ;
        ;
        ;
        const _0x27ac9c = {
            heading: 0,
            minZ: 77.87,
            maxZ: 81.87
        };
        ;
        ;
        ;
        _0x12f290.addBoxTarget('2', 'boosting_s2_garage_enter', _0x29f53a, 0.8, 4.2, _0x27ac9c);
        ;
        const _0xcb80e4 = {
            id: 'boosting_s2_enter',
            label: 'Enter Garage',
            icon: 'door-open',
            VPXEvent: 'vrp-boosting:s2:enterGarage'
        };
        ;
        ;
        ;
        ;
        ;
        const _0xd0d845 = { radius: 1.5 };
        ;
        exports['vrp-interact'].AddPeekEntryByPolyTarget('boosting_s2_garage_enter', [_0xcb80e4], {
            'distance': _0xd0d845,
            'isEnabled': async () => {
                ;
                const _0x32119b = exports['vrp-racing'].getHasRaceUsbAndAlias(), _0x12aa76 = _0x32119b.has_usb_racing && _0x32119b.racingAlias;
                return _0x12aa76;
            }
        });
        ;
        const _0x10fb53 = {
            id: 'boosting_s2_garage_start_mission',
            label: 'Start Job',
            icon: 'exclamation',
            VPXEvent: 'vrp-boosting:s2:startMission'
        };
        ;
        ;
        ;
        ;
        ;
        const _0x4308fd = { radius: 1.5 };
        ;
        exports['vrp-interact'].AddPeekEntryByPolyTarget('boosting_s2_garage_enter', [_0x10fb53], {
            'distance': _0x4308fd,
            'isEnabled': async () => {
                ;
                const _0x228838 = exports['vrp-racing'].getHasRaceUsbAndAlias(), _0x3c727f = _0x228838.has_usb_racing && _0x228838.racingAlias, _0x5bdc6b = await _0x521849.get();
                return _0x3c727f && !_0x5bdc6b;
            }
        });
        ;
        const _0x13545f = {
            id: 's2_warehouse_worker',
            label: 'talk',
            icon: 'comment',
            VPXEvent: 'vrp-boosting:s2:viewContracts',
            parameters: {}
        };
        ;
        ;
        ;
        ;
        ;
        ;
        const _0x4ad126 = { radius: 2.5 };
        ;
        const _0x10ecce = {
            npcIds: ['npc_s2_garage_worker'],
            distance: _0x4ad126,
            isEnabled: () => _0x314e45
        };
        ;
        ;
        ;
        _0x3a06a7.addPeekEntryByFlag(['isNPC'], [_0x13545f], _0x10ecce);
        ;
    };
    ;
    let _0x314e45 = false;
    const _0x4538a9 = new Map(), _0x3c98d5 = new Map(), _0xf68d6 = new Map(), _0x3ca9f9 = { timeToLive: 60000 };
    ;
    const _0x521849 = _0x5f11e9.cache(async () => {
            const _0x3799c0 = await RPC.execute('vrp-boosting:s2:isAllowedInS2Garage');
            return [
                true,
                _0x3799c0
            ];
        }, _0x3ca9f9), _0x2c8b3c = async () => {
            ;
            await _0x2a0357();
            await _0x2dffad();
            await _0x126b8f();
            DecorRegister('IsS2Vehicle', 2);
            ;
        }, _0xa30de6 = async () => {
            ;
            if (_0x314e45) {
                return;
            }
            const _0x25ffc3 = await _0x521849.get();
            if (!_0x25ffc3) {
                return emit('DoLongHudText', 'Seems like I dont have access...', 2);
            }
            DoScreenFadeOut(200);
            await _0x5f11e9.wait(250);
            ;
            const [_0x41436c, _0x168f39, _0x1990a1, _0x3f8988] = _0x347901('vrp-boosting:s2', 'garageEntranceCoords');
            SetEntityCoords(PlayerPedId(), _0x41436c, _0x168f39, _0x1990a1, true, false, false, false);
            SetEntityHeading(PlayerPedId(), _0x3f8988);
            ;
            const _0xf9bf15 = await RPC.execute('vrp-boosting:s2:getS2Vehicles');
            for (const _0xc7189e of _0xf9bf15) {
                await _0x3b0d20(_0xc7189e);
            }
            _0x314e45 = true;
            await RPC.execute('vrp-infinity:setWorld', 'boosting_s2_garage');
            DoScreenFadeIn(2000);
            ;
        }, _0xe8d68e = () => {
            ;
            const _0x237ba0 = _0x347901('vrp-boosting:s2', 'garageParkingSpots');
            for (let _0xec6356 = 0; _0xec6356 < _0x237ba0.length; _0xec6356++) {
                const _0xab37a0 = _0x237ba0[_0xec6356][0], _0x50a613 = _0x237ba0[_0xec6356][1];
                if (_0x3c98d5.has(_0xab37a0)) {
                    continue;
                }
                const _0x54531e = {};
                return _0x54531e.id = _0xab37a0, _0x54531e.coords = _0x50a613, _0x54531e;
            }
            return null;
        }, _0x3b0d20 = async _0x17e5ac => {
            const _0x34cae9 = _0xe8d68e();
            if (!_0x34cae9) {
                return console.log('no spawns so skip');
            }
            await _0x3d6c2d.loadModel(_0x17e5ac === null || _0x17e5ac === void 0 ? void 0 : _0x17e5ac.model);
            const _0x46ee8 = CreateVehicle(_0x17e5ac === null || _0x17e5ac === void 0 ? void 0 : _0x17e5ac.model, _0x34cae9.coords[0], _0x34cae9.coords[1], _0x34cae9.coords[2] - 50, _0x34cae9.coords[3], false, false);
            FreezeEntityPosition(_0x46ee8, true);
            SetVehicleDoorsLocked(_0x46ee8, 3);
            SetVehicleNumberPlateText(_0x46ee8, _0x17e5ac.plate);
            exports['vrp-vehicles'].SetVehicleAppearance(_0x46ee8, _0x17e5ac.appearance);
            exports['vrp-vehicles'].SetMods(_0x46ee8, _0x17e5ac.mods);
            await _0x5f11e9.wait(100);
            SetEntityCoords(_0x46ee8, _0x34cae9.coords[0], _0x34cae9.coords[1], _0x34cae9.coords[2], false, false, false, false);
            SetModelAsNoLongerNeeded(_0x17e5ac === null || _0x17e5ac === void 0 ? void 0 : _0x17e5ac.model);
            ;
            const _0x37c719 = {
                spot: _0x34cae9 === null || _0x34cae9 === void 0 ? void 0 : _0x34cae9.id,
                vin: _0x17e5ac.vin
            };
            ;
            ;
            _0x4538a9.set(_0x46ee8, _0x37c719);
            DecorSetBool(_0x46ee8, 'IsS2Vehicle', true);
            _0x3c98d5.set(_0x34cae9 === null || _0x34cae9 === void 0 ? void 0 : _0x34cae9.id, true);
            ;
        }, _0x382c58 = async () => {
            ;
            DoScreenFadeOut(200);
            await _0x5f11e9.wait(250);
            ;
            const [_0x3a8e8d, _0x216109, _0x23cb2a, _0x473a84] = _0x347901('vrp-boosting:s2', 'garageExitCoords');
            SetEntityCoords(PlayerPedId(), _0x3a8e8d, _0x216109, _0x23cb2a, true, false, false, false);
            SetEntityHeading(PlayerPedId(), _0x473a84);
            ;
            for (const [_0x4b6df5, _0x5c1434] of _0x4538a9) {
                DeleteEntity(_0x4b6df5);
                _0x4538a9.delete(_0x4b6df5);
                _0x3c98d5.delete(_0x5c1434.spot);
                ;
            }
            _0x314e45 = false;
            await RPC.execute('vrp-infinity:setWorld', 'default');
            DoScreenFadeIn(2000);
            ;
        }, _0x12c859 = async (_0x52b1b2, _0x301322) => {
            const _0x28f168 = _0x4538a9.get(_0x301322);
            if (!_0x28f168) {
                return emit('DoLongHudText', 'Failed to purchase vehicle', 2);
            }
            const _0x1584ae = exports['vrp-racing'].getHasRaceUsbAndAlias(), _0x59b8ee = _0x1584ae.has_usb_racing && _0x1584ae.racingAlias;
            if (!_0x59b8ee) {
                return emit('DoLongHudText', 'Need racing dongle.', 2);
            }
            const _0x1c93c4 = _0x347901('vrp-boosting:s2', 'costToPurchaseS2'), _0x591c88 = {
                    icon: 'exclamation-circle',
                    title: 'Vehicle Contract Purchase',
                    description: '',
                    action: '',
                    key: {}
                };
            ;
            ;
            ;
            ;
            ;
            ;
            const _0x9abe9e = {
                type: 's2_purchase',
                vin: _0x28f168 === null || _0x28f168 === void 0 ? void 0 : _0x28f168.vin,
                alias: _0x1584ae.racingAlias
            };
            ;
            ;
            ;
            ;
            const _0x2a9a99 = {
                icon: 'check-square',
                title: 'Confirm Purchase (' + _0x1c93c4 + ' XTF)',
                action: 'vrp-boosting:s2:ui:confirmPurchase',
                key: _0x9abe9e
            };
            ;
            ;
            ;
            ;
            ;
            const _0x5c78e7 = {
                icon: 'window-close',
                title: 'Cancel Purchase',
                action: 'vrp-boosting:s2:ui:cancelPurchase',
                key: {}
            };
            ;
            ;
            ;
            ;
            ;
            const _0x516c12 = [
                _0x591c88,
                _0x2a9a99,
                _0x5c78e7
            ];
            exports['vrp-ui'].showContextMenu(_0x516c12);
        }, _0x129150 = async () => {
            const _0x523802 = await RPC.execute('vrp-boosting:s2:viewContractsForSale');
            if (!_0x523802) {
                return;
            }
            const _0x5e4f19 = {
                icon: 'exclamation-circle',
                title: 'Current Contracts For Sale',
                description: 'Come back later for different options...',
                action: '',
                key: {},
                titleRight: ''
            };
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            const _0x304ffe = [_0x5e4f19];
            for (const _0x288c42 of _0x523802) {
                const _0x45d407 = {
                    icon: 'car',
                    title: _0x288c42.name,
                    titleRight: _0x288c42.cost + ' XTF',
                    action: 'vrp-boosting:s2:ui:confirmContractPurchase',
                    description: 'Class: ' + _0x288c42.class,
                    key: {}
                };
                ;
                ;
                ;
                ;
                ;
                ;
                _0x45d407.key.model = _0x288c42.model;
                _0x45d407.key.name = _0x288c42.name;
                _0x45d407.key.cost = _0x288c42.cost;
                _0x304ffe.push(_0x45d407);
                ;
            }
            exports['vrp-ui'].showContextMenu(_0x304ffe);
        }, _0x323604 = async (_0x4f1ed3, _0x258200) => {
            const _0x11a49f = {
                ok: true,
                message: ''
            };
            ;
            ;
            ;
            const _0x5708fd = {
                data: {},
                meta: _0x11a49f
            };
            ;
            ;
            _0x258200(_0x5708fd);
            await _0x5f11e9.wait(500);
            ;
            const _0x20d7ec = {
                icon: 'exclamation-circle',
                title: 'Vehicle Contract Purchase',
                description: '',
                action: '',
                key: {}
            };
            ;
            ;
            ;
            ;
            ;
            ;
            const _0x372a54 = {
                icon: 'check-square',
                title: 'Confirm Purchase (' + _0x4f1ed3.key.cost + ' XTF)',
                action: 'vrp-boosting:s2:ui:confirmPurchase',
                key: {}
            };
            ;
            ;
            ;
            ;
            _0x372a54.key.type = 'normal_contract';
            _0x372a54.key.model = _0x4f1ed3.key.model;
            ;
            const _0x477a8d = {
                icon: 'window-close',
                title: 'Cancel Purchase',
                action: 'vrp-boosting:s2:ui:cancelPurchase',
                key: {}
            };
            ;
            ;
            ;
            ;
            ;
            const _0x2c3646 = [
                _0x20d7ec,
                _0x372a54,
                _0x477a8d
            ];
            exports['vrp-ui'].showContextMenu(_0x2c3646);
        };
    on('onResourceStop', _0x2069e4 => {
        if (_0x2069e4 !== GetCurrentResourceName()) {
            return;
        }
        for (const [_0x1cc325] of _0x4538a9) {
            DeleteEntity(_0x1cc325);
        }
    });
    const _0x5f34a5 = async _0x35f849 => {
        ;
        for (let _0x6fa9fe = 0; _0x6fa9fe < _0x35f849; _0x6fa9fe++) {
            const [_0x91cb06, _0x442b9f, _0x466d3b] = GetEntityCoords(PlayerPedId(), true), _0x499353 = {
                    x: _0x91cb06,
                    y: _0x442b9f,
                    z: _0x466d3b
                };
            ;
            ;
            ;
            ;
            const _0x52981c = await _0x24ce74(_0x499353, 100, 200, 20);
            if (!_0x52981c) {
                return;
            }
            const _0x4b789f = _0x46476d.fromArray(_0x52981c), _0x18bcb8 = {
                    movementType: 3,
                    combatRange: 1,
                    accuracy: 5,
                    ragdoll: false,
                    pedFlags: [[
                            208,
                            true
                        ]]
                };
            ;
            ;
            ;
            ;
            ;
            ;
            const _0x35e2e9 = {
                health: 200,
                armour: 200,
                weapons: [[
                        1192676223,
                        9999
                    ]],
                criticalHits: false,
                combatAttributes: _0x18bcb8,
                relationshipGroup: 'HATES_PLAYER',
                relationshipType: 5,
                dropWeapon: false,
                randomVariation: true,
                randomProps: true
            };
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            const _0x22262b = await _0x2945f7({
                'peds': {
                    'model': GetHashKey('mp_m_weapexp_01'),
                    'amount': 3,
                    'coords': _0x4b789f,
                    'heading': 0,
                    'options': _0x35e2e9
                },
                'coords': _0x4b789f,
                'heading': 0,
                'model': GetHashKey('MESA3'),
                'seatOptions': {
                    'chase': true,
                    'combat': true,
                    'targetPlayer': GetPlayerServerId(PlayerId())
                }
            });
            _0xf68d6.set(_0x22262b, true);
            await _0x5f11e9.wait(1500);
            ;
        }
    };
    on('onResourceStop', _0x1c0035 => {
        if (_0x1c0035 !== GetCurrentResourceName()) {
            return;
        }
        for (const [_0x349b98] of _0xf68d6) {
            DeleteEntity(NetworkGetEntityFromNetworkId(_0x349b98));
        }
    });
    ;
    const _0xb5abe1 = (_0x2d3d0e, _0x47cd18, _0x228625 = false) => {
            ;
            return new Promise(_0x26f73c => {
                ;
                exports['vrp-taskbar'].taskBar(_0x2d3d0e, _0x47cd18, _0x228625, true, null, false, _0x26f73c);
            });
        }, _0x2f0d3b = (_0x1419ec, _0x11acb8, _0x94a7de) => {
            return new Promise(_0x378e4f => {
                ;
                exports['vrp-phone'].DoPhoneConfirmation(_0x1419ec, _0x11acb8, _0x94a7de, _0x378e4f);
            });
        }, _0xdb74c5 = (_0x843f82, _0x4bbb8e, _0x10900d = true, _0x5443d7 = 'home-screen') => {
            ;
            const _0x2ccbc5 = {
                action: 'notification',
                target_app: _0x5443d7,
                title: _0x843f82,
                body: _0x4bbb8e,
                show_even_if_app_active: _0x10900d
            };
            ;
            ;
            ;
            ;
            ;
            ;
            const _0x73d9fd = {
                source: 'vrp-nui',
                app: 'phone',
                data: _0x2ccbc5
            };
            ;
            ;
            ;
            SendUIMessage(_0x73d9fd);
            ;
        };
    ;
    function _0x5798f1(_0x30240b) {
        ;
        DecorSetBool(_0x30240b, 'ScriptedPed', true);
        DecorSetBool(_0x30240b, 'EventPed', true);
        SetPedAlertness(_0x30240b, 3);
        SetPedConfigFlag(_0x30240b, 100, true);
        SetPedCombatRange(_0x30240b, 2);
        SetPedSeeingRange(_0x30240b, 200);
        SetPedHearingRange(_0x30240b, 1000);
        SetPedDiesWhenInjured(_0x30240b, false);
        SetPedEnableWeaponBlocking(_0x30240b, true);
        SetPedArmour(_0x30240b, 500);
        SetEntityHealth(_0x30240b, 500);
        SetPedMaxHealth(_0x30240b, 500);
        SetPedAccuracy(_0x30240b, _0x5f11e9.getRandomNumber(75, 100));
        SetPedCombatAbility(_0x30240b, 2);
        SetPedCombatMovement(_0x30240b, 2);
        SetPedCombatAttributes(_0x30240b, 5, true);
        SetPedCombatAttributes(_0x30240b, 16, true);
        SetPedCombatAttributes(_0x30240b, 17, false);
        SetPedCombatAttributes(_0x30240b, 46, true);
        SetPedCombatAttributes(_0x30240b, 1424, false);
        SetPedFleeAttributes(_0x30240b, 0, false);
        TaskWanderStandard(_0x30240b, 1, 10);
        RegisterHatedTargetsAroundPed(_0x30240b, 200);
        TaskCombatHatedTargetsAroundPed(_0x30240b, 200, 0);
        SetPedKeepTask(_0x30240b, true);
        SetPedRelationshipGroupHash(_0x30240b, GetHashKey('HATES_PLAYER'));
        SetEntityAsNoLongerNeeded(_0x30240b);
        ;
    }
    ;
    class _0x50944c {
        constructor(_0x42645d) {
            ;
            this.uuid = _0x42645d.uuid;
            this.pickup = _0x42645d.pickup;
            this.dropoff = _0x42645d.dropoff;
            this.alertPolice = _0x42645d.alertPolice;
            this.isBaitCar = _0x42645d.isBaitCar;
            this.hasTracker = _0x42645d.hasTracker;
            this.vehicleClass = _0x42645d.vehicleClass;
            this.contractVehicleInfo = _0x42645d.contractVehicleInfo;
            this.contractType = _0x42645d.contractType;
            this.ownerSource = _0x42645d.source;
            this.ownerCid = _0x42645d.ownerCid;
            this.playerInfo = _0x42645d.playerInfo;
            this.notifiedPolice = false;
            this.hasDoneOnlineWipe = false;
            this.hasPaidForScratch = false;
            ;
        }
        async ['playerLockpickedVehicle'](_0x2f0f93) {
            ;
            emitNet('vrp-boosting:server:contractedVehicleLockpicked', _0x2f0f93);
            if (this.vehicleClass === 'SUpgraded2') {
                const _0x568e63 = NetworkGetEntityFromNetworkId(_0x2f0f93);
                DetachEntity(_0x568e63, true, false);
            }
        }
        async ['vehicleDoorLockpicking'](_0x156cf7) {
            ;
            const _0xad24cf = await RPC.execute('vrp-boosting:server:isMyContractVehicle', _0x156cf7);
            if (!_0xad24cf || this.notifiedPolice) {
                return;
            }
            if (this.vehicleClass === 'SUpgraded2') {
                await _0x5f34a5(3);
            } else {
                this.spawnOwnerPed();
            }
            const _0x2df4b4 = IsPedMale(PlayerPedId()), _0x57060b = GetLabelText(GetNameOfZone(this.pickup.coords.x, this.pickup.coords.y, this.pickup.coords.z)), [_0x418709] = GetStreetNameAtCoord(this.pickup.coords.x, this.pickup.coords.y, this.pickup.coords.z), _0x1663bd = GetStreetNameFromHashKey(_0x418709) + ', ' + _0x57060b, _0x53100e = NetworkGetEntityFromNetworkId(_0x156cf7), _0x1f185e = _0x2d2d2d(_0x53100e, GetEntityHeading(PlayerPedId())), _0xbc8812 = {
                    'x': _0x5f11e9.getRandomNumber(0, 50),
                    'y': _0x5f11e9.getRandomNumber(0, 50),
                    'z': _0x5f11e9.getRandomNumber(0, 50)
                };
            !this.playerInfo && ((this.isBaitCar || this.hasTracker) && emitNet('dispatch:svNotify', {
                'dispatchCode': this.hasTracker ? '10-99A' : '10-99',
                'gender': _0x2df4b4,
                'eventId': this.uuid,
                'firstStreet': _0x1663bd,
                'isTracker': true,
                'model': _0x1f185e.model,
                'plate': _0x1f185e.plate,
                'firstColor': _0x1f185e.firstColor,
                'secondColor': _0x1f185e.secondColor,
                'heading': _0x1f185e.heading,
                'extraData': 'Vehicle\'s Class: ' + _0x3837ec(this.vehicleClass),
                'origin': {
                    'x': _0xbc8812.x + this.pickup.coords.x,
                    'y': _0xbc8812.y + this.pickup.coords.y,
                    'z': _0xbc8812.z + this.pickup.coords.z
                }
            }), this.alertPolice && !(this.isBaitCar || this.hasTracker) && emitNet('dispatch:svNotify', {
                'dispatchCode': '10-99B',
                'eventId': this.uuid,
                'firstStreet': _0x1663bd,
                'model': _0x1f185e.model,
                'plate': _0x1f185e.plate,
                'firstColor': _0x1f185e.firstColor,
                'secondColor': _0x1f185e.secondColor,
                'heading': _0x1f185e.heading,
                'extraData': 'Vehicle\'s Class: ' + _0x3837ec(this.vehicleClass),
                'origin': {
                    'x': _0xbc8812.x + this.pickup.coords.x,
                    'y': _0xbc8812.y + this.pickup.coords.y,
                    'z': _0xbc8812.z + this.pickup.coords.z
                }
            }));
            this.playerInfo && this.vehicleClass === 'SUpgraded2' && emitNet('dispatch:svNotify', {
                'dispatchCode': this.hasTracker ? '10-99A' : '10-99',
                'gender': _0x2df4b4,
                'eventId': this.uuid,
                'firstStreet': _0x1663bd,
                'isTracker': true,
                'model': _0x1f185e.model,
                'plate': _0x1f185e.plate,
                'firstColor': _0x1f185e.firstColor,
                'secondColor': _0x1f185e.secondColor,
                'heading': _0x1f185e.heading,
                'extraData': 'Vehicle\'s Class: ' + _0x3837ec(this.vehicleClass),
                'origin': {
                    'x': _0xbc8812.x + this.pickup.coords.x,
                    'y': _0xbc8812.y + this.pickup.coords.y,
                    'z': _0xbc8812.z + this.pickup.coords.z
                }
            });
            const _0x54ce06 = GetVehicleNumberPlateText(_0x53100e);
            emitNet('np:vehicles:hotPlate', _0x54ce06, '10-60');
            emitNet('vrp-boosting:server:vehicleDoorLockpicked', _0x156cf7);
            this.notifiedPolice = true;
            ;
        }
        async ['startVinScratchingProcess']() {
            ;
            const _0x39d9fa = exports.isPed.isPed('cid');
            if (parseInt(_0x39d9fa) !== this.ownerCid) {
                return emit('DoLongHudText', 'Contract owner has to do this!', 1);
            }
            TriggerEvent('animation:PlayAnimation', 'type');
            const _0x502072 = await _0x3a06a7.taskBar(2000, 'Opening Laptop', true);
            if (_0x502072 !== 100) {
                return ClearPedTasks(PlayerPedId()), emit('DoLongHudText', 'Stopped opening laptop!', 2);
            }
            if (!this.hasPaidForScratch && this.vehicleClass !== 'SUpgraded2') {
                const _0x2fc5cd = await _0x2f0d3b('PM Boosting', 'Order price ' + this.contractVehicleInfo.gnePurchaseCost + ' GNE', 'horse-head');
                if (!_0x2fc5cd) {
                    return _0xdb74c5('PM Boosting', 'Transaction declined!');
                }
                const _0x101429 = await RPC.execute('vrp-boosting:server:chargePlayer', this.contractVehicleInfo.gnePurchaseCost);
                if (!_0x101429) {
                    return _0xdb74c5('PM Boosting', 'Error occurred while trying to charge you!');
                }
                this.hasPaidForScratch = true;
            }
            const _0x4f66e2 = await _0x3a06a7.taskBar(5000, 'Connecting To Network', true);
            if (_0x4f66e2 !== 100) {
                return ClearPedTasks(PlayerPedId()), emit('DoLongHudText', 'Stopped connecting to network!', 2);
            }
            const _0x2aa2f1 = await _0x3a06a7.taskBar(10000, 'Wiping online paperwork', true);
            if (_0x2aa2f1 !== 100) {
                return ClearPedTasks(PlayerPedId()), emit('DoLongHudText', 'Stopped vin scratching proccess!', 2);
            }
            emit('DoLongHudText', 'Head to vehicle and scratch off the vin!', 1);
            ClearPedTasks(PlayerPedId());
            this.hasDoneOnlineWipe = true;
            emit('vrp-boosting:client:vehicleOnlineWipeComplete', this.uuid);
            ;
        }
        async ['startPhysicalVinScratch']() {
            ;
            if (!this.hasDoneOnlineWipe) {
                return emit('DoLongHudText', 'You can\'t do that yet.', 2);
            }
            const _0x18c24d = await RPC.execute('vrp-boosting:server:isPoliceNear', this.uuid, 50);
            if (_0x18c24d) {
                return emit('DoLongHudText', 'Area is too hot, I can\'t do this right now.', 2);
            }
            TriggerEvent('animation:PlayAnimation', 'kneel');
            const _0x500a02 = await _0xb5abe1(20000, 'Scratching Vin');
            if (_0x500a02 !== 100) {
                ClearPedTasks(PlayerPedId());
                emit('DoLongHudText', 'Stopped opening laptop!', 2);
                ;
                return;
            }
            const _0x36fd39 = exports.isPed.isPed('cid');
            await RPC.execute('vrp-boosting:server:giveVinSratchVehicle', _0x36fd39, this.contractVehicleInfo.model);
            emit('vrp-boosting:client:vehiclePhysicalScratchComplete', this.uuid);
            emit('DoLongHudText', 'Vin scratch complete!', 1);
            emitNet('vrp-boosting:server:vinScratchComplete');
            ClearPedTasks(PlayerPedId());
            ;
            return;
        }
        ['vehicleCrashed'](_0x3ef747, _0x3c068b) {
            ;
            emitNet('vrp-boosting:server:updateVehicleHealth', _0x3ef747, _0x3c068b);
        }
        async ['spawnOwnerPed']() {
            ;
            const _0x5ee007 = _0x22bd6f(this.vehicleClass), _0x317bd3 = _0x5ee007.ped, _0x7be031 = _0x5f11e9.getRandomNumber(_0x317bd3.min, _0x317bd3.max), _0x3a6471 = _0x509cad('ownerPeds');
            for (let _0x17e5f9 = 0; _0x17e5f9 < _0x7be031; _0x17e5f9++) {
                const _0xa7b0e3 = _0x128335(), _0x5e67f0 = Math.floor(Math.random() * _0x3a6471.length), _0x427a5e = GetHashKey(_0x3a6471[_0x5e67f0]);
                RequestModel(_0x427a5e);
                while (!HasModelLoaded(_0x427a5e)) {
                    await new Promise(_0x209461 => setTimeout(_0x209461, 10));
                }
                const _0x10d786 = CreatePed(1, _0x427a5e, _0xa7b0e3[0], _0xa7b0e3[1], _0xa7b0e3[2], 0, true, false);
                _0x5798f1(_0x10d786);
                this.vehicleClass === 'C' && _0x1b5746(50) && GiveWeaponToPed(_0x10d786, -1024456158, 500, false, true);
                if (this.vehicleClass === 'B' && _0x1b5746(40)) {
                    GiveWeaponToPed(_0x10d786, -275439685, 500, false, true);
                } else {
                    this.vehicleClass === 'B' && _0x1b5746(100) && GiveWeaponToPed(_0x10d786, -1024456158, 500, false, true);
                }
                const _0x3ae0fe = [
                    'A',
                    'AUpgraded',
                    'SUpgraded',
                    'SUpgraded2'
                ];
                _0x3ae0fe.includes(this.vehicleClass) && GiveWeaponToPed(_0x10d786, 736523883, 500, false, true);
                await _0x5f11e9.wait(_0x5f11e9.getRandomNumber(2000, 6000));
                ;
            }
        }
    }
    ;
    let _0x3916fd = false, _0x3fe15b = false;
    on('vrp-admin:currentDevmode', _0x2a67ff => {
        _0x3916fd = _0x2a67ff;
    });
    onNet('vrp-preferences:setPreferences', _0x2a014b => {
        ;
        _0x3fe15b = _0x2a014b['boosting.auction.soundsEnabled'];
    });
    onNet('vrp-boosting:client:startContract', _0x4885ae => {
        if (_0x29b8ae) {
            return;
        }
        const _0x56bc41 = new _0x50944c(_0x4885ae);
        _0x45118d(_0x56bc41);
    });
    onNet('vrp-boosting:client:resumeContract', _0x1ca9bc => {
        if (_0x29b8ae) {
            return;
        }
        const _0x2fb6ce = new _0x50944c(_0x1ca9bc);
        _0x45118d(_0x2fb6ce);
    });
    onNet('vrp-boosting:client:contractOffer', _0x58687d => {
        const _0x5ce9cf = '#' + _0x58687d + '-2222', _0x22b0f6 = 'You have received a ' + _0x3837ec(_0x58687d) + ' boosting contract!', _0x205726 = {
                i18n: [
                    'You have received a',
                    'boosting contract'
                ]
            };
        ;
        emit('phone:emailReceived', 'Boostin', _0x5ce9cf, _0x22b0f6, _0x205726);
        ;
        const _0x2c47df = { id: 'refresh-contracts' };
        ;
        exports['vrp-ui'].sendAppEvent('laptop', _0x2c47df);
        ;
    });
    onNet('vrp-boosting:client:sendEmail', (_0x3b6921, _0x16b317, _0x16f39e) => {
        ;
        emit('phone:emailReceived', 'Boosting Service', _0x3b6921, _0x16b317, _0x16f39e);
    });
    onNet('vrp-boosting:client:contractCompleted', () => {
        ;
        if (!_0x29b8ae) {
            return;
        }
        console.log('[BOOSTING] - Completed Contract Cleaning Up');
        _0x45118d(null);
        ;
    });
    onNet('vrp-boosting:client:scratchOnlineVin', () => {
        ;
        if (!_0x29b8ae) {
            return;
        }
        return _0x29b8ae.startVinScratchingProcess();
    });
    onNet('vrp-boosting:scratchVehicleVin', async () => {
        ;
        if (!_0x29b8ae) {
            return;
        }
        return await _0x29b8ae.startPhysicalVinScratch();
    });
    onNet('vrp-boosting:client:resetMinigameCooldown', () => {
        const _0x4474b5 = { displayBoostingMinigameCooldown: false };
        ;
        exports['vrp-ui'].sendAppEvent('hud', _0x4474b5);
        ;
    });
    onNet('vrp-boosting:client:notifyPolicePing', (_0x3fd8a7, _0x3471bb, _0x5a126f) => {
        ;
        const _0x5086e8 = _0x5a126f ? NetworkGetEntityFromNetworkId(_0x5a126f) : PlayerPedId();
        PlaySoundFromEntity(-1, _0x3fd8a7, _0x5086e8, _0x3471bb, true, 10);
    });
    onNet('vrp-boosting:client:vehicleSpawned', () => console.log('[BOOSTING] - Spawned Contract Vehicle'));
    on('baseevents:vehicleCrashed', (_0x1f3be3, _0x2ad6f7, _0x1839ee, _0x5194d3, _0x56974d, _0x312a45) => {
        ;
        if (!_0x29b8ae) {
            return;
        }
        _0x29b8ae.vehicleCrashed(NetworkGetNetworkIdFromEntity(_0x1f3be3), _0x312a45);
    });
    onNet('vrp-vehicle:client:vehicleLockpicked', async _0x111e9a => {
        ;
        if (!_0x29b8ae) {
            return;
        }
        _0x29b8ae.playerLockpickedVehicle(_0x111e9a);
    });
    onNet('vrp-vehicle:client:doorLockpicking', _0x4f4d75 => {
        ;
        if (!_0x29b8ae) {
            return;
        }
        _0x29b8ae.vehicleDoorLockpicking(_0x4f4d75);
    });
    onNet('vrp-inventory:itemCheck', (_0x1eb012, _0x5d19da) => {
        ;
        if (_0x1eb012 !== 'racingusb2') {
            return;
        }
        emitNet('vrp-boosting:server:dongleUpdate', _0x5d19da);
    });
    onNet('vrp-boosting:client:updateDropoff', _0xf45da5 => {
        ;
        if (!_0x29b8ae) {
            return;
        }
        _0x29b8ae.dropoff = _0xf45da5;
    });
    onNet('vrp-spawn:characterSpawned', () => {
        ;
        console.log('[BOOSTING] - Character spawned let\'s resume any contract.');
        emitNet('vrp-boosting:server:resumeContract');
        ;
    });
    _0x21104f.onNet('vrp-boosting:auction:soundAlert', _0x5d520a => {
        ;
        if (!_0x3fe15b) {
            return;
        }
        const _0x2a45bb = { id: 'boosting-auction-' + _0x5d520a };
        ;
        exports['vrp-ui'].sendAppEvent('laptop', _0x2a45bb);
        ;
    });
    _0x21104f.onNet('vrp-boosting:client:updateBlip', (_0x43314b, _0xff6384, _0x4d540c) => {
        ;
        _0x3a69f6.addBlip(_0x43314b, _0xff6384, _0x4d540c);
    });
    ;
    ;
    RegisterUICallback('vrp-boosting:ui:disbandContract', async (_0x1d87d9, _0x30a8be) => {
        ;
        const _0x271c6a = await RPC.execute('vrp-boosting:disbandContract', _0x1d87d9.contractId), _0xb8fef4 = {
                ok: true,
                message: ''
            };
        ;
        ;
        ;
        const _0x2e9b42 = {
            data: _0x271c6a,
            meta: _0xb8fef4
        };
        ;
        ;
        _0x30a8be(_0x2e9b42);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:startContract', async (_0x217f41, _0x287537) => {
        const _0x4a9e82 = await RPC.execute('vrp-boosting:canPlayerDoContract');
        if (!_0x4a9e82) {
            const _0x3f6dd1 = {
                ok: false,
                message: 'Already in an active contract.'
            };
            ;
            ;
            ;
            const _0x2844eb = {};
            return _0x2844eb.data = [], _0x2844eb.meta = _0x3f6dd1, _0x287537(_0x2844eb);
        }
        const {
                success: _0x125b3a,
                data: _0x235608,
                message: _0x29a2f4
            } = await RPC.execute('vrp-boosting:startContract', _0x217f41.contractId, _0x217f41.contractType), _0x326687 = {
                ok: _0x125b3a,
                message: _0x29a2f4
            };
        ;
        ;
        ;
        const _0xf7a865 = {};
        return _0xf7a865.data = _0x235608, _0xf7a865.meta = _0x326687, _0x287537(_0xf7a865);
    });
    RegisterUICallback('vrp-ui:minigame-sequence-completed:boosting', async (_0x8aa00a, _0x3fc313) => {
        ;
        await RPC.execute('vrp-boosting:server:completedMinigame', _0x8aa00a.success, _0x8aa00a.parameters.contractId, _0x8aa00a.timeTaken);
        const _0xafc2c = { displayBoostingMinigameCooldown: true };
        ;
        exports['vrp-ui'].sendAppEvent('hud', _0xafc2c);
        exports['vrp-ui'].SetUIFocus(false, false);
        ;
        const _0x425537 = {
            ok: true,
            message: ''
        };
        ;
        ;
        ;
        const _0x37bcce = {};
        return _0x37bcce.data = [], _0x37bcce.meta = _0x425537, _0x3fc313(_0x37bcce);
    });
    RegisterUICallback('vrp-boosting:ui:tranferContract', async (_0x41ffe2, _0x1406aa) => {
        ;
        const {
                success: _0x5be816,
                message: _0x59d081,
                data: _0x52d2fa
            } = await RPC.execute('vrp-boosting:server:transferContract', Number(_0x41ffe2.cid), _0x41ffe2.contractId), _0x4ce846 = {
                ok: _0x5be816,
                message: _0x59d081
            };
        ;
        ;
        ;
        const _0x2d2bc8 = {};
        return _0x2d2bc8.data = _0x52d2fa, _0x2d2bc8.meta = _0x4ce846, _0x1406aa(_0x2d2bc8);
    });
    RegisterUICallback('vrp-boosting:ui:isCharInQueue', async (_0x234355, _0x3c6769) => {
        const _0x118544 = await RPC.execute('vrp-boosting:server:isCharInQueue'), _0x43f4de = {
                ok: true,
                message: ''
            };
        ;
        ;
        ;
        const _0x39f3fe = {};
        return _0x39f3fe.data = _0x118544, _0x39f3fe.meta = _0x43f4de, _0x3c6769(_0x39f3fe);
    });
    RegisterUICallback('vrp-boosting:ui:joinQueue', async (_0x1b03d1, _0x1bce7f) => {
        const _0x1c2860 = _0x1cb0d8.g.exports['vrp-racing'].getHasRaceUsbAndAlias();
        if (!_0x1c2860.has_usb_racing || !_0x1c2860.racingAlias) {
            return;
        }
        const _0x9d66fe = exports.isPed.isPed('cid'), {
                success: _0x365550,
                message: _0x1f4879
            } = await RPC.execute('vrp-boosting:server:joinQueue');
        _0x365550 && (await RPC.execute('vrp:jobs:checkIn', 'boosting'), await RPC.execute('phone:createJobCenterGroup', undefined, _0x9d66fe));
        const _0x2ca937 = {};
        return _0x2ca937.data = _0x365550, _0x2ca937.meta = {}, _0x2ca937.meta.ok = _0x365550, _0x2ca937.meta.message = _0x1f4879, _0x1bce7f(_0x2ca937);
    });
    RegisterUICallback('vrp-boosting:ui:leaveQueue', async (_0x116327, _0x253eef) => {
        ;
        const {
            success: _0x45a58b,
            message: _0x54f513
        } = await RPC.execute('vrp-boosting:server:leaveQueue');
        await RPC.execute('vrp:jobs:checkOut', 'boosting');
        const _0x222324 = {
            ok: _0x45a58b,
            message: _0x54f513
        };
        ;
        ;
        ;
        const _0x5b35d5 = {};
        return _0x5b35d5.data = false, _0x5b35d5.meta = _0x222324, _0x253eef(_0x5b35d5);
    });
    RegisterUICallback('vrp-ui:laptop:getBoostingContracts', async (_0x56056b, _0xa82d2c) => {
        const _0x57dbc7 = await RPC.execute('vrp-boosting:getBoostingInbox'), _0x521d79 = {
                ok: true,
                message: ''
            };
        ;
        ;
        ;
        const _0x19d573 = {
            data: _0x57dbc7,
            meta: _0x521d79
        };
        ;
        ;
        _0xa82d2c(_0x19d573);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:cancelContract', async (_0x2192eb, _0x186388) => {
        const _0x48e03d = await RPC.execute('vrp-boosting:server:cancelContract'), _0x2c8453 = {
                ok: _0x48e03d.success,
                message: _0x48e03d.message
            };
        ;
        ;
        ;
        const _0x4cfc21 = {
            data: [],
            meta: _0x2c8453
        };
        ;
        ;
        _0x186388(_0x4cfc21);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:getNextLevelProgression', async (_0x58e5ca, _0x3e1d57) => {
        const _0x3d286b = exports['vrp-progression'].GetProgression('boosting'), {
                nextClass: _0x52cf38,
                currClass: _0x50d5c9
            } = await _0x51564b(_0x3d286b), _0x21d7c6 = _0x509cad('upgradeMap'), _0x21e5b6 = _0x21d7c6.find(_0x49e17c => _0x49e17c.class === _0x52cf38), _0x497761 = {
                'progress': Math.min(_0x3d286b / _0x21e5b6.expRequired * 100, 100),
                'currClass': _0x3837ec(_0x50d5c9),
                'nextClass': _0x3837ec(_0x52cf38)
            }, _0x592785 = {
                ok: true,
                message: ''
            };
        ;
        ;
        ;
        const _0x4bca93 = {
            data: _0x497761,
            meta: _0x592785
        };
        ;
        ;
        _0x3e1d57(_0x4bca93);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:getContractCreatorInfo', async (_0x25dbeb, _0x3d05f8) => {
        const _0x237e4d = await RPC.execute('vrp-boosting:server:getContractCreatorInfo'), _0x2ee3e3 = {
                data: _0x237e4d.data,
                meta: {}
            };
        ;
        ;
        _0x2ee3e3.meta.ok = _0x237e4d.success;
        _0x2ee3e3.meta.message = '';
        _0x3d05f8(_0x2ee3e3);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:createContract', async (_0x3cf003, _0x41aa80) => {
        const _0x4f160b = await RPC.execute('vrp-boosting:server:createContract', _0x3cf003.info), _0x79d57b = {
                data: _0x4f160b.data,
                meta: {}
            };
        ;
        ;
        _0x79d57b.meta.ok = _0x4f160b.success;
        _0x79d57b.meta.message = _0x4f160b.message;
        _0x41aa80(_0x79d57b);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:fetchPuppetAccessInfo', async (_0x150429, _0x5ed483) => {
        const _0x297430 = await RPC.execute('vrp-boosting:server:fetchPuppetAccessInfo', _0x150429.character.id), _0x10bec5 = {
                data: _0x297430.info,
                meta: {}
            };
        ;
        ;
        _0x10bec5.meta.ok = _0x297430.success;
        _0x10bec5.meta.message = _0x297430.message;
        _0x5ed483(_0x10bec5);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:isCharPuppet', async (_0x3eddd7, _0x1e93c4) => {
        const _0x16c601 = await RPC.execute('vrp-boosting:server:isCharPuppet', _0x3eddd7.character.id), _0x5a72dc = {
                ok: true,
                message: 'ok'
            };
        ;
        ;
        ;
        const _0x34568e = {
            data: _0x16c601 && _0x3916fd,
            meta: _0x5a72dc
        };
        ;
        ;
        _0x1e93c4(_0x34568e);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:togglePuppetQueue', async (_0x5aec41, _0x58d0bc) => {
        const _0x2e01aa = await RPC.execute('vrp-boosting:server:togglePuppetQueue', _0x5aec41.character.id, _0x5aec41.toggle), _0xec2df0 = {
                data: _0x2e01aa.info,
                meta: {}
            };
        ;
        ;
        _0xec2df0.meta.ok = _0x2e01aa.success;
        _0xec2df0.meta.message = _0x2e01aa.message;
        _0x58d0bc(_0xec2df0);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:puppetBlockPlayer', async (_0x13d694, _0xa0097b) => {
        const _0x51262a = await RPC.execute('vrp-boosting:server:puppetBlockPlayer', _0x13d694.stateId, _0x13d694.type), _0x50857a = {
                data: _0x51262a.info,
                meta: {}
            };
        ;
        ;
        _0x50857a.meta.ok = _0x51262a.success;
        _0x50857a.meta.message = _0x51262a.message;
        _0xa0097b(_0x50857a);
        ;
    });
    ;
    let _0x1797dd = false, _0x5a7f9d = [], _0x3f22e8 = null;
    RegisterUICallback('vrp-boosting:ui:displayActivePickups', (_0x2d4a52, _0x2115ee) => {
        const _0x15466a = {
            ok: true,
            message: ''
        };
        ;
        ;
        ;
        const _0x44c4a7 = {
            data: null,
            meta: _0x15466a
        };
        ;
        ;
        _0x2115ee(_0x44c4a7);
        ;
        if (!_0x2d4a52.toggle) {
            clearInterval(_0x3f22e8);
            _0x1797dd = false;
            _0x5a7f9d.forEach(_0x2e831e => RemoveBlip(_0x2e831e));
            ;
            return;
        }
        _0x1797dd = true;
        _0x3f22e8 = +setInterval(async () => {
            ;
            _0x5a7f9d.forEach(_0x242aad => RemoveBlip(_0x242aad));
            if (!_0x1797dd) {
                return clearInterval(_0x3f22e8);
            }
            const _0x4c2e37 = await RPC.execute('vrp-boosting:server:fetchActivePickups', _0x2d4a52.toggle, _0x2d4a52.type), _0x25d8ea = [];
            _0x4c2e37.pickups.forEach(_0x4de356 => {
                const _0x271f35 = AddBlipForRadius(_0x4de356.coords.x, _0x4de356.coords.y, _0x4de356.coords.z, _0x4f40e7.vehicleBlipAreaRadius);
                SetBlipAlpha(_0x271f35, 90);
                SetBlipSprite(_0x271f35, 9);
                SetBlipColour(_0x271f35, 18);
                _0x25d8ea.push(_0x271f35);
                ;
            });
            const _0x3ea399 = _0x509cad('blipInfo');
            _0x4c2e37.contractedVehicles.forEach(_0x552b1b => {
                const _0x4daf63 = _0x3ea399.puppettracker, _0x560003 = AddBlipForCoord(_0x552b1b.x, _0x552b1b.y, _0x552b1b.z);
                SetBlipSprite(_0x560003, _0x4daf63.icon);
                SetBlipDisplay(_0x560003, 2);
                SetBlipScale(_0x560003, _0x4daf63.scale);
                SetBlipColour(_0x560003, _0x4daf63.color);
                SetBlipAsShortRange(_0x560003, true);
                BeginTextCommandSetBlipName('STRING');
                AddTextComponentString(_0x4daf63.text);
                EndTextCommandSetBlipName(_0x560003);
                _0x25d8ea.push(_0x560003);
                ;
            });
            _0x5a7f9d = _0x25d8ea;
            ;
        }, 5000);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:isPuppetBlipsEnabled', (_0x305d79, _0x54d587) => {
        const _0x403612 = {
            ok: true,
            message: ''
        };
        ;
        ;
        ;
        const _0x25e364 = {
            data: _0x1797dd,
            meta: _0x403612
        };
        ;
        ;
        _0x54d587(_0x25e364);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:hasWarehouseAccess', async (_0x5c5bb8, _0x503bff) => {
        ;
        const _0x4850dd = await RPC.execute('vrp-boosting:s2:isS2LocationUnlocked'), _0x1e6c07 = {
                ok: true,
                message: ''
            };
        ;
        ;
        ;
        const _0x2ade94 = {
            data: _0x4850dd,
            meta: _0x1e6c07
        };
        ;
        ;
        _0x503bff(_0x2ade94);
        ;
    });
    RegisterUICallback('vrp-boosting:ui:markWarehouseLocation', (_0x16a230, _0x55b94c) => {
        ;
        const [_0x168619, _0x2659f7] = _0x347901('vrp-boosting:s2', 'garageExitCoords');
        SetNewWaypoint(_0x168619, _0x2659f7);
        const _0x299f6b = {
            ok: true,
            message: ''
        };
        ;
        ;
        ;
        const _0x567ed9 = {
            data: true,
            meta: _0x299f6b
        };
        ;
        ;
        _0x55b94c(_0x567ed9);
        ;
    });
    ;
    ;
    RPC.register('vrp-boosting:client:fetchRacingAlias', () => {
        const _0x1348ca = _0x1cb0d8.g.exports['vrp-racing'].getHasRaceUsbAndAlias(), _0xd225ea = _0x1348ca.has_usb_racing && _0x1348ca.racingAlias;
        return _0xd225ea ? _0x1348ca.racingAlias : null;
    });
    ;
    async function _0x371de6() {
        ;
        await _0x5c38d7();
        await _0x22ef15();
        await _0x41771c();
        _0x3a69f6.InitEvents();
        await _0x4f6c87();
        await _0x41b3a6();
        await _0x151bb7();
        await _0x2c8b3c();
        ;
    }
    ;
    class _0x5e7c58 {
        constructor() {
            ;
            this.pickupBlips = new Map();
            this.dropoffBlips = new Map();
            this.trackerBlips = new Map();
            ;
        }
        ['InitEvents']() {
            ;
            onNet('vrp-boosting:client:addBlip', (_0x2445ff, _0x745ba4, _0x593b41) => {
                ;
                this.addBlip(_0x2445ff, _0x745ba4, _0x593b41);
            });
            onNet('vrp-boosting:client:removeBlip', (_0x26c0fd, _0x5ef158) => {
                ;
                this.removeBlip(_0x26c0fd, _0x5ef158);
            });
            onNet('vrp-boosting:client:updateBlip', (_0x40efbb, _0x563829) => {
                ;
                this.updateBlip(_0x40efbb, _0x563829);
            });
            ;
        }
        ['addBlip'](_0x33efe5, _0x3ac54a, _0x5b4400) {
            ;
            const _0x5b1063 = _0x509cad('blipInfo'), _0x517e29 = _0x5b1063[_0x3ac54a];
            let _0xb24173;
            if (_0x517e29.radius) {
                const _0x5ae753 = {
                    'x': _0x5f11e9.getRandomNumber(50, 130),
                    'y': _0x5f11e9.getRandomNumber(50, 130)
                };
                _0xb24173 = AddBlipForRadius(_0x5b4400.x + _0x5ae753.x, _0x5b4400.y + _0x5ae753.y, _0x5b4400.z, _0x517e29.radius);
                SetBlipAlpha(_0xb24173, 90);
                SetBlipSprite(_0xb24173, _0x517e29.icon);
                SetBlipColour(_0xb24173, _0x517e29.color);
                ;
            } else {
                _0xb24173 = AddBlipForCoord(_0x5b4400.x, _0x5b4400.y, _0x5b4400.z);
                SetBlipSprite(_0xb24173, _0x517e29.icon);
                SetBlipDisplay(_0xb24173, 2);
                SetBlipScale(_0xb24173, _0x517e29.scale);
                SetBlipColour(_0xb24173, _0x517e29.color);
                SetBlipAsShortRange(_0xb24173, true);
                BeginTextCommandSetBlipName('STRING');
                AddTextComponentString(_0x517e29.text);
                EndTextCommandSetBlipName(_0xb24173);
                ;
            }
            switch (_0x3ac54a) {
            case 'pickup':
                if (this.pickupBlips.has(_0x33efe5)) {
                    this.removeBlip(_0x33efe5, _0x3ac54a);
                }
                this.pickupBlips.set(_0x33efe5, _0xb24173);
                break;
            case 'dropoff':
                this.dropoffBlips.set(_0x33efe5, _0xb24173);
                break;
            case 'tracker':
                this.trackerBlips.set(_0x33efe5, _0xb24173);
                break;
            default:
                console.log('[BOOSTING] - ' + _0x3ac54a + ' blip is not supported!');
                break;
            }
            return true;
        }
        ['removeBlip'](_0x3fe3cb, _0x5e04cd) {
            ;
            switch (_0x5e04cd) {
            case 'pickup': {
                    const _0x4b6786 = this.pickupBlips.get(_0x3fe3cb);
                    if (!_0x4b6786) {
                        return;
                    }
                    RemoveBlip(_0x4b6786);
                    this.pickupBlips.delete(_0x3fe3cb);
                    ;
                    break;
                }
            case 'dropoff': {
                    const _0x46bd57 = this.dropoffBlips.get(_0x3fe3cb);
                    if (!_0x46bd57) {
                        return;
                    }
                    RemoveBlip(_0x46bd57);
                    this.dropoffBlips.delete(_0x3fe3cb);
                    ;
                    break;
                }
            case 'tracker': {
                    const _0x457534 = this.trackerBlips.get(_0x3fe3cb);
                    if (!_0x457534) {
                        return;
                    }
                    RemoveBlip(_0x457534);
                    this.trackerBlips.delete(_0x3fe3cb);
                    ;
                    break;
                }
            default:
                console.log('[BOOSTING] - ' + _0x5e04cd + ' blip is not supported!');
                break;
            }
            return;
        }
        ['updateBlip'](_0x19fb52, _0x5b447d) {
            const _0x4c067d = this.trackerBlips.get(_0x19fb52);
            if (!_0x4c067d) {
                return this.addBlip(_0x19fb52, 'tracker', _0x5b447d);
            }
            return SetBlipCoords(_0x4c067d, _0x5b447d.x, _0x5b447d.y, _0x5b447d.z), SetNewWaypoint(_0x5b447d.x, _0x5b447d.y), true;
        }
    }
    ;
    let _0x29b8ae = null;
    const _0x3a69f6 = new _0x5e7c58(), _0x45118d = _0xf1eb4d => {
            _0x29b8ae = _0xf1eb4d;
        };
    on('onClientResourceStart', async _0x22a861 => {
        if (_0x22a861 !== GetCurrentResourceName()) {
            return;
        }
        await _0x371de6();
    });
    on('onClientResourceStop', async _0x42aadd => {
        ;
        if (_0x42aadd !== GetCurrentResourceName()) {
            return;
        }
        emit('vrp-boosting:client:setBoostCompletions', 0);
    });
    ;
})());
;