import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { CHANNELS } from "../../services/config.js";
import { Mixin, MixinInstance } from "../core/mixin.js";
import { DateService } from "../../services/dateService.js";

export class EventDate extends Mixin(ComponentDateBase, MixinInstance) {

    connectedCallback() {
        this.dispatchInstance();
    }
    _suscribe(pubSub, channel = CHANNELS.CHANGESELECTEDATE) {
        const dispose = pubSub.on(channel, (date) => {
            if (!DateService.isToday(this.date, date)) {
                this.date = date;
                this._update()
            }
        });
        this._disposables.push(dispose);
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
