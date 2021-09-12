import { DAYSOFWEEK } from "../../services/config.js"

export class DayOfWeek extends HTMLElement {

    constructor(){
        super();
        this._create();
    }
    _getStyle() {
        const style = document.createElement("style");
        style.textContent = `
            :host {
                display: grid;
                grid-template-columns: repeat(7, auto);
                }
        `;
        return style;
    }

    _create() {
        const style = this._getStyle();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(style);
        DAYSOFWEEK.forEach(day => {
            const div = document.createElement("div");
            const text = document.createTextNode(day);
            div.appendChild(text);
            shadow.appendChild(div);
        })
    }

    static getComponentName() {
        return "cap-day-of-week";
    }
}

window.customElements.define(DayOfWeek.getComponentName(), DayOfWeek);