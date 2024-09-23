export async function InitInteract(): Promise<void> {
    const addedInteract = false;
    const LaptopProp = [GetHashKey('prop_laptop_01a')];

    if (addedInteract) {
        const InteractOptions = {
            event: 'vrp-laptop:openLaptop',
            id: 'laptop',
            icon: 'laptop',
            label: 'Open',
            parameters: {}
        };
        const Distance = {
            radius: 3
        };
        const InteractData = {
            distance: Distance,
            isEnabled: () => {
                return true;
            }
        };
        Interact.AddPeekEntryByModel(LaptopProp, [InteractOptions], InteractData);
    }
}