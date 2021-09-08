import { DAYSOFWEEK } from "../../services/config.js"
import { ComponentDateBase } from "../core/componentDateBase.js";

class DayCalendar extends ComponentDateBase {

    // TODO: Esto realmente deberia estar en blanco ¿?
    _formatDate() {
        return false;
    }

    _changeDate(value) {
        return false;
    }

    _create() {
        const style = this._getStyle();
        this._shadow = this.attachShadow({ mode: "open" });
        let container = document.createElement("days-container");
        this._shadow.appendChild(container);
        DAYSOFWEEK.forEach(e => {
            let day = document.createElement("day");
            day.innerHTML = e;
            container.appendChild(day);
        })
        if (style) {
            this._shadow.appendChild(style);
        }
    }

}

window.customElements.define("cap-day-calendar", DayCalendar);