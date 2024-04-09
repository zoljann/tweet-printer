<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { createOrder } from '../api';
import { ICartItem, IOrderPayload, Product, ProductColor } from '../interface';

const router = useRouter();
const store = useStore();
const cartItems = ref(store.getCartItems);
const inputErrorMessage = ref('');
const showConfirmationModal = ref(false);

const name = ref('');
const mobileNumber = ref('');
const state = ref('BiH');
const city = ref('');
const address = ref('');
const email = ref('');
const shipping = ref('pickup');

const checkIsValidOrder = async () => {
  if (
    !name.value.trim() ||
    !mobileNumber.value.trim() ||
    !state.value.trim() ||
    !city.value.trim() ||
    !address.value.trim()
  ) {
    inputErrorMessage.value = 'Nisi ispunio obavezna polja 😐';

    return;
  }

  if (!/^[a-zA-Z ]{6,}$/.test(name.value)) {
    inputErrorMessage.value = 'Ime i prezime se sastoji od najmanje 6 slova 😐';

    return;
  }

  if (!/^\+?(?:\d\s?){9,}$/.test(mobileNumber.value)) {
    inputErrorMessage.value = 'Mobitel se sastoji od najmanje 9 brojeva 😐';

    return;
  }

  if (!/^[a-zA-Z ]{3,}$/.test(city.value)) {
    inputErrorMessage.value = 'Grad se sastoji od najmanje 3 slova 😐';

    return;
  }

  if (!/^[a-zA-Z0-9 ]{3,}$/.test(address.value)) {
    inputErrorMessage.value = 'Adresa se sastoji od najmanje 3 karaktera 😐';

    return;
  }

  if (
    email.value &&
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value)
  ) {
    inputErrorMessage.value = 'Neispravan e-mail 😐';

    return;
  }

  inputErrorMessage.value = '';
  showConfirmationModal.value = true;
};

const confirmOrder = async () => {
  const orderPayload: IOrderPayload = {
    name: name.value,
    mobileNumber: mobileNumber.value,
    state: state.value,
    city: city.value,
    address: address.value,
    email: email.value,
    shipping: shipping.value,
    items: cartItems.value.map((item) => {
      const { image, price, ...cleanItem } = item;
      return cleanItem;
    }),
  };

  const { success, error } = await createOrder(orderPayload);

  if (error) {
    store.notification.text = error;
    store.notification.type = 'error';
  }

  if (success) {
    store.notification.text = success;
    store.notification.type = 'success';
    removeAllItemsFromCart();
  }
};

const closeConfirmationModal = () => {
  showConfirmationModal.value = false;
};

const calculateTotalPrice = () => {
  let totalPrice = 0;

  cartItems.value.forEach((item) => {
    totalPrice += item.price;
  });

  return totalPrice;
};

const removeItemFromCart = (item: ICartItem) => {
  const index = cartItems.value.findIndex((i) => i === item);

  if (index !== -1) {
    cartItems.value.splice(index, 1);

    const storedCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    storedCartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(storedCartItems));

    if (!cartItems.value.length) {
      router.push({ name: 'home' });
    }
  }
};

const removeAllItemsFromCart = () => {
  localStorage.removeItem('cartItems');
  store.cartItems = [];

  router.push({ name: 'home' });
};

const formatColorName = (color: ProductColor) => {
  switch (color) {
    case ProductColor.BLACK:
      return 'Crna';
    case ProductColor.WHITE:
      return 'Bijela';
  }
};

const formatProductName = (product: Product) => {
  switch (product) {
    case Product.SHIRT:
      return 'Majica';
    case Product.MUG:
      return 'Šolja';
  }
};

