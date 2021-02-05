// RETROUVER L ID DU PRODUIT A L INTERIEUR DE L URL DE LA PAGE PRODUIT
let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id")

const addToCartProduct = [];

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
    // PASSE LA FONCTION CREE PLUS BAS DANS LE RESULTAT // 
    .then(product => {displayProduct(product)}) 
}
// APPEL DE LA FONCTION //
getData();

// CREATION DE LA FONCTION POUR AFFICHER LE PRODUIT DYNAMIQUEMENT //
function displayProduct(product) {

    // RECUPERATION DES DIFFERENTS ELEMENTS //
    const imgUrl = document.getElementById('imageUrl');
    const nameProduct = document.getElementById('name');
    const priceProduct = document.getElementById('price');
    const descriptionProduct = document.getElementById('description');
    const firstLense = document.getElementById('firstLense');
    const secondLense = document.getElementById('secondLense');
    const addToCart = document.getElementById('addToCart');

    // INJECTE LES RESULTATS DANS LEURS CONTENEURS //
    imgUrl.setAttribute('src', product.imageUrl);
    nameProduct.innerText = product.name;
    priceProduct.innerText = `${product.price / 100}.00€`;
    descriptionProduct.innerText = product.description;
    firstLense.innerText = product.lenses[0];
    secondLense.innerText = product.lenses[1];
   
    // AJOUTE LE PRODUIT CHOISI DANS UN TABLEAU
    addToCartProduct.push(product);
    // AU CLICK SUR AJOUTER AU PANIER       
    addToCart.addEventListener('click', function() {
        // LE CONTENU DU TABLEAU EST STOCKE DANS LE LOCALSTORAGE
        localStorage.setItem('cart', JSON.stringify(product));
    })
    
}

