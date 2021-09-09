const sheet = new CSSStyleSheet();
sheet.replace(`
:host {
    color: var(--month-date-color);
    font-size: 1.2rem;
    display: inline;
}
:host(:hover) {
    color: var(--color);
}
`);
export default sheet;