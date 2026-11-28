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

  addProductToCart() {
    const products = getLocalStorage('so-cart') || []; // get products array, if null makes a new one
    const existingProduct = products.find(
      (product) => product.Id === this.product.Id
    );
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      products.push(this.product);
    }
    setLocalStorage('so-cart', products);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
}

}

function productDetailsTemplate(product) {
  // const list = `
  // <li class="product-card">
  //   <a href="/product_pages/index.html?product=${product.id}">
  //     <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
  //     <h3 class="card__brand">${product.Brand.Name}</h3>
  //     <h2 class="card__name">${product.NameWithoutBrand}</h2>
  //     <p class="product-card__price">$${product.FinalPrice}</p>
  //   </a>
  // </li>
  // `;
  // return list;
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('product-image');
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.querySelector('.product-card__price').textContent = product.FinalPrice;
  document.querySelector('.product__color').textContent = product.Colors[0].ColorName;
  document.querySelector('.product__description').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}