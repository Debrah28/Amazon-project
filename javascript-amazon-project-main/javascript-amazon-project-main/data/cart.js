export const cart = [];

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