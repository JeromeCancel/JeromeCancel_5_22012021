const btnQtyPlus = document.querySelector('.bi-chevron-up');
const btnQtyMinus = document.querySelector('.bi-chevron-down');
const btnRemoveItem = document.querySelector('.btn-template');
const btnValidate = document.getElementById('btnValidate');
const btnCloseOverlay = document.getElementById('btnCloseOverlay');
const displayCartConainer = document.getElementById('displayCartConainer');
const displayCartItem = document.getElementById('displayCartItem');
const products = JSON.parse(localStorage.getItem("cart"));


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

products.forEach(function displayCart(product) {


    const templateElt = document.getElementById('displayCartItem');

    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.getElementById('imgCart').src = product.imageUrl
    cloneElt.getElementById('name').textContent = product.name;
    cloneElt.getElementById('price').textContent = `${product.price / 100}.00€`;
    cloneElt.getElementById('lenseChoice').textContent = product.lenses;

    document.getElementById('displayCartConainer').appendChild(cloneElt)

});



displayCartItem.addEventListener('click', event => {
        
    if (event.target.classList.contains('btn-template')) {
        console.log(event.target)
        displayCartConainer.removeChild('displayCartItem');
        localStorage.removeItem('product')
    }
    else if (event.target.classList.contains('bi-chevron-up')){
        console.log(event.target)
    }
    else if (event.target.classList.contains('bi-chevron-down')){
        console.log(event.target)
    }
    event.stopPropagation();
}) 
    



/*function removeItem() {
    btnRemoveItem.addEventListener('click', function(event) {
        console.log(btnRemoveItem)
        event.stopPropagation()
        displayCartConainer.removeChild('displayCartItem');
        localStorage.removeItem('product');

    })
}*/


function increaseQty() {
    btnQtyPlus.addEventListener('click',)
}

// 4- ECOUTER UN BTN + PERMETTANT D AJOUTER LE MEME PRODUIT {
//      RETOURNER L ECOUTE ET AJOUTER +1 A LA QUANTITE
//      AJOUTER +1 AU LOCAL STORAGE
    // localStorage.setItem('??', JSON.stringify('??'));
//      ADDITIONNER LE PRICE DU PRODUIT AU PRICE TOTAL => UPDATE LE PANIER? }

function decreaseQty() {
    btnQtyMinus.addEventListener('click',)
}
// 5- ECOUTER UN BTN - PERMETTANT D ENLEVER LE MEME PRODUIT {
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



///////////////////////////////////////////////form-manager/////////////////////////////////////////////////

const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const city = document.getElementById('city');
const adress = document.getElementById('adress');


form.addEventListener('submit', e =>{
    e.preventDefault()

    checkvalidity()
});

function checkvalidity() {

    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const cityValue = city.value.trim();
    const adressValue = adress.value.trim();

    if(firstNameValue === '') {
        setErrorFor(firstName, "Veuillez remplir ce champ");
    } else {
        setSuccessFor(firstName);
    }

    if(lastNameValue === '') {
        setErrorFor(lastName, "Veuillez remplir ce champ");
    } else {
        setSuccessFor(lastName);
    }

    if(emailValue === '') {
        setErrorFor(email, "Veuillez remplir ce champ");
    } else if (!emailValidity(email.value)) {
        setErrorFor(email, "Cet email n'est pas valide");
    } else {
        setSuccessFor(email);
    }

    if(cityValue === '') {
        setErrorFor(city, "Veuillez remplir ce champ");
    } else {
        setSuccessFor(city);
    }

    if(adressValue === '') {
        setErrorFor(adress, "Veuillez remplir ce champ");
    } else {
        setSuccessFor(adress);
    }
};

function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    formGroup.className = 'form-group error';
	small.innerText = message;
};

function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    
};

function emailValidity(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};