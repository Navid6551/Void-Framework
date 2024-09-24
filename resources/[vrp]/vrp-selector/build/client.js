(() => {
  var _0x48c639 = {
    313: _0x252fb0 => {
      var _0x247ccc = function () {
        'use strict';

        function _0x1c9cdb(_0x408722, _0x4c227d) {
          return _0x4c227d != null && _0x408722 instanceof _0x4c227d;
        }
        var _0x2e1a5a;
        try {
          _0x2e1a5a = Map;
        } catch (_0x2dfcfd) {
          _0x2e1a5a = function () {};
        }
        var _0xeec72c;
        try {
          _0xeec72c = Set;
        } catch (_0x16c1cf) {
          _0xeec72c = function () {};
        }
        var _0xc196a;
        try {
          _0xc196a = Promise;
        } catch (_0x4595d1) {
          _0xc196a = function () {};
        }
        function _0x274ad9(_0x4569d5, _0x5b3628, _0x215d71, _0xc97597, _0x3c55bb) {
          if (typeof _0x5b3628 === "object") {
            _0x215d71 = _0x5b3628.depth;
            _0xc97597 = _0x5b3628.prototype;
            _0x3c55bb = _0x5b3628.includeNonEnumerable;
            _0x5b3628 = _0x5b3628.circular;
          }
          var _0x174c89 = [];
          var _0x5b0f78 = [];
          var _0x268303 = typeof Buffer != "undefined";
          if (typeof _0x5b3628 == "undefined") {
            _0x5b3628 = true;
          }
          if (typeof _0x215d71 == "undefined") {
            _0x215d71 = Infinity;
          }
          function _0x5d6074(_0x203639, _0x2ffe8c) {
            if (_0x203639 === null) {
              return null;
            }
            if (_0x2ffe8c === 0) {
              return _0x203639;
            }
            var _0x4ea3a3;
            var _0x12c777;
            if (typeof _0x203639 != "object") {
              return _0x203639;
            }
            if (_0x1c9cdb(_0x203639, _0x2e1a5a)) {
              _0x4ea3a3 = new _0x2e1a5a();
            } else if (_0x1c9cdb(_0x203639, _0xeec72c)) {
              _0x4ea3a3 = new _0xeec72c();
            } else if (_0x1c9cdb(_0x203639, _0xc196a)) {
              _0x4ea3a3 = new _0xc196a(function (_0x3dd44f, _0x34520b) {
                _0x203639.then(function (_0x421266) {
                  _0x3dd44f(_0x5d6074(_0x421266, _0x2ffe8c - 1));
                }, function (_0x2d457b) {
                  _0x34520b(_0x5d6074(_0x2d457b, _0x2ffe8c - 1));
                });
              });
            } else if (_0x274ad9.__isArray(_0x203639)) {
              _0x4ea3a3 = [];
            } else if (_0x274ad9.__isRegExp(_0x203639)) {
              _0x4ea3a3 = new RegExp(_0x203639.source, _0x201323(_0x203639));
              if (_0x203639.lastIndex) {
                _0x4ea3a3.lastIndex = _0x203639.lastIndex;
              }
            } else if (_0x274ad9.__isDate(_0x203639)) {
              _0x4ea3a3 = new Date(_0x203639.getTime());
            } else if (_0x268303 && Buffer.isBuffer(_0x203639)) {
              if (Buffer.allocUnsafe) {
                _0x4ea3a3 = Buffer.allocUnsafe(_0x203639.length);
              } else {
                _0x4ea3a3 = new Buffer(_0x203639.length);
              }
              _0x203639.copy(_0x4ea3a3);
              return _0x4ea3a3;
            } else if (_0x1c9cdb(_0x203639, Error)) {
              _0x4ea3a3 = Object.create(_0x203639);
            } else if (typeof _0xc97597 == "undefined") {
              _0x12c777 = Object.getPrototypeOf(_0x203639);
              _0x4ea3a3 = Object.create(_0x12c777);
            } else {
              _0x4ea3a3 = Object.create(_0xc97597);
              _0x12c777 = _0xc97597;
            }
            if (_0x5b3628) {
              var _0x14ceeb = _0x174c89.indexOf(_0x203639);
              if (_0x14ceeb != -1) {
                return _0x5b0f78[_0x14ceeb];
              }
              _0x174c89.push(_0x203639);
              _0x5b0f78.push(_0x4ea3a3);
            }
            if (_0x1c9cdb(_0x203639, _0x2e1a5a)) {
              _0x203639.forEach(function (_0x3ec750, _0x60dd3) {
                var _0x2da694 = _0x5d6074(_0x60dd3, _0x2ffe8c - 1);
                var _0x5799bb = _0x5d6074(_0x3ec750, _0x2ffe8c - 1);
                _0x4ea3a3.set(_0x2da694, _0x5799bb);
              });
            }
            if (_0x1c9cdb(_0x203639, _0xeec72c)) {
              _0x203639.forEach(function (_0x287696) {
                var _0x23766a = _0x5d6074(_0x287696, _0x2ffe8c - 1);
                _0x4ea3a3.add(_0x23766a);
              });
            }
            for (var _0x4fb4bb in _0x203639) {
              var _0x4a08a4;
              if (_0x12c777) {
                _0x4a08a4 = Object.getOwnPropertyDescriptor(_0x12c777, _0x4fb4bb);
              }
              if (_0x4a08a4 && _0x4a08a4.set == null) {
                continue;
              }
              _0x4ea3a3[_0x4fb4bb] = _0x5d6074(_0x203639[_0x4fb4bb], _0x2ffe8c - 1);
            }
            if (Object.getOwnPropertySymbols) {
              var _0x5641ea = Object.getOwnPropertySymbols(_0x203639);
              for (var _0x4fb4bb = 0; _0x4fb4bb < _0x5641ea.length; _0x4fb4bb++) {
                var _0x27a50d = _0x5641ea[_0x4fb4bb];
                var _0x266694 = Object.getOwnPropertyDescriptor(_0x203639, _0x27a50d);
                if (_0x266694 && !_0x266694.enumerable && !_0x3c55bb) {
                  continue;
                }
                _0x4ea3a3[_0x27a50d] = _0x5d6074(_0x203639[_0x27a50d], _0x2ffe8c - 1);
                if (!_0x266694.enumerable) {
                  Object.defineProperty(_0x4ea3a3, _0x27a50d, {
                    enumerable: false
                  });
                }
              }
            }
            if (_0x3c55bb) {
              var _0x1f6f47 = Object.getOwnPropertyNames(_0x203639);
              for (var _0x4fb4bb = 0; _0x4fb4bb < _0x1f6f47.length; _0x4fb4bb++) {
                var _0x577391 = _0x1f6f47[_0x4fb4bb];
                var _0x266694 = Object.getOwnPropertyDescriptor(_0x203639, _0x577391);
                if (_0x266694 && _0x266694.enumerable) {
                  continue;
                }
                _0x4ea3a3[_0x577391] = _0x5d6074(_0x203639[_0x577391], _0x2ffe8c - 1);
                Object.defineProperty(_0x4ea3a3, _0x577391, {
                  enumerable: false
                });
              }
            }
            return _0x4ea3a3;
          }
          return _0x5d6074(_0x4569d5, _0x215d71);
        }
        _0x274ad9.clonePrototype = function _0x119224(_0x443fad) {
          if (_0x443fad === null) {
            return null;
          }
          function _0x3e5f94() {}
          _0x3e5f94.prototype = _0x443fad;
          return new _0x3e5f94();
        };
        function _0x46614a(_0x47c6ff) {
          return Object.prototype.toString.call(_0x47c6ff);
        }
        _0x274ad9.__objToStr = _0x46614a;
        function _0x4a93ef(_0x3eff81) {
          return typeof _0x3eff81 === "object" && _0x46614a(_0x3eff81) === "[object Date]";
        }
        _0x274ad9.__isDate = _0x4a93ef;
        function _0x4c933f(_0x4d8dd5) {
          return typeof _0x4d8dd5 === "object" && _0x46614a(_0x4d8dd5) === "[object Array]";
        }
        _0x274ad9.__isArray = _0x4c933f;
        function _0x2e00f6(_0x5d4a29) {
          return typeof _0x5d4a29 === "object" && _0x46614a(_0x5d4a29) === "[object RegExp]";
        }
        _0x274ad9.__isRegExp = _0x2e00f6;
        function _0x201323(_0x39ff86) {
          var _0x27a57d = "";
          if (_0x39ff86.global) {
            _0x27a57d += "g";
          }
          if (_0x39ff86.ignoreCase) {
            _0x27a57d += "i";
          }
          if (_0x39ff86.multiline) {
            _0x27a57d += "m";
          }
          return _0x27a57d;
        }
        _0x274ad9.__getRegExpFlags = _0x201323;
        return _0x274ad9;
      }();
      if (true && _0x252fb0.exports) {
        _0x252fb0.exports = _0x247ccc;
      }
    },
    187: _0x286d40 => {
      'use strict';

      var _0x2a7936 = typeof Reflect === "object" ? Reflect : null;
      var _0x4affc7 = _0x2a7936 && typeof _0x2a7936.apply === "function" ? _0x2a7936.apply : function _0x434266(_0x183903, _0x9bc6de, _0x127b0f) {
        return Function.prototype.apply.call(_0x183903, _0x9bc6de, _0x127b0f);
      };
      var _0x1afa46;
      if (_0x2a7936 && typeof _0x2a7936.ownKeys === "function") {
        _0x1afa46 = _0x2a7936.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        _0x1afa46 = function _0x46a682(_0x1a9e60) {
          return Object.getOwnPropertyNames(_0x1a9e60).concat(Object.getOwnPropertySymbols(_0x1a9e60));
        };
      } else {
        _0x1afa46 = function _0x189f77(_0x3fe7ec) {
          return Object.getOwnPropertyNames(_0x3fe7ec);
        };
      }
      function _0x29e57e(_0x32000b) {
        if (console && console.warn) {
          console.warn(_0x32000b);
        }
      }
      var _0x484cbc = Number.isNaN || function _0x4d10dd(_0x49730d) {
        return _0x49730d !== _0x49730d;
      };
      function _0x13e5c5() {
        _0x13e5c5.init.call(this);
      }
      _0x286d40.exports = _0x13e5c5;
      _0x286d40.exports.once = _0xb4fe60;
      _0x13e5c5.EventEmitter = _0x13e5c5;
      _0x13e5c5.prototype._events = undefined;
      _0x13e5c5.prototype._eventsCount = 0;
      _0x13e5c5.prototype._maxListeners = undefined;
      var _0x237a76 = 10;
      function _0x46f66d(_0x386c95) {
        if (typeof _0x386c95 !== "function") {
          throw new TypeError("The \"listener\" argument must be of type Function. Received type " + typeof _0x386c95);
        }
      }
      Object.defineProperty(_0x13e5c5, "defaultMaxListeners", {
        enumerable: true,
        get: function () {
          return _0x237a76;
        },
        set: function (_0x1eac6a) {
          if (typeof _0x1eac6a !== "number" || _0x1eac6a < 0 || _0x484cbc(_0x1eac6a)) {
            throw new RangeError("The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + _0x1eac6a + ".");
          }
          _0x237a76 = _0x1eac6a;
        }
      });
      _0x13e5c5.init = function () {
        if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || undefined;
      };
      _0x13e5c5.prototype.setMaxListeners = function _0x1290ee(_0x378274) {
        if (typeof _0x378274 !== "number" || _0x378274 < 0 || _0x484cbc(_0x378274)) {
          throw new RangeError("The value of \"n\" is out of range. It must be a non-negative number. Received " + _0x378274 + ".");
        }
        this._maxListeners = _0x378274;
        return this;
      };
      function _0x587386(_0x43a059) {
        if (_0x43a059._maxListeners === undefined) {
          return _0x13e5c5.defaultMaxListeners;
        }
        return _0x43a059._maxListeners;
      }
      _0x13e5c5.prototype.getMaxListeners = function _0x1c342f() {
        return _0x587386(this);
      };
      _0x13e5c5.prototype.emit = function _0x2ddeee(_0x10f469) {
        var _0x26cd2f = [];
        for (var _0x3eacbc = 1; _0x3eacbc < arguments.length; _0x3eacbc++) {
          _0x26cd2f.push(arguments[_0x3eacbc]);
        }
        var _0x2d8e46 = _0x10f469 === "error";
        var _0x39fe5a = this._events;
        if (_0x39fe5a !== undefined) {
          _0x2d8e46 = _0x2d8e46 && _0x39fe5a.error === undefined;
        } else if (!_0x2d8e46) {
          return false;
        }
        if (_0x2d8e46) {
          var _0x29b4b4;
          if (_0x26cd2f.length > 0) {
            _0x29b4b4 = _0x26cd2f[0];
          }
          if (_0x29b4b4 instanceof Error) {
            throw _0x29b4b4;
          }
          var _0x2718b8 = new Error("Unhandled error." + (_0x29b4b4 ? " (" + _0x29b4b4.message + ")" : ""));
          _0x2718b8.context = _0x29b4b4;
          throw _0x2718b8;
        }
        var _0x45f9fc = _0x39fe5a[_0x10f469];
        if (_0x45f9fc === undefined) {
          return false;
        }
        if (typeof _0x45f9fc === "function") {
          _0x4affc7(_0x45f9fc, this, _0x26cd2f);
        } else {
          var _0xaea888 = _0x45f9fc.length;
          var _0x342214 = _0x3d078d(_0x45f9fc, _0xaea888);
          for (var _0x3eacbc = 0; _0x3eacbc < _0xaea888; ++_0x3eacbc) {
            _0x4affc7(_0x342214[_0x3eacbc], this, _0x26cd2f);
          }
        }
        return true;
      };
      function _0x336a89(_0x46d314, _0x33ad76, _0x3966a2, _0x1fd0af) {
        var _0x27a56a;
        var _0xf2dc31;
        var _0x3e8ca2;
        _0x46f66d(_0x3966a2);
        _0xf2dc31 = _0x46d314._events;
        if (_0xf2dc31 === undefined) {
          _0xf2dc31 = _0x46d314._events = Object.create(null);
          _0x46d314._eventsCount = 0;
        } else {
          if (_0xf2dc31.newListener !== undefined) {
            _0x46d314.emit("newListener", _0x33ad76, _0x3966a2.listener ? _0x3966a2.listener : _0x3966a2);
            _0xf2dc31 = _0x46d314._events;
          }
          _0x3e8ca2 = _0xf2dc31[_0x33ad76];
        }
        if (_0x3e8ca2 === undefined) {
          _0x3e8ca2 = _0xf2dc31[_0x33ad76] = _0x3966a2;
          ++_0x46d314._eventsCount;
        } else {
          if (typeof _0x3e8ca2 === "function") {
            _0x3e8ca2 = _0xf2dc31[_0x33ad76] = _0x1fd0af ? [_0x3966a2, _0x3e8ca2] : [_0x3e8ca2, _0x3966a2];
          } else if (_0x1fd0af) {
            _0x3e8ca2.unshift(_0x3966a2);
          } else {
            _0x3e8ca2.push(_0x3966a2);
          }
          _0x27a56a = _0x587386(_0x46d314);
          if (_0x27a56a > 0 && _0x3e8ca2.length > _0x27a56a && !_0x3e8ca2.warned) {
            _0x3e8ca2.warned = true;
            var _0xf3c681 = new Error("Possible EventEmitter memory leak detected. " + _0x3e8ca2.length + " " + String(_0x33ad76) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            _0xf3c681.name = "MaxListenersExceededWarning";
            _0xf3c681.emitter = _0x46d314;
            _0xf3c681.type = _0x33ad76;
            _0xf3c681.count = _0x3e8ca2.length;
            _0x29e57e(_0xf3c681);
          }
        }
        return _0x46d314;
      }
      _0x13e5c5.prototype.addListener = function _0x5c5c8a(_0x143575, _0x179a44) {
        return _0x336a89(this, _0x143575, _0x179a44, false);
      };
      _0x13e5c5.prototype.on = _0x13e5c5.prototype.addListener;
      _0x13e5c5.prototype.prependListener = function _0x31b560(_0x2cdcf7, _0x56890d) {
        return _0x336a89(this, _0x2cdcf7, _0x56890d, true);
      };
      function _0x153cfe() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0) {
            return this.listener.call(this.target);
          }
          return this.listener.apply(this.target, arguments);
        }
      }
      function _0xb5884c(_0x46b90f, _0x873d70, _0x5afa8a) {
        var _0x1ab94c = {
          fired: false,
          wrapFn: undefined,
          target: _0x46b90f,
          type: _0x873d70,
          listener: _0x5afa8a
        };
        var _0x3afbd9 = _0x1ab94c;
        var _0x561152 = _0x153cfe.bind(_0x3afbd9);
        _0x561152.listener = _0x5afa8a;
        _0x3afbd9.wrapFn = _0x561152;
        return _0x561152;
      }
      _0x13e5c5.prototype.once = function _0x182c7c(_0x47d139, _0x5d3b2c) {
        _0x46f66d(_0x5d3b2c);
        this.on(_0x47d139, _0xb5884c(this, _0x47d139, _0x5d3b2c));
        return this;
      };
      _0x13e5c5.prototype.prependOnceListener = function _0x54a570(_0x4cf21e, _0x31adf7) {
        _0x46f66d(_0x31adf7);
        this.prependListener(_0x4cf21e, _0xb5884c(this, _0x4cf21e, _0x31adf7));
        return this;
      };
      _0x13e5c5.prototype.removeListener = function _0x10c7e7(_0x47f21f, _0x4c46f3) {
        var _0x3c421a;
        var _0xe50979;
        var _0x157544;
        var _0x1048ee;
        var _0x21d4a4;
        _0x46f66d(_0x4c46f3);
        _0xe50979 = this._events;
        if (_0xe50979 === undefined) {
          return this;
        }
        _0x3c421a = _0xe50979[_0x47f21f];
        if (_0x3c421a === undefined) {
          return this;
        }
        if (_0x3c421a === _0x4c46f3 || _0x3c421a.listener === _0x4c46f3) {
          if (--this._eventsCount === 0) {
            this._events = Object.create(null);
          } else {
            delete _0xe50979[_0x47f21f];
            if (_0xe50979.removeListener) {
              this.emit("removeListener", _0x47f21f, _0x3c421a.listener || _0x4c46f3);
            }
          }
        } else if (typeof _0x3c421a !== "function") {
          _0x157544 = -1;
          for (_0x1048ee = _0x3c421a.length - 1; _0x1048ee >= 0; _0x1048ee--) {
            if (_0x3c421a[_0x1048ee] === _0x4c46f3 || _0x3c421a[_0x1048ee].listener === _0x4c46f3) {
              _0x21d4a4 = _0x3c421a[_0x1048ee].listener;
              _0x157544 = _0x1048ee;
              break;
            }
          }
          if (_0x157544 < 0) {
            return this;
          }
          if (_0x157544 === 0) {
            _0x3c421a.shift();
          } else {
            _0x439a9a(_0x3c421a, _0x157544);
          }
          if (_0x3c421a.length === 1) {
            _0xe50979[_0x47f21f] = _0x3c421a[0];
          }
          if (_0xe50979.removeListener !== undefined) {
            this.emit("removeListener", _0x47f21f, _0x21d4a4 || _0x4c46f3);
          }
        }
        return this;
      };
      _0x13e5c5.prototype.off = _0x13e5c5.prototype.removeListener;
      _0x13e5c5.prototype.removeAllListeners = function _0x4e062b(_0x272548) {
        var _0x1a7414;
        var _0x4f7b11;
        var _0x3ec402;
        _0x4f7b11 = this._events;
        if (_0x4f7b11 === undefined) {
          return this;
        }
        if (_0x4f7b11.removeListener === undefined) {
          if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          } else if (_0x4f7b11[_0x272548] !== undefined) {
            if (--this._eventsCount === 0) {
              this._events = Object.create(null);
            } else {
              delete _0x4f7b11[_0x272548];
            }
          }
          return this;
        }
        if (arguments.length === 0) {
          var _0x3e28d8 = Object.keys(_0x4f7b11);
          var _0x50eeb5;
          for (_0x3ec402 = 0; _0x3ec402 < _0x3e28d8.length; ++_0x3ec402) {
            _0x50eeb5 = _0x3e28d8[_0x3ec402];
            if (_0x50eeb5 === "removeListener") {
              continue;
            }
            this.removeAllListeners(_0x50eeb5);
          }
          this.removeAllListeners("removeListener");
          this._events = Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        _0x1a7414 = _0x4f7b11[_0x272548];
        if (typeof _0x1a7414 === "function") {
          this.removeListener(_0x272548, _0x1a7414);
        } else if (_0x1a7414 !== undefined) {
          for (_0x3ec402 = _0x1a7414.length - 1; _0x3ec402 >= 0; _0x3ec402--) {
            this.removeListener(_0x272548, _0x1a7414[_0x3ec402]);
          }
        }
        return this;
      };
      function _0xc6ddda(_0x5949cc, _0x515aba, _0x4f4d48) {
        var _0x3fd206 = _0x5949cc._events;
        if (_0x3fd206 === undefined) {
          return [];
        }
        var _0x27d175 = _0x3fd206[_0x515aba];
        if (_0x27d175 === undefined) {
          return [];
        }
        if (typeof _0x27d175 === "function") {
          if (_0x4f4d48) {
            return [_0x27d175.listener || _0x27d175];
          } else {
            return [_0x27d175];
          }
        }
        if (_0x4f4d48) {
          return _0x3fdd96(_0x27d175);
        } else {
          return _0x3d078d(_0x27d175, _0x27d175.length);
        }
      }
      _0x13e5c5.prototype.listeners = function _0x4097be(_0x16701a) {
        return _0xc6ddda(this, _0x16701a, true);
      };
      _0x13e5c5.prototype.rawListeners = function _0xef15d8(_0x219f54) {
        return _0xc6ddda(this, _0x219f54, false);
      };
      _0x13e5c5.listenerCount = function (_0x33a67b, _0x10f38e) {
        if (typeof _0x33a67b.listenerCount === "function") {
          return _0x33a67b.listenerCount(_0x10f38e);
        } else {
          return _0x56a123.call(_0x33a67b, _0x10f38e);
        }
      };
      _0x13e5c5.prototype.listenerCount = _0x56a123;
      function _0x56a123(_0x1614e1) {
        var _0x3cefd1 = this._events;
        if (_0x3cefd1 !== undefined) {
          var _0x1b7698 = _0x3cefd1[_0x1614e1];
          if (typeof _0x1b7698 === "function") {
            return 1;
          } else if (_0x1b7698 !== undefined) {
            return _0x1b7698.length;
          }
        }
        return 0;
      }
      _0x13e5c5.prototype.eventNames = function _0x50bf9a() {
        if (this._eventsCount > 0) {
          return _0x1afa46(this._events);
        } else {
          return [];
        }
      };
      function _0x3d078d(_0x588cbb, _0x17c4c3) {
        var _0x7c1485 = new Array(_0x17c4c3);
        for (var _0x5b06ae = 0; _0x5b06ae < _0x17c4c3; ++_0x5b06ae) {
          _0x7c1485[_0x5b06ae] = _0x588cbb[_0x5b06ae];
        }
        return _0x7c1485;
      }
      function _0x439a9a(_0x48f1ed, _0x38bfbf) {
        for (; _0x38bfbf + 1 < _0x48f1ed.length; _0x38bfbf++) {
          _0x48f1ed[_0x38bfbf] = _0x48f1ed[_0x38bfbf + 1];
        }
        _0x48f1ed.pop();
      }
      function _0x3fdd96(_0x1d2f3b) {
        var _0x17b6f1 = new Array(_0x1d2f3b.length);
        for (var _0x578f2a = 0; _0x578f2a < _0x17b6f1.length; ++_0x578f2a) {
          _0x17b6f1[_0x578f2a] = _0x1d2f3b[_0x578f2a].listener || _0x1d2f3b[_0x578f2a];
        }
        return _0x17b6f1;
      }
      function _0xb4fe60(_0x3f770b, _0x32a735) {
        return new Promise(function (_0x53bdcd, _0x190bb3) {
          function _0x345a02(_0x4411cf) {
            _0x3f770b.removeListener(_0x32a735, _0x9b5ecd);
            _0x190bb3(_0x4411cf);
          }
          function _0x9b5ecd() {
            if (typeof _0x3f770b.removeListener === "function") {
              _0x3f770b.removeListener("error", _0x345a02);
            }
            _0x53bdcd([].slice.call(arguments));
          }
          ;
          _0xa0e0be(_0x3f770b, _0x32a735, _0x9b5ecd, {
            once: true
          });
          if (_0x32a735 !== "error") {
            _0x5a2414(_0x3f770b, _0x345a02, {
              once: true
            });
          }
        });
      }
      function _0x5a2414(_0x3996a4, _0x1b66ca, _0x3f3ff3) {
        if (typeof _0x3996a4.on === "function") {
          _0xa0e0be(_0x3996a4, "error", _0x1b66ca, _0x3f3ff3);
        }
      }
      function _0xa0e0be(_0x287fb7, _0x5bdd89, _0x3b92f3, _0x2f8295) {
        if (typeof _0x287fb7.on === "function") {
          if (_0x2f8295.once) {
            _0x287fb7.once(_0x5bdd89, _0x3b92f3);
          } else {
            _0x287fb7.on(_0x5bdd89, _0x3b92f3);
          }
        } else if (typeof _0x287fb7.addEventListener === "function") {
          _0x287fb7.addEventListener(_0x5bdd89, function _0xdf1aad(_0x2a818d) {
            if (_0x2f8295.once) {
              _0x287fb7.removeEventListener(_0x5bdd89, _0xdf1aad);
            }
            _0x3b92f3(_0x2a818d);
          });
        } else {
          throw new TypeError("The \"emitter\" argument must be of type EventEmitter. Received type " + typeof _0x287fb7);
        }
      }
    },
    321: function (_0x2675cb, _0x4f6650, _0xf304a2) {
      (function () {
        var _0x1d8486;
        _0x1d8486 = _0x2675cb.exports = _0xf304a2(282);
        _0x1d8486.version = "5.1.2";
      }).call(this);
    },
    282: function (_0x50ec92, _0x58d09d, _0x24370c) {
      (function () {
        var _0x2cfc86;
        var _0x245f23;
        var _0x34b54a;
        var _0x468cd8 = [].splice;
        function _0x45259f(_0x6c517f, _0x1b84d2) {
          if (!(_0x6c517f instanceof _0x1b84d2)) {
            throw new Error("Bound instance method accessed before binding");
          }
        }
        var _0x276d13 = [].indexOf;
        _0x34b54a = _0x24370c(313);
        _0x2cfc86 = _0x24370c(187).EventEmitter;
        _0x50ec92.exports = _0x245f23 = function () {
          class _0x5db3ab extends _0x2cfc86 {
            constructor(_0x917b50 = {}) {
              super();
              this.get = this.get.bind(this);
              this.mget = this.mget.bind(this);
              this.set = this.set.bind(this);
              this.mset = this.mset.bind(this);
              this.del = this.del.bind(this);
              this.take = this.take.bind(this);
              this.ttl = this.ttl.bind(this);
              this.getTtl = this.getTtl.bind(this);
              this.keys = this.keys.bind(this);
              this.has = this.has.bind(this);
              this.getStats = this.getStats.bind(this);
              this.flushAll = this.flushAll.bind(this);
              this.flushStats = this.flushStats.bind(this);
              this.close = this.close.bind(this);
              this._checkData = this._checkData.bind(this);
              this._check = this._check.bind(this);
              this._isInvalidKey = this._isInvalidKey.bind(this);
              this._wrap = this._wrap.bind(this);
              this._getValLength = this._getValLength.bind(this);
              this._error = this._error.bind(this);
              this._initErrors = this._initErrors.bind(this);
              this.options = _0x917b50;
              this._initErrors();
              this.data = {};
              var _0x3df6af = {
                forceString: false,
                objectValueSize: 80,
                promiseValueSize: 80,
                arrayValueSize: 40,
                stdTTL: 0,
                checkperiod: 600,
                useClones: true,
                deleteOnExpire: true,
                enableLegacyCallbacks: false,
                maxKeys: -1
              };
              this.options = Object.assign(_0x3df6af, this.options);
              if (this.options.enableLegacyCallbacks) {
                console.warn("WARNING! node-cache legacy callback support will drop in v6.x");
                ["get", "mget", "set", "del", "ttl", "getTtl", "keys", "has"].forEach(_0x1b8a96 => {
                  var _0xc738ad;
                  _0xc738ad = this[_0x1b8a96];
                  this[_0x1b8a96] = function (..._0x2835d9) {
                    var _0x36ab7a;
                    var _0x4324ac;
                    var _0x5f47dd;
                    var _0xb7327b;
                    _0x5f47dd = _0x2835d9;
                    [..._0x2835d9] = _0x5f47dd;
                    [_0x36ab7a] = _0x468cd8.call(_0x2835d9, -1);
                    if (typeof _0x36ab7a === "function") {
                      try {
                        _0xb7327b = _0xc738ad(..._0x2835d9);
                        _0x36ab7a(null, _0xb7327b);
                      } catch (_0x6de19d) {
                        _0x4324ac = _0x6de19d;
                        _0x36ab7a(_0x4324ac);
                      }
                    } else {
                      return _0xc738ad(..._0x2835d9, _0x36ab7a);
                    }
                  };
                });
              }
              this.stats = {
                hits: 0,
                misses: 0,
                keys: 0,
                ksize: 0,
                vsize: 0
              };
              this.validKeyTypes = ["string", "number"];
              this._checkData();
              return;
            }
            get(_0x164566) {
              var _0x566fc2;
              var _0x14ce90;
              _0x45259f(this, _0x5db3ab);
              if ((_0x14ce90 = this._isInvalidKey(_0x164566)) != null) {
                throw _0x14ce90;
              }
              if (this.data[_0x164566] != null && this._check(_0x164566, this.data[_0x164566])) {
                this.stats.hits++;
                _0x566fc2 = this._unwrap(this.data[_0x164566]);
                return _0x566fc2;
              } else {
                this.stats.misses++;
                return undefined;
              }
            }
            mget(_0x5e3f06) {
              var _0x20584b;
              var _0x4ac203;
              var _0x3690a5;
              var _0x59463d;
              var _0x4929df;
              var _0x5dea8b;
              _0x45259f(this, _0x5db3ab);
              if (!Array.isArray(_0x5e3f06)) {
                _0x20584b = this._error("EKEYSTYPE");
                throw _0x20584b;
              }
              _0x5dea8b = {};
              _0x3690a5 = 0;
              _0x4929df = _0x5e3f06.length;
              for (; _0x3690a5 < _0x4929df; _0x3690a5++) {
                _0x59463d = _0x5e3f06[_0x3690a5];
                if ((_0x4ac203 = this._isInvalidKey(_0x59463d)) != null) {
                  throw _0x4ac203;
                }
                if (this.data[_0x59463d] != null && this._check(_0x59463d, this.data[_0x59463d])) {
                  this.stats.hits++;
                  _0x5dea8b[_0x59463d] = this._unwrap(this.data[_0x59463d]);
                } else {
                  this.stats.misses++;
                }
              }
              return _0x5dea8b;
            }
            set(_0x36d0c2, _0x5a5860, _0x229dec) {
              var _0x328ae5;
              var _0x3e2138;
              var _0x57fac1;
              _0x45259f(this, _0x5db3ab);
              if (this.options.maxKeys > -1 && this.stats.keys >= this.options.maxKeys) {
                _0x328ae5 = this._error("ECACHEFULL");
                throw _0x328ae5;
              }
              if (this.options.forceString && !typeof _0x5a5860 === "string") {
                _0x5a5860 = JSON.stringify(_0x5a5860);
              }
              if (_0x229dec == null) {
                _0x229dec = this.options.stdTTL;
              }
              if ((_0x3e2138 = this._isInvalidKey(_0x36d0c2)) != null) {
                throw _0x3e2138;
              }
              _0x57fac1 = false;
              if (this.data[_0x36d0c2]) {
                _0x57fac1 = true;
                this.stats.vsize -= this._getValLength(this._unwrap(this.data[_0x36d0c2], false));
              }
              this.data[_0x36d0c2] = this._wrap(_0x5a5860, _0x229dec);
              this.stats.vsize += this._getValLength(_0x5a5860);
              if (!_0x57fac1) {
                this.stats.ksize += this._getKeyLength(_0x36d0c2);
                this.stats.keys++;
              }
              this.emit("set", _0x36d0c2, _0x5a5860);
              return true;
            }
            mset(_0xf911d7) {
              var _0x41d55f;
              var _0x5b3a7b;
              var _0x7d2c3f;
              var _0x297be4;
              var _0x55a783;
              var _0x2d6337;
              var _0x5616d5;
              var _0x5d8ea0;
              var _0x6fce16;
              var _0x4b43dd;
              _0x45259f(this, _0x5db3ab);
              if (this.options.maxKeys > -1 && this.stats.keys + _0xf911d7.length >= this.options.maxKeys) {
                _0x41d55f = this._error("ECACHEFULL");
                throw _0x41d55f;
              }
              _0x7d2c3f = 0;
              _0x5616d5 = _0xf911d7.length;
              for (; _0x7d2c3f < _0x5616d5; _0x7d2c3f++) {
                _0x2d6337 = _0xf911d7[_0x7d2c3f];
                ({
                  key: _0x55a783,
                  val: _0x4b43dd,
                  ttl: _0x6fce16
                } = _0x2d6337);
                if (_0x6fce16 && typeof _0x6fce16 !== "number") {
                  _0x41d55f = this._error("ETTLTYPE");
                  throw _0x41d55f;
                }
                if ((_0x5b3a7b = this._isInvalidKey(_0x55a783)) != null) {
                  throw _0x5b3a7b;
                }
              }
              _0x297be4 = 0;
              _0x5d8ea0 = _0xf911d7.length;
              for (; _0x297be4 < _0x5d8ea0; _0x297be4++) {
                _0x2d6337 = _0xf911d7[_0x297be4];
                ({
                  key: _0x55a783,
                  val: _0x4b43dd,
                  ttl: _0x6fce16
                } = _0x2d6337);
                this.set(_0x55a783, _0x4b43dd, _0x6fce16);
              }
              return true;
            }
            del(_0x4b227d) {
              var _0x276135;
              var _0x4428d1;
              var _0x15af00;
              var _0x37c1eb;
              var _0x394177;
              var _0x1442df;
              _0x45259f(this, _0x5db3ab);
              if (!Array.isArray(_0x4b227d)) {
                _0x4b227d = [_0x4b227d];
              }
              _0x276135 = 0;
              _0x15af00 = 0;
              _0x394177 = _0x4b227d.length;
              for (; _0x15af00 < _0x394177; _0x15af00++) {
                _0x37c1eb = _0x4b227d[_0x15af00];
                if ((_0x4428d1 = this._isInvalidKey(_0x37c1eb)) != null) {
                  throw _0x4428d1;
                }
                if (this.data[_0x37c1eb] != null) {
                  this.stats.vsize -= this._getValLength(this._unwrap(this.data[_0x37c1eb], false));
                  this.stats.ksize -= this._getKeyLength(_0x37c1eb);
                  this.stats.keys--;
                  _0x276135++;
                  _0x1442df = this.data[_0x37c1eb];
                  delete this.data[_0x37c1eb];
                  this.emit("del", _0x37c1eb, _0x1442df.v);
                }
              }
              return _0x276135;
            }
            take(_0x3b5578) {
              var _0x44bdd5;
              _0x45259f(this, _0x5db3ab);
              _0x44bdd5 = this.get(_0x3b5578);
              if (_0x44bdd5 != null) {
                this.del(_0x3b5578);
              }
              return _0x44bdd5;
            }
            ttl(_0x2bce33, _0x565254) {
              var _0xa63e33;
              _0x45259f(this, _0x5db3ab);
              _0x565254 ||= this.options.stdTTL;
              if (!_0x2bce33) {
                return false;
              }
              if ((_0xa63e33 = this._isInvalidKey(_0x2bce33)) != null) {
                throw _0xa63e33;
              }
              if (this.data[_0x2bce33] != null && this._check(_0x2bce33, this.data[_0x2bce33])) {
                if (_0x565254 >= 0) {
                  this.data[_0x2bce33] = this._wrap(this.data[_0x2bce33].v, _0x565254, false);
                } else {
                  this.del(_0x2bce33);
                }
                return true;
              } else {
                return false;
              }
            }
            getTtl(_0xf20104) {
              var _0x3d826e;
              var _0x1ff1d5;
              _0x45259f(this, _0x5db3ab);
              if (!_0xf20104) {
                return undefined;
              }
              if ((_0x1ff1d5 = this._isInvalidKey(_0xf20104)) != null) {
                throw _0x1ff1d5;
              }
              if (this.data[_0xf20104] != null && this._check(_0xf20104, this.data[_0xf20104])) {
                _0x3d826e = this.data[_0xf20104].t;
                return _0x3d826e;
              } else {
                return undefined;
              }
            }
            keys() {
              var _0x3cd4d8;
              _0x45259f(this, _0x5db3ab);
              _0x3cd4d8 = Object.keys(this.data);
              return _0x3cd4d8;
            }
            has(_0x5edd37) {
              var _0x1d0ee6;
              _0x45259f(this, _0x5db3ab);
              _0x1d0ee6 = this.data[_0x5edd37] != null && this._check(_0x5edd37, this.data[_0x5edd37]);
              return _0x1d0ee6;
            }
            getStats() {
              _0x45259f(this, _0x5db3ab);
              return this.stats;
            }
            flushAll(_0x77ece6 = true) {
              _0x45259f(this, _0x5db3ab);
              this.data = {};
              this.stats = {
                hits: 0,
                misses: 0,
                keys: 0,
                ksize: 0,
                vsize: 0
              };
              this._killCheckPeriod();
              this._checkData(_0x77ece6);
              this.emit("flush");
            }
            flushStats() {
              _0x45259f(this, _0x5db3ab);
              this.stats = {
                hits: 0,
                misses: 0,
                keys: 0,
                ksize: 0,
                vsize: 0
              };
              this.emit("flush_stats");
            }
            close() {
              _0x45259f(this, _0x5db3ab);
              this._killCheckPeriod();
            }
            _checkData(_0x575be2 = true) {
              var _0x3aae6c;
              var _0x65b8c6;
              var _0x486006;
              _0x45259f(this, _0x5db3ab);
              _0x65b8c6 = this.data;
              for (_0x3aae6c in _0x65b8c6) {
                _0x486006 = _0x65b8c6[_0x3aae6c];
                this._check(_0x3aae6c, _0x486006);
              }
              if (_0x575be2 && this.options.checkperiod > 0) {
                this.checkTimeout = setTimeout(this._checkData, this.options.checkperiod * 1000, _0x575be2);
                if (this.checkTimeout != null && this.checkTimeout.unref != null) {
                  this.checkTimeout.unref();
                }
              }
            }
            _killCheckPeriod() {
              if (this.checkTimeout != null) {
                return clearTimeout(this.checkTimeout);
              }
            }
            _check(_0x2b4fd4, _0x549644) {
              var _0x32d5bb;
              _0x45259f(this, _0x5db3ab);
              _0x32d5bb = true;
              if (_0x549644.t !== 0 && _0x549644.t < Date.now()) {
                if (this.options.deleteOnExpire) {
                  _0x32d5bb = false;
                  this.del(_0x2b4fd4);
                }
                this.emit("expired", _0x2b4fd4, this._unwrap(_0x549644));
              }
              return _0x32d5bb;
            }
            _isInvalidKey(_0x2ac77a) {
              var _0x3ee401;
              _0x45259f(this, _0x5db3ab);
              _0x3ee401 = typeof _0x2ac77a;
              if (_0x276d13.call(this.validKeyTypes, _0x3ee401) < 0) {
                var _0x55446a = {
                  type: typeof _0x2ac77a
                };
                return this._error("EKEYTYPE", _0x55446a);
              }
            }
            _wrap(_0x24ab8c, _0x2d06dd, _0x4f8d6f = true) {
              var _0xff5d2d;
              var _0x283ac0;
              var _0x3d163a;
              var _0x15d8a3;
              _0x45259f(this, _0x5db3ab);
              if (!this.options.useClones) {
                _0x4f8d6f = false;
              }
              _0x283ac0 = Date.now();
              _0xff5d2d = 0;
              _0x15d8a3 = 1000;
              if (_0x2d06dd === 0) {
                _0xff5d2d = 0;
              } else if (_0x2d06dd) {
                _0xff5d2d = _0x283ac0 + _0x2d06dd * _0x15d8a3;
              } else if (this.options.stdTTL === 0) {
                _0xff5d2d = this.options.stdTTL;
              } else {
                _0xff5d2d = _0x283ac0 + this.options.stdTTL * _0x15d8a3;
              }
              return _0x3d163a = {
                t: _0xff5d2d,
                v: _0x4f8d6f ? _0x34b54a(_0x24ab8c) : _0x24ab8c
              };
            }
            _unwrap(_0x3847db, _0x2f5708 = true) {
              if (!this.options.useClones) {
                _0x2f5708 = false;
              }
              if (_0x3847db.v != null) {
                if (_0x2f5708) {
                  return _0x34b54a(_0x3847db.v);
                } else {
                  return _0x3847db.v;
                }
              }
              return null;
            }
            _getKeyLength(_0x198137) {
              return _0x198137.toString().length;
            }
            _getValLength(_0x5bf45d) {
              _0x45259f(this, _0x5db3ab);
              if (typeof _0x5bf45d === "string") {
                return _0x5bf45d.length;
              } else if (this.options.forceString) {
                return JSON.stringify(_0x5bf45d).length;
              } else if (Array.isArray(_0x5bf45d)) {
                return this.options.arrayValueSize * _0x5bf45d.length;
              } else if (typeof _0x5bf45d === "number") {
                return 8;
              } else if (typeof (_0x5bf45d != null ? _0x5bf45d.then : undefined) === "function") {
                return this.options.promiseValueSize;
              } else if (typeof Buffer !== "undefined" && Buffer !== null ? Buffer.isBuffer(_0x5bf45d) : undefined) {
                return _0x5bf45d.length;
              } else if (_0x5bf45d != null && typeof _0x5bf45d === "object") {
                return this.options.objectValueSize * Object.keys(_0x5bf45d).length;
              } else if (typeof _0x5bf45d === "boolean") {
                return 8;
              } else {
                return 0;
              }
            }
            _error(_0x17ec61, _0x36e230 = {}) {
              var _0x37162a;
              _0x45259f(this, _0x5db3ab);
              _0x37162a = new Error();
              _0x37162a.name = _0x17ec61;
              _0x37162a.errorcode = _0x17ec61;
              _0x37162a.message = this.ERRORS[_0x17ec61] != null ? this.ERRORS[_0x17ec61](_0x36e230) : "-";
              _0x37162a.data = _0x36e230;
              return _0x37162a;
            }
            _initErrors() {
              var _0x4bde61;
              var _0x4e2513;
              var _0x48f8e3;
              _0x45259f(this, _0x5db3ab);
              this.ERRORS = {};
              _0x48f8e3 = this._ERRORS;
              for (_0x4e2513 in _0x48f8e3) {
                _0x4bde61 = _0x48f8e3[_0x4e2513];
                this.ERRORS[_0x4e2513] = this.createErrorMessage(_0x4bde61);
              }
            }
            createErrorMessage(_0x32346e) {
              return function (_0x76dfe7) {
                return _0x32346e.replace("__key", _0x76dfe7.type);
              };
            }
          }
          ;
          _0x5db3ab.prototype._ERRORS = {
            ENOTFOUND: "Key `__key` not found",
            ECACHEFULL: "Cache max keys amount exceeded",
            EKEYTYPE: "The key argument has to be of type `string` or `number`. Found: `__key`",
            EKEYSTYPE: "The keys argument has to be an array.",
            ETTLTYPE: "The ttl argument has to be a number."
          };
          return _0x5db3ab;
        }.call(this);
      }).call(this);
    }
  };
  var _0x30f4d7 = {};
  function _0x4efb2a(_0x4dd481) {
    var _0x50186e = _0x30f4d7[_0x4dd481];
    if (_0x50186e !== undefined) {
      return _0x50186e.exports;
    }
    var _0x2ce3c9 = _0x30f4d7[_0x4dd481] = {
      exports: {}
    };
    _0x48c639[_0x4dd481].call(_0x2ce3c9.exports, _0x2ce3c9, _0x2ce3c9.exports, _0x4efb2a);
    return _0x2ce3c9.exports;
  }
  (() => {
    _0x4efb2a.n = _0x3fe550 => {
      var _0x103676 = _0x3fe550 && _0x3fe550.__esModule ? () => _0x3fe550.default : () => _0x3fe550;
      _0x4efb2a.d(_0x103676, {
        a: _0x103676
      });
      return _0x103676;
    };
  })();
  (() => {
    _0x4efb2a.d = (_0x140bb0, _0x55955a) => {
      for (var _0x16ab92 in _0x55955a) {
        if (_0x4efb2a.o(_0x55955a, _0x16ab92) && !_0x4efb2a.o(_0x140bb0, _0x16ab92)) {
          Object.defineProperty(_0x140bb0, _0x16ab92, {
            enumerable: true,
            get: _0x55955a[_0x16ab92]
          });
        }
      }
    };
  })();
  (() => {
    _0x4efb2a.g = function () {
      if (typeof globalThis === "object") {
        return globalThis;
      }
      try {
        return this || new Function("return this")();
      } catch (_0x3b1682) {
        if (typeof window === "object") {
          return window;
        }
      }
    }();
  })();
  (() => {
    _0x4efb2a.o = (_0x5247e0, _0x20deae) => Object.prototype.hasOwnProperty.call(_0x5247e0, _0x20deae);
  })();
  var _0x4e9540 = {};
  (() => {
    'use strict';

    var _0xde9b86 = _0x4efb2a(321);
    var _0x54e691 = _0x4efb2a.n(_0xde9b86);
    let _0x3c9721 = null;
    let _0x59a5de = null;
    let _0x5eec1f = null;
    let _0x5112a6 = null;
    const _0x3a3cd3 = new _0xde9b86({
      stdTTL: 1
    });
    const _0x3ab8ab = (_0x3b38f7, _0x266c16) => {
      if (!_0x3a3cd3.has(_0x3b38f7)) {
        _0x3a3cd3.set(_0x3b38f7, _0x266c16());
      }
      return _0x3a3cd3.get(_0x3b38f7);
    };
    const _0x46ddb2 = (_0x4d791d, _0x5a0004) => {
      const _0x10808b = GetGameplayCamCoord();
      const [_0x2d7bcb,, _0x1772ab] = GetGameplayCamRot(0).map(_0x3ebb1b => Math.PI / 180 * _0x3ebb1b);
      const _0x4d047a = Math.abs(Math.cos(_0x2d7bcb));
      const _0x5645e6 = [-Math.sin(_0x1772ab) * _0x4d047a, Math.cos(_0x1772ab) * _0x4d047a, Math.sin(_0x2d7bcb)];
      const _0x454b90 = _0x5645e6.map((_0x33dd34, _0x228a57) => _0x10808b[_0x228a57] + _0x33dd34);
      const _0x4da736 = _0x5645e6.map((_0x2686ec, _0x25b81c) => _0x10808b[_0x25b81c] + _0x2686ec * 200);
      const _0x3d1253 = StartShapeTestSweptSphere(_0x454b90[0], _0x454b90[1], _0x454b90[2], _0x4da736[0], _0x4da736[1], _0x4da736[2], 0.2, _0x4d791d, _0x5a0004, 7);
      return GetShapeTestResult(_0x3d1253);
    };
    const _0x1432be = (_0x55a031, _0x88ef8d) => {
      _0x5eec1f = _0x55a031;
      _0x5112a6 = _0x88ef8d;
    };
    const _0x2c96bc = () => _0x59a5de !== null;
    const _0x39a55e = (_0x1cd3bc, _0x6f87f6) => _0x3ab8ab("entity:" + _0x1cd3bc, () => {
      const _0x2d90e1 = GetEntityType(_0x1cd3bc);
      if (_0x2d90e1 === 0) {
        return {
          type: 0,
          model: null,
          size: null,
          valid: false
        };
      }
      const _0x1ae298 = GetEntityModel(_0x1cd3bc);
      const [[_0x4ef59e, _0x53e6c1], [_0x4b601a, _0x5765f7]] = GetModelDimensions(_0x1ae298);
      const _0x1ed740 = Math.max(_0x4b601a - _0x4ef59e, _0x5765f7 - _0x53e6c1);
      const _0x18c6a0 = _0x6f87f6(_0x1cd3bc, _0x2d90e1, _0x1ae298);
      var _0xc6153b = {
        type: _0x2d90e1,
        model: _0x1ae298,
        size: _0x1ed740,
        valid: _0x18c6a0
      };
      return _0xc6153b;
    });
    const _0x5ebc4b = (_0x268f3b, _0x360cd6, _0x53240f, _0x2a2e8f = true) => {
      _0x56b956(false);
      if (!_0x3c9721) {
        _0x3c9721 = setTick(() => {
          if (_0x5eec1f) {
            if (!DoesEntityExist(_0x5eec1f)) {
              _0x56b956();
              return;
            }
            const {
              size: _0x149af7,
              valid: _0x1ed235
            } = _0x39a55e(_0x5eec1f, _0x53240f);
            if (!_0x1ed235) {
              _0x56b956();
              return;
            }
            const [_0x5e60fd, _0x4e8ba5, _0x4b39bb] = GetEntityCoords(_0x5eec1f, true);
            const [_0x1f77d7, _0x95cac4] = GetGroundZFor_3dCoord(_0x5e60fd, _0x4e8ba5, _0x4b39bb + 1, false);
            DrawMarker(1, _0x5e60fd, _0x4e8ba5, _0x1f77d7 ? _0x95cac4 : _0x4b39bb, 0, 0, 0, 0, 0, 0, _0x149af7, _0x149af7, 0.4, 0, 255, 0, 150, false, false, 2, false, null, null, false);
            return;
          }
          if (_0x2a2e8f && _0x5112a6) {
            DrawMarker(1, ..._0x5112a6, 0, 0, 0, 0, 0, 0, 0.4, 0.4, 0.3, 0, 0, 255, 150, false, false, 2, false, null, null, false);
          }
        });
      }
      _0x59a5de = setTick(() => {
        const [, _0x2d299f, _0x902476,, _0x54abc7] = _0x46ddb2(_0x268f3b, _0x360cd6);
        const {
          valid: _0x17ab4b
        } = _0x39a55e(_0x54abc7, _0x53240f);
        if (_0x17ab4b) {
          _0x1432be(_0x54abc7, null);
          return;
        }
        ;
        _0x1432be(null, _0x2d299f ? _0x902476 : null);
      });
    };
    const _0x4db9e2 = () => {
      if (_0x59a5de) {
        clearTick(_0x59a5de);
        _0x59a5de = null;
        const _0x2a806f = _0x5aa7e3();
        emit("vrp-selector:selectionChanged", _0x2a806f);
        return _0x2a806f;
      }
    };
    const _0x56b956 = (_0x4cc048 = true) => {
      _0x4db9e2();
      clearTick(_0x3c9721);
      _0x3c9721 = null;
      _0x1432be(null, null);
      if (_0x4cc048) {
        emit("vrp-selector:selectionChanged", _0x5aa7e3());
      }
    };
    const _0x5aa7e3 = () => ({
      selectedCoords: _0x5112a6,
      selectedEntity: _0x5eec1f
    });
    _0x4efb2a.g.exports("startSelecting", _0x5ebc4b);
    _0x4efb2a.g.exports("stopSelecting", _0x4db9e2);
    _0x4efb2a.g.exports("getCurrentSelection", _0x5aa7e3);
    _0x4efb2a.g.exports("isSelecting", _0x2c96bc);
    _0x4efb2a.g.exports("deselect", _0x56b956);
  })();
})();
