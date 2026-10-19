// so we it comes to class, they have a slightly different syntax than objescts. so while creating your property name, you equal it to your value and use semicolon at the end to add more classes. but objects, your property name is colon(:) to your value and use comma at the end to add more objects.
class Cart {
   cartItems = undefined; //this is a property
   // putting # infront makes the property private
   #localStorageKey = undefined;
// localStorageKey = undefined; shortcut is; localStorageKey; This only happens when your property is equal to undefined.


   constructor(localStorageKey) {
     // each object that we create is going to run the constructor. So we only need one of each of .localStorageKey and .loadFromStorage.Since we are using one line, we put 'this' because the object we create is not going to be called 'cart' or 'businessCart' all the time. NB: 'this' poinsts to the object that we generate
     // to save a value inside the parameter of constructor. look at line 93
     this.#localStorageKey = localStorageKey;
     this.#loadFromStorage();

   }
    // putting # infront makes the method private
   #loadFromStorage() {//this is a method
   
     this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
// since localStorageKey doesn't exsist anymore. To fix this, we shall save it in a property(line 4). so inside the method above, we shall switch it to this.localStorageKey. So 'this' is going to point out to the object that we generate then .localStorageKey access thproperty above (line 4)

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
} // classes don't use commas at the end, so always remove


 saveToStorage() {
     localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
     // instead of using the variable localStorageKey, we shall use the property this.localStorageKey
}

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

     this.saveToStorage();
}

    removeFromCart(productId) {
     const newCart = [];

     this.cartItems.forEach((cartItem) =>{
          if (cartItem.productId !== productId) {
               newCart.push(cartItem);
          }
     });

    this.cartItems = newCart;

     this.saveToStorage();
}

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

}
// so we have our class above, we want to use it to generate the objects below;
// so a class uses a similar syntax as a function expect we use the word new infront of it. so in line 85 we have generated a new object using our class and the new object will have all the properties and methods that we added above.

// so the values inside ('cart-oop') are saved inside localStorageKey of constructor, that is; constructor(localStorageKey)
const cart =  new Cart('cart-oop');
const businessCart = new Cart('cart-business');
// each of these objects have a property called localStorageKey and they are currently undefined. so we need to set this property.

// below is our setup code, soo instead of running our setup code outside the class we do it inside the class. we move it into a construtor. A constructor lets run run setup code after creating an object.

/* cart.localStorageKey = 'cart-oop';
businessCart.localStorageKey = 'cart-business';

cart.loadFromStorage();
businessCart.loadFromStorage(); */
console.log(cart);
console.log(businessCart);
//objects that we generate from classes are called instance of classes. so to check if an object is an instance of a class; we do the following. So it will tell us if the object was generated from the said class.
console.log(businessCart instanceof Cart);