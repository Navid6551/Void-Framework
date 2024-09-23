/// <reference types="../types/general" />

const GlobalState = SetStateBag('global');
const StateBags = new Map();

const EXT_ENTITY = 41;
const EXT_PLAYER = 42;

declare const msgpack_pack: any;

export function SetStateBag(name: any): any {
    const isServer = IsDuplicityVersion();

    return new Proxy(
        {},
        {
            get(target, prop: string): any {
                if (prop === 'set') {
                    return (key: any, values: any, replicated: boolean) => {
                        const valuesPayload = msgpack_pack(values);
                        SetStateBagValue(name, key, valuesPayload, valuesPayload.length, replicated);
                    };
                }

                console.log("get", name, prop);
                console.log("GetStateBagValue", GetStateBagValue(name, "state"))

                return GetStateBagValue(name, "state");
            },
            set(target, prop: string, value: any): any {
                console.log("set", name, prop, value);

                const payload = msgpack_pack(value);

                //console.log('SetStateBag', name, prop, payload, payload.length);

                //console.log(JSON.stringify(value));

                //console.log(SetStateBagValue(name, prop, payload, payload.length, isServer))

                SetStateBagValue(name, prop, payload, payload.length, isServer);
                
                return true;
            },
        },
    );
}

export function GetStateBag(pEntity: any) {
    if (!StateBags.has(pEntity)) {
        const stateBag = Entity(pEntity);
        setTimeout(() => StateBags.delete(pEntity), 30000);
        return stateBag;
    }
    return StateBags.get(pEntity);
}

function Entity(ent: any) {
    if (typeof ent === 'number') {
        return new Proxy({ __data: ent }, entityTM);
    }

    return ent;
};

const entityTM = {
    get(target: any, prop: string) {
        if (prop === 'state') {
            const name = `entity:${NetworkGetNetworkIdFromEntity(target.__data)}`;

            if (IsDuplicityVersion()) {
                EnsureEntityStateBag(target.__data);
            }

            return SetStateBag(name);
        }

        return null;
    },

    set() {
        throw new Error('Not allowed at this time.');
    },

    __ext: EXT_ENTITY,
};

function Player(ent: number | string) {
    if (typeof ent === 'number' || typeof ent === 'string') {
        return new Proxy({ __data: Number(ent) }, playerTM);
    }

    return ent;
};

const playerTM = {
    get(target: any, prop: string) {
        if (prop === 'state') {
            let playerId = target.__data;

            if (playerId === -1) {
                playerId = GetPlayerServerId(PlayerId());
            }

            const name = `player:${playerId}`;

            return SetStateBag(name);
        }

        return null;
    },

    set() {
        throw new Error('Not allowed at this time.');
    },

    __ext: EXT_PLAYER,
};