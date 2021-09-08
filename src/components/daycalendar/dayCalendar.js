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

    _getStyle() {
        const style = super._getStyle();
        style.textContent = `
            :host {
                background-color: var(--background-color);
                color: black;
                }
            
            days-container {
                display: grid;
                grid-template-columns: repeat(7, auto);
                }

            day {
                display: inline;
                text-align: center;
                }
        `;
        return style;
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