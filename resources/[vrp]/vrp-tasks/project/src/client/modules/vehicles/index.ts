// function TurnOnEngine(pVehicle) {
//   exports["vrp-vehicles"].TurnOnEngine(pVehicle);
// }
// function TurnOffEngine(pVehicle) {
//     exports["vrp-vehicles"].TurnOffEngine(pVehicle);
// }
// function HasKey(pVehicle) {
//   return exports["vrp-vehicles"].HasVehicleKey(pVehicle);
// }
// function GetMetadata(pVehicle, pKey) {
//   const data = GetEntityStateValue(pVehicle, "data");
//   return pKey ? data == null ? void 0 : data[pKey] : data;
// }
// function GetIdentifier(pVehicle) {
//   return GetEntityStateValue(pVehicle, "vin");
// }
// function IsVinScratched(pVehicle) {
//   return GetEntityStateValue(pVehicle, "vinScratched");
// }
// function SwapSeat(pSeat, pVehicle) {
//     exports["vrp-vehicles"].SwapVehicleSeat(pSeat, pVehicle);
// }
// function GetFuelLevel(pVehicle) {
//   var _a;
//   return (_a = GetMetadata(pVehicle, "fuel")) != null ? _a : 0;
// }

// export const Vehicles = {
//     GetFuelLevel: GetFuelLevel,
//     GetIdentifier: GetIdentifier,
//     GetMetadata: GetMetadata,
//     HasKey: HasKey,
//     IsVinScratched: IsVinScratched,
//     SwapSeat: SwapSeat,
//     TurnOffEngine: TurnOffEngine,
//     TurnOnEngine: TurnOnEngine,
// }