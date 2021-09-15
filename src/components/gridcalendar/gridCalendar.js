import { DateService } from '../../services/dateService.js'
import { GridDay } from '../gridday/gridDay.js'
import { Mixin, MixinGlobal, MixinInstance } from "../core/mixin.js"
import { CHANNELS } from '../../services/config.js';

export class GridCalendar extends Mixin(HTMLElement, MixinGlobal, MixinInstance) {

    constructor() {
        super();
        this._date = new Date();
        this._oldDate = new Date();
        this._today = new Date();
        this._selectedDate = new Date();
        this._disposables = [];
        this._shadow = this.attachShadow({ mode: "open" });
    }
    get date() {
        return new Date(this._date);
    }
    set date(value) {
        this._date = value;
        this._oldDate = this.date;
    }
    set pubSubInstance(value) {
        this._pubSubInstance = value;
        this._suscribe(value, CHANNELS.CHANGEMONTH);
    }
    connectedCallback() {
        this.dispatchInstance();
        this.dispatchGlobal();
        this._create();
    }
    disconnectedCallback() {
        this._removeChildren();
        this._clearDisposables();
    }
    _suscribe(pubSub, channel = CHANNELS.CHANGEDATE) {
        const dispose = pubSub.on(channel, (date) => {
            if (channel === 0) {
                if (!DateService.isThisMonth(date, date))
                    this._date = date;
            } else {
                this.date = DateService.getNextOrPreviousMonth(this._oldDate, date);
                this._update()
            }
        });
        this._disposables.push(dispose);
    }
    _update() {
        while (this._shadow.firstChild) {
            this._shadow.removeChild(this._shadow.lastChild);
        }
        this._create();
    }
    _getStyle() {
        const style = document.createElement("style");
        style.textContent = `
            :host{
                z-index: 5;
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                
                }
                
        `;
        return style;
    }
    _create() {
        const style = this._getStyle();
        let days = DateService.getDaysOfMonth(this.date);

        this._shadow.appendChild(style);
        days.forEach(element => {
            let day = document.createElement(GridDay.getComponentName());
            day.date = element;
            day.addEventListener("click", () => { this._listener(day, element) }, false);
            const disposable = this._pubSubInstance.on(CHANNELS.CHANGESELECTEDATE, (element) => {
                this._changeSelected(day, element)
            });
            this._disposables.push(disposable);

            if (!DateService.isThisMonth(element, this.date)) {
                day.classList.add("inactive");
            }
            if (DateService.isToday(element, this._today)) {
                day.classList.add("today");
            }
            if (DateService.isToday(this._selectedDate, element)) {
                day.classList.add("selected");
            }
            this._shadow.appendChild(day);
        })
    }
    _clearDisposables() {
        this._disposables.forEach(disposable => {
            disposable && disposable();
        })
        this._disposables = [];
    }
    _removeChildren() {
        this._shadow.textContent = "";
    }
    _listener(day, element) {
        this._pubSubInstance.emit(CHANNELS.CHANGESELECTEDATE, element);
        day.classList.add("selected");
        this._selectedDate = element;
    }
    _changeSelected(day, element) {
        day.classList.remove("selected");
    }
    static getComponentName() {
        return "cap-grid-calendar";
    }

}

window.customElements.define(GridCalendar.getComponentName(), GridCalendar);