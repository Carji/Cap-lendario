import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { DateService } from "../../services/dateService.js"

class MonthDate extends ComponentDateBase {

    _formatDate() {
        return FormatService.getMonthDate(this.date);
    }

    _changeDate(value) {
        return !this.date || !DateService.isThisMonth(value, this._oldDate);
    }
}

window.customElements.define("cap-month-date", MonthDate);
