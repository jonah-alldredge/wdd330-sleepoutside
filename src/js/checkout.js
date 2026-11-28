import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess  from './CheckoutProcess.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();
checkout.calculateOrderTotal();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document.querySelector("#zip").addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {e.preventDefault();
  checkout.checkout();
});

document.forms.checkout.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.currentTarget.checkValidity()) {
    checkout.checkout();
  } else {
    event.currentTarget.reportValidity();
  }
});