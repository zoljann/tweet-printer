<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { Product, ProductColor } from '../interface';

const router = useRouter();
const store = useStore();
const cartItems = ref(store.getCartItems);

const redirectToCheckout = () => {
  router.push({ name: 'checkout' });
};

const calculateTotalPrice = () => {
  let totalPrice = 0;

  cartItems.value.forEach((item) => {
    totalPrice += item.price;
  });

  return totalPrice;
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
</script>

<template>
  <div class="cart">
    <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
      <div class="product-info">
        <img :src="item.image" class="product-image" />
        <div class="details-and-price">
          <div class="product-name">{{ formatProductName(item.product) }}</div>
          <span>{{ formatColorName(item.color) }} boja</span>
          <span>Veličina {{ item.size }}</span>
          <span>{{ item.printSide }}</span>
          <div class="price">{{ item.price }}KM</div>
        </div>
      </div>
    </div>
    <div class="checkout-button">
      <div class="total-price">Ukupno: {{ calculateTotalPrice() }}KM</div>
      <button @click="redirectToCheckout">Naruči</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.cart-item {
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
.checkout-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
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
</style>
