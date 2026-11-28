import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam('category') || 'tents';
const dataSource = new ExternalServices();
const ul = document.querySelector('.product-list');
const listing = new ProductList(category, dataSource, ul);

listing.init();
loadHeaderFooter();

// async function renderProducts() {
//   const dataList = await insertData();
//   dataList.forEach(product => {
//     const li = createProductDetails(product);
//     ul.insertAdjacentHTML('beforeend', li)
//   });
// }

// async function insertData() {
//   const products = await this.getData;
//   // setLocalStorage('products', products);
//   return products;
// }



// renderProducts();
