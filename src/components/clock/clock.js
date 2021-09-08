import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"

class Clock extends ComponentDateBase {

  
    _formatDate() {
        return FormatService.getTime(this.date);
    }

    _changeDate(value) {
        return true;
    }
    
    

}

window.customElements.define("cap-clock", Clock);