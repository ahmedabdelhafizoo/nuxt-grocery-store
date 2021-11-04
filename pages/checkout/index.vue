<template>
  <client-only>
    <div class="checkout">
      <div class="container py-5">
        <button
          class="btn btn--white mb-4 px-4 border shadow-sm"
          @click="$router.go(-1)"
        >
          <span
            class="me-2 mb-0 h6"
          ><font-awesome-icon
            icon="arrow-circle-left"
          /></span>
          Back
        </button>
        <div class="row">
          <div class="col-lg-8">
            <div>
              <div
                class="
                  d-flex
                  align-items-center
                  justify-content-between
                  mb-4
                  text-uppercase
                "
              >
                <h1 class="h4 m-0">
                  Your Cart
                </h1>
                <strong>
                  {{ cartItemsNumber }} Item{{ cartItemsNumber > 1 ? "s" : "" }}
                </strong>
              </div>
              <!-- cart items -->
              <div v-if="cart.length" class="cart-items cart-items-lg">
                <CartItem
                  v-for="product in cart"
                  :key="product.id"
                  :product="product"
                  class="bg-white"
                />
              </div>
              <!-- end cart items -->
              <h5 v-else class="text-muted mt-3">
                Your cart Is Empty!
              </h5>
            </div>
          </div>

          <div class="col-lg-4">
            <div>
              <div class="cart-details bg-white shadow-sm p-3">
                <h4 class="mb-4 text-uppercase">
                  Cart Total
                </h4>
                <p class="total d-flex justify-content-between">
                  TOTAL <span class="total-value">${{ totalPrice }}</span>
                </p>
                <button class="btn btn--green w-100" @click="clearCartItems">
                  Proceed to Checkout
                </button>
                <small
                  class="text-danger mt-2 d-inline-block"
                >Click on the button to clear your cart</small>
              </div>
            </div>
          </div>
        </div>

        <!-- recommended Recipes -->
        <div v-if="recipes && recipes.length">
          <hr class="my-5">
          <h4 class="my-4 text-uppercase">
            Recommended Recipes
          </h4>
          <div class="row justify-content-center">
            <div
              v-for="recipe in recipes"
              :key="recipe.id"
              class="recipe col mb-4 text-center text-dark"
              @click="openRecipeLink(recipe.id)"
            >
              <div class="h-100">
                <div class="bg-white p-3 h-100 d-flex flex-column">
                  <div class="product__img">
                    <img :src="recipe.image" alt="recipe image">
                  </div>
                  <h6 class="my-3">
                    {{ recipe.title }}
                  </h6>
                  <button class="btn btn--green mt-auto">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <a ref="link" :href="link" target="_blank" class="d-none" />
        </div>
        <!-- end recommended Recipes -->
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '~/components/cart/CartItem.vue';
export default {
  name: 'Checkout',
  components: { CartItem },
  data () {
    return {
      link: null
    };
  },
  head () {
    return {
      title: 'Checkout'
    };
  },
  computed: {
    ...mapGetters('cart', {
      cart: 'getCartItems',
      cartItemsNumber: 'getCartItemsNumber',
      totalPrice: 'getTotalPrice'
    }),
    ...mapGetters('recipe', {
      recipes: 'getRecipes'
    })
  },
  mounted () {
    this.$store.dispatch('recipe/getRecipes');
  },
  methods: {
    openRecipeLink (recipeId) {
      this.$store.dispatch('recipe/getSingleRecipe', recipeId).then((res) => {
        this.link = res;
        this.$nextTick(() => {
          this.$refs.link.click();
        });
      });
    },
    clearCartItems () {
      this.$store.commit('cart/clearCartItems');
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe {
  flex-basis: 264px;
  max-width: 264px;
  cursor: pointer;
}
</style>
