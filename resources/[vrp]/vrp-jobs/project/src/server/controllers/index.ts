import { GroupSystem } from "./group-system"
import { ServerSideJos } from "./jobs";

export function getDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const deltaZ = z2 - z1;
    
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
}

export const Init = async (): Promise<void> => {
    await GroupSystem();
    await ServerSideJos();
}