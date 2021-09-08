const sheet = new CSSStyleSheet();
sheet.replace(`
    :host {
        color: var(--system-date-color);
    }
    :host(:hover) {
        color: var(--system-date-hover-color);
    }
`);
export default sheet;