import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { CHANNELS } from "../../services/config.js"

export class EventDate extends ComponentDateBase {

    connectedCallback() {
        this._suscribe(CHANNELS.CHANGESELECTEDATE);
    }

    _changeDate() {
        return true;
    }

    _formatDate() {
        return FormatService.getSelectedDate(this.date);
    }
    static getComponentName() {
        return "cap-event-date";
    }

}

window.customElements.define(EventDate.getComponentName(), EventDate);
