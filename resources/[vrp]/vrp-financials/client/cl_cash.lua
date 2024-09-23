RegisterNetEvent("vrp-financials:cash")
AddEventHandler("vrp-financials:cash", function(pCash, pChange)
  if not pCash then return false, "No cash" end
  exports["vrp-ui"]:cashFlash(pCash, pChange)
end)
