import { INTERVAL, CHANNELS } from "./config.js"

export class TimerService {

    constructor(pubsub, timerInterface) {
        this._pubsub = pubsub
        this._timerInterface = timerInterface
    }
    init(){
        this._intervalID = this._timerInterface.setInterval(() => {
            const date = new Date();
            this._pubsub.emit(CHANNELS.CHANGEDATE, date)
        }, INTERVAL);
    }
    dispose() {
        this._timerInterface.clearInterval(this._intervalID);
    }
}