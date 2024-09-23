local PedEntries = MenuEntries['peds']

-- PedEntries[#PedEntries+1] = {
--     data = {
--         id = "peds-heist-invite",
--         title = _L("menu-players-invite", "Heist Invite"),
--         icon = "#prison-action",
--         event = "vrp-heists:ui:menuInvite",
--     },
--     isEnabled = function(pEntity, pContext)
--         local group = exports['vrp-heists']:GetGroup()
--         return not IsDisabled()
--             and pEntity
--             and pContext.flags['isPlayer']
--             and group
--             and #group.members < 6 -- todo: CanInvite export?
--     end
-- }

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-escort",
        title = _L("menu-players-escort", "Escort"),
        icon = "#general-escort",
        event = "vrp-police:drag:attempt"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and not isEscorting and pEntity and pContext.flags['isPlayer']
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-cuff",
        title = _L("menu-players-cuff", "Cuff"),
        icon = "#cuffs-cuff",
        event = "vrp-police:cuffs:attempt"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and not pContext.flags['isCuffed'] and ((exports["vrp-inventory"]:hasEnoughOfItem("cuffs",1,false) or (isPolice or isDoc))) and pContext.distance <= 2.0
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-ucuff",
        title = _L("menu-players-uncuff", "Uncuff"),
        icon = "#cuffs-uncuff",
        event = "vrp-police:cuffs:uncuff"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isCuffed'] and ((exports["vrp-inventory"]:hasEnoughOfItem("cuffs",1,false) or (isPolice or isDoc)))
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-unblindfold",
        title = _L("menu-players-remove-bolindfold", "Remove Blindfold"),
        icon = "#blindfold",
        event = "vrp-captive:captive",
        parameters = { 'isBlindfolded', false }
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isBlindfolded']
    end
}

PedEntries[#PedEntries+1] = {
  data = {
      id = "cuffs:gag",
      title = _L("menu-players-remove-gag", "Remove gag"),
      icon = "#gag",
      event = "vrp-captive:captive",
      parameters = { 'isGagged', false }
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isGagged']
  end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "cuffs:jammer",
        title = _L("menu-players-jammer", "Remove GPS Jam"),
        icon = "#gpsjam",
        event = "vrp-captive:captive",
        parameters = { 'isBlipDisabled', false }
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isCuffed'] and pContext.flags['isPlayer'] and pContext.flags['isBlipDisabled']
    end
}


PedEntries[#PedEntries+1] = {
    data = {
        id = "cuffs:deafen",
        title = _L("menu-players-remove-deafener", "Remove deafener"),
        icon = "#deafen",
        event = "vrp-captive:captive",
        parameters = { 'isDeafened', false }
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isDeafened']
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-cuffActions",
        title = _L("menu-players-cuff-actions", "Cuff Actions"),
        icon = "#cuffs",
    },
    subMenus = {"cuffs:remmask", "cuffs:beatmode", "cuffs:blindfold", "cuffs:gag" , "cuffs:checkphone", "cuffs:jammer", "cuffs:deafen"},
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isCuffed'] and ((exports["vrp-inventory"]:hasEnoughOfItem("cuffs",1,false) or (isPolice or isDoc)))
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-revive",
        title = _L("menu-players-revive", "Revive"),
        icon = "#medic-revive",
        event = "revive",
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isDead'] and (isPolice or isDoc or isMedic or isDoctor)
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-revive-var",
        title = _L("menu-players-revive", "Revive"),
        icon = "#medic-revive",
        event = "vrp-heists:serverroom:revivePlayer",
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled()
            and (IN_SERVER_FARM or not InDefaultWorld())
            and pEntity
            and pContext.flags['isPlayer']
            and pContext.flags['isDead']
            and exports["vrp-inventory"]:hasEnoughOfItem("varmedkit", 1, false, true)
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-heal",
        title = _L("menu-players-heal", "Heal"),
        icon = "#medic-heal",
        event = "ems:heal",
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and not pContext.flags['isDead'] and (isMedic or isDoctor or isDoc)
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-medicActions",
        title = _L("menu-players-medical-actions", "Medical Actions"),
        icon = "#medic",
    },
    subMenus = {"medic:stomachpump", "medic:bloodtest"},
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and (isMedic or isDoctor)
    end
}

PedEntries[#PedEntries+1] = {
  data = {
    id = "police-action",
    title = _L("menu-players-police-actions", "Police Actions"),
    icon = "#police-action",
  },
  subMenus = {"police:frisk", "police:search", "police:fingerprint", "police:checkBank", "police:gsr"},
  isEnabled = function(pEntity, pContext)
    return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and (isPolice or isDoc) and pContext.distance <= 2.0
  end
}

