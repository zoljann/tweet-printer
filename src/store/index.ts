import { defineStore } from 'pinia';
import { CartItem } from '../interface';

export const useStore = defineStore('store', {
  state: () => ({ currentTweetUrl: '', cartItems: [] as CartItem[] }),

  getters: {
    getCurrentTweetUrl: (state) => state.currentTweetUrl,
    getCartItems: (state) => state.cartItems,
  },

  actions: {
    test() {
      console.log('test');
    },
  },
});
