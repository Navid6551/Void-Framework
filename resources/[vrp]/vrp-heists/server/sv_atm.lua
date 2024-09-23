local RobbedATMS ={}

RPC.register('vrp-pettycrime:atm:moneyreward', function(pSource,pNetId, pBoost)
    if RobbedATMS[pNetId] ~= nil then 
        RobbedATMS[#RobbedATMS+pNetId] = true
        return
    end
    local Player = QBCore.Functions.GetPlayer(pSource)
    Player.Functions.AddMoney('cash', math.random(1500, 2000) * pBoost, 'Atm robbery')
end)

RPC.register('vrp-pettycrime:atm:reward', function(pSource, pBoost)
    TriggerClientEvent("player:receiveItem", pSource, "markedbills", math.random(15, 30))
end)


RegisterServerEvent("vrp-pettycrime:atm:clrspawn")
AddEventHandler("vrp-pettycrime:atm:clrspawn", function()
    TriggerClientEvent("vrp-pettycrime:atm:clrspawn", -1)
end)

RegisterServerEvent("vrp-pettycrime:atm:attachRope")
AddEventHandler("vrp-pettycrime:atm:attachRope", function(pr1, pr2)
    TriggerClientEvent("vrp-pettycrime:atm:attachRope", -1, pr1, pr2)
end)

RegisterServerEvent("vrp-pettycrime:atm:attachRope2")
AddEventHandler("vrp-pettycrime:atm:attachRope2", function(dpratm, atmco1, atmco2, atmco3, netveh, propsdad)
    TriggerClientEvent("vrp-pettycrime:atm:attachRope2", -1, dpratm, atmco1, atmco2, atmco3, netveh, propsdad)
end)

RegisterServerEvent("vrp-pettycrime:atm:prop")
AddEventHandler("vrp-pettycrime:atm:prop", function(ObjNet)
    TriggerClientEvent("vrp-pettycrime:atm:prop", -1, ObjNet)
end)

RegisterServerEvent("vrp-pettycrime:atm:delete")
AddEventHandler("vrp-pettycrime:atm:delete", function(ATMObjectDelete)
    TriggerClientEvent("vrp-pettycrime:atm:delete", -1, ATMObjectDelete)
end)

RegisterServerEvent("vrp-vrp-pettycrime:atm:deleteRope")
AddEventHandler("vrp-vrp-pettycrime:atm:deleteRope", function(rope)
    TriggerClientEvent("vrp-vrp-pettycrime:atm:deleteRope", -1, rope)
end)

RPC.register('vrp-heists:yacht:isHeistActive', function()
    return false, {}
end)