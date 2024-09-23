const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const findRace = (eventId) => {
    if (pendingRaces[eventId]) return pendingRaces[eventId];
    if (activeRaces[eventId]) return activeRaces[eventId];
}

const getDistance = (pCoord1, pCoord2) => {
    const x = pCoord1.x - pCoord2.x;
    const y = pCoord1.y - pCoord2.y;
    const z = pCoord1.z - pCoord2.z;
    return Math.sqrt(x * x + y * y + z * z);
};

const getEntityPos = (plyId) => {
    const plyPed = GetPlayerPed(plyId);
    const coords = GetEntityCoords(plyPed, true);
    return {
        x: coords[0],
        y: coords[1],
        z: coords[2]
    }
}

const getFinishedPlayers = (race) => {
    return race.finishedPlayers;
}

const getPlayerModule = (source) => exports["vrp-lib"].getPlayerModule(source);

const removeMoney = (source, amount) => exports["vrp-lib"].removeMoney(source, amount);

const addMoney = (source, amount) => exports["vrp-lib"].addMoney(source, amount);

const isPlayerInRace = (cid) => {
    for (const raceId in pendingRaces) {
        const players = pendingRaces[raceId].players;
        if (!players) continue;
        for (const plyId in players) {
            const player = players[plyId];
            if (!player) continue;
            if (Number(cid) === Number(player.characterId)) {
                return [true, raceId];
            }
        }
    }

    return [false, null];
}

const getAlias = async (cid) => {
    const name = `ply-${cid}`;

    const result = await SQL.execute("SELECT information FROM inventory WHERE item_id = @item_id AND name = @name LIMIT 1", {
        item_id: "racingusb2",
        name: name
    });

    if (!result) return false;

    const info = JSON.parse(result[0].information);
    if (!info) return false;

    if (Number(cid) !== Number(info.characterId)) return false;

    if (!info.Alias) {
        const character = await SQL.execute("SELECT first_name, last_name FROM characters WHERE id = @id LIMIT 1", {
            id: cid
        });

        if (!character) return false;

        return `${character[0].first_name} ${character[0].last_name}`;
    }

    return info.Alias || false;
}