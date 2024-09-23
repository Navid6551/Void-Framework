// import { Vector3 } from "./classes/vector";

var clamp = (value: any, min: any, max: any) => {
    return Math.min(Math.max(value, min), max);
};
var getMapRange = (from: any, to: any, scale: any) => {
    return to[0] + (scale - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
};
var getDistance = ([aX, aY, aZ], [bX, bY, bZ]) => {
    const [dX, dY, dZ] = [aX - bX, aY - bY, aZ - bZ];
    return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
};
var getRandomNumber = (pMin: any, pMax: any) => {
    return pMax ? Math.floor(Math.random() * (pMax - pMin + 1) + pMin) : Math.floor(Math.random() * pMin);
};

var subCoords = (coord1: any, coord2: any, scale = undefined) => {
    let result = {
        x: 0,
        y: 0,
        z: 0
    };

    result.x = (scale ? (coord1.x - coord2.x) * scale : coord1.x - coord2.x);
    result.y = (scale ? (coord1.y - coord2.y) * scale : coord1.y - coord2.y);
    result.z = (scale ? (coord1.z - coord2.z) * scale : coord1.z - coord2.z);

    return result;
}

const FormatCoords = (pX: number, pY: number, pZ: number) => {
    return {
        x: pX,
        y: pY,
        z: pZ,
    }
}

// var parseVector3 = (x: any, y: any, z: any) => {
//     if (x instanceof Vector3) {
//         return x;
//     } else if (x instanceof Array) {
//         return new Vector3(x);
//     } else if (typeof x === "object") {
//         return new Vector3(x);
//     }
//     if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
//         throw new Error("Invalid vector coordinates");
//     }
//     return new Vector3(x, y, z);
// };
export var MathUtils = {
    clamp,
    getMapRange,
    getDistance,
    getRandomNumber,
    FormatCoords,
    subCoords
    // parseVector3
};