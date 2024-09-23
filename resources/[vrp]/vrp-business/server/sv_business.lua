QBCore = exports['vrp-core']:GetCoreObject()
local businessTypes = {
    {
        id = 1,
        name = 'Showroom'
    },
    {
        id = 2,
        name = 'Generic'
    },
    {
        id = 3,
        name = 'Loans'
    }
}

function GetPlayerBusinesses(pCid)
    local businesses = {}
    local data = Await(SQL.execute("SELECT * FROM businesses", {}))
    for k, v in pairs(data) do
        local employees = json.decode(v.employees)
        for i,u in pairs(employees) do
            if u.id == pCid then
                table.insert(businesses, {
                    id = v.id,
                    access_level = -1,
                    code = v.code,
                    name = v.name,
                    role = u.role,
                    permissions = u.permissions,
                    business_type = v.business_type,
                    bank_account_id = v.bank_account_id,
                    bank_balance = v.bank_balance
                })
            end
        end
    end

    return businesses
end exports('GetPlayerBusinesses', GetPlayerBusinesses)

function GetPlayerBusinessesById(pCid, pid)
    local businesses = nil
    local data = Await(SQL.execute("SELECT * FROM businesses WHERE code = @code", {
        ['code'] = pid
    }))
    if not data[1] then
        return false
    end
    local v = data[1]
    local employees = json.decode(v.employees)
    for i,u in pairs(employees) do
        if tonumber(u.id) == tonumber(pCid) then
            businesses = {
                id = v.id,
                access_level = -1,
                code = v.code,
                name = v.name,
                role = u.role,
                permissions = u.permissions,
                business_type = v.business_type,
                bank_account_id = v.bank_account_id,
                bank_balance = v.bank_balance
            }
        end
    end

    return businesses
end exports('GetPlayerBusinessesById', GetPlayerBusinessesById)

function GetBusinessByBankId(pId)
    local data = Await(SQL.execute("SELECT * FROM businesses WHERE bank_account_id = @id", {
        ['id'] = pId
    }))
    if not data[1] then
        return nil
    end
    data[1].employees = json.decode(data[1].employees)
    data[1].roles = json.decode(data[1].roles)
    return data[1]
end exports('GetBusinessByBankId', GetBusinessByBankId)

function GetBusinessById(pId)
    local data = Await(SQL.execute("SELECT * FROM businesses WHERE id = @id", {
        ['id'] = pId
    }))
    if not data[1] then
        return nil
    end
    data[1].employees = json.decode(data[1].employees)
    data[1].roles = json.decode(data[1].roles)
    return data[1]
end

function GetBusinessEmployees(pId)
    local data = GetBusinessById(pId)

    if not data then
        return {}
    end

    return data.employees
end

function GetBusinessRoles(pId)
    local data = GetBusinessById(pId)

    if not data then
        return {}
    end

    return data.roles
end

function GetTypeById(pId)
    for k, v in pairs(businessTypes) do
        if v.id == pId then
            return v
        end
    end
    return nil
end

function GetRoleByid(pRoles, pId)
    for k, v in pairs(pRoles) do
        if tonumber(v.id) == tonumber(pId) then
            return k, v
        end
    end

    return nil, nil
end

function GetEmployeeByid(pEmployess, pId)
    for k, v in pairs(pEmployess) do
        if tonumber(v.id) == tonumber(pId) then
            return k, v
        end
    end

    return nil, nil
end

local function includes(tbl, item)
    for _, v in ipairs(tbl) do
        if v == item then
            return true
        end
    end
    return false
end

function CreateBusiness(pData)
    local pType = GetTypeById(pData.business_type_id)
    if not pType then return false, 'Business type not found' end
    local Player = QBCore.Functions.GetPlayer(pData.owner_id)
    local bankId = exports['vrp-core']:CreateAccountNumber()
    local roles = {
        {
            id = 1,
            name = 'Owner',
            permissions = {
                'hire',
                'change_role',
                'pay_employee',
                'pay_external',
                'charge_external',
                'fire',
                'property_keys',
                'stash_access',
                'craft_access',
                'view_logs',
                'buy_car'
            }
        },
        {
            id = 2,
            name = 'Employee',
            permissions = {
                'charge_external',
                'property_keys',
                'stash_access'
            }
        }
    }
    local employees = {
        {
            id = tonumber(Player.PlayerData.citizenid),
            first_name = Player.PlayerData.charinfo.firstname,
            last_name = Player.PlayerData.charinfo.lastname,
            role = 'Owner',
            permissions = roles[1].permissions
        }
    }
    Await(SQL.execute("INSERT INTO businesses (code, name, business_type, bank_account_id, employees, roles) VALUES (@code, @name, @business_type, @bank_account_id, @employees, @roles)", {
        ["code"] = pData.code or '',
        ["name"] = pData.name,
        ["business_type"] = pType.name,
        ["bank_account_id"] = bankId,
        ["employees"] = json.encode(employees),
        ["roles"] = json.encode(roles)
    }))
end

function hasPermission(pSource, pBiz, pPerm)
    local Player = QBCore.Functions.GetPlayer(pSource)
    local bizData = GetPlayerBusinessesById(Player.PlayerData.citizenid, pBiz)
    if not bizData then
        return false
    end
    return includes(bizData.permissions, pPerm)
end exports('hasPermission', hasPermission)

