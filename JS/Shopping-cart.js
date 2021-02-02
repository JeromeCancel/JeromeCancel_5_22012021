// CHOSES A PREVOIR POUR CETTE PAGE: //

// const textCartTitle = document.getElementById ('textCartTitle');
//  if(localStorage == 0) {
//      textCartTitle.class
//  }else 

// 1- ECOUTER LE BTN D AJOUT AU PANIER SUR LA PAGE PRODUCT {
//      const addToCart = document.getElementById ('addToCart'); --> Recupère le bouton d'ajout au panier sur la page produit
//      addToCart.addEventListenner ('click', function() {       --> Au click récupère les infos du produit en objet ??
//           
//          localStorage.setItem(value);                         --> Stocke l'objet dans le local storage en attente
//      })
//      
    

// 2- QUAND LE CLIENT VA SUR LA PAGE PANIER
//      const displayCartContainer = document.getElementById ('displayCartConainer'); --> element parent
//      const displayCartItem = document.queryselector ('displayCartItem');  --> conteneur du panier représentant 1 produit
//      function DisplayCart( = > {
//          localStorage.getItem('??', JSON.stringify('??'));                           --> Récupère tous les produits dans le local storage
//          forEach ()
//      })
//


// 3- ECOUTER UN ICON TRASHBIN PERMETTANT DE SUPPRIMER LE/LES PRODUITS DU PANIER {
//      const removeItem = document.getElementById ('trashbin'); --> icône poubelle
//      const itemToRemove = document.????;                      --> produit à supprimer
//      removeItem.addEventListenner ('click', function() {
//              displayCartContainer.removeChild('displayCartItem > ${itemToRemove}');
//              localStorage.removeItem('??', JSON.parse('??'));
//      })
//       panier vide    [];
/* ex de panier avec 2 lignes [
      {id: 2656456, nom:'fdfdfd', quantite: 1}
      {id: 265654546, nom:'fdfdfd', quantite: 2}        
        
             ],
     UPDATE LE PANIER  !!!!} */


// 4- ECOUTER UN BTN + PERMETTANT D AJOUTER LE MEME PRODUIT {
//      RECUPERER L ECOUTE
//      RETOURNER L ECOUTE ET AJOUTER +1 A LA QUANTITE
//      AJOUTER +1 AU LOCAL STORAGE
    // localStorage.setItem('??', JSON.stringify('??'));
//      ADDITIONNER LE PRICE DU PRODUIT AU PRICE TOTAL => UPDATE LE PANIER? }


// 5- ECOUTER UN BTN - PERMETTANT D ENLEVER LE MEME PRODUIT {
//      RECUPERER L ECOUTE
//      RETOURNER L ECOUTE ET SOUSTRAIRE -1 A LA QUANTITE
//      SOUSTRAIRE -1 AU LOCAL STORAGE
    // localStorage.removeItem('??', JSON.parse('??'));
//      SOUSTRAIRE LE PRICE DU PRODUIT AU PRICE TOTAL => UPDATE LE PANIER? }


// 6- ECOUTER LES DIFFERENTS INPUT DU FORMULAIRE {
//      SI REPONSE => OK => VALIDER => BASCULE SUR LA FENETRE DE CONFIRMATION DE COMMANDE
//      SI REPONSE => FALSE => DISPLAY ERREUR ET REDEMANDER L ACTION }


//  Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs
//firstName, lastName, address, city et email. Le tableau des produits envoyé au
//backend doit être un array de strings product_id. Les types de ces champs et leur
//présence doivent être validés avant l’envoi des données au serveur.
