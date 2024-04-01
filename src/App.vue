<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from './store';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

const store = useStore();

onMounted(() => {
  const dataFromLocalStorage = localStorage.getItem('cartItems');

  if (dataFromLocalStorage) {
    store.cartItems = JSON.parse(dataFromLocalStorage);
  }
});
</script>

<template>
  <div class="app">
    <Navigation />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100vh;
}
</style>
