import {loadFromStorage, cart} from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";


describe('test suite: renderOrderSummary', () => {
// renderOrderSummary creates a part of a page. So when testing, we hav to test 2 things; - how the page looks and how the page behaves.
// we start by testing, how the page looks;
const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  // we put the variables oustide so that the 2nd test can use it, if not it won't work. bec it was in a scope(beforeEach makes a scope)

beforeEach(() => {
  spyOn(localStorage, 'setItem');
  document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
  `;
  
  
  spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
     productId: productId1 ,
     quantity: 2,
     deliveryOptionId: '1'
  },
  {
     productId: productId2,
     quantity: 1,
     deliveryOptionId: '2'
}]); 
    });
    
    loadFromStorage();

    // this renderOrderSummary(); makes it display on the test page
    renderOrderSummary();

});

it('displays the cart', () => {
  // so renderOrderSummary always displays the cart but in our testss where does the cart get displayed? 
  // so looking at the code in renderOrderSummary in line 76, we generate the html for the cart. After generating it, we put it inside an element with a class(js-order-summary) in line 167
  // however we don't have this element in our test, so to fix this, we are just going to create an element with the class(js-order-summary) 
  // so to do that we are going to enter test.html, and write some code in the body element.

  // we don't need the code below because we have formed beforeEach
   /*document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
  `;
  
  // SO INSIDE THE CONTAINER we created an element with a class js-order-summary. so the js-order-summary enters the class found in test.html
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
     productId: productId1 ,
     quantity: 2,
     deliveryOptionId: '1'
  },
  {
     productId: productId2,
     quantity: 1,
     deliveryOptionId: '2'
}]);
// we wanted more options to test, so we went to cart.js from line 14, started copying after cart =
     
    });
    
    loadFromStorage();

    renderOrderSummary();*/

    // so here we want to check if what we created in orderSummary.js line 78 creates 2 containers, since we have 2 default products we put above. so now we have created a class to do testing(in line 79, at orderSummary.js). we can't use an html class for testing. So to use a class for jvascript start with js-.....

    expect (
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    // we are using a `` because we are inserting product id, we created a new class for product in line 97, at orderSummary.js
    expect (
      // WE are using .innerText because we just want the line Quantity:, not the whole html
      // we are using another method of expect called 'toContain'. so we are checking if the value (`.js-product-quantity-${productId1}`)contains the said string, in this case is; ('Quantity: 2')
      document.querySelector(`.js-product-quantity-${productId1}`).innerText 
    ).toContain('Quantity: 2');

    expect (
      document.querySelector(`.js-product-quantity-${productId2}`).innerText 
    ).toContain('Quantity: 1');

    // we discovered the html takes space and pushes our test results down, so we set the .innerHTML to an empty string to remove the html
    document.querySelector('.js-test-container').innerHTML = '';

});
// we added <div class="js-payment-summary"></div> because it is part of the page when clicking delete in orderSummary.js
// we want to mock set item, because when you look at  orderSummary.js, when you click delete, it uses a function called removeFromCart and the code for this function in cart.js, after removing from cart it saves to local storage. so we don't want our test files to tamper with our original files(localStorage).

it('removes a product', () => {
  
      document.querySelector(`.js-delete-link-${productId1}`).click();
    expect (
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    // we want to check the first product is no longer on the page. So we are going to get the cartitem container for the first product 
     expect (
      document.querySelector(`.js-cart-item-container-${productId1}`)
     ).toEqual(null);
// to check if product 2, is still there; so the .not property checks the opposite of what come after.
     expect (
      document.querySelector(`.js-cart-item-container-${productId2}`)
     ).not.toEqual(null);
     // so we have to check that after deleting an item is the cart array updated

     expect(cart.length).toEqual(1);
     expect(cart[0].productId).toEqual(productId2);
});
});
// we notice it takes the cart and display on the page in orderSummary.js. so by default we load the cart from localStorage and it can cause problems in our test, depending on what is inside the local storge. so to fix that we are going to mock the localStorage getItem again, to control what is  exactly inside the cart