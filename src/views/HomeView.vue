<script setup lang="ts">
import { ref } from 'vue';
import Footer from '../components/Footer.vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { isValidUrl } from '../helpers';

const router = useRouter();
const store = useStore();
const tweetUrl = ref('');
const errorMessage = ref('');

const redirectToOrderView = () => {
  if (!tweetUrl.value || !isValidUrl(tweetUrl.value)) {
    setErrorMessage(
      !tweetUrl.value
        ? 'Prvo moraš zalijepiti link tvita 😭'
        : 'Nisi zalijepio ispravan link 😭'
    );

    return;
  }

  errorMessage.value = '';
  store.currentTweetUrl = tweetUrl.value;
  router.push({ name: 'order' });
};

const setErrorMessage = (message: string) => {
  errorMessage.value = message;
};
</script>

<template>
  <div class="tweet-section">
    <div class="image-section">
      <img class="img-desktop" src="https://i.imgur.com/dkCr8xN.jpg" />
    </div>
    <div class="print-tweet-section">
      <h1>Isprintaj svoj tvit na majicu ili na šoljicu❗🤗</h1>
      <input
        type="text"
        v-model="tweetUrl"
        placeholder="Zalijepi link tvita ovdje🎯"
      />
      <span v-if="errorMessage" class="input-error">{{ errorMessage }}</span>
      <button @click="redirectToOrderView()">Napravi majicu👉</button>
      <p>
        Zalijepi link tvita u polje iznad i klikom na
        <span class="important-text">napravi majicu</span> pređi na sljedeći
        korak uređivanja svoje majice ili šoljice👕
      </p>
    </div>
    <img class="img-mob" src="https://i.imgur.com/SgFI3rk.jpg" />
  </div>
  <Footer />
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
      height: 32rem;
    }
  }

  .img-mob {
    display: none;
  }

  .print-tweet-section {
    padding: 3.75rem;
    display: flex;
    flex-direction: column;

    input {
      padding: 0.6rem;
      border-radius: 0.6rem;
      width: 75%;
      background-color: var(--input-color-back);
    }

    .input-error {
      color: var(--text-color-error);
      margin: 0.1rem;
    }

    button {
      font-weight: bold;
      color: var(--button-color);
      width: 50%;
      padding: 0.6rem 1.2rem;
      margin-top: 1rem;
      font-size: 1rem;
      background-color: var(--button-color-back);
      border: none;
      cursor: pointer;
      border-radius: 0.6rem;

      &:hover {
        transition: 0.3s ease;
        background-color: var(--button-color-hover);
      }
    }

    p {
      width: 60%;
    }

    .important-text {
      color: var(--text-color-error);
    }
  }
}

@media only screen and (max-width: 1250px) {
  .tweet-section {
    .image-section {
      .img-desktop {
        height: 22rem;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .tweet-section {
    height: auto;
    margin-bottom: 1rem;
    flex-direction: column;
    text-align: center;

    h1 {
      font-size: 1.3rem;
      margin-top: 0;
    }

    .print-tweet-section {
      display: flex;
      align-items: center;
      padding: 0;

      p {
        width: 90%;
        font-size: 0.8rem;
        margin: 1.1rem 0;
      }

      button {
        margin-bottom: 1rem;
        width: 70%;
      }

      input {
        margin-top: 1rem;
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
      width: 90%;
    }
  }
}

@media only screen and (max-width: 380px) {
  .tweet-section {
    h1 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.7rem;
    }
  }
}

@media only screen and (max-width: 350px) {
  .tweet-section {
    h1 {
      font-size: 1.1rem;
    }
  }
}
</style>
