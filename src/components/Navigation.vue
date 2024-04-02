<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../store';
import { ref, onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const isMenuVisible = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const handleMobileMenuclick = (route: string) => {
  router.push({ name: route });
  isMenuVisible.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    !(event.target instanceof Node) ||
    !menuRef.value?.contains(event.target as Node)
  ) {
    isMenuVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
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
      <span class="toggle-menu" @click="toggleMenu" @click.stop>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-menu"
          width="40"
          height="40"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </span>
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

  <div
    class="left-side-menu"
    ref="menu"
    :class="{ active: isMenuVisible }"
    @click.stop
  >
    <div class="menu-items">
      <span
        class="item"
        v-if="route.name !== 'home'"
        @click="handleMobileMenuclick('home')"
        >Početna</span
      >
      <span
        class="item"
        @click="handleMobileMenuclick('questions')"
        :class="{ activeroute: route.name === 'questions' }"
        >Česta pitanja🤔</span
      >
      <a
        class="item"
        href="https://www.instagram.com/isprintajsvojtvit"
        target="_blank"
        >Naš instagram🥳</a
      >
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

.toggle-menu {
  display: none;
}

.left-side-menu {
  display: none;
}

@media only screen and (max-width: 768px) {
  .navigation {
    .left-side {
      .logo,
      .item {
        display: none;
      }
    }
  }

  .toggle-menu {
    display: block;
  }

  .left-side-menu {
    display: block;
    position: fixed;
    left: -70%;
    top: 0;
    height: 100%;
    width: 70%;
    background-color: rgba(41, 41, 41, 0.973);
    transition: left 0.3s ease;

    .menu-items {
      display: flex;
      flex-direction: column;
    }

    .item {
      margin-bottom: 0.5rem;
      background-color: rgba(117, 117, 117, 0.493);
      padding: 1rem;
      text-decoration: none;
      color: white;
    }

    .activeroute {
      background-color: rgb(117, 117, 117);
    }
  }

  .active {
    left: 0;
  }
}
</style>
