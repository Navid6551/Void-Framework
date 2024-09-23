// import {__privateAdd, __privateSet, __privateGet} from 'nopixel-sdk'
// import { Utils } from '../../../shared/utils';
// import { hashing_default } from '../../../shared/hashing';

// var _hashing;
// var controller_default = class {
//   constructor() {
//     __privateAdd(this, _hashing, void 0);
//     const ResourceName2 = GetCurrentResourceName();
//     const convarId = Utils.getStringHash(`__npx_sdk:${ResourceName2}:token`);
//     const token = GetConvar(convarId, "");
//     __privateSet(this, _hashing, new hashing_default(token, "0x5A213B8F"));
//   }
//   on(event, callback) {
//     const hash = __privateGet(this, _hashing).hashString(event);
//     return on(hash, callback);
//   }
//   onNet(event, callback) {
//     const hash = __privateGet(this, _hashing).hashString(event);
//     onNet(hash, callback);
//     const hashCompressed = __privateGet(this, _hashing).hashString(`${event}-c`);
//     onNet(hashCompressed, (payload) => {
//     //   const decompressed = Utils.inflate(payload);
//     //   const unpacked = msgpack_unpack(decompressed);
//       return callback(...payload);
//     });
//   }
//   emit(event, ...args) {
//     const hash = __privateGet(this, _hashing).hashString(event);
//     return emit(hash, ...args);
//   }
//   emitNet(event, ...args) {
//     let payload = msgpack_pack(args);
//     let byteLength = payload.length;
//     const hash = __privateGet(this, _hashing).hashString(event);
//     if (byteLength < 16e3) {
//       TriggerServerEventInternal(hash, payload, payload.length);
//     } else {
//       TriggerLatentServerEventInternal(hash, payload, payload.length, 128e3);
//     }
//   }
// };
// _hashing = new WeakMap();