export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async renderLists() {
  const dataList = await insertData();
    dataList.forEach(product => {
      const li = createProductTemplate(product);
      ul.insertAdjacentHTML('beforeend', li)
    });
  }

  async init() {
    const list = await this.dataSource.getData();
  }
}

function createProductTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}"/>
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}