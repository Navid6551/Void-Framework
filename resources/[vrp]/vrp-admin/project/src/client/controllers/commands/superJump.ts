let superJumpTick: any = null;

export async function toggleSuperJump(pEnabled: boolean) {
    if (pEnabled)
        superJumpTick = setTick(() => {
            doSuperJump();
        });
    else {
        clearTick(superJumpTick);
    }
}

function doSuperJump() {
    if (IsPedJumping(PlayerPedId())) {
        SetPedCanRagdoll(PlayerPedId(), false);
    }
    SetSuperJumpThisFrame(PlayerId());
}