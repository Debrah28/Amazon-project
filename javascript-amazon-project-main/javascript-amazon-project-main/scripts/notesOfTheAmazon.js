const products = [{
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
];

// so to combine all the strings together, we shall create a variable at the top.

products.forEach((product) => {
   const html = `
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="images/products/athletic-cotton-socks-6-pairs.jpg"
              so bassically here we remmoved it and added the image property, so that we have different html for each product>
          </div>

          <div class="product-name limit-text-to-2-lines">
            Black and Gray Athletic Cotton Socks - 6 Pairs

            so bassically here we remmoved it and added the name property, so that we have different html for each product
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-45.png">
            <div class="product-rating-count link-primary">
              87
              here it is multiply by 10 because under files the images don't have decimal numbers so 4.5 is 45
            </div>
          </div>

          <div class="product-price">
            $10.90
            here we divide by 100 because we want it in dollar
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
          data-product-name="${product.name}">
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
     const productName = button.dataset.productName; 
     // we reated the variable cart already in cart.js. So we are calling it forth. we are pushing object bec we wanted a product and a quantity. 

     let matchingItem;
     
     cart.forEach((item) => {
      if (productName === item.productName)
      { matchingItem = item;
      }
     });

     // we are typing matchingItem here because if we did find a matchingItem, it will be an object which is a truthy value
     if (matchingItem) {
      matchingItem.quantity += 1;
     } else {
        cart.push({
      productName: productName,
      quantity: 1
     })
     }
     console.log(cart);
  });
});