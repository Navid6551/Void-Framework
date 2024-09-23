import { MainJObs } from "./jobs";
import { MainActions } from "./main";
import { NuiActions } from "./nui-actions"

export const Init = async (): Promise<void> => {
    await NuiActions();
    await MainActions();
    await MainJObs();
}