
import ProductManager from './ProductManager.js'

const productManager = new ProductManager ();


fetch ('http://localhost:3000/api/cameras')
    .then ((response) => {
        return response.json ();
    })
    .then (products => {
        productManager.display(products)
    });