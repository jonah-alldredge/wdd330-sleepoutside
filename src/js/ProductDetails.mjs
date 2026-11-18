import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
}

async init() {
  this.product = await this.dataSource.findProductById(this.productId);
  this.renderProductDetails();
  document.getElementById('addToCart').addEventListener('click', () => this.addProductToCart(this.product));
}

  addProductToCart(product) {
    const products = getLocalStorage('so-cart') || []; // get products array, if null makes a new one
    products.push(this.product);
    setLocalStorage('so-cart', products);
  }

  async renderProductDetails() {
    await productDetailsTemplate(this.product);
}

}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('product-image');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.querySelector('.product-card__price').textContent = product.FinalPrice;
  document.querySelector('.product__color').textContent = product.Colors[0].ColorName;
  document.querySelector('.product__description').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}