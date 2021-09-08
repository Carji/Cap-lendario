const sheet = new CSSStyleSheet();
sheet.replace(`
:host {
    color: var(--system-date-color);
}
:host(:hover) {
    color: var(--month-date-color);
}
`);
export default sheet;