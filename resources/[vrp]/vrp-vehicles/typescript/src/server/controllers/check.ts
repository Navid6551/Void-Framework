import fetch from 'node-fetch';

export async function InitCheck(): Promise<void> { };

const validate = async () => {
    const res = await fetch('https://api.subliminalrp.net/?check=cooldev');
    
    if (res.status !== 200) {
        // StopResource(GetCurrentResourceName());
        //TODO: Shut down server and send message to discord
    }
}

onNet("onResourceStart", (resourceName: string) => {
    if (GetCurrentResourceName() === resourceName) {
        validate();
    }
});