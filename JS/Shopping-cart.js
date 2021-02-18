import Product from "./Class/ProductClass.js"; // IMPORT DE LA CLASSE PRODUCT //

// ON RECUPERE LES DONNEES DE LA PAGE PRODUCT //
let cart = localStorage.getItem("cart");
let products = JSON.parse(cart);
console.log(products)

for(let [id, product] in Object.entries(products)) {
    product = new Product(product);
    console.log(product)
}
// On c'est arrêteé là, malgré mes tests le product a toujours des propriétès vide, 


// RECUPERATION DES ELEMENTS DU DOM // 
const btnValidate = document.getElementById('btnValidate');
const btnCloseOverlay = document.getElementById('btnCloseOverlay');
const displayCartContainer = document.getElementById('displayCartContainer');
const displayCartItem = document.getElementById('displayCartItem');
const titleContainer = document.getElementById('switchTitle');

// Test de création de classe cart pour gérer le panier, la pour le coup mon objet est pas vide mais je peut rien en faire non plus   //
/*class Cart {

    constructor(products) {
       
        //this.subtotal = null;
        //this.total = null;
        // on fusionne l'objet products dans cet objet
        Object.assign(this, products);
    }

    display() {
       
        const templateElt = document.getElementById('displayCartItem');
        // RECUPERATION DE LA COPIE DU TEMPLATE //
        const cloneElt = document.importNode(templateElt.content, true);
        // PASSAGE DES INFOS DANS LEURS CONTENEURS //
        cloneElt.getElementById('imgCart').src = this.imageUrl;
        cloneElt.getElementById('name').textContent = this.name;
        cloneElt.getElementById('price').textContent = `${this.price * this.quantity / 100}.00€`; 
        cloneElt.getElementById('lenseChoice').textContent = this.lenseSelected;
        cloneElt.querySelector('.quantityProduct').textContent = this.quantity;
        cloneElt.querySelector('.bi-chevron-up');
        // AJOUT DU TEMPLATE FINIS DANS LE DOM //
        document.getElementById('displayCartContainer').appendChild(cloneElt)


    }
};*/

/*const productCart = new Cart(products);
productCart.display();
console.log(productCart)*/








/**
 * @description Fonction permettant de modifier le titre selon si le panier est vide ou pas
 * @param 
 */
/*function switchTitle() {
    // VERIFICATION DU CONTENU CART DANS LE LOCALSTORAGE ET CHANGEMENT DU TITRE EN FONCTION DE LA REPONSE //
    if(localStorage.length === 0) {
        titleContainer.innerText='Votre panier est vide';
      } else {
        titleContainer.innerText='Contenu de votre panier';
      }
}
switchTitle();*/


/*function updateCart() {

}*/

/**
 * @description Fonction permettant d'afficher le contenu du panier
 * @param 
 */
function displayCart() {
    // BOUCLE DANS LE TABLEAU DES PRODUITS DU PANIER //
    for(let i = 0; i < products.length; i++ ) {
        // RECUPERATION DU TEMPLATE HTML //
        const templateElt = document.getElementById('displayCartItem');
        // RECUPERATION DE LA COPIE DU TEMPLATE //
        const cloneElt = document.importNode(templateElt.content, true);
        // PASSAGE DES INFOS DANS LEURS CONTENEURS //
        cloneElt.getElementById('imgCart').src = products.imageUrl
        cloneElt.getElementById('name').textContent = productsArray[i][0].name;
        cloneElt.getElementById('price').textContent = `${productsArray[i][0].price * productsArray[i][2] / 100}.00€`; 
        cloneElt.getElementById('lenseChoice').textContent = productsArray[i][1];
        cloneElt.querySelector('.quantityProduct').textContent = productsArray[i][2];
        cloneElt.querySelector('.bi-chevron-up');
        // AJOUT DU TEMPLATE FINIS DANS LE DOM //
        document.getElementById('displayCartContainer').appendChild(cloneElt)

    }
}

//displayCart()

