export default {
  state: () => ({
    loading: false,
    products: null,
    singleProduct: null
  }),
  getters: {
    getLoadingStatus (state) {
      return state.loading;
    },
    getProducts (state) {
      return state.products;
    },
    getSingleProduct (state) {
      return state.singleProduct;
    }
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.loading = payload;
    },
    setProducts (state, payload) {
      state.products = payload;
    },
    setSingleProduct (state, payload) {
      state.singleProduct = payload;
    }
  },
  actions: {
    getProducts ({ commit }, payload) {
      this.$axios
        .$get(
          `food/products/search?query=${payload.query}&offset=${payload.offset}`
        )
        .then((res) => {
          commit('setProducts', res);
        })
        .catch((err) => {
          if (err) {
            commit('setProducts', err);
          } else {
            commit('setProducts', { message: 'something went wrong ):' });
          }
        });
    }
  }
};
