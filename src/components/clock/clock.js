import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import { MixinGlobal, Mixin } from "../core/mixin.js"

export class Clock extends Mixin(ComponentDateBase, MixinGlobal) {


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
                background-color: var(--background-color);
                color: var(--color);
                }
        `;
        return style;
    }

    static getComponentName() {
        return "cap-clock";
    }

}

window.customElements.define(Clock.getComponentName(), Clock);