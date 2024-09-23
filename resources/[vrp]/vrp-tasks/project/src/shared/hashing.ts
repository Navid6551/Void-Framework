// import {__privateAdd, __privateMethod, __privateSet, __privateGet} from 'nopixel-sdk'
// import { Logger } from './logger';
// import * as import_crypto_js from 'crypto-js'

// var _H, _I, _O, _cache, _hashKey, hashKey_get, _decodeKey, decodeKey_get, _encodeKey, encodeKey_get, _encodeBase64, encodeBase64_fn, _decodeBase64, decodeBase64_fn, _encodeAES, encodeAES_fn, _decodeAES, decodeAES_fn, _generateKey, generateKey_fn;
// export const hashing_default = class {
//   constructor(pToken, pSecret) {
//     __privateAdd(this, _hashKey);
//     __privateAdd(this, _decodeKey);
//     __privateAdd(this, _encodeKey);
//     __privateAdd(this, _encodeBase64);
//     __privateAdd(this, _decodeBase64);
//     __privateAdd(this, _encodeAES);
//     __privateAdd(this, _decodeAES);
//     __privateAdd(this, _generateKey);
//     __privateAdd(this, _H, void 0);
//     __privateAdd(this, _I, void 0);
//     __privateAdd(this, _O, void 0);
//     __privateAdd(this, _cache, {});
//     const token = __privateMethod(this, _decodeBase64, decodeBase64_fn).call(this, pToken);
//     const decoded = __privateMethod(this, _decodeAES, decodeAES_fn).call(this, token, pSecret);
//     const [h, i, o] = decoded.split(":");
//     __privateSet(this, _H, h);
//     __privateSet(this, _I, i);
//     __privateSet(this, _O, o);
//   }
//   hashString(string) {
//     var _a;
//     const key = __privateGet(this, _hashKey, hashKey_get);
//     const cache = (_a = __privateGet(this, _cache)[key]) == null ? void 0 : _a[string];
//     if (cache)
//       return cache;
//     if (!__privateGet(this, _cache)[key])
//       __privateGet(this, _cache)[key] = {};
//     const hash = __privateMethod(this, _encodeBase64, encodeBase64_fn).call(this, (0, import_crypto_js.HmacMD5)(string, key).toString());
//     __privateGet(this, _cache)[key][string] = hash;
//     if (IsDuplicityVersion()) {
//       Logger.log(`[YCT] Hash Debug | Event: ${string} | Hash: ${hash}`);
//     }
//     return hash;
//   }
//   encode(payload) {
//     let encoded;
//     const key = __privateGet(this, _encodeKey, encodeKey_get);
//     try {
//       encoded = __privateMethod(this, _encodeAES, encodeAES_fn).call(this, JSON.stringify(payload), key);
//     } catch (e) {
//       Logger.error("Failed to encode payload");
//     }
//     return encoded;
//   }
//   decode(payload) {
//     let decoded;
//     const key = __privateGet(this, _decodeKey, decodeKey_get);
//     try {
//       decoded = JSON.parse(__privateMethod(this, _decodeAES, decodeAES_fn).call(this, payload, key));
//     } catch (e) {
//       Logger.error("Failed to decode payload");
//     }
//     return decoded;
//   }
// };
// _H = new WeakMap();
// _I = new WeakMap();
// _O = new WeakMap();
// _cache = new WeakMap();
// _hashKey = new WeakSet();
// hashKey_get = function() {
//   var _a;
//   return (_a = __privateGet(this, _H)) != null ? _a : __privateMethod(this, _generateKey, generateKey_fn).call(this);
// };
// _decodeKey = new WeakSet();
// decodeKey_get = function() {
//   var _a;
//   return (_a = __privateGet(this, _I)) != null ? _a : __privateMethod(this, _generateKey, generateKey_fn).call(this);
// };
// _encodeKey = new WeakSet();
// encodeKey_get = function() {
//   var _a;
//   return (_a = __privateGet(this, _O)) != null ? _a : __privateMethod(this, _generateKey, generateKey_fn).call(this);
// };
// _encodeBase64 = new WeakSet();
// encodeBase64_fn = function(payload) {
//   if (typeof payload !== "string")
//     return "";
//   return import_crypto_js.enc.Base64.stringify(import_crypto_js.enc.Utf8.parse(payload));
// };
// _decodeBase64 = new WeakSet();
// decodeBase64_fn = function(payload) {
//   if (typeof payload !== "string")
//     return "";
//   return import_crypto_js.enc.Utf8.stringify(import_crypto_js.enc.Base64.parse(payload));
// };
// _encodeAES = new WeakSet();
// encodeAES_fn = function(payload, passphrase) {
//   if (typeof payload !== "string" || typeof passphrase !== "string")
//     return "";
//   return import_crypto_js.AES.encrypt(payload, passphrase).toString();
// };
// _decodeAES = new WeakSet();
// decodeAES_fn = function(payload, passphrase) {
//   if (typeof payload !== "string" || typeof passphrase !== "string")
//     return "";
//   return import_crypto_js.AES.decrypt(payload, passphrase).toString(import_crypto_js.enc.Utf8);
// };
// _generateKey = new WeakSet();
// generateKey_fn = function(length = 128) {
//   return import_crypto_js.lib.WordArray.random(length / 8).toString(import_crypto_js.enc.Utf8);
// };