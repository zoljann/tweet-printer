<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { isValidUrl } from '../helpers';
import { createImagePreview } from '../api';
import {
  Product,
  ProductColor,
  ProductSize,
  ProductPrintSide,
  SvgShirtIconPath,
  SvgMugIconPath,
  ICartItem,
} from '../interface';

const router = useRouter();
const store = useStore();
const tweetUrl = ref(store.getCurrentTweetUrl);
const tweetUrlInput = ref('');
const tweetUrlErrorMessage = ref('');
const imagePreviewUrl = ref('');
const imagePreviewLoading = ref(false);
const productPreviewErrorMessage = ref('');
const productPricePreview = ref(0);
const selectedProduct = ref(Product.SHIRT);
const selectedColor = ref(ProductColor.WHITE);
const selectedSize = ref(ProductSize.M);
const selectedPrintSide = ref(ProductPrintSide.FRONT);
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
    tweetUrlErrorMessage.value = 'Nisi zalijepio ispravan link😭';

    return;
  }

  if (tweetUrlInput.value === tweetUrl.value) return;

  tweetUrl.value = tweetUrlInput.value;
  tweetUrlErrorMessage.value = '';

  getProductPreview();
};

const getProductPreview = async () => {
  imagePreviewLoading.value = true;

  const imagePreviewPayload = {
    product: selectedProduct.value,
    tweetUrl:
      tweetUrl.value ||
      'https://twitter.com/MicinStojan/status/1769816973293052119',
    color: selectedColor.value,
    side: selectedPrintSide.value,
  };

  const { image, pricePreview, error } = await createImagePreview(
    imagePreviewPayload
  );

  if (error) {
    productPreviewErrorMessage.value = error;
    imagePreviewLoading.value = false;

    setTimeout(() => {
      productPreviewErrorMessage.value = '';
    }, 2500);

    return;
  }

  imagePreviewUrl.value = `data:image/jpeg;base64,${image}`;
  productPricePreview.value = pricePreview;
  imagePreviewLoading.value = false;
};

const redirectToCartView = () => {
  const cartItem: ICartItem = {
    product: selectedProduct.value,
    color: selectedColor.value,
    size: selectedSize.value,
    printSide: selectedPrintSide.value,
    tweetUrl: tweetUrl.value,
    image: imagePreviewUrl.value,
    price: productPricePreview.value,
  };
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  storedCartItems.push(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
  store.cartItems.push(cartItem);

  router.push({ name: 'cart' });
};

const setSelectedProduct = (product: Product) => {
  selectedProduct.value = product;

  getProductPreview();
};

const setSelectedProductColor = (color: ProductColor) => {
  selectedColor.value = color;

  getProductPreview();
};

const setSelectedPrintSide = (side: ProductPrintSide) => {
  selectedPrintSide.value = side;

  getProductPreview();
};

onMounted(() => {
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
      <button
        @click="updateTweetUrl()"
        :disabled="imagePreviewLoading"
        class="tweet-url-submit"
      >
        Izmijeni link
      </button>
    </div>
    <span v-if="tweetUrlErrorMessage" class="input-error">{{
      tweetUrlErrorMessage
    }}</span>

    <div class="button-icons">
      <button
        v-for="(product, index) in products"
        :key="index"
        class="icon"
        :class="{
          selected: selectedProduct === product.name,
          disabled: imagePreviewLoading,
        }"
        @click="
          selectedProduct !== product.name && setSelectedProduct(product.name)
        "
        :disabled="imagePreviewLoading"
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
        <span>{{ product.name === Product.SHIRT ? 'Majica' : 'Šolja' }}</span>
      </button>
    </div>

    <span v-if="productPreviewErrorMessage" class="product-preview-error">{{
      productPreviewErrorMessage
    }}</span>
    <div class="product-preview" :class="{ fade: imagePreviewLoading }">
      <div v-if="imagePreviewLoading" class="loader"></div>
      <img class="image-preview" :src="imagePreviewUrl" />
    </div>

    <div class="color-picker">
      <button
        v-for="color in Object.values(ProductColor)"
        :key="color"
        class="color-circle"
        :disabled="imagePreviewLoading"
        :style="{ backgroundColor: color }"
        :class="{
          active: selectedColor === color,
          disabled: imagePreviewLoading,
        }"
        @click="selectedColor !== color && setSelectedProductColor(color)"
      ></button>
    </div>

    <div class="size-picker" v-if="selectedProduct === Product.SHIRT">
      <button
        v-for="size in Object.values(ProductSize)"
        :key="size"
        class="size-value"
        :disabled="imagePreviewLoading"
        :class="{
          active: selectedSize === size,
          disabled: imagePreviewLoading,
        }"
        @click="selectedSize = size"
      >
        {{ size }}
      </button>
    </div>

    <div class="print-side-picker" v-if="selectedProduct === Product.SHIRT">
      <button
        v-for="side in Object.values(ProductPrintSide)"
        :key="side"
        class="print-side-value"
        :class="{
          active: selectedPrintSide === side,
          disabled: imagePreviewLoading,
        }"
        :disabled="imagePreviewLoading"
        @click="selectedPrintSide !== side && setSelectedPrintSide(side)"
      >
        {{ side }}
      </button>
    </div>

    <button
      class="price-preview-button"
      :class="{ disabled: imagePreviewLoading }"
      :disabled="imagePreviewLoading"
      @click="redirectToCartView"
    >
      {{ productPricePreview }} KM | Kupi
    </button>
  </div>
