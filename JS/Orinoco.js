function getData() {
    // APPEL A L API //
    fetch('http://localhost:3000/api/cameras')
    // ATTENDRE LE RETOUR DE LA REPONSE ET ON VERIFIE POUR UNE ERREUR //
    .then(response => {
        if(!response.ok) {
            throw Error('ERROR');
        }
        // RECUPERATION DE LA REPONSE //
        return response.json();
    })
    .then(products => {
        // ITERATION DE CHAQUE OBJET DANS LE TABLEAU POUR Y PASSER LA FONCTION CREEE PLUS BAS //
        products.forEach(product => {displayProducts(product)})
    })
}
// APPEL DE LA FONCTION //
getData();

// CREER LA FONCTION POUR AFFICHER LES VIGNETTES PRODUITS //
function displayProducts(product) {
    // RECUPERER LA BALISE TEMPLATE DANS LE DOM //
    const templateElt = document.getElementById('cardTemplate');
    // RECUPERER LA COPIE DU TEMPLATE //
    const cloneElt = document.importNode(templateElt.content, true);
    // PASSAGE DES INFOS DES OBJETS DANS LEUR CONTENEUR //
    cloneElt.getElementById('productLinkCard').href = `/product.html?id=${product._id}`
    cloneElt.getElementById('productImg').src = product.imageUrl
    cloneElt.getElementById('productTitle').textContent = product.name
    cloneElt.getElementById('productTitle').href = `/product.html?id=${product._id}`
    cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00€`
    cloneElt.getElementById('productDescription').textContent = product.description
    // AJOUT DU TEMPLATE COPIES ET REMPLIS DANS LE DOM //
    document.getElementById('productsContainer').appendChild(cloneElt)
}


