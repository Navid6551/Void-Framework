import { Procedures } from "@vpx/client";

export async function showLockdownStats() {
    const lockDownStats = await RPC.execute<any[]>('vrp-supression:lockDownStats');

    const sortedLockDownStats = lockDownStats.sort((a: any, b: any) => {
        let first = 0;
        let second = 0;
        for (const value of Object.values(a.events) as any) {
            first += value;
        }
        for (const value of Object.values(b.events) as any) {
            second += value;
        }
        return second - first;
    });

    const menuData = [];
    for (const stats of Object.values(sortedLockDownStats) as any) {
        let totalCount = 0;
        for (const value of Object.values(stats.events) as any) {
            totalCount += value;
        }
        menuData.push({
            title: `Server ID: ${stats.serverId}`,
            description: `Total Count: ${totalCount}`,
            children: Object.entries(stats.events).map(([key, value]) => ({
                title: `Event: ${key} | Count: ${value}`,
                description: ''
            }))
        });
    }
    global.exports['vrp-ui'].showContextMenu(menuData);
}