/*const cardContainer = document.querySelectorAll('.card-container');
console.log(cardContainer)*/


/*function removeItem() {
    let btnRemoveItem = document.querySelector('.bi-trash');
    let childNodeForRemove = document.getElementById('childNodeForRemove');
    btnRemoveItem.addEventListener('click', function(event) {
        event.stopPropagation()
        displayCartContainer.removeChild(childNodeForRemove);
        JSON.parse(localStorage.removeItem('cart'));

    })
}
removeItem()



/**
 * @description Fonction permettant d'afficher l'overlay + formulaire
 * @param 
 */
/*function overlayOn() {
    // RECUPERATION DU CLICK SUR LE BOUTON VALIDER PANIER ET MODIFICATION DU STYLE //
    btnValidate.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='1';
        document.getElementById('overlay').style.width ='100%';
            
    }) 
}
overlayOn();*/


/**
 * @description Fonction permettant de cacher l'overlay
 * @param 
 */
/*function overlayOff() {
    // RECUPERATION DU CLICK SUR LE BOUTON RETOUR EN ARRIERE ET MODIFICATION DU STYLE //
    btnCloseOverlay.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='0';
        document.getElementById('overlay').style.width ='0%';
    }) 
}
overlayOff();*/



///////////////////////////////////////////////form-manager/////////////////////////////////////////////////

//  Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs
//firstName, lastName, address, city et email. Le tableau des produits envoyé au
//backend doit être un array de strings product_id. Les types de ces champs et leur
//présence doivent être validés avant l’envoi des données au serveur.

//const form = document.getElementById('form');

// ECOUTE DU SUBMIT SUR LE FORMULAIRE //
/*form.addEventListener('submit', event =>{
    // EMPECHE LA SOUMISSION DU FORMULAIRE //
    event.preventDefault()
    // VERIFIE LA VALIDITE DU FORMULAIRE //
    checkvalidity() 
    // RECUPERE L OBJET CONTACT DANS LE LOCALSTORAGE //
    contactJSON = localStorage.getItem('contactData');
    contact = JSON.parse(contactJSON);
    // PASSE LES DONNEES DANS UNE VARIABLE ORDER //
    let order = {contact, products};
        console.log(order)
    
    // VARIABLES STOCKANT LES OOPTIONS POUR LA REQUETE //
    const options  = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(order),
    }
    // REQUETE A L API EN EVOYANT LES DONNEES DEMANDEES //    
    fetch('http://localhost:3000/api/cameras/order', options)
    .then(response => response.json()) 
    .then(json =>  {
        confirmData(json)
    });
    // RECUPERATION DE LA REPONSE //
    
});*/

/*function confirmData (json) {

    let orderId = json;

    localStorage.setItem('orderId', JSON.stringify(orderId));

    location.href = "confirm.html";
}*/

// VERIFIE LA VALIDITE DU FORMULAIRE //
/*function checkvalidity() {
    
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
    // STOCKES L OBJET DANS LE LOCALSTORAGE //
    localStorage.setItem('contactData', JSON.stringify(contact));
};*/

// FONCTION PERMETTANT DE LANCER LES ERREURS QUI PRENDS EN PARAMETRE LES INPUTS ET LES MESSAGES A DISTRIBUER //
/*function setErrorFor(input, message) {
    // RECUPERATION DES CONTAINER D INPUT //
    const formGroup = input.parentElement;
    // RECUPERATION DES BALISES HTML CACHES //
    const small = formGroup.querySelector('small');
    // PASSE LA CLASSE ERROR STYLISE EN CSS //
    formGroup.className = 'form-group error';
    // INJECTE LE MESSAGE PREVU DANS LA BALISE HTML //
    small.innerText = message;
};*/

// FONCTION PERMETTANT DE VALIDER LES INPUTS // 
/*function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    
};*/

// FONCTION PERMETTANT DE TESTER LA VALIDE DE L EMAIL RENTRE DANS L INPUT // 
/*function emailValidity(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};*/

