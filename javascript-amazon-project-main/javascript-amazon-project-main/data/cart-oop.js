// so we want to create a function that can create multiple objects instead of copy and pasting. When using such function always use PascalCase to generate the function name. So inside the function, we shal create cart object.
// WE are creating a parameter, so that different carts, use different keys when it comes to localStorage, so that there won't be conflict of values.
function Cart(localStorageKey) {
  const cart = {
  cartItems : undefined,
   //loadFromStorage: function() { shortcut is ;
   loadFromStorage() { 
    // so we are using this.cartItems no more cart.cartItems. because changing the object name won't affect the code. this gives us the outer object
     this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
     // we change it from 'cart' to 'cart-oop' because originally our localStorage was loading from cart and we don't want to mess up our originally cart in cart.js

if (!this.cartItems) {
     this.cartItems = [{
     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
     quantity: 2,
     deliveryOptionId: '1'
  },
  {
     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
     quantity: 1,
     deliveryOptionId: '2'
}];
};
},

 saveToStorage() {
     localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
},

   addToCart(productId) {
  
     let matchingItem;
     
     this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId)
      { matchingItem = cartItem;
      } 
     });

     if (matchingItem) {
      matchingItem.quantity += 1;
     } else {
        this.cartItems.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
     });
     }
     // saveToStorage(); was moved inside the object, so to have access the funtion inside the object in line 31, we are going to get the outer object using 'this'. to access the function inside the object.
     this.saveToStorage();

},

  removeFromCart(productId) {
     const newCart = [];

     this.cartItems.forEach((cartItem) =>{
          if (cartItem.productId !== productId) {
               newCart.push(cartItem);
          }
     });

    this.cartItems = newCart;
// we are accessing saveToStorage inside this object(the object is in line 55)
     this.saveToStorage();
},

 updateDeliveryOption(productId, deliveryOptionId) {
     let matchingItem;
     
     this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId)
      { matchingItem = cartItem;
      } 
     });

     matchingItem.deliveryOptionId = deliveryOptionId;

     this.saveToStorage();
}

  };
  return cart;
  // we return the cart so that i can use outside the function
}
// so we give the function a local storage key, since we have created a parameter above.so that different carts have different keys and different data
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
// so we have created an object because we want to group the data and functions into one and put it inside and object. This is what oop is all about.
// so we changed the property name becauses accessing it will be cart.cart, which will be confusing.
// since we can't use export, we removed it and turned our function into property and value.
// having a function inside an object is called a method and methods have shortcuts. one shortcut is on line 8.
// so i have moved the code up there, inside a function

// loadFromStorage was moved inside the cart object, so this access this function, you add cart

cart.loadFromStorage();
 
//we implented that below to check if the cart is working and it is
//cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

//console.log(cart);
/* I am the one who tried it out
export function updateToCart(productId) {
     const newCart = [];

     cart.forEach((cartItem) =>{
          if (cartItem.productId !== productId) {
               newCart.push(cartItem);
          }
     });
};*/

// we have 2 separate carts

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);