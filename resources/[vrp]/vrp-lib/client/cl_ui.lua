local registered = {}

function RegisterUICallback(name, cb)
  local function interceptCb(data, innerCb)
    cb(data, function(result)
      if result.meta.ok then
        result.meta.message = "done"
      end
      innerCb(result)
    end)
  end
  AddEventHandler(('_vpx_uiReq:%s'):format(name), interceptCb)

  if (GetResourceState("vrp-ui") == "started") then exports["vrp-ui"]:RegisterUIEvent(name) end

  registered[#registered + 1] = name
end

function SendUIMessage(data)
  exports["vrp-ui"]:SendUIMessage(data)
end

function SetUIFocus(hasFocus, hasCursor)
  exports["vrp-ui"]:SetUIFocus(hasFocus, hasCursor)
end

function GetUIFocus()
  return exports["vrp-ui"]:GetUIFocus()
end

AddEventHandler("_vpx_uiReady", function()
  for _, eventName in ipairs(registered) do
    exports["vrp-ui"]:RegisterUIEvent(eventName)
  end
end)
