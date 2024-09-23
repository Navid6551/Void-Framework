let isNightTime = false;

let pendingRaces = {};
let activeRaces = {};
const finishedRaces = [];

let raceConversations = {};

function updateNightTime(pIsNightTime) {
    isNightTime = pIsNightTime;
}

async function createPendingRace(pSource, pTrackId, pOptions) {
    const user = getPlayerModule(pSource);
    if (!user) return;

    if (!pTrackId || !pOptions) return;

    const track = races[pTrackId];
    if (!track) return;

    if (track.type !== "Sprint" && Number(pOptions.laps) < track.minLaps) return emitNet("DoLongHudText", pSource, `You need to have at least ${track.minLaps} ${track.minLaps == 1 ? 'lap' : 'lap(s)'}.`, 2);

    if (track.type === "Sprint") {
        pOptions.minLaps = 1;
        pOptions.laps = 1;
    }

    const isTimeTrial = track.category === "pd";

    const eventId = uuidv4();
    const raceName = track.name;

    const cid = Number(user.PlayerData.citizenid);
    const alias = pOptions.alias;

    if (!cid || !alias) return;

    const [inRace, _] = isPlayerInRace(cid);
    if (inRace) return;

    pOptions.buyIn = Number(pOptions.buyIn);
    if (pOptions.buyIn > 0 && !isTimeTrial) {
        if (pOptions.buyIn > Number(user.PlayerData.money.cash)) {
            emitNet("DoLongHudText", pSource, `You dont have $${race.buyIn} on you broke fuck.`, 2);
            return;
        }

        removeMoney(pSource, pOptions.buyIn);
    }

    if (!isTimeTrial) {
        pendingRaces[eventId] = {
            id: track.id,
            eventId: eventId,
            eventName: pOptions.eventName,
            length: track.length,
            name: raceName,
            track: raceName,
            owner: cid,
            eventCreator: alias,
            players: {},
            category: track.category,
            laps: Number(pOptions.laps),
            type: track.type,
            start: track.start,
            raceId: track.id,
            countdown: Number(pOptions.countdown),
            dnfPosition: Number(pOptions.dnfPosition),
            dnfCountdown: Number(pOptions.dnfCountdown),
            prize: Number(pOptions.buyIn),
            buyIn: Number(pOptions.buyIn),
            showPosition: pOptions.showPosition,
            prizeDistribution: pOptions.prizeDistribution,
            phasing: pOptions.phasing,
            vehicleClass: pOptions.vehicleClass,
            sendNotification: pOptions.sendNotification,
            reverse: pOptions.reverse,
            password: pOptions.password,
            forcePerspective: pOptions.forcePerspective,
            lineBasedCheckpoints: pOptions.lineBasedCheckpoints,
            hitPenalty: -1,
            //tournamentName: pOptions.tournamentName,
            finishedPlayers: [],
            isNightTime: isNightTime,
            createdAt: Date.now()
        };
    } else {
        pendingRaces[eventId] = {
            id: eventId,
            eventId: eventId,
            eventName: pOptions.eventName,
            length: track.length,
            name: raceName,
            track: raceName,
            owner: cid,
            eventCreator: alias,
            players: {},
            category: track.category,
            laps: Number(pOptions.laps),
            type: track.type,
            start: track.start,
            raceId: track.id,
            countdown: Number(pOptions.countdown),
            showPosition: pOptions.showPosition,
            phasing: pOptions.phasing,
            vehicleClass: pOptions.vehicleClass,
            reverse: pOptions.reverse,
            hitPenalty: Number(pOptions.hitPenalty),
            finishedPlayers: [],
            createdAt: Date.now(),
        };
    }

    emitNet("mkr_racing:addedPendingRace", -1, pendingRaces[eventId]);

    await joinRace(pSource, eventId, alias, cid, pOptions.password, true, isTimeTrial);
}

