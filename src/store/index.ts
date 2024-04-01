import { defineStore } from 'pinia';
import { ICartItem } from '../interface';

export const useStore = defineStore('store', {
  state: () => ({ currentTweetUrl: '', cartItems: [] as ICartItem[] }),

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
