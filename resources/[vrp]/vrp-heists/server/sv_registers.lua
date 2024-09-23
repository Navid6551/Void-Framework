local RobbedRegisters = {}

RPC.register('heists:canRobRegister', function(pSource, pId)
    return not RobbedRegisters[pId]
end)