import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { DateService } from "../../services/dateService.js"
import { Mixin, MixinGlobal } from "../core/mixin.js"
import css from "./systemDate.css.js"


export class SystemDate extends Mixin(ComponentDateBase, MixinGlobal) {

    connectedCallback() {
        this.dispatchGlobal();
    }
    _formatDate() {
        return FormatService.getSystemDate(this.date);
    }
    _changeDate(value) {
        return !this.date || !DateService.isToday(value, this._oldDate);
    }
    _getStyle() {
        this._shadow.adoptedStyleSheets = [css];
    }
    static getComponentName() {
        return "cap-system-date";
    }

}

window.customElements.define(SystemDate.getComponentName(), SystemDate);