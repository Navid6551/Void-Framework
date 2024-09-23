export let pCurJob: string = "unemployed";
export let isMedic = true;
export let isCop = false;
export let isDoc = false;
export let isDoctor = false;
export let isNews = false;
export let isJudge = false;

onNet('vrp-jobmanager:playerBecameJob', (pJob: string, pName: string, pNotify: boolean) => {
    if (isMedic && pJob !== "ems") isMedic = false;
    else {
        if (isCop && pJob !== "police") {
            isCop = false;
        } else {
            if (isDoc && pJob !== "doc") isDoc = false;
            else {
                if (isDoctor && pJob !== "doctor") {
                    isDoctor = false;
                } else isNews && pJob !== "news" && (isNews = false);
            }
        }
    }
    if (pJob === "police") isCop = true;
    else {
        if (pJob === "ems") isMedic = true;
        else {
            if (pJob === "news") {
                isNews = true;
            } else {
                if (pJob === "doctor") {
                    isDoctor = true;
                } else {
                    if (pJob === "doc") {
                        isDoc = true;
                    }
                }
            }
        }
    }
    pCurJob = pJob;
});

onNet('isJudge', () => {
    isJudge = true;
});

onNet('isJudgeOff', () => {
    isJudge = false;
});

export function isCopOrDoctor() {
    return isCop || isDoctor;
}

export function isDoctorOrMedic() {
    return isDoctor || isMedic;
}