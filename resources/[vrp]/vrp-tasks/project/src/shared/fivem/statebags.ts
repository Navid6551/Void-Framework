import { client_Cache } from "../classes/cache";

var StatebagCache = new client_Cache(5e3);

function GetEntityStateBag(pEntity) {
  let statebag = StatebagCache.get(`ent-${pEntity}}`);
  if (statebag)
    return statebag;
  statebag = {}//Entity(pEntity);
  StatebagCache.set(`ent-${pEntity}}`, statebag);
  return statebag;
}

function GetEntityStateValue(pEntity, pKey) {
  const statebag = GetEntityStateBag(pEntity);
  return statebag.state[pKey];
}

function SetEntityStateValue(pEntity, pKey, pValue, pReplicated = false) {
  const statebag = GetEntityStateBag(pEntity);
  statebag.state.set(pKey, pValue, pReplicated);
}

function GetPlayerStateBag(pServerId) {
  let statebag = StatebagCache.get(`ply-${pServerId}}`);
  if (statebag)
    return statebag;
  statebag = {}//Player(pServerId);
  StatebagCache.set(`ply-${pServerId}}`, statebag);
  return statebag;
}

function GetPlayerStateValue(pServerId, pKey) {
  const statebag = GetPlayerStateBag(pServerId);
  return statebag.state[pKey];
}

function SetPlayerStateValue(pServerId, pKey, pValue, pReplicated = false) {
  const statebag = GetPlayerStateBag(pServerId);
  statebag.state.set(pKey, pValue, pReplicated);
}