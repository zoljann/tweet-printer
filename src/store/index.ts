import { defineStore } from 'pinia';
import { ICartItem } from '../interface';

export const useStore = defineStore('store', {
  state: () => ({
    currentTweetUrl: '',
    cartItems: [] as ICartItem[],
    notification: { text: '', type: '' },
    currency: '',
  }),

  getters: {
    getCurrentTweetUrl: (state) => state.currentTweetUrl,
    getCartItems: (state) => state.cartItems,
    getCurrency: (state) => state.currency,
  },
});
