const QBCore = globalThis.exports['vrp-core'].GetCoreObject()
export function FindPlayerIdById(pId: number) {
    for (let i = 0; i < GetNumPlayerIndices(); i++) {
        const source = GetPlayerFromIndex(i);
        const user = QBCore.Functions.GetPlayer(Number(source));

        if (user && Number(user.PlayerData.citizenid) === Number(pId)) {
            return Number(source);
        }
    }
}

export const Delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function GetUserData(pSource: number) {
    return {}//Base.getModule('Player').GetUser(pSource);
}

export function GenerateRandomPhoneNumber(pPlateHash: number): number {
    return Number(`${Math.random() > 0.5 ? 415 : 628}${pPlateHash}`);
}

export function GenerateRadarMessage(pIsFlagged = false, pFirstName: string, pLastName: string, pPhone: number, pPlate: string): string {
    if (!pPhone) {
        // Why is phone null/undefined?
        console.log('[VEHICLES]', pFirstName, pLastName, pPhone, pPlate);
    }
    return `${pIsFlagged ? '10-60 (Flagged)' : '10-74 (Negatvie)'}\nName: ${pFirstName} ${pLastName}\nPhone: ${pPhone}\nPlate: ${pPlate}`
}

export function GetRandom(pMin: number, pMax?: number) {
    const pResult = pMax ? Math.random() * (pMax - pMin) + pMin : Math.random() * pMin;
    return Number.isInteger(pMin) ? Math.round(pResult) : pResult;
}

export async function getRegistrationText(name: string, model: string, plate: string, vin: string) {
    const ownershipHistory = await SQL.execute<{ buyer_name: string, seller_name: string, sell_date: number }[]>('SELECT * FROM `_car_sale` WHERE `vin` = ?', [vin]);
    if (!ownershipHistory) return;

    const ownershipRows = ownershipHistory.map((row) => `| ${row.buyer_name} | ${row.seller_name} | ${row.sell_date} |`).join('\n');
    
    return `\n## San Andreas DMV\n\n|    | **Data** |\n|----|----|\n| **Name** | ${name} |\n| **Model** | ${model} |\n| **Plate** | ${plate} |\n| **VIN** | ${vin} |\n\n## Ownership history\n\n| **Owner** | **Seller** | **Date** |\n|----|----|----|\n${ownershipRows}`;
}

export function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}