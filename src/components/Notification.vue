<script setup lang="ts">
import { useStore } from '../store';
import { ref } from 'vue';

const store = useStore();
const notification = ref(store.notification);

const closeNotification = () => {
  notification.value.text = '';
  notification.value.type = '';
};
</script>

<template>
  <div
    class="notification"
    :class="{
      success: notification.type === 'success',
      error: notification.type === 'error',
      info: notification.type === 'info',
    }"
    v-if="notification.text"
  >
    <div class="content">
      <p>
        {{ notification.text }}
      </p>
    </div>
    <button class="close-button" @click="closeNotification">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
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
</template>

<style scoped lang="scss">
.notification {
  position: fixed;
  z-index: 1000;
  bottom: 2rem;
  width: 30%;
  height: 6%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  overflow: hidden;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.success {
  background-color: rgb(54, 92, 54);
}

.error {
  background-color: #aa2020;
}

.info {
  background-color: #ad7610;
}

.content {
  color: var(--text-color);

  p {
    margin: 0;
  }
}

.close-button {
  color: white;
  position: absolute;
  right: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

@media only screen and (max-width: 768px) {
  .notification {
    width: 80%;
  }
}
</style>
