const Promises = new Map(), Resource = GetCurrentResourceName();

let CallIdentifier = 0;
function TriggerNetEvent(pName, pSource, ...params) {
    const payload = msgpack_pack(params);
    payload.length < 5000 ? TriggerClientEventInternal(pName, pSource, payload, payload.length) : TriggerLatentClientEventInternal(pName, pSource, payload, payload.length, 128000);
}

function ParamPacker(...params) {
    const pack = [];
    for (let i = 0; i < params.length; i += 1) {
        pack[i] = { 'param': params[i] };
    }
    return pack;
}

function UnPacker(params) {
    const packs = [];
    return params.forEach(pEach => packs.push(pEach.param)), packs;
}

async function rpcRegister(pName, pFunction) {
    onNet('rpc:request:' + pName, async function (origin, callID, params, packaged) {
        const src = source
        let pCallback;
        packaged && (params = UnPacker(params));
        try {
            pCallback = await pFunction(src, ...params);
        } catch (_0x12cd75) {
            emit('rpc:client:error', Resource, origin, pName, _0x12cd75.message);
        }
        if (typeof pCallback === 'undefined') {
            pCallback = [];
        } else {
            packaged && (pCallback = ParamPacker(pCallback));
        }
        TriggerNetEvent('rpc:response', src, origin, callID, pCallback, packaged);
    });
}

async function rpcExecute(pName, pSource, ...params) {
    const callID = CallIdentifier;
    CallIdentifier++;
    const _0x57c5fb = new Promise((resolve, reject) => {
        Promises.set(callID, {
            'resolve': resolve,
            'reject': reject
        });
    });
    TriggerNetEvent('rpc:request:' + pName, pSource, Resource, callID, params, false);
    const _0x5de8f3 = new Promise(resolve => {
        setTimeout(() => {
            if (Promises.has(callID)) {
                Promises.delete(callID);
            }
            return resolve(false);
        }, 31000);
    });
    return await Promise.race([
        _0x57c5fb,
        _0x5de8f3
    ]);
}

const RPC = {
    'register': rpcRegister,
    'execute': rpcExecute
};

onNet('rpc:response', (origin, callID, params, packaged) => {
    Resource === origin && Promises.has(callID) && (packaged && (params = UnPacker(params)), Promises.get(callID).resolve(params), Promises.delete(callID));
});