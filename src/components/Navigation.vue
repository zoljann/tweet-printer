<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../store';

const router = useRouter();
const route = useRoute();
const store = useStore();
</script>

<template>
  <div class="navigation">
    <div class="left-side">
      <img
        class="logo"
        src="../assets/favicon.png"
        @click="router.push({ name: 'home' })"
      />
      <span
        class="item"
        v-if="route.name !== 'home'"
        @click="router.push({ name: 'home' })"
        >Početna</span
      >
      <span class="item" @click="router.push({ name: 'questions' })"
        >Česta pitanja🤔</span
      >
      <a
        class="item"
        href="https://www.instagram.com/isprintajsvojtvit"
        target="_blank"
        >Naš instagram🥳</a
      >
    </div>
    <div class="right-side">
      <span
        class="cart-icon"
        v-if="store.getCartItems.length"
        @click="router.push({ name: 'cart' })"
      >
        Korpa
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          width="30"
          height="30"
        >
          <path
            d="M1 1h4l2.68 10.71a2 2 0 0 0 1.85 1.29h8.9a2 2 0 0 0 1.85-1.29L21 5H6"
          ></path>
          <circle cx="8" cy="21" r="2"></circle>
          <circle cx="18" cy="21" r="2"></circle>
          <path d="M16 17l2-4h4"></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-left: 2rem;

  .logo {
    height: 3.75rem;
    cursor: pointer;
  }

  .left-side {
    display: flex;
    align-items: center;

    .item {
      cursor: pointer;
      padding: 0 1rem;
      text-decoration: none;
      color: white;

      &:hover {
        transition: 0.3s ease;
        color: #4990a5;
      }
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    padding-right: 2rem;

    span {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        transition: 0.3s ease;
        color: #4990a5;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .navigation {
    .left-side {
      display: none;
    }

    .right-side {
      padding: 2rem 1rem 0rem 0rem;
    }
  }
}
</style>
