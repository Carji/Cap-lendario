import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { Mixin, MixinInstance } from "../core/mixin.js";

export class EventDate extends Mixin(ComponentDateBase, MixinInstance) {

    connectedCallback() {
        this.dispatchInstance();
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
