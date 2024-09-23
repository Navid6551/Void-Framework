export const drawMarker = (type, position, color, scaleX = 0.4, scaleY = 0.4, scaleZ = 0.4, alpha = 0) => {
    DrawMarker(type, position.x, position.y, position.z, 0, 0, 0, 0, 0, alpha, scaleX, scaleY, scaleZ, color[0], color[1], color[2], color[3], false, false, 2, false, null, null, false);
};

export const drawText = (
    x: number,
    y: number,
    text: string,
    color: [number, number, number, number],
    scale: number,
    font: number,
) => {
    SetTextFont(font);
    SetTextProportional(true);
    SetTextScale(scale, scale);
    SetTextColour(color[0], color[1], color[2], color[3]);
    SetTextDropshadow(0, 0, 0, 0, 255);
    SetTextEdge(2, 0, 0, 0, 150);
    SetTextDropShadow();
    SetTextOutline();
    SetTextEntry("STRING");
    AddTextComponentString(text);
    DrawText(x, y);
};

export const drawTxt = (
    x: number,
    y: number,
    width: number,
    height: number,
    scale: number,
    text: string,
    color: [number, number, number, number],
) => {
    SetTextFont(0);
    SetTextProportional(false);
    SetTextScale(0.25, 0.25);
    SetTextColour(color[0], color[1], color[2], color[3]);
    SetTextDropshadow(0, 0, 0, 0, 255);
    SetTextEdge(1, 0, 0, 0, 255);
    SetTextDropShadow();
    SetTextOutline();
    SetTextEntry("STRING");
    AddTextComponentString(text);
    DrawText(x - width / 2, y - height / 2 + 0.005);
};

export const drawTextBox = (
    coords: Vector3,
    distance: number,
    text: string,
    color: [number, number, number, number],
    font = 4,
) => {
    SetDrawOrigin(coords.x, coords.y, coords.z, 0);
    const scale = Math.max(map_range(distance, 0.0, 10.0, 0.4, 0.25), 0.1);
    drawText(0, 0, text, color, scale, font);
    ClearDrawOrigin();
};

export const GetDrawTextWdith = (text: string, font: number, scale: number) => {
    BeginTextCommandWidth("STRING");
    AddTextComponentString(text);
    SetTextFont(font);
    SetTextScale(scale, scale);
    return EndTextCommandGetWidth(true);
};

export const cameraToWorld = (flags: number, ignore: number) => {
    const cameraPosition = GetGameplayCamCoord();
    const [pitch, , yaw] = GetGameplayCamRot(0).map(angle => Math.PI / 180 * angle);
    const cosPitch = Math.abs(Math.cos(pitch));
    const direction = [-Math.sin(yaw) * cosPitch, Math.cos(yaw) * cosPitch, Math.sin(pitch)];
    const startPoint = direction.map((component, index) => cameraPosition[index] + component);
    const endPoint = direction.map((component, index) => cameraPosition[index] + component * 200);
    const shapeTest = StartShapeTestSweptSphere(startPoint[0], startPoint[1], startPoint[2], endPoint[0], endPoint[1], endPoint[2], 0.2, flags, ignore, 7);
    return GetShapeTestResultIncludingMaterial(shapeTest);
};

export const map_range = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const getDistanceBetweenCoords = (pCoordOne: number[], pCoordTwo: number[]) => {
    return Math.sqrt(
        Math.pow(pCoordTwo[0] - pCoordOne[0], 2) +
        Math.pow(pCoordTwo[1] - pCoordOne[1], 2) +
        Math.pow(pCoordTwo[2] - pCoordOne[2], 2),
    );
}