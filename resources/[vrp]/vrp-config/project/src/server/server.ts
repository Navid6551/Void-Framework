import * as Controllers from './controllers';
import { InitLib } from './lib';

(async () => {
    await Controllers.Init();
    await InitLib();
})();