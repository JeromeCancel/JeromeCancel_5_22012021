import Product from "./Class/ProductClass.js"; // IMPORT DE LA CLASSE PRODUCT //

// RETROUVER L ID DU PRODUIT A L INTERIEUR DE L URL DE LA PAGE PRODUIT
let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id")

// RECUPERE LE BOUTON VALIDER DANS LE DOM //
const btnAddToCart = document.getElementById('addToCart');

/**
 * @description Fonction permettant de récupérer les données du produit choisis
 * @param {string} response 
 */

function getData() {
    // APPEL A L API //
    fetch(`http://localhost:3000/api/cameras/${idProduct}`)
    // ATTENDRE LE RETOUR DE LA REPONSE ET ON VERIFIE POUR UNE ERREUR //
    .then(response => {
        if(!response.ok) {
            throw Error('ERROR');
        }
        // RECUPERATION DE LA REPONSE //
        return response.json();
    })
    // ON PASSE LES DONNEES DANS NOTRE OBJET PRODUCT ET ON EFFECTUE LES METHODES DE LA CLASSE // 
    .then(function (productData) {
        const product = new Product(productData);
        product.display();
        btnAddToCart.addEventListener("click", product.addToCart.bind(product));
      })    
}
// APPEL DE LA FONCTION //
getData();
  



