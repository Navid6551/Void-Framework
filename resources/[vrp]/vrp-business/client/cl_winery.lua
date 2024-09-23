AddEventHandler("vrp-business:buyWineryWine", function()
  local characterId = exports["isPed"]:isPed("cid")
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = "casino"} })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "They don't recognize you", 2)
    return
  end
  RPC.execute("vrp-winery:purchaseWine")
end)

AddEventHandler("vrp-business:buyWineryGoods", function()
  TriggerEvent("server-inventory-open", "45", "Shop")
end)
