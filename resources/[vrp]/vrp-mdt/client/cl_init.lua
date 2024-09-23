Citizen.CreateThread(function()
  exports["vrp-keybinds"]:registerKeyMapping("","Gov", "MDW", "+openMdw", "-openMdw")
  RegisterCommand("+openMdw", function()
    TriggerEvent("vrp-ui:openMDW", {})
  end, false)
  RegisterCommand("-openMdw", function() end, false)
  -- regCommand()
end)

AddEventHandler("vrp-spawn:characterSpawned", function()
  -- regCommand()
end)

RegisterCommand("mdw", function()
  TriggerEvent("vrp-ui:openMDW", { fromCmd = true })
end)

-- function regCommand()
--   Citizen.Wait(5000)
--   RegisterCommand("mdw", function()
--     TriggerEvent("vrp-ui:openMDW", { fromCmd = true })
--   end)
--   -- local result = RPC.execute("vrp-ui:mdtApiRequest", {
--   --   action = "hasConfigPermission",
--   --   data = {},
--   -- })
--   -- if result and result.message and result.message.steam then
--   --   RegisterCommand("mdw", function()
--   --     TriggerEvent("vrp-ui:openMDW", { fromCmd = true })
--   --   end)
--   -- end
-- end

RegisterCommand("useMdwNewUrl", function()
  exports["vrp-ui"]:sendAppEvent("mdt", { useNewApi = true })
end, false)
RegisterCommand("useMdwNewUrlOff", function()
  exports["vrp-ui"]:sendAppEvent("mdt", { useNewApi = false })
end, false)
