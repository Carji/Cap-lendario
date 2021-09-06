import { PubSub } from "./PubSub.js"
import { INTERVAL } from "./Config.js"
import { timerInterface } from "./TimerInterface.js"

class TimerService{

    constructor (pubsub, timerInterface) {
        this._pubsub = pubsub
        this._timerInterface = timerInterface
    }
}

export default new TimerService(new PubSub(), timerInterface)