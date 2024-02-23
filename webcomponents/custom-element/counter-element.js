class CounterElement extends HTMLElement {
    // Liste des attributs à surveiller
    static get observedAttributes() {
        return ['count'];
    }

    constructor() {
        super();
        console.log('Constructeur appelé');
        this._count = 0; // Propriété interne pour stocker le compteur
    }

    connectedCallback() {
        console.log('Element attaché au DOM');
        this.render(); // Appel de la méthode render lors de l'attachement à DOM
    }

    disconnectedCallback() {
        console.log('Element détaché du DOM');
    }

    // Méthode appelée lorsqu'un attribut surveillé est modifié
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribut ${name} changé de ${oldValue} à ${newValue}`);
        if (name === 'count' && oldValue !== newValue) {
            // Met à jour la propriété count avec la nouvelle valeur de l'attribut count
            this.count = parseInt(newValue, 10);
        }
    }

    // Getter et Setter pour la propriété count
    get count() {
        return this._count;
    }

    set count(value) {
        this._count = value;
        this.setAttribute('count', value); // Met à jour l'attribut count lors du changement de propriété
        this.render(); // Rend à nouveau le composant
    }

    // Méthode pour mettre à jour l'affichage du compteur
    render() {
        this.innerHTML = `
          <div>
            <p>Compteur : ${this._count}</p>
            <button id="increment">Incrémenter</button>
            <button id="decrement">Décrémenter</button>
          </div>
      `;

        // Ajout des écouteurs d'événements pour les boutons
        this.querySelector('#increment').addEventListener('click', () => {
            this.count++; // Incrémente le compteur
        });

        this.querySelector('#decrement').addEventListener('click', () => {
            this.count--; // Décrémente le compteur
        });
    }
}
customElements.define('my-counter', CounterElement);
