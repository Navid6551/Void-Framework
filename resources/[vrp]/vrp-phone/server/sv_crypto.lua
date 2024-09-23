RPC.register('phone:getCrypto', function(pSource, pCid)
    return true, {
        {
            id = 1,
            ticker = 'SHUNG',
            name = 'Shungite',
            icon = 'caret-square-up',
            amount = 0
        },
        {
            id = 2,
            ticker = 'GNE',
            name = 'Guinea',
            icon = 'horse-head',
            amount = 0
        },
        {
            id = 3,
            ticker = 'X',
            name = 'X Coin',
            icon = 'times',
            amount = 0,
            price = 1000
        },
        -- {
        --     id = 6,
        --     ticker = 'XTF',
        --     name = 'XTF',
        --     icon = 'theater-masks',
        --     price = 1000,
        --     amount = 0
        -- }
    }
end)