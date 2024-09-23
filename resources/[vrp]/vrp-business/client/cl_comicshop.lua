-- second part of this is for the pastels company, only here to save copy pasta

AddEventHandler("vrp-business:comicshop:writeBook", function(pData)
  if not pData.business then return end

  RefreshEmploymentList()

  local hasPermission = HasPermission(pData.business, "craft_access")

  if not hasPermission then
    return TriggerEvent("DoLongHudText", "You do not have access.", 2)
  end

  TriggerEvent("vrp-books:writeBook")
end)

AddEventHandler("vrp-business:comicshop:copyBook", function(pData)
  if not pData.business then return end

  RefreshEmploymentList()

  local hasPermission = HasPermission(pData.business, "craft_access")

  if not hasPermission then
    return TriggerEvent("DoLongHudText", "You do not have access.", 2)
  end

  TriggerEvent("vrp-books:copyBook")
end)

AddEventHandler('vrp-business:ped:comicRecycleGive', function()
    TriggerEvent('server-inventory-open', '1', 'comicshop_recycle')
end)

AddEventHandler('vrp-business:ped:comicRecycle', function()
    local ped = PlayerPedId()
    FreezeEntityPosition(ped, true)
    local finished = exports["vrp-taskbar"]:taskBar(30000, 'Scrapping items...')
    FreezeEntityPosition(ped, false)
    if finished ~= 100 then return end
    TriggerServerEvent('vrp-inventory:comicshop-recycle')
end)

CreateThread(function()
  exports["vrp-polytarget"]:AddBoxZone(
    "comic_shop_writing_table",
    vector3(-144.68, 218.17, 94.99), 1.2, 1.0,
    {
      minZ = 94.64,
      maxZ = 96.04
    }
  );

  exports["vrp-interact"]:AddPeekEntryByPolyTarget(
    "comic_shop_writing_table",
    {
      {
        event = "vrp-business:comicshop:writeBook",
        id = "comic_shop_book_write",
        icon = "book",
        label = "Write a book",
        parameters =  { business = "comic_store" },
      },
      {
        event = "vrp-business:comicshop:copyBook",
        id = "comic_shop_book_copy",
        icon = "copy",
        label = "Copy a book",
        parameters =  { business = "comic_store" },
      }
    },
    {
      distance = { radius = 2.0 }
    }
  ) 

  exports["vrp-polytarget"]:AddBoxZone(
    "pastels_shop_writing_table",
    vector3(707.23,-966.9,30.41), 1.2, 1.0,
    {
      minZ = 28.64,
      maxZ = 32.04
    }
  );

  exports["vrp-interact"]:AddPeekEntryByPolyTarget(
    "pastels_shop_writing_table",
    {
      {
        event = "vrp-business:comicshop:writeBook",
        id = "pastels_shop_book_write",
        icon = "book",
        label = "Create Magazine",
        parameters =  { business = "ottos_pastels" },
      },
      {
        event = "vrp-business:comicshop:copyBook",
        id = "pastels_shop_book_copy",
        icon = "copy",
        label = "Copy Magazine",
        parameters =  { business = "ottos_pastels" },
      }
    },
    {
      distance = { radius = 1.0 }
    }
  )


  -- Jeweled Dragon File Cabinet (for detective business but their stuff is in a vrp-housing shop)
  exports['vrp-polytarget']:AddBoxZone(
    'jeweled_dragon_writing_table',
    vector3(-707.81, -893.89, 19.52), 0.6, 1.6,
    {
      minZ = 18.97,
      maxZ = 19.77
    }
  );

  exports['vrp-interact']:AddPeekEntryByPolyTarget(
    'jeweled_dragon_writing_table',
    {
      {
        event = 'vrp-business:comicshop:writeBook',
        id = 'jeweled_dragon_book_write',
        icon = 'book',
        label = 'Write a book',
        parameters =  { business = 'dragon_eye_detective_agency_(deda)' },
      },
      {
        event = 'vrp-business:comicshop:copyBook',
        id = 'jeweled_dragon_book_copy',
        icon = 'copy',
        label = 'Copy a book',
        parameters =  { business = 'dragon_eye_detective_agency_(deda)' },
      }
    },
    {
      distance = { radius = 2.0 }
    }
  )

  exports['vrp-interact']:AddPeekEntryByPolyTarget(
    'liquid_library_writing_table',
    {
      {
        event = 'vrp-business:comicshop:writeBook',
        id = 'liquid_library_book_write',
        icon = 'book',
        label = 'Write a book',
        parameters =  { business = 'tavern' },
      },
      {
        event = 'vrp-business:comicshop:copyBook',
        id = 'liquid_library_book_copy',
        icon = 'copy',
        label = 'Copy a book',
        parameters =  { business = 'tavern' },
      }
    },
    {
      distance = { radius = 2.0 }
    }
  )

end)
