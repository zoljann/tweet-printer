<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="container">
    <div class="content">
      <h2>Kako isprintati tvit na majicu</h2>
      <h4>1. Izaberi tvit koji želiš isprintati</h4>
      Otvori tvit i kopiraj njegov link, ili klikni na dugme share zatim na
      <span class="important">copy link</span>
      <img class="desktop" src="https://i.imgur.com/ULflQkT.png" />
      <img class="mobile" src="https://i.imgur.com/hDKOGHb.png" />
      <h4>2. Zalijepi link</h4>
      Otiđi na početnu stranicu
      <span class="home-page" @click="router.push({ name: 'home' })"
        >isprintajsvojtvit.com</span
      >, zatim zalijepi kopirani link u polje i klikni na dugme
      <span class="important">napravi majicu</span>
      <img class="mobile" src="https://i.imgur.com/N2e538H.png" />
      <img class="desktop" src="https://i.imgur.com/dwVAQyB.png" />
      <h4>3. Uredi majicu po svojim željama</h4>
      Odaberi boju, veličinu i poziciju printa zatim na dnu klikni na dugme
      <span class="important">dodaj u korpu</span> da bi naručio majicu. Ukoliko
      i dalje imaš nekih pitanja, piši nam na instagramu
      <a
        class="home-page"
        href="https://www.instagram.com/isprintajsvojtvit"
        target="_blank"
        >@isprintajsvojtvit</a
      >🤗
      <img class="mobile" src="https://i.imgur.com/fQkCceS.png" />
      <img class="desktop" src="https://i.imgur.com/R0XInC8.png" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.content {
  width: 80%;

  h2,
  p {
    text-align: center;
  }

  h4,
  .important {
    color: var(--text-color-error);
  }
}

img {
  display: block;
  margin: 0.5rem 0 0.5rem;
  width: 45%;
}

.mobile {
  display: none;
}

.home-page {
  color: var(--text-color-error);
  text-decoration: underline;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .container {
    justify-content: start;
  }

  .content {
    width: 95%;
  }

  img {
    width: 100%;
  }

  .mobile {
    display: block;
  }

  .desktop {
    display: none;
  }
}
</style>
