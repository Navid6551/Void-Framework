//Todo : [[
    // Make the config to get from database
    // same for the presets
//]]

const CarConfig = [
    {
        model: 'elegy',
        active: true,
        group: 'Sports',
        brand: 'Karin',
        name: 'Elegy',
        import_price: -1,
        retail_price: -1,
        pdm: true,
        fastlane: false,
        tuner: true,
        showroom_image_url: '',
        hd_image_url: ''
    },
    {
        model: 'primoard',
        active: true,
        group: 'Sports',
        brand: 'Ford',
        name: 'Sports 1',
        import_price: -1,
        retail_price: -1,
        pdm: true,
        fastlane: true,
        tuner: false,
        showroom_image_url: 'https://i.imgur.com/hgUhGkq.png',
        hd_image_url: ''
    },
    {
        model: 'wot',
        active: true,
        group: 'Sports',
        brand: 'Ford',
        name: 'Sports 2',
        import_price: -1,
        retail_price: -1,
        pdm: false,
        fastlane: true,
        tuner: false,
        showroom_image_url: 'https://i.imgur.com/hgUhGkq.png',
        hd_image_url: ''
    },
    {
        model: 'wot',
        active: true,
        group: 'Cycle',
        brand: 'Ford',
        name: 'Cycle',
        import_price: -1,
        retail_price: -1,
        pdm: false,
        fastlane: true,
        tuner: false,
        showroom_image_url: 'https://i.imgur.com/hgUhGkq.png',
        hd_image_url: ''
    },
    {
        model: 'gtr',
        active: true,
        group: 'Coupe',
        brand: 'Ford',
        name: 'Coupe',
        import_price: -1,
        retail_price: -1,
        pdm: true,
        fastlane: true,
        tuner: false,
        showroom_image_url: 'https://i.imgur.com/hgUhGkq.png',
        hd_image_url: ''
    }
]

RPC.register('showroom:getCarConfig', async() => {
    return CarConfig
})

RPC.register('showroom:getCarPresets', async() => {
    return []
})

RPC.register('showroom:saveTestDrivePreset', async() => {
    return true
})

RPC.register('showroom:stockIncrease', async() => {
    return true
})

RPC.register('showroom:stockDecrease', async() => {
    return true
})

RPC.register('showroom:hasStock', async() => {
    return true
})