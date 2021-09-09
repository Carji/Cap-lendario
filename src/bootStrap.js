import { TimerService } from './services/timerService.js'
import { PubSub } from './services/pubSub.js'
import { timerInterface } from './services/timerInterface.js'
import { PUB_SUB_INSTANCE } from './services/config.js'

customElements.whenDefined("cap-calendar").then(async () => {
    const pubSub = new PubSub();
    const timerService = new TimerService(pubSub, timerInterface);
    window.addEventListener('beforeunload', (e) => {
        timerService.dispose();
        pubSub.dispose();
    });
    document.addEventListener(PUB_SUB_INSTANCE.GLOBAL, (event) => {
        event.detail && (event.detail.pubSubInstance = pubSub);
    });
    timerService.init();

});
async function load() {
    await import("../src/components/calendar/calendar.js");
}

load();