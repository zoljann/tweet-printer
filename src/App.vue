<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
import TweetSection from "./components/TweetSection.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="app">
    <Navigation />
    <TweetSection />
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100vh;
}
</style>
