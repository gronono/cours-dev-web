const template = document.createElement("template");
template.innerHTML = `
<div>
    <p>Compteur : <span id="value">0</span></p>
    <button id="increment">Incrémenter</button>
    <button id="decrement">Décrémenter</button>
</div>
`;
class CounterElement extends HTMLElement {
    // Liste des attributs à surveiller
    static get observedAttributes() {
        return ['count'];
    }

    constructor() {
        super();

        const clone = template.content.cloneNode(true);
        this.appendChild(clone);

        this._count = 0;
        this._valueElt = this.querySelector("#value");

        this.querySelector('#increment').addEventListener('click', () => {
            this.count++;
        });

        this.querySelector('#decrement').addEventListener('click', () => {
            this.count--;
        });
    }

    connectedCallback() {
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'count' && oldValue !== newValue) {
            this.count = parseInt(newValue, 10);
        }
    }

    // Getter et Setter pour la propriété count
    get count() {
        return this._count;
    }

    set count(value) {
        this._count = value;
        this.setAttribute('count', value);
        this._render();
    }

    _render() {
        this._valueElt.textContent = this._count;
    }
}
customElements.define('my-counter', CounterElement);
