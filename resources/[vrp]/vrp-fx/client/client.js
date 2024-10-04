(() => {
    'use strict';

    let mainConfig = exports['vrp-config'].GetModuleConfig('main');
    const configMap = new Map();
    const currentResource = GetCurrentResourceName();
    const entitySoundsMap = new Map();

    on('vrp-config:configLoaded', (moduleName, moduleConfig) => {
        if (moduleName === 'main') {
            mainConfig = moduleConfig;
        } else if (configMap.has(moduleName)) {
            configMap.set(moduleName, moduleConfig);
        }
    });

    function getConfigValue(_0x452ca3) {
        return mainConfig[_0x452ca3];
    }

    function getModuleConfig(pModule, pKey) {
        if (!configMap.has(pModule)) {
            const moduleConfig = exports['vrp-config'].GetModuleConfig(pModule);
            if (moduleConfig === undefined)
                return;
            configMap.set(pModule, moduleConfig);
        }
        const map = configMap.get(pModule);
        return pKey ? map === null || map === void 0 ? void 0 : map[pKey] : map;
    }
    
    function getResourceConfig(_0x57dfdb) {
        return getModuleConfig(currentResource, _0x57dfdb);
    }

    async function Delay(timeout) {
        return new Promise(_0x3b7e5e => setTimeout(() => _0x3b7e5e(), timeout));
    }
    
    let currentPlaying;
    async function playEntitySound(pEntity, pSoundName, pReference = 0, pIdk = 0, pMoreName) {
        const pFullName = ('' + (pReference !== 0 ? pReference + '/' : '') + pMoreName).toLowerCase();
        if (pMoreName && pMoreName !== currentPlaying) {
            let timedout = false;
            setTimeout(() => timedout = true, 10000);
            while (!RequestScriptAudioBank(pFullName, false) && !timedout) {
                await Delay(0);
            }
            currentPlaying = pFullName;
        }
        const soundId = globalThis.GetSoundId();
        const soundArray = entitySoundsMap.get(entityId) !== null && entitySoundsMap.get(entityId) !== undefined ? entitySoundsMap.get(entityId) : []
        soundArray.push(soundId);
        entitySoundsMap.set(pEntity, soundArray);
        globalThis.PlaySoundFromEntity(soundId, pSoundName, pEntity, pReference, false, pIdk);
        return soundId;
    }
    
    exports('PlayEntitySound', playEntitySound);

    function stopEntitySound(pEntity, pSoundId) {
        const soundArray = entitySoundsMap.get(pEntity);
        if (soundArray === undefined){
            return
        }
          
        const soundIndex = soundArray.findIndex(_0x4cfa20 => _0x4cfa20 === pSoundId);
        if (soundIndex === -1) {
            return
        }
          
        globalThis.StopSound(pSoundId);
        globalThis.ReleaseSoundId(pSoundId);
        soundArray.splice(soundIndex, 1);
    }
    exports('StopEntitySound', stopEntitySound);


    function cleanupEntitySounds(pEntity) {
        const soundArray = entitySoundsMap.get(pEntity);
        if (soundArray === undefined) {
            return
        }
          
        entitySoundsMap.set(pEntity, []);
        for (const soundId of soundArray) {
            globalThis.StopSound(soundId);
            globalThis.ReleaseSoundId(soundId);
        }
    }
    exports('CleanUpEntitySounds', cleanupEntitySounds);


    const eventSoundsMap = new Map();
    function getEntityById(pEntity, pEntityType) {
        let pNetId;
        if (pEntityType === 'player') {
            const pServerId = GetPlayerFromServerId(pEntity);
            if (pServerId === -1 && GetPlayerServerId(PlayerId()) !== pEntity) {
                return
            }
            pNetId = GetPlayerPed(pServerId);
        } else {
            if (!NetworkDoesEntityExistWithNetworkId(pEntity)) {
                return
            }
            pNetId = NetworkGetEntityFromNetworkId(pEntity);
        }
        return pNetId;
    }

    onNet('vrp-fx:playEntitySound', async (pName, pEntityType, pEntity, pSoundArray) => {
        const entity = getEntityById(pEntity, pEntityType);
        if (!DoesEntityExist(entity)) {
          return
        }
        
        const soundData = {
          active: true,
          sounds: [],
          entity: entity
        };
    
        eventSoundsMap.set(pName, soundData);

        const playSound = async (pSound) => {
            const soundId = await playEntitySound(entity, pSound.data.sound, pSound.data.ref, pSound.data.unk, pSound.data.bank);
            if (pSound.duration === undefined) {
                const interval = setInterval(() => {
                    if (!HasSoundFinished(soundId)) {
                        return;
                    }

                    stopEntitySound(entity, soundId);
                    clearInterval(interval);
                }, 1000);
            } else {
                Delay(pSound.duration).then(() => stopEntitySound(entity, soundId));
            }

            return soundId;
        };
        
        for (const pSound of pSoundArray) {
            if (!soundData.active) {
                return
            }
            
            const soundId = await playSound(pSound);
            soundData.sounds.push(soundId);
            if (pSound.delay) {
                await Delay(pSound.delay);
            }
        }
    });

    onNet('vrp-fx:stopEntitySound', (eventName) => {
        const soundData = eventSoundsMap.get(eventName);
        if (soundData === undefined) {
            return;
        }

        soundData.active = false;
        for (const soundId of soundData.sounds) {
            stopEntitySound(soundData.entity, soundId);
        }

        eventSoundsMap.delete(eventName);
    });

    onNet('vrp-fx:cleanUpEntitySounds', (entityId, entityType) => {
        const entity = getEntityById(entityId, entityType);
        if (entity === undefined || entity === -1) {
            return;
        }
        cleanupEntitySounds(entity);
    });

    const usableItems = {};
    onNet('RunUseItem', (pItem, _0x4a4e78, _0x17a553, _0x33af1b, _0x12b2b6) => {
        const isUsable = usableItems[pItem];
        if (isUsable === undefined) {
            return
        }
        
        for (const callback of isUsable) {
            try {
                callback(pItem, _0x4a4e78, _0x17a553, _0x33af1b, _0x12b2b6);
            } catch (err) {
                console.error(err);
            }
        }
    });

    function RegisterUsableItem(_0x30895e, _0x3f4d43) {
        if (usableItems[_0x30895e] === undefined)
        usableItems[_0x30895e] = [];
        usableItems[_0x30895e].push(_0x3f4d43);
    }

    const catchedPhrases = {};
    function catchPhrase(pPhraseName, pTime) {
        if (catchedPhrases[pPhraseName] === undefined) {
            catchedPhrases[pPhraseName] = {
                count: 0,
                timer: 0
            }
        }
        
        const gameTimer = GetGameTimer();
        const phrase = catchedPhrases[pPhraseName];
        if (gameTimer - phrase.timer > pTime) {
            phrase.count = 0;
            phrase.timer = gameTimer;
        }

        return ++phrase.count;
    }

    RegisterUsableItem('gavel', async () => {
        const catchs = catchPhrase('playLabarreCatchPhrase', 2000);
        if (catchs > 1) {
            return
        }

        await Delay(700);

        const pWeapon = GetCurrentPedWeapon(PlayerPedId(), false);

        if (pWeapon[1] === 1317494643) {
            return
        }
          
        let timedout = false;
        const timeout = setTimeout(() => timedout = true, 5000);

        while (GetCurrentPedWeapon(PlayerPedId(), false)[1] !== 1317494643 && !timedout) {
          await Delay(100);
        }

        clearTimeout(timeout);

        if (GetCurrentPedWeapon(PlayerPedId(), false)[1] !== 1317494643) {
            return;
        }
          
        emitNet('vrp-fx:sound:playLabarreCatchPhrase');
    });
})();
