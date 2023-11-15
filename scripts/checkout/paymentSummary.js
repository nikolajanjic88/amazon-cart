import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((item) => {
    const product = getProduct(item.productId);
    productPriceCents += product.priceCents * item.quantity;

    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  let cartQuantity = cart.reduce((total, value) => total + value.quantity, 0);

  const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>
      <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">
          $${(productPriceCents/100).toFixed(2)}
        </div>
      </div>
      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
          $${(shippingPriceCents/100).toFixed(2)}
        </div>
      </div>
      <div class="payment-summary-row subtotal-row">
        <div>Total without tax:</div>
        <div class="payment-summary-money">
          $${(totalBeforeTaxCents/100).toFixed(2)}
        </div>
      </div>
      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          $${(taxCents/100).toFixed(2)}
        </div>
      </div>
      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          $${(totalCents/100).toFixed(2)}
        </div>
      </div>
      <button class="place-order-button button-primary">
        Place your
      </button>`;

    
      document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
      document.querySelector('.checkout-header-middle-section').innerHTML = 
                            (cart.length === 0) ? 
                            'No items' : (cartQuantity > 1) ?
                            `Checkout (${cartQuantity} items)` : `Checkout (1 item)`;
}