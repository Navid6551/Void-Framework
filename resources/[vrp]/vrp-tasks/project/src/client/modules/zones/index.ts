var ActiveZones = /* @__PURE__ */ new Set();
var ZoneHandlers = /* @__PURE__ */ new Map();
var NetworkedZones = /* @__PURE__ */ new Set();

on("vrp-polyzone:enter", (zone, data) => {
  ActiveZones.add(zone);
  if (data == null ? void 0 : data.id)
      ActiveZones.add(`${zone}-${data.id}`);
  if (NetworkedZones.has(zone))
      emitNet(`__sdk:zones:${zone}:enter`, data);
  const handlers = ZoneHandlers.get(`${zone}-enter`);
  if (handlers === void 0)
      return;
  for (const handler of handlers) {
      try {
          handler(data);
      } catch (e) {
          console.log(e);
      }
  }
});
on("vrp-polyzone:exit", (zone, data) => {
  ActiveZones.delete(zone);
  if (data == null ? void 0 : data.id)
      ActiveZones.delete(`${zone}-${data.id}`);
  if (NetworkedZones.has(zone))
      emitNet(`__sdk:zones:${zone}:exit`, data);
  const handlers = ZoneHandlers.get(`${zone}-exit`);
  if (handlers === void 0)
      return;
  for (const handler of handlers) {
      try {
          handler(data);
      } catch (e) {
          console.log(e);
      }
  }
});
// onNet(`__sdk:${client_ResourceName}:zones:add`, (entry) => {
//   registerZone(entry);
// });

var HasActiveZone = (zone: any, id: any = null) => {
  return ActiveZones.has(id ? `${zone}-${id}` : zone);
};

var AddOnEnterHandler = (zone: any, cb: any) => {
  var _a;
  const id = `${zone}-enter`;
  const handlers = (_a = ZoneHandlers.get(id)) != null ? _a : [];
  if (!ZoneHandlers.has(id))
    ZoneHandlers.set(id, handlers);
  handlers.push(cb);
};

var AddOnExitHandler = (zone: any, cb: any) => {
  var _a = null;
  const id = `${zone}-exit`;
  const handlers = (_a = ZoneHandlers.get(id)) != null ? _a : [];
  if (!ZoneHandlers.has(id))
      ZoneHandlers.set(id, handlers);
  handlers.push(cb);
};

var AddPolyZone = (id: any, zone: any, vectors: any, options: any, data = {}) => {
  const opt = { ...options, data, id };
  opt.data["id"] = id;
  exports["vrp-polyzone"].AddPolyZone(zone, vectors, opt);
};

var AddBoxZone = (id: any, zone: any, vectors: any, length: any, width: any, options: any, data = {}) => {
  const opt = { ...options, data, id };
  opt.data["id"] = id;
  exports["vrp-polyzone"].AddBoxZone(zone, vectors, length, width, opt);
};

var AddBoxTarget = (id: any, zone: any, vectors: any, length: any, width: any, options: any, data = {}) => {
  const opt = { ...options, data, id };
  opt.data["id"] = id;
  exports["vrp-polytarget"].AddBoxZone(zone, vectors, length, width, opt);
};

var AddCircleZone = (id: any, zone: any, vectors: any, radius: any, options: any, data = {}) => {
  const opt = { ...options, data, id };
  opt.data["id"] = id;
  exports["vrp-polyzone"].AddCircleZone(zone, vectors, radius, opt);
};

var AddCircleTarget = (id: any, zone: any, vectors: any, radius: any, options: any, data = {}) => {
  const opt = { ...options, data, id };
  opt.data["id"] = id;
  exports["vrp-polytarget"].AddCircleZone(zone, vectors, radius, opt);
};

var AddEntityZone = (id: any, zone: any, entity: any, options: any, data = {}) => {
  const opt = { ...options, data };
  opt.data["id"] = id;
  exports["vrp-polyzone"].AddEntityZone(zone, entity, opt);
};

var registerZone = (entry: any) => {
  switch (entry.type) {
    case "circle": {
      const { type, id, zone, vectors, radius, data, ...options } = entry;
      AddCircleZone(id, zone, vectors, radius, options, data);
      NetworkedZones.add(zone);
      break;
    }
    case "box": {
      const { type, id, zone, vectors, length, width, data, ...options } = entry;
      AddBoxZone(id, zone, vectors, length, width, options, data);
      NetworkedZones.add(zone);
      break;
    }
    case "poly": {
      const { type, id, zone, vectors, data, ...options } = entry;
      AddPolyZone(id, zone, vectors, options, data);
      NetworkedZones.add(zone);
      break;
    }
  }
};

var RemoveZone = (zone: any, id: any) => {
  exports["vrp-polyzone"].RemoveZone(zone, id);
  ActiveZones.delete(`${zone}-${id}`);
  NetworkedZones.delete(zone);
};

// on("onResourceStart", async (resource) => {
//   if (client_ResourceName !== resource)
//     return;
//   const zones = await RPC.execute(`__sdk:${client_ResourceName}:zones:fetch`);
//   Logger.debug(`[vrp-polyzone] [${client_ResourceName}] Loaded ${zones.length} zones`);
//   for (const entry of zones)
//     registerZone(entry);
// });

export const Zones = {
  isActive: HasActiveZone,
  onEnter: AddOnEnterHandler,
  onExit: AddOnExitHandler,
  addPolyZone: AddPolyZone,
  addBoxZone: AddBoxZone,
  addBoxTarget: AddBoxTarget,
  addCircleZone: AddCircleZone,
  addCircleTarget: AddCircleTarget,
  addEntityZone: AddEntityZone,
  removeZone: RemoveZone
}