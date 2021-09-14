import { PUB_SUB_INSTANCE } from '../../services/config.js'
import { CHANNELS } from '../../services/config.js'
import { Mixin, MixinInstance } from '../core/mixin.js';
import css from "./ButtonCalendar.css.js"

const BUTTON = Object.freeze({
    UP: 1,
    DOWN: -1
})
const ACTION_IS_NULL = "Incorrect action value.";
export class ButtonCalendar extends Mixin(HTMLElement, MixinInstance) {
    constructor() {
        super();
        this._action = BUTTON.UP;
        this._shadow = this.attachShadow({ mode: "open" });
        this._disposables = [];
    }
    get action() {
        return this._action;
    }
    set action(value) {
        this._action = value;
    }
    set pubSubInstance(value) {
        this._pubSubInstance = value;
        this._suscribe(value);
    }
    static get observedAttributes() {
        return ['action'];
    }
    _getStyle() {
        this._shadow.adoptedStyleSheets = [css];
    }
    _create() {
        this._shadow.adoptedStyleSheets = [css];
        let button = document.createElement("button");
        button.setAttribute("action", this._action);
        this._shadow.appendChild(button);
    }
    _suscribe(pubSub, channel = CHANNELS.CHANGEMONTH) {
        const dispose = pubSub.on(channel, (date) => {
            this.date = date;
        });
        this._disposables.push(dispose);
    }
    _handlerClick(ev) {
        ev.stopPropagation();
        this._pubSubInstance.emit(CHANNELS.CHANGEMONTH, this.action);
    }
    connectedCallback() {
        this.dispatchInstance();
        this.addEventListener("click", this._handlerClick);
    }
    disconnectedCallback() {
        this.removeEventListener("click", this._handlerClick);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        let action = null;
        if (oldValue != newValue && newValue) {
            action = BUTTON[newValue.toUpperCase()];
        }
        if (!action) {
            throw ACTION_IS_NULL;
        }
        this._action = action;
        this._create();
    }
    static getComponentName() {
        return "cap-button-calendar";
    }
    
}
window.customElements.define(ButtonCalendar.getComponentName(), ButtonCalendar);