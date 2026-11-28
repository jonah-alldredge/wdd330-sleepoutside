import {alertMessage, getLocalStorage, setLocalStorage, getParam, loadHeaderFooter, setLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';


const dataSource = new ExternalServices();

function addProductToCart(product) {
  const cart = getLocalStorage('so-cart');
  setLocalStorage('so-cart', [
    ...(Array.isArray(cart) ? cart : [cart]),
      product,
  ]);
  alertMessage(`${product.Name} was added to your cart.`, false);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document.getElementById('addToCart').addEventListener('click', addToCartHandler());

const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();