// RETROUVER L ID DU PRODUIT A L INTERIEUR DE L URL DE LA PAGE PRODUIT
let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id")

const dropdown = document.querySelector('.dropdown-menu');
const dropdownMenu = document.getElementById('dropdownMenu');
const btnAddToCart = document.getElementById('addToCart');
const qty = 1;
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
        console.log(response.json)
    })
    // PASSE LES FONCTIONS CREES PLUS BAS DANS LE RESULTAT // 
    .then(function (product) {
        displayProduct(product);
        addDataToStorage(product);
      })    
}
// APPEL DE LA FONCTION //
getData();



/**
 * @description Fonction permettant d'afficher dynamiquement le produit choisi
 * @param {string} product 
 */
function displayProduct(product) {
    // RECUPERATION DES DIFFERENTS ELEMENTS //
    const imgUrl = document.getElementById('imageUrl');
    const nameProduct = document.getElementById('name');
    const priceProduct = document.getElementById('price');
    const descriptionProduct = document.getElementById('description');

    // INJECTE LES RESULTATS DANS LEURS CONTENEURS //
    imgUrl.setAttribute('src', product.imageUrl);
    nameProduct.innerText = product.name;
    priceProduct.innerText = `${product.price / 100}.00€`;
    descriptionProduct.innerText = product.description;
    
    // CREATION D UNE BOUCLE POUR L AFFICHAGE DES LENTILLES DANS LE MENU //
    for (i = 0; i < product.lenses.length; i++) {
        // CREATION DES BOUTONS ET ATTIBUTION DES CLASSES PUIS ON RATACHE AU DROPDOWN//
        let dropdownItems = document.createElement('button');
        dropdownItems.setAttribute('class', 'dropdown-item');
        dropdownItems.setAttribute('value', product.lenses[i]);
        dropdownItems.innerHTML = product.lenses[i];
        dropdown.appendChild(dropdownItems);
        let lenseSelected = document.getElementsByClassName('dropdown-item');
        // CREATION D UN NOUVELLE BOUCLE POUR RECUPERER / AFFICHER / STOCKER LA LENTILLE CHOISIE PAR L UTILISATEUR//
        for(let i = 0; i < lenseSelected.length; i++) {
            lenseSelected[i].addEventListener('click', function() {
                const lenseValue = this.value 
                dropdownMenu.textContent = lenseValue;
                dropdownMenu.value = lenseValue;
    
        })

    }}
    
};


/**
 * @description Fonction permettant de gérer les données envoyées / récupérées au localStorage
 * @param {string} product 
 */
function addDataToStorage(product) {
    // FONCTION DECLENCHE PAR LE CLICK SUR LE BOUTON AJOUTER AU PANIER //
    function addToCart() {
        // ON VERIFIE LE CONTENU DU LOCALSTORAGE //
        let productChoose = localStorage.getItem("object");
        let idProduct = localStorage.getItem("id");
        // SI VIDE ON CREE UN TABLEAU VIDE POUR CHAQUE //  
        products = productChoose ? JSON.parse(productChoose) : [];
        idProducts = idProduct ? JSON.parse(idProduct) : [];
        // ON STOCKE LES DONNEES DANS LEUR TABLEAU RESPECTIF //
        products.push([product, dropdownMenu.value, qty]);
        idProducts.push(product._id);
  
        // ON STOCKE LES TABLEAUX DANS LE LOCALSTORAGE //
        localStorage.setItem("object", JSON.stringify(products));
        localStorage.setItem("id", JSON.stringify(idProducts));
      
    }
    btnAddToCart.addEventListener("click", addToCart);
  }
    





