<script setup lang="ts">
import { onMounted, ref } from "vue";
import { isValidUrl } from "../helpers";
import { createImagePreview } from "../api";
import {
  Product,
  ProductColor,
  ProductSize,
  SvgShirtIconPath,
  SvgMugIconPath,
} from "../interface";

const props = defineProps({
  tweetUrl: String,
});

const tweetUrl = ref(props.tweetUrl);
const tweetUrlInput = ref("");
const tweetUrlErrorMessage = ref("");
const imagePreviewUrl = ref("");
const selectedProduct = ref(Product.SHIRT);
const selectedColor = ref(ProductColor.WHITE);
const selectedSize = ref(ProductSize.M);
const products = [
  {
    name: Product.SHIRT,
    path: SvgShirtIconPath,
  },
  {
    name: Product.MUG,
    path: SvgMugIconPath,
  },
];

const updateTweetUrl = () => {
  if (!isValidUrl(tweetUrlInput.value) || !tweetUrlInput.value) {
    tweetUrlErrorMessage.value = "Nisi zalijepio ispravan link😭";

    return;
  }

  tweetUrl.value = tweetUrlInput.value;
  tweetUrlErrorMessage.value = "";

  getProductPreview();
};

const getProductPreview = async () => {
  const imagePreviewPayload = {
    product: selectedProduct.value,
    tweetUrl: tweetUrl.value || "random moj tvit",
    color: selectedColor.value,
  };

  const { image } = await createImagePreview(imagePreviewPayload);
  imagePreviewUrl.value = `data:image/jpeg;base64,${image}`;
  //na rutu za dohvat slika postaviti da vrati error ukoliko ne nadje taj tvit
};

const setSelectedProduct = (product: Product) => {
  selectedProduct.value = product;

  getProductPreview();
};

const setSelectedProductColor = (color: ProductColor) => {
  selectedColor.value = color;

  getProductPreview();
};

onMounted(() => {
  if (!isValidUrl(tweetUrl.value) || !tweetUrl.value) {
    tweetUrlErrorMessage.value = "Uneseni link ne postoji😭";

    return;
  }

  tweetUrlInput.value = tweetUrl.value;

  getProductPreview();
});
</script>

<template>
  <div class="order-content">
    <div class="tweet-input">
      <input
        class="tweet-url-input"
        v-model="tweetUrlInput"
        type="text"
        placeholder="Zalijepi novi link tvita ovdje🎯"
      />
      <button @click="updateTweetUrl()" class="tweet-url-submit">
        Izmjeni link
      </button>
    </div>
    <span v-if="tweetUrlErrorMessage" class="input-error">{{
      tweetUrlErrorMessage
    }}</span>

    <div class="icons">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="icon"
        :class="{ selected: selectedProduct === product.name }"
        @click="
          selectedProduct !== product.name && setSelectedProduct(product.name)
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 54.35 50"
          aria-labelledby="title"
          width="50"
          height="50"
          fill="white"
        >
          <title id="title">{{ product.name }}</title>
          <path :d="product.path"></path>
        </svg>
        <span>{{ product.name === Product.SHIRT ? "Majica" : "Šolja" }}</span>
      </div>
    </div>

    <div class="product-preview">
      <img class="image-preview" :src="imagePreviewUrl" />
    </div>

    <div class="color-picker">
      <div
        v-for="color in Object.values(ProductColor)"
        :key="color"
        class="color-circle"
        :style="{ backgroundColor: color }"
        :class="{ active: selectedColor === color }"
        @click="selectedColor !== color && setSelectedProductColor(color)"
      ></div>
    </div>

    <div class="size-picker" v-if="selectedProduct === Product.SHIRT">
      <div
        v-for="size in Object.values(ProductSize)"
        :key="size"
        class="size-value"
        :class="{ active: selectedSize === size }"
        @click="selectedSize = size"
      >
        {{ size }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-content {
  height: 83%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tweet-input {
  width: 80%;
  display: flex;
  justify-content: center;

  .tweet-url-input {
    width: 25%;
    padding: 0.8rem;
    border-radius: 0.5rem;
  }

  .tweet-url-submit {
    font-weight: bold;
    color: rgb(233, 233, 233);
    padding: 0.6rem 1.2rem;
    margin-left: 1rem;
    font-size: 1rem;
    background-color: #42879c;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;

    &:hover {
      transition: 0.3s ease;
      background-color: #3a7586;
    }
  }
}

.input-error {
  color: tomato;
  margin: 0.1rem;
}

.icons {
  display: flex;

  .icon {
    cursor: pointer;
    display: flex;
    text-align: center;
    flex-direction: column;
    border-radius: 1.2rem;
    padding: 0.6rem 1.5rem 0.6rem 1.5rem;
    margin: 0.5rem;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid white;
    }

    &.selected {
      border: 1px solid white;
      cursor: default;
    }

    span {
      margin-top: 1rem;
    }
  }
}

.product-preview {
  background-color: wheat;
  height: 45%;
  width: 20%;

  .image-preview {
    width: 100%;
  }
}

.color-picker {
  display: flex;
  justify-content: center;
  align-items: center;

  .color-circle {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin: 10px;
    cursor: pointer;
    border: 2px solid transparent;

    &.active {
      border-color: #42879c;
      cursor: default;
    }
  }
}

.size-picker {
  border: 2px solid #42879c;
  border-radius: 1.5rem;
  display: flex;

  .size-value {
    font-weight: bold;
    margin: 0.2rem 2rem 0.2rem 2rem;
    padding: 0.3rem 1rem 0.3rem 1rem;
    border-radius: 1.5rem;
    cursor: pointer;

    &.active {
      background-color: #42879c;
    }

    &:not(.active):hover {
      transition: 0.3s ease;
      background-color: rgba(94, 148, 165, 0.322);
    }
  }
}
</style>
