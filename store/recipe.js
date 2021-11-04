export default {
  state: () => ({
    recipes: null,
    singleRecipe: null
  }),
  getters: {
    getRecipes (state) {
      return state.recipes;
    },
    getSingleRecipe (state) {
      return state.singleRecipe;
    }
  },
  mutations: {
    setRecipes (state, payload) {
      state.recipes = payload;
    },
    setSingleRecipe (state, payload) {
      state.singleRecipe = payload;
    }
  },
  actions: {
    getRecipes ({ commit, getters, rootGetters }) {
      const productsIngredients = rootGetters['cart/getProductsIngredients'];
      if (productsIngredients.length) {
        this.$axios
          .$get(
            `recipes/findByIngredients?number=5&ingredients=${productsIngredients}`
          )
          .then((res) => {
            commit('setRecipes', res);
          });
      }
    },
    getSingleRecipe ({ commit, getters }, payload) {
      return new Promise((resolve) => {
        if (getters.getSingleRecipe && getters.getSingleRecipe.id === payload) {
          resolve(getters.getSingleRecipe.sourceUrl);
        } else {
          this.$axios
            .$get(`recipes/${payload}/information`)
            .then((res) => {
              commit('setSingleRecipe', res);
              resolve(res.sourceUrl);
            })
            .catch(() => {
              alert('something went wrong ):');
            });
        }
      });
    }
  }
};
