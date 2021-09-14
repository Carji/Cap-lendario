import { PUB_SUB_INSTANCE } from '../../services/config.js';

const MixinGlobal = Base => class extends Base {
    dispatchGlobal() {
        const event = new CustomEvent(PUB_SUB_INSTANCE.GLOBAL, {
            detail: this,
            bubbles: true,
            composed: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
    }
};

const MixinInstance = Base => class extends Base {
    dispatchInstance() {
        const event = new CustomEvent(PUB_SUB_INSTANCE.INSTANCE, {
            detail: this,
            bubbles: true,
            composed: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
    }
}

const Mixin = (classs, ...args) => args.reduce((a, b) => b(a), classs);

export {
    MixinGlobal,
    MixinInstance,
    Mixin,
}