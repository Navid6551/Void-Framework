
local hasPdAuthCode = nil
RegisterUICallback("vrp-editor:stash:enteredAuthCode", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  exports["vrp-ui"]:closeApplication("textbox")
  hasPdAuthCode = true
end)

AddEventHandler("vrp-ui:application-closed", function(name)
  if name ~= "textbox" then return end
  hasPdAuthCode = false
end)

function getPDAuthCode()
  hasPdAuthCode = nil
  exports["vrp-ui"]:openApplication("textbox", {
    callbackUrl = "vrp-editor:stash:enteredAuthCode",
    key = "",
    items = {
      { label = "Auth Code", name = "password", type = "password" },
    },
    show = true,
  })
  while hasPdAuthCode == nil do
    Wait(1000)
  end
  return hasPdAuthCode
end

function isPD()
  local job = exports["vrp-base"]:getModule("LocalPlayer"):getVar("job")

  return isCop or isJudge or job == "district attorney"
end
