<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  image: string;
}>();
const emit = defineEmits(['modal-closed']);

const showModal = ref(true);
const selectedImage = ref(props.image);

const closeModal = () => {
  showModal.value = false;
  emit('modal-closed');
};
</script>

<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-container">
      <img class="item-image" :src="`${selectedImage}`" />

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
.modal-container {
  text-align: center;
  position: relative;
  border-radius: 1rem;
  width: 50%;
  height: auto;
  background-color: #747474ea;
  padding: 1rem 0;
}

.item-image {
  width: 50%;
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
    width: 99%;
  }
}
</style>
