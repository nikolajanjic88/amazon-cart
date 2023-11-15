import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

let output = '';

const cartQuantityEl = document.querySelector('.cart-quantity');
let cartQuantity = cart.reduce((total, value) => total + value.quantity, 0);
cartQuantityEl.innerText = cartQuantity;

//display all products
products.forEach((product) => {
  output += `
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
            <select class="select-quantity" data-select-product-id="${product.id}">
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
          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector('.products-grid').innerHTML = output;

//cart functionality
function updateCartQuantity()
{
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity();
  });
});


//search filter
const searchInput = document.querySelector('.search-bar'); 

searchInput.addEventListener('keyup', filterProducts);

function filterProducts() {
  let searchValue = searchInput.value.toUpperCase();
  const productContainer = document.querySelectorAll('.product-container');
  for(let i = 0; i < productContainer.length; i++)
  {
    const productName = productContainer[i].querySelector('.product-name');

    if(productName.innerHTML.toUpperCase().indexOf(searchValue) > -1)
    {
      productContainer[i].style.display = 'initial';
    }
    else 
    {
      productContainer[i].style.display = 'none';
    }
  }
}
