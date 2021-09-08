import { FormatService } from "../../services/formatService.js"
import { DateService } from "../../services/dateService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"


class SystemDate extends ComponentDateBase {

    
    _changeDate(value) {
        return !this.date || !DateService.isToday(value, this._oldDate);
    }

    _formatDate() {
        return FormatService.getSystemDate(this.date);
    }
    
}

window.customElements.define("cap-system-date", SystemDate);