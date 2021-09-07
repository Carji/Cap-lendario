import { FormatService } from "../../services/formatService.js"
import pubSub from "../../services/pubSub.js"
import { CHANNELS } from "../../services/config.js"

class EventDate extends HTMLElement {

    constructor() {
        super();
        this.date = new Date();
    }

    _formatDate() {
        return FormatService.getSelectedDate(this.date);
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        const div = document.createElement("div");
        const text = document.createTextNode(this._formatDate());
        div.appendChild(text);
        shadow.appendChild(div);
        this._dispose = pubSub.on(CHANNELS.CHANGESELECTEDATE, (date) => {
            if (!DateService.isToday(date, new Date())) {
                this.date = date;
                text.data = this._formatDate();
            }
        });
    }

    disconnectedCallback() {
        this._dispose && this._dispose();
    }
}

window.customElements.define("cap-event-date", EventDate);
