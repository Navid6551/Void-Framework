local allowedCids = {
  [1083] = true, -- Toretti (Mantis)
  [1022] = true, -- Mka
}

RegisterCommand('heartattack', function(pSource, pArgs)
  local serverCode = exports['vrp-config']:GetServerCode()
  if serverCode ~= 'wl' then return end
  local user = exports["vrp-base"]:getModule("LocalPlayer")
  if not user then return end
  local cid = user:getCurrentCharacter().id
  if not allowedCids[cid] then return end
  exports['ragdoll']:SetPlayerHealth(0)
end, false)