PedEntries[#PedEntries+1] = {
  data = {
    id = "steal",
    title = _L("menu-players-steal", "Steal"),
    icon = "#steal",
    event = "police:rob"
  },
  isEnabled = function(pEntity, pContext)
    return not IsDisabled() and not (isPolice or isDoc) and pEntity and pContext.flags['isPlayer'] and (isPersonBeingHeldUp(pEntity) or pContext.flags['isDead']) and not isOutbreakRunning
  end
}

PedEntries[#PedEntries+1] = {
  data = {
    id = "steal-shoes",
    title = _L("menu-players-steal-shoes", "Steal shoes"),
    icon = "#shoes",
    event = "shoes:steal"
  },
  isEnabled = function(pEntity, pContext)
    return not IsDisabled() and not (isPolice or isDoc) and pEntity and pContext.flags['isPlayer'] and (pContext.flags['isCuffed'] or pContext.flags['isDead'] or isPersonBeingHeldUp(pEntity))
  end
}

PedEntries[#PedEntries+1] = {
    data = {
      id = "prison-action",
      title = _L("menu-players-prison-actions", "Prison Actions"),
      icon = "#prison-action",
    },
    subMenus = {"prison:attachCollar", "prison:currentInfo", "prison:assignTask", "prison:assignGroup", "prison:getCell"},
    isEnabled = function(pEntity, pContext)
      return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and (isPolice or isDoc) and pContext.distance <= 2.0 and polyChecks.prison.isInside
    end
  }

MenuItems['police:frisk'] = {
  data = {
      id = "peds-frisk",
      title = _L("menu-players-frisk", "Frisk"),
      icon = "#police-action-frisk",
      event = "police:checkInventory",
      parameters = { true }
  }
}

MenuItems['police:cufflog'] = {
    data = {
        id = "peds-cuff-log",
        title = "Recent Cuff Actions",
        icon = "#cuffs-cuff",
        event = "vrp-police:openRecentCuffsMenu",
        parameters = {}
    }
}

MenuItems['police:search'] = {
  data = {
      id = "peds-search",
      title = _L("menu-players-search", "Search"),
      icon = "#cuffs-check-inventory",
      event = "police:checkInventory"
  }
}

MenuItems['cuffs:remmask'] = {
    data = {
        id = "cuffs:remmask",
        title = _L("menu-players-remove-mask", "Remove Mask Hat"),
        icon = "#cuffs-remove-mask",
        event = "police:remmask"
    }
}

MenuItems['police:seizeItems'] = {
    data = {
        id = "police:seizeItems",
        title = _L("menu-players-seize-possessions", "Seize Possessions"),
        icon = "#steal",
        event = "vrp-police:client:seizeItems"
    },
    isEnabled = function(pEntity, pContext)
      return polyChecks.police.isInside
    end
}

MenuItems['cuffs:checkphone'] = {
    data = {
        id = "cuffs:checkphone",
        title = _L("menu-players-read-phone", "Read Phone"),
        icon = "#cuffs-check-phone",
        event = "police:checkPhone"
    }
}

MenuItems['cuffs:beatmode'] = {
    data = {
        id = "cuffs:beatmode",
        title = _L("menu-players-beatmode", "Beat Mode"),
        icon = "#cuffs-beatmode",
        event = "police:startPutInBeatMode"
    }
}

