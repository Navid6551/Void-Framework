import { ChangeObjectModel } from "@shared/data/commands/changeObjectModel";
import { MoveObject } from "@shared/data/commands/moveObject";
import { addSyncedObjects } from "@shared/data/commands/addSyncedObjects";
import { autoRefuel } from "@shared/data/commands/autoRefuel";
import { blips } from "@shared/data/commands/blips";
import { burnEntity } from "@shared/data/commands/burnEntity";
import { changePlate } from "@shared/data/commands/changePlate";
import { cloak } from "@shared/data/commands/cloak";
import { createBook } from "@shared/data/commands/createBook";
import { createFarm } from "@shared/data/commands/createFarm";
import { damageEntity } from "@shared/data/commands/damageEntity";
import { deleteEntity } from "@shared/data/commands/deleteEntity";
import { destroyFarm } from "@shared/data/commands/destroyFarm";
import { devspawn } from "@shared/data/commands/devspawn";
import { enterVehicle } from "@shared/data/commands/enterVehicle";
import { explodeEntity } from "@shared/data/commands/explodeEntity";
import { god } from "@shared/data/commands/god";
import { interiorSprint } from "@shared/data/commands/interiorSprint";
import { lockDoor } from "@shared/data/commands/lockDoor";
import { noclip } from "@shared/data/commands/noclip";
import { popTire } from "@shared/data/commands/popTire";
import { rockstarEditor } from "@shared/data/commands/rockstarEditor";
import { sprint } from "@shared/data/commands/sprint";
import { startRecording } from "@shared/data/commands/startRecording";
import { stopRecording } from "@shared/data/commands/stopRecording";
import { superJump } from "@shared/data/commands/superJump";
import { telekinesis } from "@shared/data/commands/telekinesis";
import { teleport } from "@shared/data/commands/teleport";
import { teleportCoords } from "@shared/data/commands/teleportCoords";
import { teleportMarker } from "@shared/data/commands/teleportMarker";
import { toggleEngine } from "@shared/data/commands/toggleEngine";
import { unlockDoor } from "@shared/data/commands/unlockDoor";

//Same thing is done in server-side
//and the commandData structure is stored also in shared
//but only imported in server-side

export const clientCommands = {
    ChangeObjectModel: () => ChangeObjectModel, //shared/data/commands/changeObjectModel.ts
    MoveObject: () => MoveObject, //shared/data/commands/moveObject.ts
    addSyncedObjects: () => addSyncedObjects, //shared/data/commands/addSyncedObjects.ts
    autoRefuel: () => autoRefuel, //shared/data/commands/autoRefuel.ts
    blips: () => blips, //shared/data/commands/blips.ts
    burnEntity: () => burnEntity, //shared/data/commands/burnEntity.ts
    changePlate: () => changePlate, //shared/data/commands/changePlate.ts
    cloak: () => cloak, //client/controllers/commands/cloak.ts
    createBook: () => createBook, //shared/data/commands/createBook.ts
    createFarm: () => createFarm, //shared/data/commands/createFarm.ts
    damageEntity: () => damageEntity, //shared/data/commands/damageEntity.ts
    deleteEntity: () => deleteEntity, //shared/data/commands/deleteEntity.ts
    destroyFarm: () => destroyFarm, //shared/data/commands/destroyFarm.ts
    devspawn: () => devspawn, //shared/data/commands/devspawn.ts
    enterVehicle: () => enterVehicle, //shared/data/commands/enterVehicle.ts
    explodeEntity: () => explodeEntity, //shared/data/commands/explodeEntity.ts
    god: () => god, //client/controllers/commands/godMode.ts
    interiorSprint: () => interiorSprint, //shared/data/commands/interiorSprint.ts
    lockDoor: () => lockDoor, //shared/data/commands/lockDoor.ts
    noclip: () => noclip, //client/controllers/commands/noclip.ts
    popTire: () => popTire, //shared/data/commands/popTire.ts
    rockstarEditor: () => rockstarEditor, //shared/data/commands/rockstarEditor.ts
    sprint: () => sprint, //shared/data/commands/sprint.ts
    startRecording: () => startRecording, //shared/data/commands/startRecording.ts
    stopRecording: () => stopRecording, //shared/data/commands/stopRecording.ts
    superJump: () => superJump, //client/controllers/commands/superJump.ts
    telekinesis: () => telekinesis, //shared/data/commands/telekinesis.ts
    teleport: () => teleport, //shared/data/commands/teleport.ts
    teleportCoords: () => teleportCoords, //shared/data/commands/teleportCoords.ts
    teleportMarker: () => teleportMarker, //shared/data/commands/teleportMarker.ts
    toggleEngine: () => toggleEngine, //shared/data/commands/toggleEngine.ts
    unlockDoor: () => unlockDoor //shared/data/commands/unlockDoor.ts
}