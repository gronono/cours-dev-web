import "./LettersElement.js";
import {generateAllLetters} from "./utils.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<tp-letters></tp-letters>
<ul></ul>
`

export class ListAlbumsElement extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this._lettersElt = this.shadowRoot.querySelector('tp-letters');
        this._lettersElt.addEventListener('selection', e => this._onSelection(e.detail.letter));
    }

    async connectedCallback() {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        this._albums = await response.json();
        const allowedLetters = this._albums.map(album => album.title.charAt(0).toUpperCase());
        this._lettersElt.disabledLetters = generateAllLetters().filter(letter => !allowedLetters.includes(letter));
        this._onSelection(undefined);
    }

    _onSelection(letter) {
        const ulElt = this.shadowRoot.querySelector('ul');
        ulElt.innerHTML = '';
        let albums = this._albums;
        if (letter) {
           albums = this._albums.filter(album => album.title.toUpperCase().startsWith(letter));
        }
        albums.forEach(album => {
            const liELt = document.createElement('li');
            liELt.innerText = album.title;
            ulElt.appendChild(liELt);
        })
    }
}

customElements.define('tp-list-albums', ListAlbumsElement)
