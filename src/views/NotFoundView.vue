<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="not-found">
    <span> Oops izgleda da ova stranica ne postoji..😬 </span>
    <button class="button-back" @click="router.push({ name: 'home' })">
      Nazad na početnu👀
    </button>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  height: 83%;
  display: grid;
  align-content: center;
  justify-content: center;

  .button-back {
    font-weight: bold;
    color: var(--button-color);
    padding: 0.6rem 1.2rem;
    margin-top: 1.5rem;
    font-size: 1rem;
    background-color: var(--button-color-back);
    border: none;
    cursor: pointer;
    border-radius: 0.6;

    &:hover {
      transition: 0.3s ease;
      background-color: var(--button-color-hover);
    }
  }
}
</style>
