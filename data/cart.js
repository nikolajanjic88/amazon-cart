export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if(productId === item.productId) {
      matchingItem = item;
    }
  });

  let selectedQuantity;
  const quantitySelectItems = document.querySelectorAll('.select-quantity');
  quantitySelectItems.forEach(item => {
    if(item.dataset.selectProductId === productId) {
      selectedQuantity = parseInt(item.value);
    }
    
  });

  if(matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    });
  }
  
  saveToStorage();
}


export function removeFromCart(id) {
  let newCart = [];
  
  cart.forEach((item) => {
    if(item.productId !== id) {
      newCart.push(item);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if(productId === item.productId) {
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}