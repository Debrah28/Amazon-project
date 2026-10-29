import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  // we want to loop through the cart, then for each product, price*quantity, then add everything together.
  // in cart.js we have the product id and price. the product id contains contains all information about the product including price 
    let productPriceCents = 0;
    // we create let shipping price below, to save the results;
    let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product= getProduct(cartItem.productId);
    // productPriceCents += product.priceCents * cartItem.quantity is the same as; productPriceCents = productPriceCents + (product.priceCents * cartItem.quantity) 

   productPriceCents += product.priceCents * cartItem.quantity

   // each cart item has a property deliveryoptionId, so we shall use that id to get the full delivery option, which has the price for shiipping cost.

   // each cartItem has a deliveryOptionId that is why we put that into the function
   const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
   // TO GET THE PRICE OF THE DELIVERY OPTION, IT IS;
   shippingPriceCents +=deliveryOption.priceCents;
  });

 const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

 const taxCents = totalBeforeTaxCents * 0.1 ;

 const totalCents = totalBeforeTaxCents + taxCents;

 // WE created a variable to store the HTML
 const paymentSummaryHTML = `
  
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
        `;
//changing the html inside that element, that is why we use .innerHTML
        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

        document.querySelector('.js-place-order').addEventListener('click', async () => {
          // try/catch does error handling
          try {
                     const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'appliction/json'
            },
            body: JSON.stringify({
              cart: cart
            })
          })
// so response.json() is a promise, so we can use await to wait for the response, before going to the next line. This will give us a data attached to the response, it should be in order that was created by the backend
          const order = await response.json();
          //console.log(order);
          // after we create an order from the backend, we are going to add it to the array and save it to backend. Using the function addOrder(order)
          addOrder(order);

          } catch (error) {
            console.log('Unexpected error. Try again later.');
          }

          window.location.href = 'orders.html';
 
        });
}