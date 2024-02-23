const template = document.createElement("template");
template.innerHTML = `
<style>
p {
    color: var(--counter-color, black)
}
</style>
<div>
    <p>
        <slot name="title">Compteur :</slot>
        <span id="value">0</span>
    </p>
    <button id="increment" part="btn-inc">Incrémenter</button>
    <button id="decrement" part="btn-dec">Décrémenter</button>
</div>
`;
class CounterElement extends HTMLElement {
    // Liste des attributs à surveiller
    static get observedAttributes() {
        return ['count'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open"});
        shadowRoot.appendChild(template.content.cloneNode(true));

        this._count = 0;
        this._valueElt = shadowRoot.querySelector("#value");

        shadowRoot.querySelector('#increment').addEventListener('click', () => {
            this.count++;
        });

        shadowRoot.querySelector('#decrement').addEventListener('click', () => {
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
