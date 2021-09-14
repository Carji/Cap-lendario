const sheet = new CSSStyleSheet();
sheet.replace(`
:host{
    background-color: var(--background-color);
    display: inline-block;
    cursor: default;
    padding: 0 1rem;
    height: 1rem;
    width: 1rem;
}
:host > button{
    color: var(--month-date-color);
    background-color: transparent;
    border: 0;
    height: 100%;
    width: 100%;
}
:host > button:hover{
    color: var(--color)
}
:host > button[action="1"]{
    border-bottom: 0.1rem solid;
    border-right: 0.1rem solid;
    transform: translateY(-25%) rotate(45deg);
}
:host > button[action="-1"]{
    border-top: 0.1rem solid;
    border-left: 0.1rem solid;
    transform: translateY(25%) rotate(45deg);
}
`)
export default sheet