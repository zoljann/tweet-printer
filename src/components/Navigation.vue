<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const router = useRouter();
const store = useStore();
</script>

<template>
  <div class="navigation">
    <img
      class="logo"
      src="../assets/favicon.png"
      @click="router.push({ name: 'home' })"
    />
    <a href="https://www.instagram.com/isprintajsvojtvit" target="_blank"
      >@isprintajsvojtvit🥳</a
    >
    <div class="right-side">
      <span @click="router.push({ name: 'questions' })">Česta pitanja🤔</span>
      <span
        class="cart-icon"
        v-if="store.getCartItems.length"
        @click="router.push({ name: 'cart' })"
      >
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
  padding-left: 1rem;

  .logo {
    height: 3.75rem;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      transition: 0.3s ease;
      color: #4990a5;
    }
  }

  .right-side {
    display: flex;
    align-items: center;

    span {
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
    font-size: 0.9rem;
    padding-right: 1rem;

    .right-side {
      width: 45%;
    }
  }
}

@media only screen and (max-width: 380px) {
  .navigation {
    font-size: 0.8rem;
  }
}

@media only screen and (max-width: 350px) {
  .navigation {
    font-size: 0.7rem;

    .right-side {
      width: 40%;
    }
  }
}
</style>
