import {setBooleanAttribute, toggleBooleanAttribute} from "./utils.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
    a {
        display: inline-block;
        padding: 0.125rem;
        border: 1px solid hsla(214, 53%, 23%, 0.16);
        width: 1em;
        text-align: center;
        text-decoration: none;
    }
    
    a:hover {
        background-color: hsla(214, 53%, 23%, 0.16);
    }
    
    a:visited {
        color: inherit;
    }
    
    :host([disabled]) a {
        color: hsla(214, 53%, 23%, 0.16);
        text-decoration: none;
        cursor: default;
    }
    
    :host([disabled]) a:hover {
        background-color: inherit;
    }
    
    :host([selected]) a {
        color: #fff;
        background-color: hsl(214, 90%, 52%);
    }
</style>
<a href="#" id="letter"></a>
`;

export class LetterElement extends HTMLElement {
    static get observedAttributes() {
        return ['letter', 'disabled', 'selected'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        this._letterElt = shadowRoot.querySelector('#letter');
        this._letterElt.addEventListener('click', _ => this._toggleSelected());
    }

    connectedCallback() {
        if (this.letter === null || this.letter === undefined) {
            this.letter = 'A';
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            // console.log(`tp-letter '${this.letter}' attribute '${name}' changed from '${oldValue}' to '${newValue}'`)
            this[name] = newValue;
        }
    }

    get letter() {
        return this.getAttribute('letter');
    }

    set letter(value) {
        this.setAttribute('letter', value);
        this._update();
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(value) {
        const changed = this.disabled !== value;
        setBooleanAttribute(this, 'disabled', value);
        if (changed) {
            if (this.disabled) {
                this.dispatchEvent(new CustomEvent('disable'))
            } else {
                this.dispatchEvent(new CustomEvent('enable'))
            }
        }
    }

    get selected() {
        return this.hasAttribute('selected');
    }

    set selected(value) {
        const changed = this.disabled !== value;
        setBooleanAttribute(this, 'selected', value);
        if (changed) {
            if (this.selected) {
                this.dispatchEvent(new CustomEvent('select'))
            } else {
                this.dispatchEvent(new CustomEvent('unselect'))
            }
        }
    }

    _toggleSelected(e) {
        if (!this.disabled) {
            toggleBooleanAttribute(this, 'selected');
        }
    }

    _update() {
        this._letterElt.textContent = this.getAttribute('letter');
    }
}

customElements.define("tp-letter", LetterElement)
