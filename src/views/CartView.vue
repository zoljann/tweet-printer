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

const name = ref('');
const mobileNumber = ref('');
const state = ref('BiH');
const city = ref('');
const address = ref('');
const shipping = ref('pickup');

const checkoutOrder = async () => {
  if (
    !name.value.trim() ||
    !mobileNumber.value.trim() ||
    !state.value.trim() ||
    !city.value.trim() ||
    !address.value.trim()
  ) {
    inputErrorMessage.value = 'Sva polja su obavezna 😐';

    return;
  }

  if (!/^\+?\d+(\s\d+)*$/.test(mobileNumber.value)) {
    inputErrorMessage.value = 'Mobitel mora sadržavati samo brojeve 😐';

    return;
  }

  inputErrorMessage.value = '';

  const orderPayload: IOrderPayload = {
    name: name.value,
    mobileNumber: mobileNumber.value,
    state: state.value,
    city: city.value,
    address: address.value,
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
            <div class="product-name">
              {{ formatProductName(item.product) }}
            </div>
            <span>{{ formatColorName(item.color) }} boja</span>
            <span v-if="item.product !== Product.MUG"
              >{{ item.size }} veličina</span
            >
            <span v-if="item.product !== Product.MUG">{{
              item.printSide
            }}</span>
            <div class="price">{{ item.price }}KM</div>
          </div>
          <span class="remove-item" @click="removeItemFromCart(item)"
            >Obriši</span
          >
        </div>
      </div>
    </div>

    <div class="checkout">
      <div class="user-data">
        <h3>Informacije o narudžbi</h3>
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
            <input
              type="text"
              v-model="address"
              placeholder="Adresa"
              required
            />
          </div>
          <div class="form-group">
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
          </div>
          <span class="input-error">{{ inputErrorMessage }}</span>
          <div class="total-price">Ukupno: {{ calculateTotalPrice() }}KM</div>
        </form>
        <button class="checkout-button" @click="checkoutOrder">Naruči</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  display: flex;
}

.cart {
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .cart-item {
    padding: 1rem;
  }

  .product-info {
    display: flex;
  }

  .product-image {
    width: 150px;
    height: 150px;
  }

  .details-and-price {
    display: flex;
    flex-direction: column;
  }

  .product-name {
    text-transform: capitalize;
    font-weight: bold;
  }

  .price {
    font-weight: bold;
    font-size: 1.2em;
    margin-top: auto;
  }

  .remove-item {
    text-align: right;
  }
}

.checkout {
  width: 50%;

  .form-group {
    margin-bottom: 20px;
  }

  .input-error {
    display: block;
    color: tomato;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-group input,
  .form-group select {
    padding: 0.5rem;
    border: none;
    border-radius: 0.2rem;
  }

  .checkout-button {
    padding: 1rem;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }

  .total-price {
    font-weight: bold;
  }
}
</style>
