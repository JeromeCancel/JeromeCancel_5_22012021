
function getData() {
    fetch('http://localhost:3000/api/cameras')
    .then(response => {
        if(!response.ok) {
            throw Error('ERROR');
        }
        return response.json();
    })
    .then( products => {
        products.forEach(product => {displayProduct(product)})
    })
}

getData();

function displayProduct (product) {

    const templateElt = document.getElementById ('cardTemplate');

    const cloneElt = document.importNode (templateElt.content, true);

    cloneElt.getElementById('productLinkCard').href = `/product.html?id= ${product._id}`
    cloneElt.getElementById('productImg').src = product.imageUrl
    cloneElt.getElementById('productTitle').textContent = product.name
    cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00€`
    cloneElt.getElementById('productDescription').textContent = product.description

    document.getElementById('productsContainer').appendChild(cloneElt)
}