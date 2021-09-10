import { Clock } from '../clock/clock.js'
import { MonthDate } from '../monthdate/monthDate.js'
import '../daycalendar/dayCalendar.js'
import '../systemdate/systemDate.js'
import { PubSub } from '../../services/pubSub.js'
import {PUB_SUB_INSTANCE} from '../../services/config.js'
import css from './calendar.css' assert { type: 'css' };


class Calendar extends HTMLElement {
    constructor() {
        super();
        this._pubSub = new PubSub();
        this.addEventListener("getpubsub", this._handlerPubSub);
        this._create();
    }
    _create() {
        const shadow = this.attachShadow({ mode: "open" });
        const components = [
            Clock.getComponentName(),
            "cap-system-date",
            MonthDate.getComponentName(),
            "cap-day-calendar"];
        components.forEach(component => {
            shadow.appendChild(document.createElement(component));
        })
        this._setStyle(shadow);
    }
    _handlerPubSub(event) {
        event.stopPropagation();
        event.detail && (event.detail.pubSubInstance = this._pubSub);
    }

    disconnectedCallback() {
        this.removeEventListener(PUB_SUB_INSTANCE.INSTANCE, this._handlerPubSub);
        this._pubSub.dispose();
    }
    _setStyle(shadow) {
        shadow.adoptedStyleSheets = [css];
    }
}

customElements.define("cap-calendar", Calendar)