<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tweetUrl = ref("");
const errorMessage = ref("");

const redirectToOrder = () => {
  if (!tweetUrl.value) {
    setErrorMessage("Prvo moraš zalijepiti link tvita 😭");

    return;
  }

  if (!isValidUrl(tweetUrl.value)) {
    setErrorMessage("Nisi zalijepio ispravan link 😭");

    return;
  }

  errorMessage.value = "";
  router.push({ name: "order", params: { tweetUrl: tweetUrl.value } });
};

const isValidUrl = (url: string) => {
  try {
    const newUrl = new URL(url);

    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};

const setErrorMessage = (message: string) => {
  errorMessage.value = message;
};
</script>

<template>
  <div class="tweet-section">
    <div class="image-section">
      <img class="img-desktop" src="../assets/images/models.png" />
    </div>
    <div class="print-tweet-section">
      <h1>Isprintaj svoj tvit na majicu ili na šoljicu❗🤗</h1>
      <input
        type="text"
        v-model="tweetUrl"
        placeholder="Zalijepi link tvita ovdje🎯"
      />
      <span v-if="errorMessage" class="input-error">{{ errorMessage }}</span>
      <button @click="redirectToOrder()">Napravi majicu👉</button>
      <p>
        Zalijepi link tvita u polje iznad i klikom na
        <span class="important-text">napravi majicu</span> pređi na sljedeći
        korak uređivanja svoje majice ili šoljice👕
      </p>
    </div>
    <img class="img-mob" src="../assets/images/models-mob.png" />
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

    .img-desktop {
      height: 500px;
    }
  }

  .img-mob {
    display: none;
  }

  .print-tweet-section {
    padding: 60px;
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
      color: rgb(233, 233, 233);
      width: 50%;
      padding: 10px 20px;
      margin-top: 16px;
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

    p {
      width: 60%;
    }

    .important-text {
      color: tomato;
    }
  }
}

@media only screen and (max-width: 768px) {
  .tweet-section {
    flex-direction: column;
    text-align: center;
    justify-content: center;

    h1 {
      font-size: 22px;
      margin-top: 0;
    }

    .print-tweet-section {
      display: flex;
      align-items: center;
      padding: 0;

      p {
        width: 90%;
        font-size: 13px;
      }

      button {
        width: 70%;
      }

      input {
        width: 90%;
      }
    }

    .image-section {
      .img-desktop {
        display: none;
      }
    }

    .img-mob {
      display: block;
      height: 300px;
    }
  }
}

@media only screen and (max-width: 380px) {
  .tweet-section {
    h1 {
      font-size: 20px;
    }

    p {
      font-size: 12px;
    }
  }
}

@media only screen and (max-width: 350px) {
  .tweet-section {
    h1 {
      font-size: 18px;
    }
    .img-mob {
      height: 220px;
    }
  }
}
</style>
