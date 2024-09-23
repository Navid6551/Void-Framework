const QBCore = exports['vrp-core'].GetCoreObject()
const toggled = false

const Commands = [
    {
        command: '911',
        suggestion: 'Call 911',
        action: (pSource, pArgs) => {
            emitNet('phone:call911', pSource, pArgs)
        }
    },
    {
        command: '911a',
        suggestion: 'Call 911',
        action: (pSource, pArgs) => {
            emitNet('phone:call911', pSource, pArgs, false, true)
        }
    },    
    {
        command: 'h0',
        suggestion: 'Remove Your Hat',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'hat')
        }
    },
    {
        command: 'h1',
        suggestion: 'Wear Your Hat',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'hat', true)
        }
    },
    {
        command: 'e0',
        suggestion: 'Remove Your Earrings',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'earrings')
        }
    },
    {
        command: 'e1',
        suggestion: 'Wear Your Earrings',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'earrings', true)
        }
    },
    {
        command: 'g0',
        suggestion: 'Remove Your Glasses',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'glasses')
        }
    },
    {
        command: 'g1',
        suggestion: 'Wear Your Glasses',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'glasses', true)
        }
    },
    {
        command: 'v0',
        suggestion: 'Remove Your Vest',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'vest')
        }
    },
    {
        command: 'v1',
        suggestion: 'Wear Your Vest',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'vest', true)
        }
    },
    {
        command: 'm0',
        suggestion: 'Remove Your Mask',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'mask', false)
        }
    },
    {
        command: 'refreshchar',
        suggestion: 'Refresh your character',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:applyCurrentClothing', pSource, 'mask')
        }
    },
    {
        command: 'reloadskin',
        suggestion: 'Refresh your character',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:applyCurrentClothing', pSource, 'mask')
        }
    },
    {
        command: 'n0',
        suggestion: 'Remove Your Necklace',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'necklace')
        }
    },
    {
        command: 'n1',
        suggestion: 'Wear Your Necklace',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:faceWear', pSource, 'necklace', true)
        }
    },
    {
        command: 'outfits',
        suggestion: 'Saved outfits',
        action: (pSource, pArgs) => {
            emitNet('vrp-clothing:outfits', pSource)
        }
    },
    {
        command: 'callsign',
        suggestion: 'Set Your Callsign',
        action: (pSource, pArgs) => {
            globalThis.exports['vrp-signin'].SetCallsign(pSource, pArgs[0])
        }
    },
]

onNet('vrp-commands:buildCommands', () => {
    const src = source

    for (const [k, v] of Object.entries(Commands)) {
        RegisterCommand(v.command, v.action)
        emitNet(
            "chat:addSuggestion",
            src,
            `/${v.command}`,
            v.suggestion
        )
    }
})