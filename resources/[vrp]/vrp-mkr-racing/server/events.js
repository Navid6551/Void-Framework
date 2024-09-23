/**
 * RPCs
 */

//Races: races[eventId] = {}

//Need to map the races and add checkpoints

RPC.register("mkr_racing:getAllRaces", () => {
    const racesWithCheckpoints = Object.keys(races).reduce(
        (updatedRaces, eventId) => {
            if (races[eventId]) {
                return {
                    ...updatedRaces,
                    [eventId]: { ...races[eventId], checkpoints: racesCheckpoints[eventId] }
                };
            }
            return updatedRaces;
        },
        races
    );

    return {
        races: racesWithCheckpoints,
        pendingRaces: pendingRaces,
        activeRaces: activeRaces,
        finishedRaces: finishedRaces
    };
});

RPC.register("mkr_racing:getLeaderboard", (pSource) => {

});

RPC.register("mkr_racing:getRaceCheckpoints", (pSource, pId) => {
    if (races[pId]) {
        return racesCheckpoints[pId];
    } else if (pendingRaces[pId]) {
        return racesCheckpoints[pendingRaces[pId].raceId];
    }
});

RPC.register("vrp-racing:getEventConversation", getEventConversation);

RPC.register("vrp-racing:sendEventMessage", sendEventMessage);

RPC.register("mkr_racing:createPendingRace", createPendingRace);

RPC.register("mkr_racing:deleteRace", deleteRace);

RPC.register("mkr_racing:joinRace", joinRace);

RPC.register("mkr_racing:leaveRace", leaveRace);

RPC.register("mkr_racing:dnfRace", dnfRace);

RPC.register("mkr_racing:startRace", startRace);

RPC.register("mkr_racing:endRace", endRace);

RPC.register("mkr_racing:finishedRace", finishedRace);

RPC.register("mkr_racing:kickFromRace", kickFromRace);

RPC.register("mkr_racing:banFromRace", banFromRace);

RPC.register("mkr_racing:bestLapTimes", async (pSource, pRaceId, pVehicleClass, pLimit) => {
    let query = `
        SELECT
            *
        FROM
            _race_leaderboard
        WHERE
            raceId = @raceId
            ${pVehicleClass === "All" ? "" : "AND vehicleClass = @vehicleClass"}
        ORDER BY
            bestLapTime ASC
        LIMIT
            @limit
    `;

    const results = await SQL.execute(query, {
        raceId: pRaceId,
        vehicleClass: pVehicleClass,
        limit: pLimit
    });

    return results;
});

RPC.register("mkr_racing:bestLapTimesForAlias", async (pSource, pRaceId, pCid, pAlias, pVehicleClass, pLimit) => {
    let query = `
        SELECT
            *
        FROM
            _race_leaderboard
        WHERE
            raceId = @raceId
            AND characterId = @characterId
            AND alias = @alias
            ${pVehicleClass === "All" ? "" : "AND vehicleClass = @vehicleClass"}
        ORDER BY
            bestLapTime ASC
        LIMIT
            @limit
    `;

    const results = await SQL.execute(query, {
        raceId: pRaceId,
        characterId: pCid,
        alias: pAlias,
        vehicleClass: pVehicleClass,
        limit: pLimit
    });
    
    return results;
});

RPC.register('mkr_racing:getFinishedRaces', async() => {
    return finishedRaces
})

RPC.register('mkr_racing:getAllTournaments', async() => {
    return []
})

/**
    * Events
*/

onNet("mkr_racing:updatePositionInfo", updatePositionInfo);
onNet("ev-weather:server:nightTime", updateNightTime);