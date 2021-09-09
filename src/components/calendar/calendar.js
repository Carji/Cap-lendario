import { Clock } from '../clock/clock.js'
import '../monthdate/monthDate.js'
import '../daycalendar/dayCalendar.js'
import '../systemdate/systemDate.js'
import { PubSub } from '../../services/pubSub.js'
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
            "cap-month-date",
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
        this.removeEventListener("getpubsub", this._handlerPubSub);
    }
    _setStyle(shadow) {
        shadow.adoptedStyleSheets = [css];
    }
}

customElements.define("cap-calendar", Calendar)