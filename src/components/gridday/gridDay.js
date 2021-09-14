export class GridDay extends HTMLElement {

    constructor() {
        super();
        this._date = "";
        this._create();
    }
    set date(value) {
        this._date = value;
        this._update();
    }
    get date() {
        return this._date;
    }
    _getStyle() {
        const style = document.createElement("style");
        style.textContent = `
            :host(.inactive) {
                color: gray;
            }                      
            :host(.selected) {
                color: green;
            }
            :host(.today) {
                color: blue;
            }
        `;
        return style;
    }
    _update() {
        this._text.data = this._date.getDate();
    }
    _create() {
        const style = this._getStyle();
        const shadow = this.attachShadow({ mode: "open" });
        this._text = document.createTextNode("");
        shadow.appendChild(style);
        shadow.appendChild(this._text);
    }
    static getComponentName() {
        return "cap-grid-day";
    }

}

window.customElements.define(GridDay.getComponentName(), GridDay);