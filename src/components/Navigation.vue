<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
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
    width: 85%;
    text-align: right;

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