async function joinRace(pSource, pEventId, pAlias, pCid, pPassword, pDontPay, pIsTimeTrial = false) {
    const user = getPlayerModule(pSource);
    if (!user) return;

    const race = pendingRaces[pEventId];
    if (!race) return;

    if (String(race.password) !== String(pPassword)) return "Wrong password";

    const [inRace, _] = isPlayerInRace(pCid);
    if (inRace) return;

    const trackId = race.trackId;

    if (race.buyIn > 0 && !pDontPay && !pIsTimeTrial) {
        if (race.buyIn > Number(user.PlayerData.money.cash)) {
            emitNet("DoLongHudText", pSource, `You dont have $${race.buyIn} on you broke fuck.`, 2);
            return;
        }

        removeMoney(pSource, race.buyIn);

        race.prize += race.buyIn;
    }

    const playerPed = GetPlayerPed(pSource);
    if (!playerPed) return;

    const playerVehicle = GetVehiclePedIsIn(playerPed, false);
    if (!playerVehicle) return;

    const playerVehicleModel = GetEntityModel(playerVehicle);
    if (!playerVehicleModel) return;

    // const vehicleClass = getVehicleClassByModel(playerVehicleModel);
    // if (!vehicleClass) return;

    const vehicleVin = await exports["vrp-vehicles"].GetVehicleIdentifier(null, playerVehicle);
    if (!vehicleVin) return;

    let name = "Unknown";
    // const carConfig = await SQL.execute("SELECT * FROM _car_config WHERE hash = ?", [String(playerVehicleModel)]);
    // if (carConfig && carConfig.length > 0) {
    //     const carConfigName = carConfig[0];
    //     name = carConfigName.name;
    // }

    const vinScratched = await exports["vrp-vehicles"].IsVehicleVinScratched(playerVehicle);
    const vehicleFullyUpgraded = await exports["vrp-vehicles"].IsVehicleFullyUpgraded(vehicleVin);

    pendingRaces[pEventId].players[pSource] = {
        id: pSource,
        characterId: pCid,
        alias: pAlias,
        lastPos: -1,
        leftRace: false,
        finished: false,
        bestLapTime: 0,
        curCheckpointIndex: 1,
        straightDistToCheckpoint: 0,
        totalDist: 0,
        place: 0,
        cryptoReward: 0,
        vehicle: name,
        vehicleClass: 'S',
        vehicleFullyUpgraded: vehicleFullyUpgraded,
        vehicleVin: vehicleVin,
        vehicleVinScratched: vinScratched
    }

    console.log("player joined race", pendingRaces[pEventId].players[pSource]);

    emitNet("mkr_racing:joinedRace", pSource, {
        ...races[trackId],
        ...pendingRaces[pEventId]
    });
    emitNet("mkr_racing:updatedPendingRace", -1, pendingRaces[pEventId]);

    for (const plyId in race.players) {
        emitNet("mkr_racing:playerJoinedYourRace", plyId, pCid, pAlias);
    }
}

async function leaveRace(pSource) {
    const user = getPlayerModule(pSource);
    if (!user) return;

    const cid = user.PlayerData.citizenid;
    const alias = await getAlias(cid);

    if (!cid || !alias) return;

    const [inRace, eventId] = isPlayerInRace(cid);
    if (!inRace || !eventId) return;

    const race = pendingRaces[eventId];
    if (!race) return;

    if (Number(cid) === Number(race.owner)) {
        for (const plyId in race.players) {
            addMoney(plyId, race.buyIn);
            emitNet("mkr_racing:endRace", plyId);
        }

        delete pendingRaces[eventId];

        emitNet("mkr_racing:removedPendingRace", -1, eventId);
    } else {
        delete pendingRaces[eventId].players[pSource];

        addMoney(pSource, race.buyIn);

        pendingRaces[eventId].prize -= race.buyIn;

        emitNet("mkr_racing:leftRace", pSource, pendingRaces[eventId]);
        emitNet("mkr_racing:updatedPendingRace", -1, pendingRaces[eventId]);

        for (const plyId in race.players) {
            emitNet("mkr_racing:playerLeftYourRace", plyId, cid, alias);
            emitNet("mkr_racing:updatedPendingRace", plyId, pendingRaces[eventId]);
        }
    }
}

async function dnfRace(pSource, pEventId) {
    const user = getPlayerModule(pSource);
    if (!user) return;

    const cid = user.PlayerData.citizenid;
    const alias = await getAlias(cid);

    if (!cid || !alias) return;

    const race = activeRaces[pEventId];
    if (!race) return;

    race.players[pSource].leftRace = true;
    race.players[pSource].finished = true;

    emitNet("mkr_racing:leftRace", pSource, activeRaces[pEventId]);
    emitNet("mkr_racing:updatedActiveRace", -1, activeRaces[pEventId]);

    for (const plyId in race.players) {
        emitNet("mkr_racing:playerLeftYourRace", plyId, cid, alias);
    }

    const allFinished = !Object.values(race.players).some(player => !player.finished);

    if (allFinished) {
        finishedRaces.push(activeRaces[pEventId]);

        emitNet("mkr_racing:raceHistory", -1, activeRaces[pEventId]);

        for (const plyId in race.players) {
            emitNet("mkr_racing:endRace", plyId, activeRaces[pEventId]);
        }

        delete activeRaces[pEventId];

        emitNet("mkr_racing:removedActiveRace", -1, pEventId);
    }
}

