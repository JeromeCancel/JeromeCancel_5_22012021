
// ON RECUPERE LES DONNEES DE LA PAGE PRODUCT //
productChoose = localStorage.getItem("object");
idProduct = localStorage.getItem("id");

productsArray = JSON.parse(productChoose);
products= JSON.parse(idProduct);


// RECUPERATION DES ELEMENTS DU DOM // 
const btnValidate = document.getElementById('btnValidate');
const btnCloseOverlay = document.getElementById('btnCloseOverlay');
const displayCartContainer = document.getElementById('displayCartContainer');
const displayCartItem = document.getElementById('displayCartItem');
const titleContainer = document.getElementById('switchTitle');


/**
 * @description Fonction permettant de modifier le titre selon si le panier est vide ou pas
 * @param 
 */
function switchTitle() {
    // VERIFICATION DU CONTENU CART DANS LE LOCALSTORAGE ET CHANGEMENT DU TITRE EN FONCTION DE LA REPONSE //
    if(localStorage.length === 0) {
        titleContainer.innerText='Votre panier est vide';
      } else {
        titleContainer.innerText='Contenu de votre panier';
      }
}
switchTitle();


function updateCart() {

}

/**
 * @description Fonction permettant d'afficher le contenu du panier
 * @param 
 */
function displayCart() {
    // BOUCLE DANS LE TABLEAU DES PRODUITS DU PANIER //
    for(i = 0; i < productsArray.length; i++ ) {
        // RECUPERATION DU TEMPLATE HTML //
        const templateElt = document.getElementById('displayCartItem');
        // RECUPERATION DE LA COPIE DU TEMPLATE //
        const cloneElt = document.importNode(templateElt.content, true);
        // PASSAGE DES INFOS DANS LEURS CONTENEURS //
        cloneElt.getElementById('imgCart').src = productsArray[i][0].imageUrl
        cloneElt.getElementById('name').textContent = productsArray[i][0].name;
        cloneElt.getElementById('price').textContent = `${productsArray[i][0].price * productsArray[i][2] / 100}.00€`; 
        cloneElt.getElementById('lenseChoice').textContent = productsArray[i][1];
        cloneElt.querySelector('.quantityProduct').textContent = productsArray[i][2];
        cloneElt.querySelector('.bi-chevron-up');
        // AJOUT DU TEMPLATE FINIS DANS LE DOM //
        document.getElementById('displayCartContainer').appendChild(cloneElt)

    }
}

displayCart()

const cardContainer = document.querySelectorAll('.card-container');
console.log(cardContainer)


// SELECTIONNE ET POSITIONNE LA QUANTITE AFFICHEE A 1 //

//let quantity = document.querySelectorAll('.quantityProduct');
/*function updateQuantity () {
    let quantity = document.querySelector('.quantityProduct')
    if(!quantity(products[i][2])) {

    }
}*/
for(i = 0; i < cardContainer.length; i ++) {
    function increaseQty() {
        let btnQtyPlus = document.querySelector('.bi-chevron-up');
        let quantity = document.querySelector('.quantityProduct')    
        btnQtyPlus.addEventListener('click', function() {
            quantity.textContent = parseInt(quantity.textContent) + 1;
                
        })
    }       
    
    increaseQty()
    
    function decreaseQty() {
        let btnQtyMinus = document.querySelector('.bi-chevron-down');
        let quantity = document.querySelector('.quantityProduct')
        btnQtyMinus.addEventListener('click', function() {
            quantity.textContent = parseInt(quantity.textContent) - 1;        
                
        })
       
    }

    decreaseQty()
    

}
    


/*function increaseQty(i) {
    let btnQtyPlus = document.querySelectorAll('.bi-chevron-up');
    for(i = 0; i < btnQtyPlus.length; i++){
        btnQtyPlus[i].addEventListener('click', function() {
            let quantity = document.querySelector('.quantityProduct')
            quantity.textContent = parseInt(quantity.textContent) + 1;
          
            
        })
    }
   
}
increaseQty()

function decreaseQty() {
    let btnQtyMinus = document.querySelector('.bi-chevron-down');
    let quantity = document.querySelector('.quantityProduct')
    btnQtyMinus.addEventListener('click', function() {
        quantity.textContent = parseInt(quantity.textContent) - 1;
    })
}
decreaseQty()*/




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


//      ADDITIONNER LE PRICE DU PRODUIT AU PRICE TOTAL => UPDATE LE PANIER? }

//      SOUSTRAIRE LE PRICE DU PRODUIT AU PRICE TOTAL => UPDATE LE PANIER? }




   //  UPDATE LE PANIER  !!!!} //

/**
 * @description Fonction permettant d'afficher l'overlay + formulaire
 * @param 
 */
function overlayOn() {
    // RECUPERATION DU CLICK SUR LE BOUTON VALIDER PANIER ET MODIFICATION DU STYLE //
    btnValidate.addEventListener('click', function () {
        document.getElementById('overlay').style.opacity ='1';
        document.getElementById('overlay').style.width ='100%';
            
    }) 
}
overlayOn();


/**
 * @description Fonction permettant de cacher l'overlay
 * @param 
 */
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
form.addEventListener('submit', async event =>{
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
    let response = await fetch('http://localhost:3000/api/cameras/order', options)
    .then(response => response.json()) 
    .then(json =>  {
        confirmData(json)
    });
    // RECUPERATION DE LA REPONSE //
    
});

function confirmData (json) {

    let orderId = json;

    localStorage.setItem('orderId', JSON.stringify(orderId));

    location.href = "confirm.html";
}

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

