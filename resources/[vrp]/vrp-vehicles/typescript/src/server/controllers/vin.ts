/*
 * 3MNSU86NP0K256601 (3-MN-SU-86-NP-0-K-25-60-01)
 * #1 creator [1 (world), 2 (script), 3(owned)]
 * #2 & #3 Vehicle origin [PM (PDM), MN (Menu)]
 * #4 & #5 Vehicle class
 * #6 & #7 Last two digits of the model hash
 * #8 & #9 NPX Server ID [NP (Whitelisted), PA (Public A)]
 * #10 year of creation
 * #11 month of creation
 * #12 to #17 Random ID
 *   
**/

const vehicleClasses = {
    0: "CO",
    1: "SE",
    2: "SU",
    3: "CO",
    4: "MU",
    5: "SP",
    6: "SP",
    7: "SU",
    8: "MO",
    9: "OF",
    10: "IN",
    11: "UT",
    12: "VA",
    13: "CY",
    14: "BO",
    15: "HE",
    16: "PL",
    17: "SE",
    18: "EM",
    19: "MI",
    20: "CO",
    21: "TR"
}

export function GenerateIdentificationNumber(pType: string, pOrigin: string, pVehicleClass: number, pModelHash: number) {
    const year = new Date().getFullYear().toString().slice(-2);
    const month = new Date().getMonth() + 1;
    const random = Math.floor(Math.random() * 100000);
    const serverId = "BS";
    const vehicleClass = vehicleClasses[pVehicleClass] || "CO";
    const modelHash = pModelHash.toString().slice(-2);

    let type = 1;
    switch (pType) {
        case "owned":
            type = 3;
            break;
        case "script":
            type = 2;
            break;
        case "world":
            type = 1;
            break;
    }

    let origin = "MN";
    switch (pOrigin) {
        case "menu":
            origin = "MN";
            break;
        case "pdm":
            origin = "PM";
            break;
        case "tuner":
            origin = "TN";
            break;
        case "pd":
            origin = "PD";
            break;
        case "rental":
            origin = "RN";
            break;
        case "job":
            origin = "JB";
            break;
        case "arcade":
            origin = "AR";
            break;
    }

    const identificationNumber = `${type}${origin}${vehicleClass}${modelHash}${serverId}${year}${month}${random}`;

    return identificationNumber
}

export function GetDecryptedVIN(vin: string) {
    return vin.replace(/[A-Z]/g, function (c) {
        return String.fromCharCode((c as any).charCodeAt(0) + 0x20);
    }).toUpperCase();
}