import './LetterElement.js';
import {generateAllLetters} from "./utils.js";

export class LettersElement extends HTMLElement {
    static get observedAttributes() {
        return ['selected-letter', 'disabled-letters'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        for (let letter of generateAllLetters()) {
            shadowRoot.appendChild(this._createLetterElt(letter));
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'selected-letter') {
                this.selectedLetter = newValue;
            }
            if (name === 'disabled-letters') {
                this.disabledLetters = newValue.split(',').map(letter => letter.trim());
            }
        }
    }

    get selectedLetter() {
        return this.getAttribute('selected-letter');
    }

    set selectedLetter(letter) {
        const selectedElt = this._getLetterElts().find(letterElt => letterElt.letter === letter);
        if (selectedElt) {
            selectedElt.selected = true;
        }
    }

    get disabledLetters() {
        return this.getAttribute('disabled-letters').split(',');
    }

    set disabledLetters(lettersArray) {
        this._getLetterElts()
            .filter(letterElt => lettersArray.includes(letterElt.letter))
            .forEach(letterElt => letterElt.disabled = true);
        this.setAttribute('disabled-letters', lettersArray.join());
    }

    _createLetterElt(letter) {
        const letterElt = document.createElement("tp-letter");
        letterElt.setAttribute('letter', letter);
        letterElt.addEventListener('select', event => this._onSelectLetter(event));
        letterElt.addEventListener('unselect', event => this._onUnselectLetter(event));
        return letterElt;
    }

    _getLetterElts() {
        return Array.from(this.shadowRoot.querySelectorAll("tp-letter"));
    }

    _onSelectLetter(event) {
        const selected = event.target;
        this._getLetterElts()
            .filter(letterElt => letterElt !== selected)
            .forEach(letterElt => letterElt.selected = false);
        this.setAttribute('selected-letter', selected.letter);
        this.dispatchEvent(new CustomEvent("selection", { detail: { letter: selected.letter }}));
    }

    _onUnselectLetter(event) {
        const selected = this._getLetterElts().find(letterElt => letterElt.selected);
        if (!selected) {
            this.removeAttribute('selected-letter');
            this.dispatchEvent(new CustomEvent("selection", { detail: { letter: undefined }}));
        }
    }
}

customElements.define("tp-letters", LettersElement)
