import pubSub from "./pubSub.js"
import { INTERVAL, CHANNELS } from "./config.js"
import { timerInterface } from "./timerInterface.js"

class TimerService {

    constructor(pubsub, timerInterface) {
        this._pubsub = pubsub
        this._timerInterface = timerInterface
        this._intervalID = this._timerInterface.setInterval(() => {
            const date = new Date();
            this._pubsub.emit(CHANNELS.CHANGEDATE, date)
        }, INTERVAL);
    }
    dispose() {
        this._timerInterface.clearInterval(this._intervalID);
    }
}

export default new TimerService(pubSub, timerInterface)