MenuItems['cuffs:blindfold'] = {
    data = {
        id = "cuffs:blindfold",
        title = _L("menu-players-blindfold", "Blindfold"),
        icon = "#blindfold",
        event = "vrp-captive:captive",
        parameters = { 'isBlindfolded', true }
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isCuffed'] and pContext.flags['isPlayer'] and not pContext.flags['isBlindfolded'] and ((exports["vrp-inventory"]:hasEnoughOfItem("blindfold",1,false)))
    end
}

MenuItems['cuffs:gag'] = {
  data = {
      id = "cuffs:gag",
      title = _L("menu-players-gag", "Gag"),
      icon = "#gag",
      event = "vrp-captive:captive",
      parameters = { 'isGagged', true }
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and pEntity and pContext.flags['isCuffed'] and pContext.flags['isPlayer'] and not pContext.flags['isGagged'] and ((exports["vrp-inventory"]:hasEnoughOfItem("gag_sock",1,false)))
  end
}

MenuItems['cuffs:jammer'] = {
    data = {
        id = "cuffs:jammer",
        title = _L("menu-players-jammer", "GPS Jam"),
        icon = "#gpsjam",
        event = "vrp-captive:captive",
        parameters = { 'isBlipDisabled', true }
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isCuffed'] and pContext.flags['isPlayer'] and not pContext.flags['isBlipDisabled'] and ((exports["vrp-inventory"]:hasEnoughOfItem("gpsjammer",1,false)))
    end
}

MenuItems['cuffs:deafen'] = {
    data = {
        id = "cuffs:deafen",
        title = _L("menu-players-deafen", "Deafen"),
        icon = "#deafen",
        event = "vrp-captive:captive",
        parameters = { 'isDeafened', true }
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isCuffed'] and pContext.flags['isPlayer'] and not pContext.flags['isDeafened'] and ((exports["vrp-inventory"]:hasEnoughOfItem("deafener",1,false)))
    end
}

MenuItems['medic:stomachpump'] = {
    data = {
        id = "medic:stomachpump",
        title = _L("menu-players-stomachpump", "Stomach pump"),
        icon = "#medic-stomachpump",
        event = "ems:stomachpump"
    },
    isEnabled = function(pEntity, pContext)
        return isDoctor
    end
}

MenuItems['medic:bloodtest'] = {
  data = {
      id = "medic:bloodtest",
      title = _L("menu-players-bloodtest", "Blood Test"),
      icon = "#general-check-over-target",
      event = "ems:bloodtest"
  },
  isEnabled = function(pEntity, pContext)
      return isDoctor
  end
}

MenuItems['medic:checktargetstates'] = {
    data = {
        id = "medic:checktargetstates",
        title = _L("menu-players-examinetarget", "Examine Target"),
        icon = "#general-check-over-target",
        event = "requestWounds"
    }
}

MenuItems['police:fingerprint'] = {
    data = {
        id = "police:fingerprint",
        icon = "#police-action-fingerprint",
        title = _L("menu-players-check-fingerprint", "Check Fingerprint"),
        event = "vrp-police:client:fingerPrint"
    },
    isEnabled = function(pEntity, pContext)
        return not isDead and pContext.flags and isPolice or isDoc
    end
}

MenuItems['police:checkBank'] = {
    data = {
        id = "police:checkBank",
        icon = "#police-check-bank",
        title = _L("menu-players-check-bank", "Check Bank"),
        event = "police:checkBank"
    },
    isEnabled = function(pEntity, pContext)
        return not isDead and pContext.flags and isPolice
    end
}

MenuItems['police:gsr'] = {
    data = {
        id = "police:gsr",
        icon = "#police-action-gsr",
        title = _L("menu-players-check-gsr", "Check GSR"),
        event = "police:gsr"
    },
    isEnabled = function(pEntity, pContext)
        return not isDead and pContext.flags and isPolice
    end
}

MenuItems['prison:attachCollar'] = {
    data = {
        id = "prison:attachCollar",
        title = _L("menu-players-attach-gps-collar", "Attach GPS Collar"),
        icon = "#prisoner-collar",
        event = "vrp-jail:attachCollar"
    }
}

MenuItems['prison:currentInfo'] = {
    data = {
        id = "prison:currentInfo",
        title = _L("menu-players-get-prisoner-info", "Get Prisoner Info"),
        icon = "#prisoner-info",
        event = "vrp-jail:showPrisonerInfo"
    }
}

MenuItems['prison:assignTask'] = {
    data = {
        id = "prison:assignTask",
        title = _L("menu-players-assign-group-task", "Assign Group Task"),
        icon = "#prisoner-task",
        event = "vrp-jail:assignTask"
    }
}

MenuItems['prison:assignGroup'] = {
    data = {
        id = "prison:assignGroup",
        title = _L("menu-players-assign-group", "Assign Group"),
        icon = "#prisoner-group",
        event = "vrp-jail:assignGroup"
    }
}

MenuItems['prison:getCell'] = {
    data = {
        id = "prison:getCell",
        title = _L("menu-players-view-cell", "View Assigned Cell"),
        icon = "#prisoner-info",
        event = "vrp-jail:getOthersCell"
    }
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-injecthero",
        title = "Inject herodrenaline",
        icon = "#general-herodrenaline",
        event = "vrp-heroin:injectHerodrenaline"
    },
    isEnabled = function(pEntity, pContext)
        local hasSyringe = exports["vrp-inventory"]:hasEnoughOfItem("herodrenaline_syringe", 1, false, true)
        return hasSyringe and not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isDead']
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-biteplayer",
        title = "Bite",
        icon = "#general-bite",
        event = "vrp-vampire:bitePlayer"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and isVampire
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-biteplayer2",
        title = "Mega Bite",
        icon = "#general-bite",
        event = "vrp-vampire:megaBitePlayer"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and isVampire
    end
}
