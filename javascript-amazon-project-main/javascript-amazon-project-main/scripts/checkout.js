import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-oop.js';
//import '../data/cart-class.js'; we were using it for pratice 
//import '../data/backend-practice.js';

/*async function loadPage() {
  console.log('load page');
  return 'value2'; // this value will be saved in a parameter for the next step
}// we call the function and because it returns a promise, we can add a next step using .then 
loadPage().then((value) => {
  console.log('next step');
  console.log(value);
});*/

// let run some code that creates a promise, we are using async
/* async function loadPage() {
  console.log('load page');
// loadProductsFetch() loads products from the backend and usually, this returns a promise, one way to wait for this to finish is to use .then and give it a function. so .then runs the function after loadProductsFetch() has finished
// await gives us another way to wait for this promise(loadProductsFetch()) to finish 
  await loadProductsFetch(); 

  return 'value2';
}
loadPage().then((value) => {
  console.log('next step');
  console.log(value);
});*/ // example of async await

// let use async await in our project.
async function loadPage() {
 
  await loadProductsFetch(); 

 await new Promise((resolve) => {
     loadCart(() => {
      resolve(); // load products wait for it to finish, load cart wait for it to finish. later on finish with the rest of the code(display the page).
     });
});

 renderOrderSummary();
  renderPaymentSummary();
}
loadPage()

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

// we have change loadProducts to loadProductsFetch. This is because loadProducts from products.js uses callback and loadProductsFetch uses fetch and fetch uses promises
/*Promise.all([// we need to give it a promise and fetch returns a promise, so we had to do was just call it. 
loadProductsFetch(), //this returns a promise andwe can use it with Promise.all
new Promise((resolve) => {
     loadCart(() => {
      resolve(); // here the console.log will be undefined, because we haven't assigned a value to it.
     });
}) // we have basically created an array of promises, so it is going to wait for all the promises to finish before going to the next step.let add next step .then adds a next step to a promise
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
}); */


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



/* Here loadProducts from products.js uses callback. check line 22 of checkout. js, this file
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
}); */



/*async function loadPage() {
  console.log('load page');
}
  is shortcut to this below;

  function loadPage() {
  return new Promise((resolve) => {
  console.log('load page'); 
    resolve();
  });
}*/