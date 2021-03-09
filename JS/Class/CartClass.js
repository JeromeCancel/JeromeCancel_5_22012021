import Product from "./ProductClass.js";

export default class Cart {

    constructor() {
       
        let titleContainer = document.getElementById('switchTitle');
        let cartJSON = localStorage.getItem('cart');
        let cart = JSON.parse(cartJSON);
        if (cart === null) {
            titleContainer.innerText ='Votre panier est vide';
            throw 'Erreur panier localStorage';
        } else {
            titleContainer.innerText ='Contenu de votre panier';
        }
        this.content = cart;
    }

    /**
    * @description Fonction permettant d'afficher le contenu du panier.
    */
    display() {
        // ON AFFICHE LES PRODUITS //
        for(let [id, product] of Object.entries(this.content)) {
            product = new Product(product);
            const templateElt = document.getElementById('displayCartItem');
            // RECUPERATION DE LA COPIE DU TEMPLATE //
            const cloneElt = document.importNode(templateElt.content, true);
            // PASSAGE DES INFOS DANS LEURS CONTENEURS //
            cloneElt.getElementById('childNodeForRemove').id = id;
            cloneElt.getElementById('imgCart').src = product.imageUrl;
            cloneElt.getElementById('name').textContent = product.name;
            cloneElt.querySelector('.price').textContent = `${product.price * product.quantity / 100}.00€`; 
            cloneElt.getElementById('lenseChoice').textContent = product.lenseSelected;
            cloneElt.querySelector('.quantityProduct').textContent = product.quantity;
            cloneElt.querySelector('.bi-trash').addEventListener('click', this._removeProduct.bind(this, id));
            cloneElt.getElementById('btnQtyPlus').addEventListener('click', this._updateQuantity.bind(this, id, 1));
            cloneElt.getElementById('btnQtyMinus').addEventListener('click', this._updateQuantity.bind(this, id, -1));
            // AJOUT DU TEMPLATE FINIS DANS LE DOM //
            document.getElementById('displayCartContainer').appendChild(cloneElt);

            
        }
        // ON AFFICHE LE TOTAL //
        this._updateTotal();
    }

    
    /**
     * @description Permet de mettre à jour la quantité.
     * @param {string} id 
     * @param {number} quantity 
     */
    _updateQuantity(id, quantity ) {
        // ON RECUPERE L OBJET PRODUIT A MODIFIER (logique métier) //
        const product = this.content[id];
        product.quantity += quantity;
        product.quantity = Math.max(1, product.quantity);
        console.log(product)
        // MODIFIE LE DOM (affichage uniquement) //
        const blocProduct = document.getElementById(id);
        let quantityProduct = blocProduct.querySelector('.quantityProduct');
        quantityProduct.textContent = product.quantity;
        let priceContainer = blocProduct.querySelector('.price');
        priceContainer.textContent = `${product.price * product.quantity / 100}.00€`;
        // METS A JOUR LE TOTAL //
        this._updateTotal();
        // METS A JOUR LE LOCAL STORAGE //
        this._updateLocalStorage();
        
    }

    /**
     * @description Permet de mettre à jour le prix total.
     */
    _updateTotal() {
        // ON CALCULE LE TOTAL DU PANIER //
        let total = 0;
        for(let [id, product] of Object.entries(this.content)){
            total += product.quantity * product.price;
        }
        // ON MODIFIE LE DOM //
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = `${total /100}.00€`;
    }
    
    /**
    * @description Retire un produit.
    * @param {string} id
    */
    _removeProduct(id) {
       delete this.content[id];
       // ON MODIFIE LE DOM //
       const blocProduct = document.getElementById(id);
       let displayCartContainer = document.getElementById('displayCartContainer');
       displayCartContainer.removeChild(blocProduct);
       // ON UPDATE //
       this._updateLocalStorage();
       this._updateTotal();
        
    }

    /**
     * @description permet de mettre à jour le localStorage.
     */
    _updateLocalStorage() {
        // ENREGISTRER THIS.CONTENT DANS LE LOCALSTORAGE //
        let newContent = JSON.stringify(this.content);
        localStorage.setItem('cart', newContent);
    }
};


