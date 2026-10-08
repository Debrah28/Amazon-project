import {cart, removeFromCart, updateToCart} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";

hello(); //external library, it works only when you have data

// presently we are using the dayjs external library, to do 3things -get today date, -do calculations(add 7days), -display the date in easy to read format. to know how to use dayjs, check out it documentation on google.
// to get today date, you just call out the function dayjs(). that is why when you console.log((dayjs)); it gives you today date
// now we want to add days to the current date. add() method takes two parameters. The 1st one is the number of times, we want to add and 2nd one is the length of time we want to add
//.format is used to display the date in easy to read format. you can search on google the available formats when using .format with dayjs.
// So putting comma will reflect on the date

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

// so we are about to combine all the html together and put it on the page. so to do that, we are going to create a variable

let cartSummaryHTML = '';

// we have given it a parameter amd we have called it cartItem
// we import products bec we want to use proctId to fetch for the other information needed on checkout page, without us recopying the data all over again, so .productId is from cart.js under (export let cart = [{ productId: )

// each time we loop through the cart, we are going to add the html in the variable upthere(let cartSummaryHTML) so that we combine it. the cart in (cart.forEach((cartItem) => {) is from cart.js. so cartItem was used to get the data we needed, so we opened card.js, in it we have the productId and quantity. so we used the productId to search for the products in other to get the other details like image, price,etc. so we got the productId out of the cartItem first(const productId = cartItem.productId;) 
// so we used productId to search for the full product, so we first imported product.js and created matchingProduct to save the results
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) =>{
    // so products is from product.js, we created matchingProduct to get access to products in product.js, that is why we have a loop. we loop through the products array found in product.js. we gave it a parameter product

    // here we looking if the product id in product.js is equal to our product in checkout.js. If yes we have a matchingProduct we are saving it in the variable (let matchingProduct;). So the matching product will be equal the product we are looping through (products.forEach((product) =>{})
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

 // we are generating all this html by looping through our cart

cartSummaryHTML +=`
 <div class="cart-item-container 
 js-cart-item-container-${matchingProduct.id}">
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
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
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

     // so here we used the Dom and productId to get that special class added above (js-cart-item-container-${matchingProduct.id})
     //because we are inserting matchingProduct.id we are going to switch '' to ``

    const container = document.querySelector(`.js-cart-item-container-${productId}`

     );
     container.remove(); 
  });
});

document.querySelectorAll('.js-update-link')
.forEach((link) => {
  link.addEventListener('click', () => {
     const productId = link.dataset.productId;
      });
});
