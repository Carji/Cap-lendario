import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { Mixin, MixinGlobal } from "../core/mixin.js"

export class Clock extends Mixin(ComponentDateBase, MixinGlobal) {

    connectedCallback() {
        this.dispatchGlobal();
    }
    _formatDate() {
        return FormatService.getTime(this.date);
    }
    _changeDate(value) {
        return true;
    }
    _getStyle() {
        const style = super._getStyle();
        style.textContent = `
            :host {
                font-size: 3rem;
                display: block;
                font-weight: lighter;
                }
        `;
        return style;
    }
    static getComponentName() {
        return "cap-clock";
    }

}

window.customElements.define(Clock.getComponentName(), Clock);