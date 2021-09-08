import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"

class Clock extends ComponentDateBase {

  
    _formatDate() {
        return FormatService.getTime(this.date);
    }

    _changeDate(value) {
        return true;
    }

    _getStyle() {
        const style = super._getStyle();
        style.textContent=`
            :host {
                font-size: 3rem;
                display: block;
                background-color: var(--background-color);
                color: var(--color);
                }
        
        `;
        return style;
    }
    
    

}

window.customElements.define("cap-clock", Clock);