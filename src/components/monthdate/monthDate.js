import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { DateService } from "../../services/dateService.js"
import { Mixin, MixinGlobal, MixinInstance } from "../core/mixin.js"
import css from "./monthDate.css.js"

export class MonthDate extends Mixin(ComponentDateBase, MixinGlobal, MixinInstance) {

    constructor() {
        super();
    }
    connectedCallback() {
        this.dispatchInstance();
        this.dispatchGlobal();
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
