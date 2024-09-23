QBCore = exports['vrp-core']:GetCoreObject()

RPC.register('complete:job', function(pSource, pAmount, pReason)
    local Player = QBCore.Functions.GetPlayer(pSource)
    if not Player then return end
    Player.Functions.AddMoney('cash', pAmount, pReason == 'h'and 'Heists' or pReason)
end)