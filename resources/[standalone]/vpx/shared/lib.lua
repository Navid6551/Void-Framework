VPX = nil

Await = function (p)
    if type(p) == "table" and (p.next and type(p.next) == "function") then return Citizen.Await(p) end

    return p
end

local function getProxy(pK)
    return setmetatable({}, {
        __call = function(t, ...)
            local args = {...}

            local p = promise:new()

            Citizen.CreateThread(function()
                local lib = VPX

                for k in string.gmatch(pK, "([^|]+)") do
                    if lib['__cfx_functionReference'] then return error("Invalid Element: " .. k) end

                    lib = lib[k]
                end

                local result = lib(table.unpack(args))

                p:resolve(result)
            end)

            return p
        end,

        __index = function (t, k)
            return getProxy((pK and pK .. "|" or "") .. k)
        end
    })
end

VPX = getProxy()

Citizen.CreateThread(function()
    VPX = exports[GetCurrentResourceName()]:GetLibrary()
end)