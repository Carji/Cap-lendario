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
            :host {
                    width: 100%;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                    
                }
                :host(.inactive) {
                    color: gray;
            }                      
            :host(.selected) {
                box-shadow: inset 0 0 0 3px var(--grid-day-selected);
            }
            :host(.today) {
                background-color: var(--grid-day-selected);
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