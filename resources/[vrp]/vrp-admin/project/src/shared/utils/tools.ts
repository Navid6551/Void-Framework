import { Vector } from "../classes/vector";

export let Delay = (ms: any) => new Promise(res => setTimeout(res, ms));

export function ArrayToKeyValuePairs(array: any[]): any[] {
    const keyValuePairs: any = [];
    array.forEach((value, key) => keyValuePairs.push({
        key: key,
        value: value
    }));
    return keyValuePairs;
}

export function ArrayToMap(array: any[]): Map<any, any> {
    const map = new Map();
    array.forEach(item => map.set(item.key, item.value));
    return map;
}

export async function MatchCoords(str: string): Promise<Vector | null> {
    const numberRegex = /s?(-?\d{1,}\.?,?\d{1,})/g;
    const matches = str.match(numberRegex);
    if (!matches) return null;
    const coords = new Vector(+matches[0], +matches[1], +matches[2]);
    return coords;
}

export function GetDistance(pCoord1: number[], pCoord2: number[]) {
    const [x, y, z] = [pCoord1[0] - pCoord2[0], pCoord1[1] - pCoord2[1], pCoord1[2] - pCoord2[2]];
    return Math.sqrt(x * x + y * y + z * z);
}