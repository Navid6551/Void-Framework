AddEventHandler("vrp-business:interactBettaLifeNpc", function()
  local employed = IsEmployedAt("dream_pharmaceutical")
  if not employed then
    TriggerEvent("DoLongHudText", "They do not recognize you", 2)
    return
  end
  TriggerEvent("server-inventory-open", "42101", "Craft")
end)
