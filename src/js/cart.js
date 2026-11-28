import { getLocalStorage, setLocalStorage,  loadHeaderFooter} from './utils.mjs';

const textTotal = document.querySelector('.p-cart-total');
const showTotal = document.querySelector('.cart-total');

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  cartTotalFunction(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  if (cartItems != '') {
    showTotal.classList.remove('hide');
  }
  const deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeItem(cartItems, index);
      });
  })
}

function cartItemTemplate(item) {
  let imgSrc;
  if (item.Image) {
    imgSrc = item.Image;
  } else {
    imgSrc = item.Images.PrimaryMedium;
  }
  // console.log(imgSrc);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${imgSrc}" alt="${item.Name}"/>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class ='deleteButton'>❌</button>
</li>`;
  return newItem;
}

function removeItem(cartItems, index) {
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0
  );
  cartItems.splice(index, 1);
  setLocalStorage('so-cart', cartItems);
  setLocalStorage('cart-total', cartTotal);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  renderCartContents();
}

function cartTotalFunction(cartItems) {
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0
  );
  setLocalStorage('cart-total', cartTotal);
  textTotal.textContent = `Total: $${cartTotal.toFixed(2)}`;
}

loadHeaderFooter();
renderCartContents();
