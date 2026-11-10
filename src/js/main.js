import ProductData, { createProductDetails } from "./ProductData.mjs";
import { setLocalStorage } from "./utils.mjs";

const data = new ProductData('tents');
const ul = document.querySelector('.product-list');

async function renderProducts() {
  const dataList = await insertData();
  dataList.forEach(product => {
    const li = createProductDetails(product);
    ul.insertAdjacentHTML('beforeend', li)
  });
}

// Fetching data and populating 
async function insertData() {
  const products = await data.getData();
  // setLocalStorage('products', products);
  return products;
}

renderProducts();