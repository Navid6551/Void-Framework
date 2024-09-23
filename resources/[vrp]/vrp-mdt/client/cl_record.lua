RegisterCommand('record', function()
    StartRecording(1)
    TriggerEvent('QBCore:Notify', 'Started recording', 'success')
end, false)

RegisterCommand('clip', function()
    StartRecording(0)
end, false)

RegisterCommand('saveclip', function()
    StopRecordingAndSaveClip()
    TriggerEvent('QBCore:Notify', 'Saved recording', 'success')
end, false)

RegisterCommand('delclip', function()
    StopRecordingAndDiscardClip()
    TriggerEvent('QBCore:Notify', 'Deletet recording', 'success')
end, false)

RegisterCommand('editor', function()
    NetworkSessionLeaveSinglePlayer()
    ActivateRockstarEditor()
end, false)
