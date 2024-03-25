<script setup lang="ts">
import { ref } from "vue";

const tweetUrl = ref("");
const isFieldEmpty = ref(false);

const designShirts = () => {
  if (!tweetUrl.value) {
    isFieldEmpty.value = true;
    return;
  }

  isFieldEmpty.value = false;

  console.log("open page with url", tweetUrl.value);
};
</script>

<template>
  <div class="tweet-section">
    <div class="image-section">
      <img src="../assets/images/models.png" />
    </div>
    <div class="print-tweet-section">
      <h1>Isprintaj svoj tvit na majicu ili na šoljicu!🤗</h1>
      <input
        type="text"
        v-model="tweetUrl"
        placeholder="Zalijepi link tvita ovdje"
      />
      <span v-if="isFieldEmpty" class="input-error"
        >Prvo moraš zalijepiti link tvita 😭</span
      >
      <button @click="designShirts()">Napravi majicu 👉</button>
      <p>
        Zalijepi link tvita u polje iznad i klikom na napravi majicu pređi na
        sljedeći korak uređivanja svoje majice ili šoljice 👕
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tweet-section {
  height: 83%;
  display: flex;
  place-items: center;

  .image-section,
  .print-tweet-section {
    width: 100%;
  }

  .image-section {
    text-align: right;

    img {
      height: 500px;
    }
  }

  .print-tweet-section {
    padding: 64px;
    display: flex;
    flex-direction: column;

    input {
      padding: 10px;
      border-radius: 10px;
      width: 75%;
    }

    .input-error {
      color: tomato;
      margin: 3px;
    }

    button {
      font-weight: bold;
      color: rgb(236, 236, 236);
      width: 50%;
      padding: 10px 20px;
      margin-top: 16px;
      font-size: 16px;
      background-color: #4c98af;
      border: none;
      cursor: pointer;
      border-radius: 10px;

      &:hover {
        transition: 0.3s ease;
        background-color: #4990a5;
      }
    }

    p {
      width: 60%;
    }
  }
}
</style>
