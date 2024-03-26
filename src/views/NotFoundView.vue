<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="not-found">
    <span> Oops izgleda da ova stranica ne postoji..😬 </span>
    <button class="button-back" @click="router.push({ name: 'home' })">
      Nazad na početnu 👀
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
    color: rgb(233, 233, 233);
    padding: 10px 20px;
    margin-top: 25px;
    font-size: 16px;
    background-color: #42879c;
    border: none;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      transition: 0.3s ease;
      background-color: #3a7586;
    }
  }
}
</style>
