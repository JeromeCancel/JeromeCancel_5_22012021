// RETROUVER L ID DU PRODUIT A L INTERIEUR DE L URL DE LA PAGE PRODUIT
let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id")

const addToCartProduct = [];
const dropdown = document.querySelector('.dropdown-menu');

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
    const addToCart = document.getElementById('addToCart');

    // INJECTE LES RESULTATS DANS LEURS CONTENEURS //
    imgUrl.setAttribute('src', product.imageUrl);
    nameProduct.innerText = product.name;
    priceProduct.innerText = `${product.price / 100}.00€`;
    descriptionProduct.innerText = product.description;
    product.lenses.forEach(lenses => {displayLense(lenses)})
    // AU CLICK SUR AJOUTER AU PANIER       
    addToCart.addEventListener('click', function() {

        // AJOUTE LE PRODUIT CHOISI DANS UN TABLEAU
        addToCartProduct.push(product);
        /*const index = addToCartProduct.indexOf(0);
        addToCartProduct[index] = buttonClicked;
        addToCartProduct;*/

        // LE CONTENU DU TABLEAU EST STOCKE DANS LE LOCALSTORAGE
        localStorage.setItem('cart', JSON.stringify(addToCartProduct));
    })
    
};

// FONCTION PERMETTANT D AFFICHER LES LENTILLES DANS LE DROPDOWN DYNAMIQUEMENT ET DE RECUPERER LA LENTILLE CHOISIE //
function displayLense(lenses) {
    // CREATION DE BOUTONS SELON LA QUANTITE DE LENTILLE //
    let dropdownItems = document.createElement('button');
    // ATTRIBUTION DE LA CLASSE BOOTSTRAP + AJOUT DE LA VALUE POUR LA RECUPERER PLUS TARD //
    dropdownItems.setAttribute('class', 'dropdown-item');
    dropdownItems.setAttribute('value', lenses);
    // AJOUT DU NOM DE LA LENTILLE SUR SON BOUTON //
    dropdownItems.innerHTML = lenses;
    // AJOUT DU BOUTON DANS LE DOM//
    dropdown.appendChild(dropdownItems);
    // CREATION D UN VARIABLE POUR RECUPERER LA LENTILLE CHOISI //
    let lenseSelected = document.getElementsByClassName('dropdown-item');
    // BOUCLE DANS LE TABLEAU DE LENTILLE //
    for(let i = 0; i < lenseSelected.length; i++) {
        // RECUPERATION DE LA LENTILLE CHOISIE AU CLICK //
        lenseSelected[i].addEventListener('click', function(){
            // RECUPERATION DU CONTENEUR POUR AFFICHER LE CHOIX DE LA LENTILLE //
            let lenseBox = document.getElementById('lenseBox')
            // RECUPERATION DE LA LENTILLE CHOISIE DANS UNE VARIABLE //
            const buttonClicked = this.value;
            // AFFICHAGE DE LA LENTILLE CHOISIE DANS SON CONTENEUR //
            lenseBox.textContent = 'Votre lentille : ' + buttonClicked;
            //addToCartProduct.push(buttonClicked);
        })
    }
};


