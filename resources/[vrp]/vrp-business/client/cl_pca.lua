AddEventHandler("vrp-business:pcaGradeItems", function()
  local employed = IsEmployedAt("comic_store")
  if not employed then
    TriggerEvent("DoLongHudText", "He does not recognize you", 2)
    return
  end
  RPC.execute("vrp-business:pcaGradeInventory")
end)
