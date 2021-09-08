import { DAYSOFWEEK } from "../../services/config.js"
import { ComponentDateBase } from "../core/componentDateBase.js";

class DayCalendar extends ComponentDateBase {

    _getStyle() {
        const style = super._getStyle();
        style.textContent = `
            :host {
                background-color: var(--background-color);
                color: var(--color);
                }
            
            days-container {
                display: grid;
                grid-template-columns: repeat(7, auto);
                }

            day {
                text-align: center;
                }
        `;
        return style;
    }

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