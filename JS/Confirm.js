// ON RECUPERE LES DONNEES DANS LE LOCAL STORAGE //
var order = localStorage.getItem("orderId");
var orderCommand = JSON.parse(order);
console.log(orderCommand);

// AFFICHAGE DYNAMIQUE DES DONNEES CONTACT DU CLIENT //
let firstNameConfirm = document.getElementById('firstName');
firstNameConfirm.innerText = orderCommand.contact.firstName;

let lastNameConfirm = document.getElementById('lastName');
lastNameConfirm.innerText = orderCommand.contact.lastName;

let cityConfirm = document.getElementById('city');
cityConfirm.innerText = orderCommand.contact.city;

let addressConfirm = document.getElementById('address');
addressConfirm.innerText = orderCommand.contact.address;

let emailConfirm = document.getElementById('email');
emailConfirm.innerText = orderCommand.contact.email;


// AFFICHAGE DYNAMIQUE DU NUMERO DE COMMANDE //

let orderID = document.querySelector('.id-order');
orderID.innerText = orderCommand.orderId;


// AFFICHAGE DYNAMIQUE DU RECAPITULATIF COMMANDE //

function cloneTable () {

    for(i = 0; i < orderCommand.products.length - 1; i ++) {
        
        let tableRow = document.querySelector('.tableRow');
        let cloneproduct = tableRow.cloneNode(true);
        parentNode.appendChild(cloneproduct);
    }

    let trParent = document.createElement('tr');
    let totalPriceConfirm = document.createElement('td');
    trParent.appendChild(totalPriceConfirm);
    parentNode.appendChild(trParent);

    totalPriceConfirm.setAttribute('colspan', '4');
    totalPriceConfirm.classList.add('text-center', 'bold');
    totalPriceConfirm.setAttribute('id', 'totalPriceConfirm');

    totalPriceConfirm.innerText = `Montant total: ${orderCommand.products.price / 100}.00€`;
}

cloneTable();

let nameConfirm = document.querySelectorAll('.nameConfirm');
let quantityConfirm = document.querySelectorAll('.quantityConfirm');
let priceConfirm = document.querySelectorAll('.priceConfirm');

var productsArray = localStorage.getItem("object");
var getQty = JSON.parse(productsArray);
console.log(getQty);


function addDataToTheTable() {

    for(i = 0; i < orderCommand.products.length; i ++) {

        nameConfirm[i].textContent = orderCommand.products[i].name;
        priceConfirm[i].textContent = `${orderCommand.products[i].price / 100}.00€`;
        let priceStore = [];
        priceStore.push(priceConfirm.price);
        console.log(priceStore)
    }
    
        for(i = 0; i < getQty.length; i ++) {

        quantityConfirm[i].textContent = getQty[i][2];

    }
}

addDataToTheTable();