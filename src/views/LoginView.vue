<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  if (
    username.value === import.meta.env.VITE_LOGIN_USERNAME &&
    password.value === import.meta.env.VITE_LOGIN_PASSWORD
  ) {
    localStorage.setItem('authenticated', 'true');

    router.push({ name: 'orders' });
  } else {
    alert('Neispravni podaci');
  }
};
</script>

<template>
  <div class="login-container">
    <div class="overlay"></div>
    <div class="login-form">
      <h2>Prijava</h2>
      <input v-model="username" type="username" placeholder="Korisničko ime" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Prijava</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.login-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

input[type='username'],
input[type='password'] {
  width: 95%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

h2 {
  margin-bottom: 15px;
  text-align: center;
  color: #333;
}

@media screen and (max-width: 768px) {
  .login-form {
    margin: 0 1rem;
  }
}
</style>