function addBusinessBalance(pBiz, pAmount, pRemove)
    local data = GetBusinessByBankId(pBiz)
    if not data then
        return false, 'Business dont exist'
    end
    local update = Await(SQL.execute("UPDATE businesses SET bank_balance = @bank_balance WHERE id = @id", {
        ["bank_balance"] = pRemove and data.bank_balance - pAmount or data.bank_balance + pAmount,
        ["id"] = data.id
    }))

    if not update then return false, 'Failed to update balance' end

    return true, ''
end exports('AddBusinessBalance', addBusinessBalance)

RegisterCommand('createBiz', function(pSource, pArgs)
    CreateBusiness({
        owner_id = tonumber(pArgs[1]),
        business_type_id = tonumber(pArgs[2]),
        code = pArgs[3],
        name = pArgs[4],
    })
end)

RPC.register('GetBusinessTypes', function()
    return true, businessTypes
end)

RPC.register('vrp-business:hasPermission', hasPermission)

RPC.register('CreateBusinessRole', function(pSource, pData)
    local data = GetBusinessById(pData.business.id)
    if not data then
        return false, 'Business dont exist'
    end

    local roles = data.roles
    table.insert(roles, {
        id = #roles + 1,
        name = pData.name,
        permissions = pData.permissions
    })

    local update = Await(SQL.execute("UPDATE businesses SET roles = @roles WHERE id = @id", {
        ["roles"] = json.encode(roles),
        ["id"] = pData.business.id
    }))

    if not update then return false, 'Failed to insert role' end
    return true, ''
end)

RPC.register('EditBusinessRole', function(pSource, pData)
    local data = GetBusinessById(pData.business.id)
    if not data then
        return false, 'Business dont exist'
    end
    local roles = data.roles
    local roleIdx  = GetRoleByid(roles, pData.role_id)
    roles[roleIdx].permissions = pData.permissions

    local update = Await(SQL.execute("UPDATE businesses SET roles = @roles WHERE id = @id", {
        ["roles"] = json.encode(roles),
        ["id"] = pData.business.id
    }))

    if not update then return false, 'Failed to update role' end

    return true, ''
end)

RPC.register('DeleteBusinessRole', function(pSource, pData)
    local data = GetBusinessById(pData.business.id)
    if not data then
        return false, 'Business dont exist'
    end
    local roles = data.roles
    local roleIdx  = GetRoleByid(data.roles, pData.role_id)
    table.remove(roles, roleIdx)

    local update = Await(SQL.execute("UPDATE businesses SET roles = @roles WHERE id = @id", {
        ["roles"] = json.encode(roles),
        ["id"] = pData.business.id
    }))

    if not update then return false, 'Failed to delete role' end

    return true, ''
end)

RPC.register('GetEmploymentInformation', function(pSource, pData)
    return true, GetPlayerBusinesses(pData.character.id)
end)

RPC.register('GetBusinessEmployees', function(pSource, pData)
    return true, GetBusinessEmployees(pData.id)
end)

RPC.register('GetBusinessRoles', function(pSource, pData)
    return true, GetBusinessRoles(pData.id)
end)

RPC.register('HireBusinessEmployee', function(pSource, pData)
    local Player = QBCore.Functions.GetPlayerByCitizenId(tostring(pData.state_id))
    if not Player then return false, 'Player do not exist' end
    local data = GetBusinessById(pData.business.id)
    if not data then
        return false, 'Business dont exist'
    end
    local employees = data.employees
    local roleIdx, roleData  = GetRoleByid(data.roles, pData.role_id)
    table.insert(employees, {
        id = tonumber(Player.PlayerData.citizenid),
        first_name = Player.PlayerData.charinfo.firstname,
        last_name = Player.PlayerData.charinfo.lastname,
        role = roleData.name,
        permissions = roleData.permissions
    })

    local update = Await(SQL.execute("UPDATE businesses SET employees = @employees WHERE id = @id", {
        ["employees"] = json.encode(employees),
        ["id"] = pData.business.id
    }))

    if not update then return false, 'Failed to hire employee' end
    
    return true, ''
end)

RPC.register('ChangeBusinessRole', function(pSource, pData)
    local data = GetBusinessById(pData.business.id)
    if not data then
        return false, 'Business dont exist'
    end

    local employees = data.employees
    local roleIdx, roleData  = GetRoleByid(data.roles, pData.role_id)
    local empIndex  = GetEmployeeByid(employees, pData.employee.id)
    employees[empIndex].role = roleData.name
    employees[empIndex].permissions = roleData.permissions

    local update = Await(SQL.execute("UPDATE businesses SET employees = @employees WHERE id = @id", {
        ["employees"] = json.encode(employees),
        ["id"] = pData.business.id
    }))

    if not update then return false, 'Failed to hire employee' end

    return true, ''
end)

RPC.register('RemoveBusinessEmployee', function(pSource, pData)
    local data = GetBusinessById(pData.business.id)
    if not data then
        return false, 'Business dont exist'
    end
    local employees = data.employees
    local empIndex  = GetEmployeeByid(employees, pData.employee.id)
    employees[empIndex] = nil

    local update = Await(SQL.execute("UPDATE businesses SET employees = @employees WHERE id = @id", {
        ["employees"] = json.encode(employees),
        ["id"] = pData.business.id
    }))

    if not update then return false, 'Failed to hire employee' end

    return true, ''
end)

RPC.register('IsEmployedAtBusiness', function(pSource, pData)
    print('IsEmployedAtBusiness', pSource, pData, json.encode(pData))
    -- local bizData = GetPlayerBusinessesById(pData.character.id, pData.business.id)
    -- if not bizData then
    --     return false
    -- end
    return true
end)