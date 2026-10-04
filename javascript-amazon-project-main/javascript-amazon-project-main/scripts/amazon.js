/*const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090
},
{
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095
},
{
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799
},
{
  image: 'images/products/black-2-slot-toaster.jpg',
  name: '2 Slot Toaster - Black',
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899}]; 
  
  this was commented out because, we shall no longer use it since we have our product.js, so the code will run through the products in products.js and later on come to amazon.js, so that it can be publish on the website
  So the java sript file creates all the products and the second throug the products and creates all the html*/

let productsHTML = '';

products.forEach((product) => {
  //each time we go through the loop, we shall add the html string up there (let productsHTML = '';)
  // productsHTML =  productsHTML + is same as productsHTML +=
  //This is called accumulator pattern(we loop throgh an array and each time we are adding to the a result).
     productsHTML =  productsHTML + `
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
               ${product.rating.count}
            </div>
          </div>     

          <div class="product-price">
           $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
        
});
// so we have removed name and put id, this is because a product can have the same name but from different brands. we shall make it in a such a way that an id is unique to only one brand

console.log(productsHTML);
// the .(dot) means we are looing for a class js products grid. so it takes it an put it inside our javascript and we can change the html inside the element(product container). To do that we use the property .innerHTML and we change it to the productsHTML that we created above

// so we are using the dom to put the html inside their respective containers 

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
// we loop through each of the buttons, so inside the forEach we give it a  function and a parameter. so the parameter is the button element, so for each of the buttons, we add an event listener, so that it does something when click the button add to cart.
//'click' is the event we want to listen for and now a function we want to run when we click this button.  
.forEach((button) => {
  button.addEventListener('click', () => {
     const productId = button.dataset.productId; 
     // we reated the variable cart already in cart.js. So we are calling it forth. we are pushing object bec we wanted a product and a quantity. 

     let matchingItem;
     
     cart.forEach((item) => {
      if (productId === item.productId)
      { matchingItem = item;
      }
     });

     // we are typing matchingItem here because if we did find a matchingItem, it will be an object which is a truthy value
     if (matchingItem) {
      matchingItem.quantity += 1;
     } else {
        cart.push({
      productId: productId,
      quantity: 1
     })
     }

     let cartQuantity = 0;

     cart.forEach((item) => {
      // we are adding the (item) quantity: to this variable cartQuantity. I am putting () and : to show you where they got it from. It adds all the quanitities and saves them in the cartQuantity variable
      cartQuantity += item.quantity;
     });

// we got the class js-cart-quantity from amazon html from the div cart-quantity. we want to make the cart icon interactive
     document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
})