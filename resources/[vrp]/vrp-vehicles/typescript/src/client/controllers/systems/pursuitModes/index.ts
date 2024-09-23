import { InitPursuitMode } from "./mode";
import { InitPursuitModes } from "./modes";

export async function InitPursuit() {
    DecorRegister('Vehicle:PursuitMode', 3);
    await InitPursuitMode();
    await InitPursuitModes();
}