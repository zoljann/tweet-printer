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
const isConfirmButtonDisabled = ref(false);

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
    !address.value.trim() ||
    !email.value.trim()
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

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value)) {
    inputErrorMessage.value = 'Neispravan e-mail 😐';

    return;
  }

  inputErrorMessage.value = '';
  showConfirmationModal.value = true;
};

const confirmOrder = async () => {
  isConfirmButtonDisabled.value = true;

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
    isConfirmButtonDisabled.value = false;
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

  return totalPrice + 5;
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
  <button class="return-back-button" @click="router.push({ name: 'order' })">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
    <span>Izradi još majica</span>
  </button>
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
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
              />
              <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
              />
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
          <label
            >Email
            <span class="text-important"
              >*obavezno zbog potvrde narudžbe</span
            ></label
          >
          <input type="text" v-model="email" placeholder="E-mail" />
        </div>
        <div class="shipping-input">
          <input
            type="radio"
            v-model="shipping"
            name="state"
            value="pickup"
            required
          />
          <span for="bih"
            >Plaćanje pouzećem -
            <span class="important">dostava 5KM</span></span
          >
        </div>
        <div class="total-price">
          Ukupno sa dostavom:
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
          Ukupno sa dostavom:
          <span class="total"> {{ calculateTotalPrice() }}KM</span>
        </div>
      </div>
      <h3>Primalac</h3>
      <div class="buyer">
        <div>
          Ime i prezime: <span class="important">{{ name }}</span>
        </div>
        <div>
          Broj mobitela: <span class="important">{{ mobileNumber }}</span>
        </div>
        <div>
          Adresa: <span class="important">{{ city }}, {{ address }}</span>
        </div>
        <div>
          Email: <span class="important">{{ email }}</span>
        </div>
      </div>

      <button
        class="close-button"
        :disabled="isConfirmButtonDisabled"
        @click="closeConfirmationModal"
      >
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
      <button
        :disabled="isConfirmButtonDisabled"
        :class="{ disabled: isConfirmButtonDisabled }"
        class="confirm-button"
        @click="confirmOrder"
      >
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

.return-back-button {
  display: flex;
  background-color: #375d682f;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border-radius: 1rem;
  margin: 1rem;
  padding: 0.5rem;
  text-align: center;
  align-items: center;

  &:hover {
    transition: 0.3s ease;
    background-color: var(--button-color-hover);
  }

  span {
    font-size: 0.85rem;
    margin-left: 0.5rem;
  }
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
    color: tomato;
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
    margin: 1rem 0;

    &-value {
      font-size: 1.5rem;
      color: tomato;
    }
  }

  .shipping-input {
    .important {
      color: tomato;
      font-size: 0.9rem;
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

  .buyer {
    text-align: left;
    padding-left: 1rem;

    .important {
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

  &.disabled {
    opacity: 0.5;
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

  .return-back-button {
    border-radius: 1rem;
    margin: 0;
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

      &:hover {
        background-color: #8f8f8f;
      }
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
      font-size: 0.9rem;
    }

    .form-group select {
      width: 95%;
      font-size: 0.9rem;
    }

    .checkout-button {
      margin-bottom: 3rem;
      width: 100%;
      font-size: 1rem;

      &:hover {
        background-color: tomato;
      }
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