async function startRace(pSource, pEventId, pCountdown) {
    if (!pendingRaces[pEventId]) {
        console.loog('yo dis shit not event here')
        return
    };

    activeRaces[pEventId] = pendingRaces[pEventId];
    emitNet("mkr_racing:addedActiveRace", -1, activeRaces[pEventId]);

    delete pendingRaces[pEventId];
    emitNet("mkr_racing:removedPendingRace", -1, pEventId);

    const race = activeRaces[pEventId];
    if (!race) {
        return
    };

    const track = races[race.raceId];
    if (!track) {
        return
    };

    const reversedCheckpoints = [];
    for (let i = racesCheckpoints[race.raceId].length - 1; i >= 0; i--) {
        reversedCheckpoints.push(racesCheckpoints[race.raceId][i]);
    }

    race.isNightTime = isNightTime; //If it's nighttime when they start they will reap the 2x GNE payout benefit.

    // track.laps = race.laps;
    // track.players = race.players;
    // track.eventId = race.eventId;
    // track.phasing = race.phasing;
    // track.checkpoints = race.reverse ? reversedCheckpoints : racesCheckpoints[race.raceId];
    // track.lineBasedCheckpoints = race.lineBasedCheckpoints;
    // track.forcePerspective = race.forcePerspective;
    // track.hitPenalty = race.hitPenalty;

    for (const plyId in race.players) {
        emitNet("mkr_racing:startRace", plyId, {
            laps: race.laps,
            players: race.players,
            eventId: race.eventId,
            phasing: race.phasing,
            checkpoints: race.reverse ? reversedCheckpoints : racesCheckpoints[race.raceId],
            lineBasedCheckpoints: race.lineBasedCheckpoints,
            start: race.reverse ? reversedCheckpoints[0] : race.start,
            forcePerspective: race.forcePerspective,
            hitPenalty: race.hitPenalty,
            type: race.type
        }, pCountdown * 1000);
    }
}

function endRace(pSource) {
    console.log("Ending Race", pSource);

    const user = getPlayerModule(pSource);
    if (!user) return;

    console.log("User's character id", user.PlayerData.citizenid);

    const cid = user.PlayerData.citizenid;
    if (!cid) return;

    console.log("Character ID", cid);

    let eventId = false;
    for (const id in activeRaces) {
        if (Number(activeRaces[id].owner) === Number(cid)) {
            eventId = id;
            break;
        }
    }

    if (!eventId) return;

    console.log("Event ID", eventId);

    const race = activeRaces[eventId];
    if (!race) return;

    console.log("Found Race!");

    for (const plyId in race.players) {
        emitNet("mkr_racing:endRace", plyId, activeRaces[eventId]);
        // const isInServer = GetActivePlayers().some(ply => ply === plyId);
        // if (!race.finished && isInServer) {
        //     addMoney(plyId, race.buyIn);
        // }
    }

    console.log("Added money to players");

    delete activeRaces[eventId];
    emitNet("mkr_racing:removedActiveRace", -1, eventId);

    console.log("All done!");
}

onNet("onPlayerDropped", (pSource) => {
    const user = getPlayerModule(Number(pSource));
    if (!user) return;

    for (const id in pendingRaces) {
        if (pendingRaces[id].players[pSource] && Number(pendingRaces[id].owner) !== Number(user.PlayerData.citizenid)) {
            delete pendingRaces[id].players[pSource];
            emitNet("mkr_racing:updatedPendingRace", -1, pendingRaces[id]);
        }
    }

    for (const id in activeRaces) {
        if (activeRaces[id].players[pSource] && Number(activeRaces[id].owner) !== Number(user.PlayerData.citizenid)) {
            delete activeRaces[id].players[pSource];
            emitNet("mkr_racing:updatedActiveRace", -1, activeRaces[id]);
        }
    }
});

