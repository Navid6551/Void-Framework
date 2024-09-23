import { InitConfig } from "./config"

export const Init = async (): Promise<void> => {
    await InitConfig();
}