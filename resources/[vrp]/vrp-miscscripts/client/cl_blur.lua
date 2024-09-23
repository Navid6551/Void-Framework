local currentlyBlurred = false

VPX.Events.onNet('vrp-miscscripts:toggleMyBlur', function()
  if currentlyBlurred then
    TriggerScreenblurFadeOut(500)
    currentlyBlurred = false
  else
    TriggerScreenblurFadeIn(500)
    currentlyBlurred = true
  end
end)

function IsCurrentlyBlurred()
  return currentlyBlurred
end

exports('IsCurrentlyBlurred', IsCurrentlyBlurred)