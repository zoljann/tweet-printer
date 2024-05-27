<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { getAllImages } from '../api';
import { isValidUrl } from '../helpers';

const store = useStore();
const router = useRouter();
const shirts = ref<any[]>([]);

const redirectToOrderView = (tweetUrl: string) => {
  if (!tweetUrl || !isValidUrl(tweetUrl)) return;

  store.currentTweetUrl = tweetUrl;
  router.push({ name: 'order' });
};

onMounted(async () => {
  shirts.value = await getAllImages();
});
</script>

<template>
  <div class="title">
    <h2>Naše najpopularnije majice🤞</h2>
    <p>
      Klikni na majicu da započneš njeno uređivanje, a potom i naručivanje🤗
    </p>
  </div>
  <div class="wrapper-container">
    <div class="wrapper" v-if="shirts.length">
      <div
        class="image-preview"
        v-for="(item, index) in shirts"
        :key="index"
        @click="redirectToOrderView(item.tweetUrl)"
      >
        <img :src="item.image" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  text-align: center;
  h2 {
    margin-bottom: 0;
  }

  p {
    margin: 1rem;
  }
}

.wrapper-container {
  display: flex;
  justify-content: center;
}

.wrapper {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  margin: 1rem 0;

  .image-preview {
    display: flex;
    justify-content: center;

    img {
      cursor: pointer;
      width: 100%;
    }
  }
}
@media screen and (max-width: 768px) {
  .wrapper {
    width: 100%;
    grid-template-columns: 1fr;

    .image-preview {
      img {
        width: 95%;
      }
    }
  }
}
</style>
