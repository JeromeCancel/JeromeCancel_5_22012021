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

function displayLense(lenses) {
    let dropdownItems = document.createElement('button');
    dropdownItems.setAttribute('class', 'dropdown-item');
    dropdownItems.setAttribute('value', lenses);
    dropdownItems.innerHTML = lenses;
    dropdown.appendChild(dropdownItems);
    let lenseSelected = document.getElementsByClassName('dropdown-item');
    for(let i = 0; i < lenseSelected.length; i++) {
        lenseSelected[i].addEventListener('click', function(){

            let lenseBox = document.getElementById('lenseBox')

            const buttonClicked = this.value;
            lenseBox.textContent = 'Votre lentille : ' + buttonClicked;
            //addToCartProduct.push(buttonClicked);
        })
    }
};