async function finishedRace(pSource, pEventId, pTotalTime, pBestLapTime) {
    const user = getPlayerModule(pSource);
    if (!user) return;

    const cid = user.PlayerData.citizenid;
    const alias = await getAlias(cid);

    if (!cid || !alias) return;

    const race = activeRaces[pEventId];
    if (!race) return;

    //Split up the prize, 50% to the winner, 30% to second place, 20% to third place
    const prizePercentMappedToPos = {
        1: 0.5,
        2: 0.3,
        3: 0.2
    };

    const player = race.players[pSource];
    if (!player) return;

    player.prize = 0;
    player.cryptoReward = 0;

    const isEligibleForPrize = prizePercentMappedToPos[player.lastPos];

    if (isEligibleForPrize) {
        const prize = Object.keys(race.players).length == 1 ? race.prize : race.prize * isEligibleForPrize;
        addMoney(pSource, prize);
        player.prize = prize;
    }

    //TODO: Crypto Reward
    /*
        How it will work:

        The gne payout will be based on placement, if it's night time (2x) and if
        they are using their personal vehicle or a local vehicle.
        Aswell as a little extra if it's a vin scratched vehicle.
        
        1 thru 3 all have a different base payout

        1st place: Always get's most, but also nighttime also gets a bonus, aswell as the other factors
        2nd place: Gets a little less than 1st, but also nighttime also gets a bonus, aswell as the other factors
        3rd place: Gets a little less than 2nd, but also nighttime also gets a bonus, aswell as the other factors

        Also a factor of how many people are in the race, the more people the more payout.

        The rest only has a base payout and then plus the other factors.
    */

    const playerPed = GetPlayerPed(pSource);
    if (!playerPed) return;

    const playerVehicle = GetVehiclePedIsIn(playerPed, false);
    if (!playerVehicle) return;

    const vehicleVin = await exports["vrp-vehicles"].GetVehicleIdentifier(null, playerVehicle);
    if (!vehicleVin) return;

    const playersInRace = Object.keys(race.players).length;

    if (race.laps >= 4 && playersInRace >= 4 || race.type === "Sprint" && playersInRace >= 4) {
        const baseGnePayout = {
            1: 30,
            2: 20,
            3: 15,
            "all": 10
        }

        if (baseGnePayout[player.lastPos]) {
            //Get the base payout (30, 20, 15)
            player.cryptoReward = Number(baseGnePayout[player.lastPos]);
        } else {
            //Get the base payout (10)
            player.cryptoReward = Number(baseGnePayout["all"]);
        }

        //If it's nighttime, double the payout
        if (race.isNightTime) {
            console.log("It's nighttime, doubling payout")
            player.cryptoReward = player.cryptoReward * 2;
        }

        console.log("vehicleVin finishedRace")

        if (String(player.vehicleVin) === String(vehicleVin)) {
            if (player.vehicleVinScratched) {
                player.cryptoReward += 10;
            }

            //If first digit of vin is 2 or 1 it's a local, if it's 3 it's a personal
            if (!player.vehicleVinScratched && String(player.vehicleVin) && String(player.vehicleVin).charAt(0) === "3") {
                //Is personal
                player.cryptoReward += 5;
            }
        }

        const playersInRaceFiltered = Object.values(race.players).filter(player => !player.leftRace).length;
        const extraPayoutPerPlayer = 5;
        const additionalPayout = Math.floor(playersInRaceFiltered / 5) * extraPayoutPerPlayer;
        player.cryptoReward += additionalPayout;

        // exports["ev-phone"].addCrypto(pSource, 2, Number(player.cryptoReward));
    }

    if (String(player.vehicleVin) === String(vehicleVin)) {
        leaderboardAddFastest(race.raceId, alias, cid, player.vehicle, player.vehicleClass, pBestLapTime);
    }

    race.finishedPlayers.push({ id: pSource, dist: player.totalDist });

    player.bestLapTime = pBestLapTime;
    player.finished = pTotalTime;

    emitNet("mkr_racing:finishedRace", pSource, player.lastPos, pTotalTime);
    emitNet("mkr_racing:updatedActiveRace", -1, activeRaces[pEventId]);

    const allFinished = !Object.values(race.players).some(player => !player.finished);

    if (allFinished) {
        finishedRaces.push(activeRaces[pEventId]);
        activeRaces[pEventId].timestamp = Date.now();
        emitNet("mkr_racing:raceHistory", -1, activeRaces[pEventId]);

        for (const plyId in race.players) {
            emitNet("mkr_racing:endRace", plyId, activeRaces[pEventId]);
        }

        delete activeRaces[pEventId];
        emitNet("mkr_racing:removedActiveRace", -1, pEventId);
    } else if (race.dnfPosition > 0 && race.dnfPosition === player.lastPos) {
        const countdown = race.dnfCountdown * 1000;

        for (const plyId in race.players) {
            emitNet("mkr_racing:startDNFCountdown", plyId, countdown);
        }

        Wait(countdown); //Citizen.Wait

        for (const plyId in race.players) {
            emitNet("mkr_racing:endRace", plyId, activeRaces[pEventId]);
        }

        activeRaces[pEventId].timestamp = Date.now();

        finishedRaces.push(activeRaces[pEventId]);
        emitNet("mkr_racing:raceHistory", -1, activeRaces[pEventId]);

        delete activeRaces[pEventId];
        emitNet("mkr_racing:removedActiveRace", -1, pEventId);

        raceConversations[pEventId] && delete raceConversations[pEventId];
    }

    return true;
}

