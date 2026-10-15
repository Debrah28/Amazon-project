// we want to test the addToCart function.
import { addToCart, cart, loadFromStorage, updateDeliveryOption} from "../../javascript-amazon-project-main/data/cart.js";

describe('test suite: addToCart', () => {
  // line 40 of cart.js
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');
    // we want to add an existing product to the cart, so that we test it. To do that, we are going to set up the cart, so that it already contains the product that we want. To that we shall use mock that is spyOn below.
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      // it gives this array as the starting cart
      }]);
     
    });
    
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // it checks how many times localStorage.setItem been called in the code above. This only works if this method has been mocked with spyOn()
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
  // so when adding an exsiting product, we a cart quantity, so adding another one increase it from 1 to 2

 


 

  // line 43 of cart.js
  // so add to cart doesn't return a value, so we can't really compare it to another value, using expect
  // instead we're going to call add to cart to modify the cart and then check if this cart looks correct. To do that;
  // we call the function addToCart();

  // so if you notice in cart.js function addToCart(productId), inside the () is productId so we go to product.js and copy an id there and test it
  // so to check if the cod is working correctly, we are going to check what the cart looks like. First we need to import the cart(cart.js)
  // now let check if the cart.length is correct, this where we use expect
  // that is; if we assume that we start with an empty cart when we add a product, the cart.length should be one, so we can compare these 2 values
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');
        
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
      // we want it to return an empty array and also localStorage only works with strings. That is why we have JSON.stringify
    });
    // we mock (localStorage, 'getItem') first, to return an empty array, then when we reload the cart, it is going to be an empty array and the cart will be empty. so in our test when we a product to empty cart, the cart.length will be = 1, so it shall pass
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // it checks how many times localStorage.setItem been called in the code above. This only works if this method has been mocked with spyOn()
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
  });

// So spyOn() has another feature that is, it recrds every time a method is used. wee want to make sure that addToCart saves to localStorage at the end. So in our test setItem is mocked, so we can't check what is inside localStorage. So we shall check if addToCart calls setItem at some point. So we shall use the function expect

// so we realised something, when we conducted our test, we had an error. Our cart.lenght was 2 and 2 is not = 1. this is because of localStorage. so to have better results, you have to clear it. we call this flaky test.
// flaky test is a test that sometimes passes and sometimes fails, even if we don't change the code. Now to solve that, we have something called mocks in jasmine.
// Mocks lets us replace a method with a fake version and lets us make the fake version to do anthing we want. We have a mock which contains a function of Jasmine, it is called spyOn().
// spyOn() has 2 parameters. The 1st is the object you want to mock and the 2nd is the method you want to mock. 
//  spyOn(localStorage, 'getItem').and.callFake(); so the function in callFake is whar we want getItem, essentially overriding the the first getItem
// we are spying on (localStorage, 'getItem') and call fake, in plain english
// so after all the adding of spyOn, it is still showing fail. This is because, when we import the cart, the cart comes already with an exsiting item in it, so spyOn can't overwrite it, since it comes 2nd. So to solve this; we create a function, to recall the cart again. 
// so in cart.js we have saveToStorage(), so it is going to call localStorage.setItem() . so we don't want what we mock for test should be saved for localStorage. Hence to resolve that, we have to mock localStorage.setItem()