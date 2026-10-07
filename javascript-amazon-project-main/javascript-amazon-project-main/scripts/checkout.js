import {cart, removeFromCart} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";

// so we are about to combine all the html together and put it on the page. so to do that, we are going to create a variable

let cartSummaryHTML = '';

// we have given it a parameter amd we have called it cartItem
// we import products bec we want to use proctId to fetch for the other information needed on checkout page, without us recopying the data all over again.

// each time we loop through the cart, we are going to add the html in the variable upthere(let cartSummaryHTML) so that we combine it
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) =>{
    // here we looking if the product id in product.js is equal to our product in checkout.js. If yes we have a matchingProduct we are saving it in the variable (let matchingProduct;). So the matching product will be equal the product we are looping through (products.forEach((product) =>{})
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

 // we are generating all this html by looping through our cart

cartSummaryHTML +=`
 <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">
                 $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// we are using All because we want to select all the delete links on the page 
// so we create a function to toop through it. later on create an event listener using click, so that when we click, it does the function we want it to do.
// what it shall do is in 2 steps; -remove the product from the cart and - update the html
// how do we know which product to remove, to do that; we can attach the product ID, We are attaching it up beside its class
document.querySelectorAll('.js-delete-link')
.forEach((link) => {
  link.addEventListener('click', () => {
    // to get the product id we use the link element, dataset to access the data attribute and we are accessing .productId. So to remove a productId from the cart. we shall create a function in cart.js bec cart.js is supposed to contain all the code related to the cart.
     const productId = link.dataset.productId;
     
     removeFromCart(productId);
  });
});