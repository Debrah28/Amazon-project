export let cart = [{
     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
     quantity: 2,
  },
  {
     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
     quantity: 1
}];

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
      quantity: 1
     });
     }

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
};