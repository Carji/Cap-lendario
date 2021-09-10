import { FormatService } from "../../services/formatService.js"
import { ComponentDateBase } from "../core/componentDateBase.js"
import {PUB_SUB_INSTANCE} from '../../services/config.js'

export class Clock extends ComponentDateBase {

  
    _formatDate() {
        return FormatService.getTime(this.date);
    }

    _changeDate(value) {
        return true;
    }

    _getStyle() {
        const style = super._getStyle();
        style.textContent=`
            :host {
                font-size: 3rem;
                display: block;
                background-color: var(--background-color);
                color: var(--color);
                }
        
        `;
        return style;
    }
    connectedCallback() {
        const event = new CustomEvent(PUB_SUB_INSTANCE.GLOBAL, {
            detail: this,
            bubbles: true,
            composed: true,
            cancelable:true,
        });
        this.dispatchEvent(event);
    }
    set pubSubInstance(value) {
        this._pubSubInstance = value;
        this._suscribe(value);
    }
    
    static getComponentName(){
        return "cap-clock";
    }

}

window.customElements.define(Clock.getComponentName(), Clock);