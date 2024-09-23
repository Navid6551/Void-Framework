local IsReplacing, IsDeleting = false, false

local PaintingsConfig, CurrentPaintings = nil, {}

Citizen.CreateThread(function ()
    PaintingsConfig = VPX.Utils.cache(function (id)
        local config = VPX.Procedures.execute('vrp-business:uwucafe:getPaintings', id)

        if not config then return false, nil end

        return true, config

    end, { timeToLive = 5 * 60 * 1000 })

    exports['vrp-interact']:AddPeekEntryByPolyTarget({ "uwucafe-painting" }, {
        {
            id =  'uwucafe-setpainting',
            label =  'change art pieces',
            icon =  'palette',
            event = "vrp-business:uwucafe:changePainting",
            parameters =  {},
        }
    }, { distance = { radius = 5.0 } })
end)

local function SetCustomPainting(pPiece, pURL)
    local dui = CurrentPaintings[pPiece]

    if dui ~= nil then
        return exports["vrp-lib"]:changeDuiUrl(dui.id, pURL)
    end

    dui = exports["vrp-lib"]:getDui(pURL, 2048, 2048)

    CurrentPaintings[pPiece] = dui

    AddReplaceTexture('denis3d_catcafe_txd', pPiece, dui.dictionary, dui.texture)
end

local function RemoveCustomPainting(pPainting)
    local dui = CurrentPaintings[pPainting]

    if (dui == nil) then return end

    CurrentPaintings[pPainting] = nil

    RemoveReplaceTexture('denis3d_catcafe_txd', pPainting)

    exports["vrp-lib"]:releaseDui(dui.id)
end

VPX.Zones.onEnter('uwucafe', function (data)
    if IsReplacing then return end

    IsReplacing = true

    local paintings = PaintingsConfig.get(data.id)

    for painting, url in pairs(paintings) do
        SetCustomPainting(painting, url)
    end

    IsReplacing = false
end)

VPX.Zones.onExit('uwucafe', function (data)
    if IsDeleting then return end

    IsDeleting = true

    for painting, _ in pairs(CurrentPaintings) do
        RemoveCustomPainting(painting)
    end

    IsDeleting = false
end)

VPX.Events.onNet('vrp-business:uwucafe:setPainting', function (pPainting, pURL)
    if not VPX.Zones.isActive('uwucafe') then return end

    PaintingsConfig.reset()

    if not pURL then return RemoveCustomPainting(pPainting) end

    SetCustomPainting(pPainting, pURL)
end)

AddEventHandler('vrp-business:uwucafe:changePainting', function (pParams, pEntity, pCtx)
    local hasAccess = HasPermission("uwu_cafe", "craft_access")

    if not hasAccess then return end

    local data = pCtx['zones']['uwucafe-painting']

    local elements = {
        { name = 'url', label = _L('uwucafe-input-painting-url', 'Direct URL to an image (2048x2048)'), icon = 'link' }
    }

    local prompt = exports['vrp-ui']:OpenInputMenu(elements)

    if not prompt then return end

    VPX.Procedures.execute('vrp-business:uwucafe:setPainting', data.id, prompt.url)
end)