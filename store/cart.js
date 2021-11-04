const saveCartItems = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};
export default {
  state: () => ({
    cart: []
  }),
  getters: {
    getCartItems (state) {
      return state.cart;
    },
    getCartItemsNumber (state) {
      let itemsNumber = 0;
      state.cart.forEach((element) => {
        itemsNumber += element.quantity;
      });
      return itemsNumber;
    },
    getTotalPrice (state) {
      let totalPrice = 0;
      state.cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
      return totalPrice;
    },
    getProductsIngredients (state) {
      const result = [];
      state.cart.forEach((product) => {
        product.ingredients.forEach((item) => {
          result.push(item.name);
        });
      });
      return result.toString().slice(0, 100);
    }
  },
  mutations: {
    setCartItems (state, payload) {
      state.cart = payload;
    },
    addCartItem (state, payload) {
      const foundedItem = state.cart.find(item => item.id === payload.id);
      if (foundedItem) {
        foundedItem.quantity++;
      } else {
        state.cart.push(payload);
      }
      saveCartItems(state.cart);
    },
    deleteCartItem (state, payload) {
      // delete with index (payload will be the product id)
      const targetIndex = state.cart.findIndex(item => item.id === payload);
      state.cart.splice(targetIndex, 1);
      saveCartItems(state.cart);
    },
    decreaseQuantity (state, payload) {
      const item = state.cart.find(item => item.id === payload);
      // eslint-disable-next-line no-unused-expressions
      item.quantity > 1 ? item.quantity-- : '';
      saveCartItems(state.cart);
    },
    increaseQuantity (state, payload) {
      const item = state.cart.find(item => item.id === payload);
      item.quantity++;
      saveCartItems(state.cart);
    },
    clearCartItems (state) {
      state.cart = [];
      saveCartItems(state.cart);
    }
  }
};
