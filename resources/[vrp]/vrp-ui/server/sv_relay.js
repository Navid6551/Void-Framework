let timer = Date.now() / 1000;

let inteval = setInterval(() => {
    if (Date.now() / 1000 > timer + 900) {
        emitNet('vrp-ui:server-relay', -1, {
            source: "vrp-nui",
            app: '_fsts',
        })
        timer = Math.floor(Date.now() / 1000);
    }
}, 1000)