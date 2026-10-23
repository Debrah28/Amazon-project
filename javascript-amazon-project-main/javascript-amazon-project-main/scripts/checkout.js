import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-oop.js';
//import '../data/cart-class.js'; we were using it for pratice 
//import '../data/backend-practice.js';

// we want to give loadProducts a callback(a function we want to run in the future). instead of creating a whole new function, we are going to create a function inside the brackets of loadProducts. we don't need to create a function name everytime. we can aswell create an anonymous function(function without name) and then give it to loadProducts, to run in the future
loadProducts(() =>{
  renderOrderSummary();
  renderPaymentSummary();
});
// this is going to save the anonymous function inside the parameter fun in product.js, line 96 and we shall call fun() still in product.js after we have loaded all the products 
