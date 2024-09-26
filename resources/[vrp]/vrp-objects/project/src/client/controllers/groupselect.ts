import { Vector3 } from "@shared/classes/vector";
import { Delay } from "@shared/utils/tools";
import { checkLineOfSight } from "./placement";

let isSelecting = false;

export async function InitGroupSelect() { }

const calculateRotation = (angle: number, from: Vector3, to: Vector3): Vector3 => {
    const direction = Vector3.fromObject(from).sub(to);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const rotatedX = direction.x * cosAngle - direction.y * sinAngle;
    const rotatedY = direction.x * sinAngle + direction.y * cosAngle;
    return new Vector3(rotatedX, rotatedY, 0).add(to);
};

const groupSelect = async (criteria: any, isValid: (entity: any) => boolean = () => true): Promise<[boolean, any[] | null]> => {
    if (isSelecting) {
        return [false, null];
    }

    isSelecting = true;

    const selectionRadius = criteria?.size ?? 2.5;
    const playerPed = PlayerPedId();
    let heading = GetEntityHeading(playerPed);
    let continueSelection = true;
    let isConfirming = true;
    let selectionPosition: Vector3 | undefined;

    const drawMarkerTick = setTick(() => {
        const [, isMarkerVisible, markerPos, , ,] = checkLineOfSight(
            33, 
            playerPed, 
            criteria?.distance ?? 10
        );
        const markerPosition = Vector3.fromArray(markerPos);

        if (isMarkerVisible) {
            selectionPosition = markerPosition;
            DrawMarker(
                43,
                markerPosition.x,
                markerPosition.y,
                markerPosition.z - 0.05,
                0, 0, 0, 
                0, 0, heading, 
                selectionRadius, 
                selectionRadius, 
                1.5,
                0, 
                255, 
                0, 
                100, 
                false, 
                false, 
                2, 
                false, 
                null, 
                null, 
                false
            );
        }
    });

    const controlTick = setTick(() => {
        DisableControlAction(0, 46, true);
        DisableControlAction(0, 36, true);
        DisableControlAction(0, 16, true);
        DisableControlAction(0, 17, true);

        const isControlPressed = IsDisabledControlPressed(0, 36);

        if (IsDisabledControlPressed(2, 17)) {
            heading += isControlPressed ? 1 : 5;
            if (!isControlPressed) heading = Math.round(heading);
        } else if (IsDisabledControlPressed(2, 16)) {
            heading -= isControlPressed ? 1 : 5;
            if (!isControlPressed) heading = Math.round(heading);
        }

        heading = (heading + 360) % 360;

        if (IsDisabledControlJustPressed(0, 200) || IsDisabledControlJustPressed(0, 177)) {
            continueSelection = false;
        }

        if (IsDisabledControlJustPressed(0, 46)) {
            isConfirming = false;
            continueSelection = false;
        }
    });

    while (continueSelection) {
        await Delay(1);
    }

    clearTick(drawMarkerTick);
    clearTick(controlTick);

    isSelecting = false;

    if (isConfirming || !selectionPosition) {
        return [false, null];
    }

    const entities = [
        ...GetGamePool('CPed'),
        ...GetGamePool('CObject'),
        ...GetGamePool('CVehicle')
    ];

    const selectedEntities: any[] = [];

    for (const entity of entities) {
        if (!DoesEntityExist(entity)) continue;

        const entityCoords = Vector3.fromArray(GetEntityCoords(entity, true));
        const rotatedCoords = calculateRotation(Math.PI / 180 * heading, entityCoords, selectionPosition);
        const isWithinSelection = 
            rotatedCoords.x >= selectionPosition.x - selectionRadius / 2 &&
            rotatedCoords.x <= selectionPosition.x + selectionRadius / 2 &&
            rotatedCoords.y >= selectionPosition.y - selectionRadius / 2 &&
            rotatedCoords.y <= selectionPosition.y + selectionRadius / 2 &&
            rotatedCoords.z >= selectionPosition.z - 0.5 &&
            rotatedCoords.z <= selectionPosition.z + 1;

        if (isWithinSelection && isValid(entity)) {
            selectedEntities.push(entity);
        }
    }

    return [true, selectedEntities];
};

global.exports('GroupSelect', groupSelect);
