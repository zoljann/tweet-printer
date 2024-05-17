<script setup lang="ts">
import { ref } from 'vue';
import { formatColorName, formatProductName } from '../helpers';

const props = defineProps<{
  order: { [key: string]: any };
}>();
const emit = defineEmits(['modal-closed']);

const showModal = ref(true);
const selectedOrder = ref(props.order);

const formatStatusName = (status: string): string => {
  switch (status) {
    case 'payinCreated':
      return 'započeto plaćanje';
    case 'ordered':
      return 'naručeno';
    case 'paid':
      return 'plaćeno';
    case 'done':
      return 'završeno';
    default:
      return '';
  }
};

const closeModal = () => {
  showModal.value = false;
  emit('modal-closed');
};
</script>

<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-container">
      <h4>
        ID narudžbe: <span class="important">{{ selectedOrder._id }}</span
        >, status:
        <span class="important">
          {{ formatStatusName(selectedOrder.status) }}
        </span>
      </h4>
      <div
        class="item"
        v-for="(item, index) in selectedOrder.items"
        :key="index"
      >
        <span class="item-description">
          {{ formatProductName(item.product) }} - vel.{{ item.size }},
          {{ formatColorName(item.color) }} boja, {{ item.printSide }},
          <a :href="item.tweetUrl" target="_blank">link do tvita</a></span
        >
        <img
          class="item-image"
          :src="`data:image/jpeg;base64,${item.tweetImageBase64}`"
        />
        <hr />
      </div>

      <button class="close-button" @click="closeModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container::-webkit-scrollbar {
  width: 8px;
}

.modal-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}

.modal-container {
  justify-content: center;
  text-align: center;
  position: relative;
  border-radius: 1rem;
  width: 50%;
  height: auto;
  background-color: #dadada;
  color: rgb(5, 5, 5);
  max-height: 80%;
  overflow-y: scroll;

  h4 {
    padding-left: 1rem;
    text-align: left;
    width: 80%;
  }

  .important {
    color: red;
  }
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-description {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &-image {
    width: 50%;
    background-color: rgb(77, 77, 77);
  }
}

.close-button {
  margin: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: black;
}

@media only screen and (max-width: 768px) {
  .modal-container {
    width: 95%;
  }

  .item-image {
    width: 90%;
  }
}
</style>
