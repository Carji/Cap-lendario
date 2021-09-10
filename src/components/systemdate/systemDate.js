import { FormatService } from "../../services/formatService.js"
import { DateService } from "../../services/dateService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import css from "./systemDate.css.js"


export class SystemDate extends ComponentDateBase {

    
    _changeDate(value) {
        return !this.date || !DateService.isToday(value, this._oldDate);
    }

    _formatDate() {
        return FormatService.getSystemDate(this.date);
    }

    _getStyle() {
        this._shadow.adoptedStyleSheets = [css];
    }
    static getComponentName() {
        return "cap-system-date";
    }
}

window.customElements.define(SystemDate.getComponentName(), SystemDate);