</template>

<style scoped lang="scss">
.order-content {
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
    padding: 0.6rem;
    border-radius: 0.5rem;
  }

  .tweet-url-submit {
    font-weight: bold;
    color: var(--button-color);
    padding: 0.6rem 1.2rem;
    margin-left: 1rem;
    font-size: 1rem;
    background-color: var(--button-color-back);
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;

    &:hover {
      transition: 0.3s ease;
      background-color: var(--button-color-hover);
    }
  }
}

.input-error {
  color: var(--text-color-error);
  margin: 0.1rem;
}

.button-icons {
  display: flex;

  .icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 1.2rem;
    padding: 0.6rem 1.5rem 0.6rem 1.5rem;
    margin: 0.5rem;
    border: 1px solid transparent;
    color: white;
    background-color: transparent;

    &:not(.disabled):hover {
      border: 1px solid white;
    }

    &.selected {
      border: 1px solid white;
      cursor: default;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    span {
      margin-top: 1rem;
    }
  }
}

.product-preview {
  width: 32%;

  &-error {
    color: var(--text-color-error);
  }

  &.fade {
    opacity: 0.5;
  }

  .image-preview {
    width: 100%;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: 2rem;
    border: 4px solid #3498db;
    border-top-color: transparent;
    border-radius: 50%;
    animation: loader-animation 0.8s linear infinite;
  }

  @keyframes loader-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.color-picker {
  display: flex;
  justify-content: center;
  align-items: center;

  .color-circle {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: 10px;
    cursor: pointer;
    border: 0.3rem solid transparent;

    &:not(.disabled):hover {
      opacity: 0.6;
    }

    &.active {
      border-color: #42879c;
      cursor: default;
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.size-picker {
  border: 2px solid #42879c;
  border-radius: 1.5rem;
  display: flex;

  .size-value {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.2rem 2rem 0.2rem 2rem;
    padding: 0.3rem 1rem 0.3rem 1rem;
    border-radius: 1.5rem;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: white;

    &.active {
      background-color: #42879c;
    }

    &:not(.active):not(.disabled):hover {
      transition: 0.3s ease;
      background-color: rgba(94, 148, 165, 0.322);
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}

.print-side-picker {
  display: flex;

  .print-side-value {
    font-size: 1rem;
    margin: 1rem;
    padding: 0.3rem 1rem;
    border-radius: 1.5rem;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: var(--button-color);

    &.active {
      background-color: var(--button-color-back);
    }

    &:not(.active):not(.disabled):hover {
      transition: 0.3s ease;
      background-color: var(--button-color-hover);
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}

.price-preview-button {
  margin-bottom: 2rem;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  color: black;

  &:not(.disabled):hover {
    transition: 0.3s ease;
    background-color: #d1d1d1;
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

@media only screen and (max-width: 768px) {
  .tweet-input {
    margin-top: 1.5rem;
    flex-direction: column;
    align-items: center;

    .tweet-url-input {
      width: 95%;
    }

    .tweet-url-submit {
      width: 65%;
      margin: 0.5rem 0rem;
    }
  }
  .product-preview {
    width: 96%;
  }

  .size-picker {
    .size-value {
      margin: 0.2rem 0.8rem;
    }
  }

  .print-side-picker {
    display: flex;

    .print-side-value {
      padding: 0.4rem 1.5rem;
    }
  }
}
</style>
