RESTAURANT_DATA = {
    {
      name = "Player Shop",
      short = "ps",
      code = "playershop",
      ingredients = 1,
    },
    {
      name = "Snr.Buns",
      short = "Snr",
      code = "snr_buns",
      ingredients = 1,
    },
    {
      name = "Rooster's Rest",
      short = "rr",
      code = "rooster",
      ingredients = 1,
    },
    {
      name = "Maldinis",
      short = "mal",
      code = "maldinis",
      ingredients = 1,
    },
    {
      name = "Uwu Cafe",
      short = "uwu",
      code = "uwu_cafe",
      ingredients = 1,
    },
    {
      name = "Prison",
      short = "prison",
      code = "prison_cooks",
      ingredients = 1,
    },
}

function GetBusinessConfig(pCode)
  for _, r in pairs(RESTAURANT_DATA) do
    if r.code == pCode then
      return r
    end
  end
  return RESTAURANT_DATA[1]
end

MAX_EMPLOYEES = 6
MAX_RECEIPTS_PER_HOUR = 40
MENU_CHANGE_COOLDOWN = 60 * 60 * 1000 -- 1hr in ms
RECEIPTS_INTERVAL = 1000 * 60 * 2.5

AddEventHandler('vrp-config:configLoaded', function(configId, config)
  if (configId ~= "vrp-restaurants") then return end

  MAX_EMPLOYEES = config.maxEmployees
  MAX_RECEIPTS_PER_HOUR = config.maxReceiptsPerHour
  MENU_CHANGE_COOLDOWN = config.menuChangeCooldown * 60 * 1000
end)

AddEventHandler(IsDuplicityVersion() and 'onServerResourceStart' or 'onClientResourceStart', function(resource)
  if (resource ~= GetCurrentResourceName()) then return end

  local config = exports['vrp-config']:GetModuleConfig('vrp-restaurants')

  if (not config) then return end

  MAX_EMPLOYEES = config.maxEmployees
  MAX_RECEIPTS_PER_HOUR = config.maxReceiptsPerHour
  MENU_CHANGE_COOLDOWN = config.menuChangeCooldown * 60 * 1000
  RECEIPTS_INTERVAL = config.receiptsInterval * 60 * 1000
end)
