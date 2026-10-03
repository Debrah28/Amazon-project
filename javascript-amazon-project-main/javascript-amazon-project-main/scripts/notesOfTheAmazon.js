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

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;
        
});