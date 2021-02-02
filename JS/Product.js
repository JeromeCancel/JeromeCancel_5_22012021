// CHOSES A PREVOIR POUR CETTE PAGE: //

// 1- RECUPERER LES DONNEES DE L API POUR LES STOCKER ET POUVOIR LES RENVOYER PAR LA SUITE


// 2- ECOUTER CLICK SUR LES PRODUITS DE LA PAGE D ACCUEIL { 
//      RECUPERER L ID DU PRODUIT CLICK
//      DISPLAY LE PRODUIT DANS LE CONTENEUR (title / price / description) }


// 3- GERER LES LENSES ! {
//      FAIRE FONCTIONNER LE DROPDOWN VIA JS OU PB AILLEURS ?
//      RECUPERER LES DATAS LENSES DANS L API 
//      ET LES AFFICHER DANS LE DROPDOWN => VIA LE DOM ?
//      UN TRUC A FAIRE POUR VALIDER LA LENSE CHOISI ?? }


// 4- 

// RETROUVER L ID DU PRODUIT A L INTERIEUR DE L URL DE LA PAGE PRODUIT
let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id")


 async function getData() {
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
    .then(product => {displayProduct(product)}) 
}

getData();

function displayProduct(product) {

    const imgUrl = document.getElementById('imageUrl');
    const nameProduct = document.getElementById('name');
    const priceProduct = document.getElementById('price');
    const descriptionProduct = document.getElementById('description');
    const firstLense = document.getElementById('firstLense');
    const secondLense = document.getElementById('secondLense');

    imgUrl.setAttribute('src', product.imageUrl);
    nameProduct.innerText = product.name;
    priceProduct.innerText = `${product.price / 100}.00€`;
    descriptionProduct.innerText = product.description;
    firstLense.innerText = product.lenses[0];
    secondLense.innerText = product.lenses[1];
}

