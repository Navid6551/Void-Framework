function fetchPlayerStrains(pCid)
    local data = Await(SQL.execute("SELECT * FROM _player_strains WHERE creator = @creator", {
        ['creator'] = pCid
    }))

    return data
end

function AddStarinRep(pId, pAmount)
    local update = Await(SQL.execute("UPDATE _player_strains SET rep = rep + @rep WHERE id = @id", {
        rep = pValue,
        id = pId
    }))

    if not update then
        return false
    end
    return true
end

function AddNewStarin(pSource, pStarin)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local pCid = Player.PlayerData.citizenid

    local insert = Await(SQL.execute("INSERT INTO _player_strains (creator, strain, name, rep) VALUES (@creator, @strain, @name, @rep)", {
        creator = pCid,
        strain = string.format('%s-%s-%s', pStarin.n, pStarin.p, pStarin.k),
        name = getStrainName(pStarin),
        rep = 0,
    }))

    if not insert then
        return false, {}
    end

    return true, fetchPlayerStrains(pCid)
end

RPC.register('vrp-weed:fetchPlayerStrains', function(pSource)
    local Player = QBCore.Functions.GetPlayer(pSource)

    return fetchPlayerStrains(Player.PlayerData.citizenid)
end)