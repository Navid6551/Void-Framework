const node_require = require;
const crypto = node_require('crypto');

const randomRace = {
    id: "random",
    name: "Random Waypoint",
    author: "0",
    category: "random",
    type: "Sprint",
    visible: true,
    thumbnail: "https",
    length: null,
    start: null,
    minLaps: 1,
    createdAt: Date.now()
}

let races;
let racesCheckpoints;
setImmediate(() => {
    async function loadAttempt() {
        console.log('Attempting to load races...');
        let result = await loadRaces();
        if (result && Array.isArray(result)) {
            console.log('Successfully loaded races.');
            racesCheckpoints = {};
            races = result.reduce((obj, race) => {
                racesCheckpoints[race.id] = JSON.parse(race.checkpoints || "[]");

                // let index = 0;
                // let start = {};
                // if (race.type == "Lap") {
                //     index = racesCheckpoints[race.id].length - 1;
                //     start = racesCheckpoints[race.id][index];
                // } else {
                //     index = 0;
                //     start = racesCheckpoints[race.id][index];
                // }

                race.start = racesCheckpoints[race.id][0];

                delete race.checkpoints;
                //race.createdAt = race.created_at;
                //delete race.created_at;
                return {...obj, [race.id]: race};
            }, {});
            races[randomRace.id] = randomRace;
        } else {
            setTimeout(loadAttempt, 5000);
        }
    }

    loadAttempt();
});

function loadRace(src, race) {
    console.log("Loading new race....");

    racesCheckpoints[race.id] = race.checkpoints;

    let index = 0;
    let start = {};
    if (race.type == "Lap") {
        index = racesCheckpoints[race.id].length - 1;
        start = racesCheckpoints[race.id][index];
    } else {
        index = 0;
        start = racesCheckpoints[race.id][index];
    }

    races[race.id] = race;

    races[race.id].start = start;

    delete races[race.id].checkpoints;

    emitNet("mkr_racing:addedRace", -1, {}, races);
    emitNet("DoLongHudText", src, `Race ${race.name} created!`);
}

exports("loadRace", loadRace);

function trackPositions(id, checkpoints) {
    let tick = setInterval(() => {
        const race = activeRaces[id];
        if (!race) {
            clearInterval(tick);
            return;
        }
        let positions = [];
        for (const plyId in race.players) {
            const player = race.players[plyId];
            if (player.totalDist === undefined)
                break;
            if (player.finished)
                continue;
            const plyCoords = getEntityPos(plyId);
            const checkpointCoords = checkpoints[player.curCheckpointIndex - 1].pos;
            const dist = getDistance(plyCoords, checkpointCoords);
            const newDist = player.totalDist + (player.straightDistToCheckpoint - dist);
            positions.push({ id: plyId, dist: newDist });
        }
        positions.sort((a, b) => b.dist - a.dist);
        positions = getFinishedPlayers(race).concat(positions);
        for (let i = 0; i < positions.length; i++) {
            //if someone finished with the position that someone has already taken, move them down
            const player = positions[i];
            const pos = i + 1;

            if (race.players[player.id].lastPos !== pos) {
                console.log("positions", positions);
                console.log("finishedPlayers", getFinishedPlayers(race));
                console.log(`Updating position for ${GetPlayerName(player.id)} (${player.id}) to Pos ${pos} | Last Position: ${race.players[player.id].lastPos}`);
                race.players[player.id].lastPos = pos;
                TriggerClientEvent("mkr_racing:updatePosition", player.id, pos);
            }
        }
    }, 2000);
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.randomFillSync(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
exports('uuid', uuidv4);

function isRaceNameTaken(src, name) {
    return Object.values(races).some(race => race.name == name);
}
RPC.register('mkr_racing:isRaceNameTaken', isRaceNameTaken); //FIX CUZ LUA CANT CALL THIS
exports('isRaceNameTaken', (name) => isRaceNameTaken(null, name));