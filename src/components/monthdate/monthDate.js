import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { DateService } from "../../services/dateService.js"
import { CHANNELS } from "../../services/config.js"
import { Mixin, MixinGlobal, MixinInstance } from "../core/mixin.js"
import css from "./monthDate.css.js"

export class MonthDate extends Mixin(ComponentDateBase, MixinGlobal, MixinInstance) {

    constructor() {
        super();
    }
    set pubSubInstance(value) {
        this._pubSubInstance = value;
        this._suscribe(value, CHANNELS.CHANGEMONTH);
    }
    connectedCallback() {
        this.dispatchInstance();
        this.dispatchGlobal();
    }
    _suscribe(pubSub, channel = CHANNELS.CHANGEDATE) {
        const dispose = pubSub.on(channel, (date) => {
            if (channel === 0) {
                if (!DateService.isThisMonth(date, date))
                    this.date = date;
            } else {
                this.date = DateService.getNextOrPreviousMonth(this.date, date);
                this._update()
            }
        });
        this._disposables.push(dispose);
    }
    _formatDate() {
        return FormatService.getMonthDate(this.date);
    }
    _changeDate(value) {
        return !this.date || !DateService.isThisMonth(value, this._oldDate);
    }
    _getStyle() {
        this._shadow.adoptedStyleSheets = [css];
    }
    static getComponentName() {
        return "cap-month-date";
    }

}

window.customElements.define(MonthDate.getComponentName(), MonthDate);
