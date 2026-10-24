import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-oop.js';
//import '../data/cart-class.js'; we were using it for pratice 
//import '../data/backend-practice.js';

/*new Promise((resolve) => {
  //console.log(' start promise'); used for examples
  loadProducts(() => {
    //console.log('finished loading');
    resolve();
  });
}).then(() => {
  //console.log('next step')
  renderOrderSummary();
  renderPaymentSummary();
}); // so here we have converted our callback to a Promise*/

Promise.all([
  new Promise((resolve) => { // we are just using it as examples.
  loadProducts(() => {
    resolve('value 1');
  });

}), 
new Promise((resolve) => {
     loadCart(() => {
      resolve(); // here the console.log will be undefined, because we haven't assigned a value to it.
     });
}) // we have basically created an array of promises, so it is going to wait for all the promises to finish before going to the next step.let add next step .then adds a next step to a promise
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});


/* new Promise((resolve) => { // we are just using it as examples.
 
  loadProducts(() => {
    resolve();
  });

}).then(() => { // in the next step, we need to wait for loadCart to finish, then moving to the next step, and to do we need to use resolve, so to do that, we have to return a new promise. Later we give loadCart a function to run when it is finished. 
  return new Promise((resolve) => {
     loadCart(() => {
      resolve();
     });
  });

}).then(() => {
   renderOrderSummary();
    renderPaymentSummary();
}); // so here we using Promise to loadCart, then below we are using callback to loadCart in line 41 */

/*new Promise((resolve) => { // we are just using it as examples.
 
  loadProducts(() => {
    resolve('value 1');
  });
  
}).then((value) => {
  console.log(value); // whatever value we give to resolve, it is going to be saved as a parameter in .then
})*/


// we want to give loadProducts a callback(a function we want to run in the future). instead of creating a whole new function, we are going to create a function inside the brackets of loadProducts. we don't need to create a function name everytime. we can aswell create an anonymous function(function without name) and then give it to loadProducts, to run in the future

/*loadProducts(() =>{
    renderOrderSummary();
    renderPaymentSummary();
  });
   
// so below here we want to show u why Promises are better than callback.
/*loadProducts(() =>{
  // after we loadProducts, we loadCart. Afterdloading the cart, we give it a function. This function is going to run after the cart has loaded. we want to wait for products and cart to load before we render the page. It will load for products, wait for it to finish, load the cart wait for it to finish and then it is going to render the page.
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
  
}); */
// this is going to save the anonymous function inside the parameter fun in product.js, line 96 and we shall call fun() still in product.js after we have loaded all the products 
