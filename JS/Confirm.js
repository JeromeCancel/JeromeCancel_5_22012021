import Confirm from './Class/ConfirmClass.js';

const confirm = new Confirm();
confirm.display();

// ON RECUPERE LES DONNEES DANS LE LOCAL STORAGE //
const order = localStorage.getItem("orderId");
const orderCommand = JSON.parse(order);


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





