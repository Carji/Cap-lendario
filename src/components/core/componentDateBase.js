import pubSub from "../../services/pubSub.js"
import { CHANNELS } from "../../services/config.js"
const METHOD_NOT_IMPLEMENTED = "Method not implemented"
export class ComponentDateBase extends HTMLElement {

    constructor() {
        super();
        this._create();
        this.date = new Date();
        this._oldDate = new Date(); 
        this._disposables=[];
    }

        
    set date(value){
        this._oldDate=this.date;
        if (this._changeDate(value)) {
            this._date=value;
            this._update();
        }
    }
    
    get date() {
        return this._date;
    }

    
    connectedCallback() {
        this._suscribe();
    }

    disconnectedCallback() {
        this._disposables.forEach(dispose => dispose && dispose());
        this._disposables=[];        
    }

    _suscribe(channel=CHANNELS.CHANGEDATE) {
        const dispose = pubSub.on(channel, (date) => {
            this.date=date;
         });
         this._disposables.push(dispose);
    }

    _changeDate(value) {
        throw METHOD_NOT_IMPLEMENTED;
    }

    _formatDate() {
        throw METHOD_NOT_IMPLEMENTED;
    }
    
    _update() {
        this._text.data = this._formatDate();
    }

    _create() {
        this._text = document.createTextNode("");
        this._shadow = this.attachShadow({ mode: "open" })
        this._shadow.appendChild(this._text);
    }

}