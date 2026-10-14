
// we are getting the cart from local storage, so that we do not use the default values.
// getItem takes one string and it is the name of what we saved ealier. Remember localStorage can only save strings, so we have to convert it back to an array. To do that we use the code JSON.parse

export let cart;
loadFromStorage();
 
// so u had to run this function atleast once, that is why we called it above.
export function loadFromStorage() {
     cart = JSON.parse(localStorage.getItem('cart'));
// so we created this because, if we just start the website we shall have nothing in the cart and it will give us null, to solve that we use the if statement and input a default value. so if our cart is empty, it gives us a default value

if (!cart) {
     cart = [{
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
}

//setItem takes two strings. The first string is the name we want to save and the second is the data we want to save. NOTE local storage can only save strings. so to save our cart we convert it into a string first using JSON
function saveToStorage(params) {
     localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  
     let matchingItem;
     
     cart.forEach((cartItem) => {
      if (productId === cartItem.productId)
      { matchingItem = cartItem;
      } 
     });

     // we are typing matchingItem here because if we did find a matchingItem, it will be an object which is a truthy value.
     // we imported productId as our parameter bec the variable productId was created after our function so it won't work.

     if (matchingItem) {
      matchingItem.quantity += 1;
     } else {
        cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
     });
     }
     saveToStorage();

}

export function removeFromCart(productId) {
     const newCart = [];

     cart.forEach((cartItem) =>{
          if (cartItem.productId !== productId) {
               newCart.push(cartItem);
          }
     });

     // so to explain the code above we have created a function to remove cart. So we created a variable and added an array to it. so it loops through the array, if the present cartItem. productId is not equal to the productId(we are looking for) itself, we add a cartItem to the new array.

     // so we re-assigned the variable, that is why we have changed it from const to let at the top page 

     cart = newCart;

     saveToStorage();
};

// when we want to update a delivery ption, we have to know 2 things; its product and its delivery option
//1stly we loop through the cart and find the product. Secondly we update the delivery option id of the product

// the code below gives us the cartItem that matches the productId and save it in matchingItem
 export function updateDeliveryOption(productId, deliveryOptionId) {
     let matchingItem;
     
     cart.forEach((cartItem) => {
      if (productId === cartItem.productId)
      { matchingItem = cartItem;
      } 
     });

     // each cartt item has a property called deliveryOptionId, so we shall just update the property below
     matchingItem.deliveryOptionId = deliveryOptionId;

     saveToStorage();
}


/* I am the one who tried it out
export function updateToCart(productId) {
     const newCart = [];

     cart.forEach((cartItem) =>{
          if (cartItem.productId !== productId) {
               newCart.push(cartItem);
          }
     });
};*/
