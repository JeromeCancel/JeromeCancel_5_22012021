// RECUPERATION DES ELEMENTS // 
const btnQtyPlus = document.querySelector('.bi-chevron-up');
const btnQtyMinus = document.querySelector('.bi-chevron-down');
const btnRemoveItem = document.querySelector('.btn-template');
const btnValidate = document.getElementById('btnValidate');
const btnCloseOverlay = document.getElementById('btnCloseOverlay');
const displayCartConainer = document.getElementById('displayCartConainer');
const displayCartItem = document.getElementById('displayCartItem');
const titleContainer = document.getElementById('switchTitle')
const products = JSON.parse(localStorage.getItem("cart"));

// FONCTION PERMETTANT DE MODIFIER LE TITRE DE LA PAGE SELON SI LE PANIER EST VIDE OU PAS //
function switchTitle() {
    // VERIFICATION DU CONTENU CART DANS LE LOCALSTORAGE ET CHANGEMENT DU TITRE EN FONCTION DE LA REPONSE //
    if(localStorage.cart.length === 0) {
        titleContainer.innerText='Votre panier est vide';
      } else {
        titleContainer.innerText='Contenu de votre panier';
      }
}

switchTitle();


function updateCart() {

}

// FONCTION PERMETTANT D AFFICHER LE CONTENU DU PANIER AVEC UN FOREACH //
products.forEach(function displayCart(product) {

    // RECUPERATION DU TEMPLATE HTML //
    const templateElt = document.getElementById('displayCartItem');
    // RECUPERATION DE LA COPIE DU TEMPLATE //
    const cloneElt = document.importNode(templateElt.content, true);
    // PASSAGE DES INFOS DANS LEURS CONTENEURS //
    cloneElt.getElementById('imgCart').src = product.imageUrl
    cloneElt.getElementById('name').textContent = product.name;
    cloneElt.getElementById('price').textContent = `${product.price / 100}.00€`;
    cloneElt.getElementById('lenseChoice').textContent = product.lenses;
    // AJOUT DU TEMPLATE FINIS DANS LE DOM //
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




/* ex de panier avec 2 lignes [
      {id: 2656456, nom:'fdfdfd', quantite: 1}
      {id: 265654546, nom:'fdfdfd', quantite: 2}        
        
             ],
     UPDATE LE PANIER  !!!!} */


// FONCTION PERMETTANT D AFFICHER L OVERLAY + FORMULAIRE //
function overlayOn() {
    // RECUPERATION DU CLICK SUR LE BOUTON VALIDER PANIER ET MODIFICATION DU STYLE //
    btnValidate.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='1';
        document.getElementById('overlay').style.width ='100%';
            
    }) 
}
overlayOn();

// FONCTION PERMETTANT DE CACHER L OVERLAY //
function overlayOff() {
    // RECUPERATION DU CLICK SUR LE BOUTON RETOUR EN ARRIERE ET MODIFICATION DU STYLE //
    btnCloseOverlay.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='0';
        document.getElementById('overlay').style.width ='0%';
    }) 
}
overlayOff();



///////////////////////////////////////////////form-manager/////////////////////////////////////////////////

//  Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs
//firstName, lastName, address, city et email. Le tableau des produits envoyé au
//backend doit être un array de strings product_id. Les types de ces champs et leur
//présence doivent être validés avant l’envoi des données au serveur.


// RECUPERATION DES DIFFERENTS ELEMENTS //
const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const city = document.getElementById('city');
const adress = document.getElementById('adress');

// ECOUTE DU SUBMIT SUR LE FORMULAIRE //
form.addEventListener('submit', event =>{
    // EMPECHE LA SOUMISSION DU FORMULAIRE //
    event.preventDefault()
    // VERIFIE LA VALIDITE DU FORMULAIRE //
    checkvalidity()
    // RECUPERE LES DONNEES DES INPUTS DANS UN OBJET //
    let form = e.target;
    const formData = new FormData(form)
    // PERMET DE VOIR LE CONTENU DE L OBJET //
    for(let key of formData.keys()) {
        console.log(key, formData.get(key));
    }

});

// VERIFIE LA VALIDITE DU FORMULAIRE //
function checkvalidity() {
    // RECUPERATION DES VALUES SUR LES INPUTS AVEC LA METHODE TRIM POUR SUPPRIMER LES WHITESPACE //
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const cityValue = city.value.trim();
    const adressValue = adress.value.trim();
    // COMPARAISON SUR LES INPUTS POUR SAVOIR SI LE CONTENU EST VIDE //
    if(firstNameValue === '') {
        // SI IL EST VIDE, LANCE UNE ERREUR VIA LA FONCTION SETERRORFOR //
        setErrorFor(firstName, "Veuillez remplir ce champ");
    } else {
        // SINON INPUT VALIDE VIA LA FONCTION SETSUCCESSFOR // 
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
        // RAJOUT DE VERIFICATION D EMAIL VALIDE EN COMPARANT LA VALUE ET LE REGEX //
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

// FONCTION PERMETTANT DE LANCER LES ERREURS QUI PRENDS EN PARAMETRE LES INPUTS ET LES MESSAGES A DISTRIBUER //
function setErrorFor(input, message) {
    // RECUPERATION DES CONTAINER D INPUT //
    const formGroup = input.parentElement;
    // RECUPERATION DES BALISES HTML CACHES //
    const small = formGroup.querySelector('small');
    // PASSE LA CLASSE ERROR STYLISE EN CSS //
    formGroup.className = 'form-group error';
    // INJECTE LE MESSAGE PREVU DANS LA BALISE HTML //
    small.innerText = message;
};

// FONCTION PERMETTANT DE VALIDER LES INPUTS // 
function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    
};

// FONCTION PERMETTANT DE TESTER LA VALIDE DE L EMAIL RENTRE DANS L INPUT // 
function emailValidity(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

