<script setup lang="ts">
const redirectToAboutPage = () => {
  console.log("redirektaj na about");
};
</script>

<template>
  <div class="navigation">
    <img src="../assets/favicon.png" />
    <a href="https://www.instagram.com/isprintajsvojtvit" target="_blank"
      >@isprintajsvojtvit 🥳</a
    >
    <div class="right-side">
      <span @click="redirectToAboutPage">Česta pitanja🤔</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-left: 16px;

  img {
    height: 60px;
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
</style>
