import {cart, removeFromCart, updateDeliveryOption, /*updateToCart*/} from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import  dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js"; 
import { renderPaymentSummary } from "./paymentSummary.js";

// so above we have copied the esm version, the esm version basically contains the export beside the code
/*hello(); //external library, it works only when you have data

// presently we are using the dayjs external library, to do 3things -get today date, -do calculations(add 7days), -display the date in easy to read format. to know how to use dayjs, check out it documentation on google.
// to get today date, you just call out the function dayjs(). that is why when you console.log((dayjs)); it gives you today date
// now we want to add days to the current date. add() method takes two parameters. The 1st one is the number of times, we want to add and 2nd one is the length of time we want to add
//.format is used to display the date in easy to read format. you can search on google the available formats when using .format with dayjs.
// So putting comma will reflect on the date

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));*/
 
// the word render means to display on the page

export function renderOrderSummary() {

  // so we are about to combine all the html together and put it on the page. so to do that, we are going to create a variable

let cartSummaryHTML = '';

// we have given it a parameter amd we have called it cartItem
// we import products bec we want to use proctId to fetch for the other information needed on checkout page, without us recopying the data all over again, so .productId is from cart.js under (export let cart = [{ productId: )

// each time we loop through the cart, we are going to add the html in the variable upthere(let cartSummaryHTML) so that we combine it. the cart in (cart.forEach((cartItem) => {) is from cart.js. so cartItem was used to get the data we needed, so we opened card.js, in it we have the productId and quantity. so we used the productId to search for the products in other to get the other details like image, price,etc. so we got the productId out of the cartItem first(const productId = cartItem.productId;) 
// so we used productId to search for the full product, so we first imported product.js and created matchingProduct to save the results
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // since we are no more updating this variable, we shall change from let to const
  const matchingProduct = getProduct(productId);

   /* products.forEach((product) =>{
    // so products is from product.js, we created matchingProduct to get access to products in product.js, that is why we have a loop. we loop through the products array found in product.js. we gave it a parameter product

    // here we looking if the product id in product.js is equal to our product in checkout.js. If yes we have a matchingProduct we are saving it in the variable (let matchingProduct;). So the matching product will be equal the product we are looping through (products.forEach((product) =>{})
    if (product.id === productId) {
      matchingProduct = product;
    }
  }); */

//we are generating all this html by looping through our cart

 // we are getting the delivery option Id out of the cart so that cart-item-container, delivery date should be the the same with choose a delivery option

 const deliveryOptionId = cartItem.deliveryOptionId; 

 const deliveryOption = getDeliveryOption(deliveryOptionId);

 // we create let to save the results

 /*let deliveryOption;
 deliveryOptions.forEach((option) => {
  if (option.id === deliveryOptionId) {
    deliveryOption = option;
  }
 }); */
 
  
 const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    ); 

    const dateString = deliveryDate.format('dddd, MMMM D');

    // for each product in the cart we creat a class "cart-item-container" we created the class js-cart-item-container, for testing purposes(orderSummaryTest.js)
cartSummaryHTML +=`
 <div class="cart-item-container 
 js-cart-item-container
 js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                <div class="product-quantity
                js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}"
                   data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
`;
});

// we are importing matchingProduct because we cannot use a variable out of a function. so we are passing it into a the new function, so that it works there

function deliveryOptionsHTML(matchingProduct,cartItem) {
  // here we created a variable to save the result
  let html = ''; 

  deliveryOptions.forEach((deliveryOption) => { 
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    ); 

    const dateString = deliveryDate.format('dddd, MMMM D');
    
    // we are using itenary operator below, how it works is; if the 1st part returns truth, the value is whatever after the question mark, if the first part is false, then the value is what that is after the colon(:). it is like an if statement. Just that we can store it inside a variable
    const priceString = deliveryOption.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)} -`;
    //any time we loop through, we add the html below to the result above (let html= '';)

    // so we noticed thatthe selectors were empty, so we want the delivery option saved in the cart to be checked. so we created an attribute checked. however we don't want every selector to be checked, we only want it to be checked if it matches the delivery options id that is saved in the cart.

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html +=`
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
                `

  });
  // after we created the html, we are going to return it from this function

  return html;
}

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
     // so after clicking delete, we regenerate our html to update our payment section, that is why we have that code below;
     renderPaymentSummary();
  });
});

// so we have written some code in cart.js(line 75), so for each selector we click, we want it to update some code(updateDeliveryOption(productId,deliveryOptionId)) but now (productId,deliveryOptionId); don't have values, we want to get them. but if we scroll up we have access to the product id(in line 141, which is matchingProduct.id) and access to the deliveryOption.id in line 134. so we want to use data attributes to attach to the elements above

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
  element.addEventListener('click', () => {  
    const {productId, deliveryOptionId} = element.dataset;
     updateDeliveryOption(productId,deliveryOptionId);
     // we don't want to update the page using the dom, so we re-run all the code above and regenerate all the html. after we have updated the data(updateDeliveryOption(productId,deliveryOptionId);) we are going to re-run the code or call the function using;
     renderOrderSummary();
     renderPaymentSummary();
      });
});
}



// const {productId, deliveryOptionId} = element.dataset; above is the shorthand property of  const productId = element.dataset.productId; and const deliveryOptionId = element.dataset.deliveryOptionId;


/* i was trying myself

document.querySelectorAll('.js-update-link')
.forEach((link) => {
  link.addEventListener('click', () => {
     const productId = link.dataset.productId;
      });
});*/