onMounted(() => {
  if (!cartItems.value.length) {
    router.push({ name: 'home' });
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="cart">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <div class="product-info">
          <img :src="item.image" class="product-image" />
          <div class="details-and-price">
            <span class="product-name">
              {{ formatProductName(item.product) }}
            </span>
            <span>{{ formatColorName(item.color) }} boja</span>
            <span v-if="item.product !== Product.MUG"
              >{{ item.size }} veličina</span
            >
            <span v-if="item.product !== Product.MUG">{{
              item.printSide
            }}</span>
            <span class="price">{{ item.price }}KM</span>
          </div>
          <button class="remove-item-button" @click="removeItemFromCart(item)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M16 6v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
              <path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9"></path>
              <rect x="3" y="3" width="18" height="4"></rect>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <hr class="mobile-line" />
    <div class="checkout">
      <h3>Informacije o primaocu</h3>
      <form novalidate>
        <div class="form-group">
          <label>Ime i prezime</label>
          <input
            type="text"
            v-model="name"
            placeholder="Ime i prezime"
            required
          />
        </div>
        <div class="form-group">
          <label>Broj mobitela</label>
          <input
            type="tel"
            v-model="mobileNumber"
            placeholder="Broj mobitela"
            required
          />
        </div>
        <div class="form-group">
          <label for="state">Država</label>
          <select id="state" v-model="state" name="state" required>
            <option value="BiH">Bosna i Hercegovina</option>
          </select>
        </div>
        <div class="form-group">
          <label>Grad</label>
          <input type="text" v-model="city" placeholder="Grad" required />
        </div>
        <div class="form-group">
          <label>Adresa</label>
          <input type="text" v-model="address" placeholder="Adresa" required />
        </div>
        <div class="form-group">
          <label>Email <span class="text-important">*opcionalno</span></label>
          <input type="text" v-model="email" placeholder="E-mail" />
        </div>
        <div>
          <input
            type="radio"
            v-model="shipping"
            name="state"
            value="pickup"
            required
          />
          <span for="bih">Plaćanje pouzećem</span>
        </div>
        <div class="total-price">
          Ukupno:
          <span class="total-price-value"> {{ calculateTotalPrice() }}KM</span>
        </div>
        <span class="input-error">{{ inputErrorMessage }}</span>
      </form>
      <button class="checkout-button" @click="checkIsValidOrder">Naruči</button>
    </div>
  </div>

  <div v-if="showConfirmationModal" class="modal-overlay">
    <div class="modal-container">
      <h3>Narudžba</h3>
      <div class="content">
        <div v-for="(item, index) in cartItems" :key="index">
          <span class="number">1x</span> {{ formatProductName(item.product) }} -
          {{ formatColorName(item.color) }}
          <span v-if="item.product !== Product.MUG">, vel. {{ item.size }}</span
          >, <span class="price"> {{ item.price }}KM</span>
        </div>
        <div class="total-price">
          Ukupno: <span class="total"> {{ calculateTotalPrice() }}KM</span>
        </div>
      </div>
      <h3>Primalac</h3>
      <div>
        {{ name }}
      </div>
      <div>
        {{ mobileNumber }}
      </div>
      <div>{{ city }}, {{ address }}</div>
      <div>{{ email }}</div>

      <button class="close-button" @click="closeConfirmationModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <button class="confirm-button" @click="confirmOrder">
        Potvrdi narudžbu
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  display: flex;
}

.mobile-line {
  display: none;
}

.cart {
  width: 50%;
  display: flex;
  flex-direction: column;

  .cart-item {
    margin: 1rem 3rem;
  }

  .product-info {
    display: flex;
    align-items: center;
    justify-content: right;

    .remove-item-button {
      padding: 0.4rem 0.5rem;
      background-color: #8f8f8f;
      border: none;
      cursor: pointer;
      border-radius: 0.5rem;
      color: var(--button-color-hover);

      &:hover {
        transition: 0.3s ease;
        background-color: #777777;
      }
    }
  }

  .product-image {
    width: 15rem;
    height: 15rem;
  }

  .details-and-price {
    width: 8rem;
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }

  .product-name {
    text-transform: capitalize;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .price {
    font-weight: bold;
    font-size: 1.2em;
    margin-top: auto;
    color: #4c808f;
  }
}

.text-important {
  color: tomato;
  font-size: 0.7rem;
}

.checkout {
  width: 50%;
  margin: 1rem 3rem;

  .form-group {
    margin-bottom: 1rem;
  }

  .input-error {
    margin-top: 1rem;
    display: block;
    color: var(--text-color-error);
  }

  .form-group label {
    display: block;
    margin-bottom: 0.2rem;
  }

  .form-group input,
  .form-group select {
    width: 50%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.2rem;
    background-color: var(--input-color-back);
  }

  .checkout-button {
    margin: 1.5rem 0;
    width: 50%;
    padding: 0.8rem 3rem;
    background-color: tomato;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    font-weight: bold;
    color: white;

    &:hover {
      transition: 0.3s ease;
      background-color: rgb(219, 85, 61);
    }
  }

  .total-price {
    font-weight: bold;
    text-decoration: underline;

    &-value {
      font-size: 1.5rem;
      color: tomato;
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  text-align: center;
  position: relative;
  border-radius: 1rem;
  width: 30%;
  height: auto;
  background-color: #dadada;
  color: rgb(5, 5, 5);

  h3 {
    padding-top: 1rem;
    padding-left: 1rem;
    text-align: left;
  }

  .content {
    .total-price {
      padding-top: 1rem;
      padding-right: 1rem;
      text-align: right;
    }
    .total {
      font-weight: bold;
      font-size: 1.1rem;
      color: rgb(255, 81, 50);
    }

    .price {
      font-style: italic;
    }

    .number {
      font-weight: bold;
    }
  }
}

.close-button {
  margin: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: black;
}

.confirm-button {
  width: 50%;
  padding: 0.8rem 3rem;
  background-color: tomato;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  font-weight: bold;
  color: white;
  margin: 1rem 0;

  &:hover {
    transition: 0.3s ease;
    background-color: rgb(219, 85, 61);
  }
}

@media only screen and (max-width: 768px) {
  .wrapper {
    flex-direction: column;
  }

  .mobile-line {
    display: block;
    width: 95%;
  }

  .cart {
    width: 95%;
    align-items: center;

    .cart-item {
      text-align: center;
      margin: 0;
    }

    .product-image {
      width: 8rem;
      height: 8rem;
    }

    .remove-item-button {
      margin-left: 2rem;
    }
  }

  .checkout {
    width: 95%;
    margin: 0 0.5rem;

    form {
      text-align: center;
    }

    .form-group input {
      width: 90%;
    }

    .form-group select {
      width: 95%;
    }

    .checkout-button {
      width: 100%;
      font-size: 1rem;
    }
  }

  .modal-container {
    width: 90%;
  }

  .confirm-button {
    width: 80%;
    font-size: 1rem;
  }
}

@media only screen and (max-width: 380px) {
  .cart {
    .details-and-price {
      width: 6rem;
    }
  }
}

@media only screen and (max-width: 330px) {
  .cart {
    .details-and-price {
      width: 4rem;
    }
  }
}
</style>