function updatePositionInfo(pEventId, pTotalDist, pStraightDistToCheckpoint, pCurCheckpointIndex) {
    const pSource = source;
    //const srcString = String(pSource);

    const race = activeRaces[pEventId];
    if (!race) return;

    race.players[pSource].totalDist = pTotalDist;
    race.players[pSource].straightDistToCheckpoint = pStraightDistToCheckpoint;
    race.players[pSource].curCheckpointIndex = pCurCheckpointIndex;
}

function getEventConversation(pSource, pEventId) {
    const race = findRace(pEventId);
    if (!race) return;

    let raceConversation = raceConversations[pEventId];
    if (raceConversation) {
        return {
            success: true,
            message: "Conversation exists",
            data: raceConversation
        }
    } else {
        const newConversation = {
            id: pEventId,
            name: race.eventName,
            messages: []
        };

        raceConversations[pEventId] = newConversation;

        return {
            success: true,
            message: "Conversation created",
            data: newConversation
        }
    }
}

function sendEventMessage(pSource, pCharacterId, pAlias, pEventId, pMessage) {
    const race = findRace(pEventId);
    if (!race) return;

    const raceConversation = raceConversations[pEventId];
    if (!raceConversation) return [false, "Conversation does not exist"];

    const newMessage = {
        id: raceConversation.messages.length + 1,
        sender: { id: pCharacterId, name: pAlias },
        message: pMessage,
        timestamp: globalThis.exports['vrp-phone'].GetCurrentTimestamp()
    }

    raceConversation.messages.push(newMessage);

    for (const plyId in race.players) {
        emitNet("vrp-racing:newMessage", plyId, pEventId, newMessage, race.type);
    }

    return [true, "Successefully sent message"];
}

function kickFromRace(pSource, pEventId, pPlayerId) {
    const race = pendingRaces[pEventId];
    if (!race) return;

    const player = race.players[pPlayerId];
    if (!player) return;

    pendingRaces[eventId].prize -= race.buyIn;

    delete pendingRaces[pEventId].players[pPlayerId];

    addMoney(pPlayerId, race.buyIn);

    emitNet("mkr_racing:updatedPendingRace", -1, pendingRaces[pEventId]);
    emitNet("mkr_racing:kickedFromRace", pPlayerId, "You were kicked from the race!");
}

function banFromRace(pSource, pEventId, pPlayerId) { }

async function deleteRace(pSource, pId) {
    const deleted = await deleteRaceById(pId);
    if (!deleted) return;
    races[pId] && delete races[pId];
    racesCheckpoints[pId] && delete racesCheckpoints[pId];
    emitNet("mkr_racing:addedRace", -1, {}, races);

    return true;
}

async function leaderboardAddFastest(pRaceId, pAlias, pCharacterId, pVehicle, pVehicleClass, pBestLapTime) {
    const results = await SQL.execute("INSERT INTO _race_leaderboard (raceId, alias, characterId, vehicle, vehicleClass, bestLapTime) VALUES (@raceId, @alias, @characterId, @vehicle, @vehicleClass, @bestLapTime)", {
        raceId: pRaceId,
        alias: pAlias,
        characterId: pCharacterId,
        vehicle: pVehicle,
        vehicleClass: pVehicleClass,
        bestLapTime: pBestLapTime
    });

    if (!results) return false;

    return true;
}

setImmediate(async () => {
    while (true) {
        if (activeRaces && Object.keys(activeRaces).length > 0) {
            for (const id in activeRaces) {
                const race = activeRaces[id];
                const checkpoints = racesCheckpoints[race.raceId];
                if (checkpoints) {
                    trackPositions(race.eventId, checkpoints);
                }
            }
        }

        if (activeRaces && Object.keys(activeRaces).length > 0) {
            await sleep(1000);
        } else {
            await sleep(5000);
        }
    }
});