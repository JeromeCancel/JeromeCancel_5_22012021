import Product from "./ProductClass.js";

export default class Confirm {

    constructor() {

        let cartJSON = localStorage.getItem('cart');
        let cart = JSON.parse(cartJSON);
        this.content = cart;
    }

    display() {
        for (let [id, product] of Object.entries(this.content)) {
            product = new Product(product);
            const templateElt = document.getElementById('displayCommand');
            const cloneElt = document.importNode(templateElt.content, true);
            cloneElt.getElementById('number').textContent = product._id;
            cloneElt.getElementById('nameConfirm').textContent = product.name;
            cloneElt.getElementById('quantityConfirm').textContent = product.quantity;
            cloneElt.getElementById('priceConfirm').textContent = `${product.price * product.quantity / 100}.00€`;
            document.getElementById('parentNode').appendChild(cloneElt);
        }

        let trParent = document.createElement('tr');
        let totalPriceConfirm = document.createElement('td');
        trParent.appendChild(totalPriceConfirm);
        parentNode.appendChild(trParent);

        totalPriceConfirm.setAttribute('colspan', '4');
        totalPriceConfirm.classList.add('text-center', 'bold');
        totalPriceConfirm.setAttribute('id', 'totalPriceConfirm');

        this._updateTotal();
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
        totalPriceConfirm.textContent = `Montant total: ${total /100}.00€`;
    }
};