import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { DateService } from "../../services/dateService.js"
//import css from "./monthDate.css" assert { type: "css" };
import {PUB_SUB_INSTANCE} from '../../services/config.js'
import css from "./monthDate.css.js"

class MonthDate extends ComponentDateBase {

    constructor() {
        super();
        this._pubSubInstance = null;

    }
    connectedCallback() {
        super.connectedCallback();
        const event = new CustomEvent(PUB_SUB_INSTANCE.INSTANCE, {
            detail: this,
            bubbles: true,
            composed: true,
            cancelable:true,
        });
        this.dispatchEvent(event);
    }
    set pubSubInstance(value) {
        this._pubSubInstance = value;
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
}

window.customElements.define("cap-month-date", MonthDate);
