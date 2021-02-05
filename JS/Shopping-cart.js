const btnQtyPlus = document.getElementById('btnQtyPlus');
const btnQtyMinus = document.getElementById('btnQtyMinus');
const btnRemoveItem = document.getElementById('btnRemoveItem');
const btnValidate = document.getElementById('btnValidate');
const btnCloseOverlay = document.getElementById('btnCloseOverlay');
const displayCartConainer = document.getElementById('displayCartConainer');
const displayCartItem = document.getElementById('displayCartItem');
const product = JSON.parse(localStorage.getItem("cart"));


function switchTitle() {
    if(localStorage.cart.length === 0) {
        document.getElementById('switchTitle').innerText='Votre panier est vide';
      } else {
        document.getElementById('switchTitle').innerText='Contenu de votre panier';
      }
}

switchTitle();

function updateCart() {

}

function displayCart(product) {


    const templateElt = document.getElementById('displayCartItem');

    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.getElementById('imgCart').src = product.imageUrl
    cloneElt.getElementById('name').textContent = product.name;
    cloneElt.getElementById('price').textContent = `${product.price / 100}.00€`;
    cloneElt.getElementById('lenseChoice').textContent = product.lenses;

    document.getElementById('displayCartConainer').appendChild(cloneElt)

    //localStorage.setItem('??', JSON.stringify('??'));

}
displayCart(product);

function removeItem() {
    btnRemoveItem.addEventListener('click',)
        displayCartConainer.removeChild('displayCartItem > ${itemToRemove}');
        localStorage.removeItem('??', '??');
}


function increaseQty() {
    btnQtyPlus.addEventListener('click',)
}

// 4- ECOUTER UN BTN + PERMETTANT D AJOUTER LE MEME PRODUIT {
//      RECUPERER L ECOUTE
//      RETOURNER L ECOUTE ET AJOUTER +1 A LA QUANTITE
//      AJOUTER +1 AU LOCAL STORAGE
    // localStorage.setItem('??', JSON.stringify('??'));
//      ADDITIONNER LE PRICE DU PRODUIT AU PRICE TOTAL => UPDATE LE PANIER? }

function decreaseQty() {
    btnQtyMinus.addEventListener('click',)
}
// 5- ECOUTER UN BTN - PERMETTANT D ENLEVER LE MEME PRODUIT {
//      RECUPERER L ECOUTE
//      RETOURNER L ECOUTE ET SOUSTRAIRE -1 A LA QUANTITE
//      SOUSTRAIRE -1 AU LOCAL STORAGE
    // localStorage.removeItem('??',('??'));
//      SOUSTRAIRE LE PRICE DU PRODUIT AU PRICE TOTAL => UPDATE LE PANIER? }


// 6- ECOUTER LES DIFFERENTS INPUT DU FORMULAIRE {
//      SI REPONSE => OK => VALIDER => BASCULE SUR LA FENETRE DE CONFIRMATION DE COMMANDE
//      SI REPONSE => FALSE => DISPLAY ERREUR ET REDEMANDER L ACTION }


//  Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs
//firstName, lastName, address, city et email. Le tableau des produits envoyé au
//backend doit être un array de strings product_id. Les types de ces champs et leur
//présence doivent être validés avant l’envoi des données au serveur.
/* ex de panier avec 2 lignes [
      {id: 2656456, nom:'fdfdfd', quantite: 1}
      {id: 265654546, nom:'fdfdfd', quantite: 2}        
        
             ],
     UPDATE LE PANIER  !!!!} */
function overlayOn() {
    btnValidate.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='1';
        document.getElementById('overlay').style.width ='100%';
            
    }) 
}
overlayOn();
    
function overlayOff() {
    btnCloseOverlay.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='0';
        document.getElementById('overlay').style.width ='0%';
    }) 
}
overlayOff();
    
    