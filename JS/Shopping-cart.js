import Cart from "./Class/CartClass.js";

const cart = new Cart();
cart.display();
console.log(cart)

/**
 * @description Fonction permettant de modifier le titre selon si le panier est vide ou pas.
 */
function switchTitle() {
    let titleContainer = document.getElementById('switchTitle');
    // VERIFICATION DU CONTENU CART DANS LE LOCALSTORAGE ET CHANGEMENT DU TITRE EN FONCTION DE LA REPONSE //
    if(localStorage.length === 0) {
        titleContainer.innerText='Votre panier est vide';
      } else {
        titleContainer.innerText='Contenu de votre panier';
      }
}
switchTitle();

/** 
* @description Fonction permettant d'afficher l'overlay + formulaire.
*/
function overlayOn() {
    let btnValidate = document.getElementById('btnValidate');
    // RECUPERATION DU CLICK SUR LE BOUTON VALIDER PANIER ET MODIFICATION DU STYLE //
    btnValidate.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='1';
        document.getElementById('overlay').style.width ='100%';
            
    }) 
}
overlayOn();

/**
* @description Fonction permettant de cacher l'overlay + formulaire.
*/
function overlayOff() {
    let btnCloseOverlay = document.getElementById('btnCloseOverlay');
    // RECUPERATION DU CLICK SUR LE BOUTON RETOUR EN ARRIERE ET MODIFICATION DU STYLE //
    btnCloseOverlay.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='0';
        document.getElementById('overlay').style.width ='0%';
    }) 
}
overlayOff();

///////////////////////////////////////////////form-manager/////////////////////////////////////////////////

const form = document.getElementById('form');

// ECOUTE DU SUBMIT SUR LE FORMULAIRE //
form.addEventListener('submit', event =>{
    // EMPECHE LA SOUMISSION DU FORMULAIRE //
    event.preventDefault()
    // VERIFIE LA VALIDITE DU FORMULAIRE //
    checkvalidity() 
    // RECUPERE L OBJET CONTACT DANS LE LOCALSTORAGE //
    let contactJSON = localStorage.getItem('contactData');
    let contact = JSON.parse(contactJSON);
    // RECUPERE LES ID DANS LE LOCALSTORAGE //
    let cartJSON = localStorage.getItem('cart');
    let cart = JSON.parse(cartJSON);
    let products = [];
    for(let [id] of Object.entries(cart)) {
        let idOnCart = (id);
        products.push(idOnCart);
    };
    // PASSE LES DONNEES DANS UNE VARIABLE ORDER //
    let order = {contact, products};
        console.log(order)
    
    // VARIABLES STOCKANT LES OPTIONS POUR LA REQUETE //
    const options  = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(order),
    }
    // REQUETE A L API EN ENVOYANT LES DONNEES DEMANDEES //    
    fetch('http://localhost:3000/api/cameras/order', options)
    .then(response => {
        if(!response.ok) {
            throw Error('ERROR');
        }
        // RECUPERATION DE LA REPONSE //
        return response.json();
    }) 
    .then(json =>  {
        confirmData(json)
    });
});

/**
 * @description Fonction permettant de stocker la réponse dans le localStorage et passer à la page confirmation.
 * @param {Json} json 
 */
function confirmData (json) {

    let orderId = json;

    localStorage.setItem('orderId', JSON.stringify(orderId));

    location.href = "confirm.html";
};

/**
 * @description Fonction permettant de vérifier la validité du formulaire.
 */
function checkvalidity() {
    
    // RECUPERATION DES DIFFERENTS ELEMENTS //
   
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const city = document.getElementById('city');
    const adress = document.getElementById('adress');

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
    // CREATION DE L OBJET CONTACT POUR RECUPERE LES DONNEES DU FORMULAIRE //
    let contact = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        address: adressValue,
        city: cityValue,
        email: emailValue,
      };
    // STOCKE L OBJET DANS LE LOCALSTORAGE //
    localStorage.setItem('contactData', JSON.stringify(contact));
};

/**
 * @description Fonction permettant de lancer les erreurs.
 * @param {String} input 
 * @param {String} message 
 */
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

/**
 * @description Fonction permettant de valider les inputs.
 * @param {String} input 
 */ 
function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    
};

/**
 * @description Fonction permettant de vérifier l'email rentré dans l'input.
 * @param {String} email 
 */ 
function emailValidity(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

