import { createApp } from 'vue';
import './style/index.scss';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import VueGtag from 'vue-gtag-next';

const app = createApp(App);

app.use(VueGtag, {
  property: {
    id: 'G-KXP7J3VH3H',
  },
});
app.use(router);
app.use(createPinia());
app.mount('#app');
