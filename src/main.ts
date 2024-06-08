import { createApp } from 'vue';
import './style/index.scss';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import VueGtag from 'vue-gtag-next';

const app = createApp(App);

app.use(VueGtag, {
  property: {
    id: `${import.meta.env.VITE_GTAG_ID}`,
  },
});
app.use(router);
app.use(createPinia());
app.mount('#app');
