export default class Product {
    
    constructor(product) {
        this._id = null;
        this.description = null;
        this.price = null;
        this.name = null;
        this.imageUrl = null;
        this.lenses = [];
        this.quantity = 1;
        this.lenseSelected = null;
        // ON FUSIONNE L OBJET PRODUCT DANS CET OBJET //
        Object.assign(this, product);
    }
    
    /**
     * @description Permet d'afficher le produit sur la page produit.
     */
    display() {
        // RECUPERATION DES DIFFERENTS ELEMENTS //
        const imgUrl = document.getElementById('imageUrl');
        const nameProduct = document.getElementById('name');
        const priceProduct = document.getElementById('price');
        const descriptionProduct = document.getElementById('description');
        const dropdown = document.querySelector('.dropdown-menu');
        const dropdownMenu = document.getElementById('dropdownMenu');

        // INJECTE LES RESULTATS DANS LEURS CONTENEURS //
        imgUrl.setAttribute('src', this.imageUrl);
        nameProduct.innerText = this.name;
        priceProduct.innerText = `${this.price / 100}.00€`;
        descriptionProduct.innerText = this.description;
        
        // CREATION D UNE BOUCLE POUR L AFFICHAGE DES LENTILLES DANS LE MENU //
        this.lenses.forEach(lens => {
            // CREATION DES BOUTONS ET ATTIBUTION DES CLASSES PUIS ON RATACHE AU DROPDOWN//
            let dropdownItem = document.createElement('button');
            dropdownItem.setAttribute('class', 'dropdown-item');
            dropdownItem.setAttribute('value', lens);
            dropdownItem.innerHTML = lens;
            dropdownItem.addEventListener('click', this._onSelectedLens.bind(this, lens));
            dropdown.appendChild(dropdownItem);
            
        });

    }

    /**
     * @description Méthode interne click sur la sélection de lentille.
     */
    _onSelectedLens(lensValue) {
        dropdownMenu.textContent = lensValue;
        this.lenseSelected = lensValue;
    }

    /**
     * @description Ajout du produit au panier.
     */
    addToCart() {
        // ON VERIFIE LE CONTENU DU LOCALSTORAGE //
        let cart = localStorage.getItem("cart");
        // SI VIDE ON CREE UN OBJET VIDE POUR CHAQUE //  
        let products = cart ? JSON.parse(cart) : {};
        // ON VERIFIE L ID DU PRODUIT SI DEJA PRESENT ON MODIFIE LA QUANTITE ET UPDATE LA LENTILLE //
        if(products[this._id] === undefined) {
            products[this._id] = this;
        } else {
            products[this._id].quantity += this.quantity;
            products[this._id].lenseSelected = this.lenseSelected; 
 
        }
        // ON STOCKE L OBJET DANS LE LOCALSTORAGE //
        localStorage.setItem("cart", JSON.stringify(products));
    }
    
};   
