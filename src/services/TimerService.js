import { PubSub } from "./PubSub.js"
import { INTERVAL, CHANELS } from "./Config.js"
import { timerInterface } from "./TimerInterface.js"

class TimerService{

    constructor (pubsub, timerInterface) {
        this._pubsub = pubsub
        this._timerInterface = timerInterface
        this._intervalID = this._timerInterface.setInterval(() => {
            const date = new Date();
            this._pubsub.emit(CHANELS.CHANGEDATE, date)
        }, INTERVAL);
    }
    dispose() {
        this._timerInterface.clearInterval(this._intervalID);
    }
}
//TODO: VA A HABER PROBLEMAS
export default new TimerService(new PubSub(), timerInterface)