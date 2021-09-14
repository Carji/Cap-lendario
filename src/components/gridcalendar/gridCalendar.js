import { DateService } from '../../services/dateService.js'
import { GridDay } from '../gridday/gridDay.js'
import { Mixin, MixinGlobal, MixinInstance } from "../core/mixin.js"

export class GridCalendar extends Mixin(HTMLElement, MixinGlobal, MixinInstance) {

    constructor() {
        super();
        this._date = new Date();
        this._create();
    }
    get date() {
        return new Date(this._date);
    }
    set pubSubInstance(value) {
        this._pubSubInstance = value;
    }
    set pubSubGlobal(value) {
        this._pubSubGlobal = value;
    }
    connectedCallback() {
        this.dispatchInstance();
        this.dispatchGlobal();
    }
    _getStyle() {
        const style = document.createElement("style");
        style.textContent = `
            :host{
                border-bottom: 0.05em solid var(--border-color);
                color: var(--main-font-color);
                background-color: var(--main-bg-color);
                font-family: sans-serif;
                display: inline-grid;
                padding: 1em 0.7em;
                gap: 0.8em 2em;
                grid-template-columns: repeat(7,1em);
                text-align: center;
                cursor: default;
                }
        `;
        return style;
    }

    _create() {
        const style = this._getStyle();
        const shadow = this.attachShadow({ mode: "open" });
        let days = DateService.getDaysOfMonth(this.date);
        /*
        div.addEventListener("click", ()=>{this._listener(div,element)},false);
        const disposable = pubSub.on(CHANNELS.CHANGESELECTEDDAY, (element) => {this._changeSelected(div,element)});
        this._disposables.push(disposable);
        */
        shadow.appendChild(style);
        days.forEach(element => {
            let day = document.createElement(GridDay.getComponentName());
            day.date = element;

            if (!DateService.isThisMonth(element, this.date)) {
                day.classList.add("inactive");
            }
            if (DateService.isToday(element, this.date)) {
                day.classList.add("today");
            }
            shadow.appendChild(day);
        })
    }


    _listener(div, element) {
        pubSub.emit(CHANNELS.CHANGESELECTEDDAY, element.date);
        div.classList.add("selected");
        this._selectedDate = element.date;
        element.isSelected = true;
    }

    static getComponentName() {
        return "cap-grid-calendar";
    }
}

window.customElements.define(GridCalendar.getComponentName(), GridCalendar);