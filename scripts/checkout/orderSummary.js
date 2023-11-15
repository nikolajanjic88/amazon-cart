import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let output = '';
  
  cart.forEach((item) => {

    const productId = item.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = item.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    output += `
              <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $${(matchingProduct.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${item.quantity}</span>
                      </span>
                      <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, item)}                 
                  </div>
                </div>
              </div>`;  
  });

  function deliveryOptionsHTML(matchingProduct, item) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${(deliveryOption.priceCents/100).toFixed(2)} -`;
      const isChecked = deliveryOption.id === item.deliveryOptionId;
      html += `
              <div class="delivery-option"
                   data-product-id="${matchingProduct.id}"
                   data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                       ${isChecked ? 'checked' : ''}
                       class="delivery-option-input"
                       name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                       ${dateString}
                  </div>
                  <div class="delivery-option-price">
                       ${priceString}
                  </div>
                </div>
              </div>`
    });

    return html;
  }

  document.querySelector('.order-summary').innerHTML = output;

  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.delivery-option').forEach(element => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}