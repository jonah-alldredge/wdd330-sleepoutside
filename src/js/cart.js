import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  const deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeItem(cartItems, index);
      });
    
  })
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}"/>
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
  cartItems.splice(index, 1);
  setLocalStorage('so-cart', cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  renderCartContents();
}



renderCartContents();
