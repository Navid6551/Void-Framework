RPC.register('phone:getDocumentTypes', function(pSource)
    return true, {
        {
            id = 1,
            name = 'Notes',
            editable = true,
            shareable = false,
            can_sign = false,
            max_signatures = 4
        },
        {
            id = 2,
            name = 'Documents',
            editable = true,
            shareable = true,
            can_sign = true,
            max_signatures = 3
        },
        {
            id = 3,
            name = 'Contracts',
            editable = false,
            shareable = true,
            can_sign = false
        },
        {
            id = 4,
            name = 'Receipts',
            editable = true,
            shareable = true,
            can_sign = false
        }
    }
end)

RPC.register('phone:getLicenses', function()
    return true, {}
end)

RPC.register('phone:getDocuments', function()
    return true, {}
end)

RPC.register('vrp:vehicles:getVehicleIds', function()
    return true, {}
end)