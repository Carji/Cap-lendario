import { Clock } from '../clock/clock.js'
import { MonthDate } from '../monthdate/monthDate.js'
import { DayCalendar } from '../daycalendar/dayCalendar.js'
import { SystemDate } from '../systemdate/systemDate.js'
import { EventDate } from '../eventdate/eventdate.js'
import { PubSub } from '../../services/pubSub.js'
import { PUB_SUB_INSTANCE } from '../../services/config.js'
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
            SystemDate.getComponentName(),
            MonthDate.getComponentName(),
            DayCalendar.getComponentName(),
            EventDate.getComponentName()];
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