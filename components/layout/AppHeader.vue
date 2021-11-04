<template>
  <client-only>
    <header class="header sticky-top bg-white shadow-sm py-3">
      <div class="container">
        <div class="d-flex align-items-center">
          <div class="logo">
            <h3 class="text-uppercase m-0">
              <nuxt-link to="/">
                Logo
              </nuxt-link>
            </h3>
          </div>

          <SearchForm />

          <div class="cart-icon" @click="showSideMenu = true">
            <span><font-awesome-icon icon="shopping-bag" /></span>
            <span class="cart-value">{{ cartItemsNumber }}</span>
          </div>
        </div>
      </div>
      <ShoppingCart
        :show-side-menu="showSideMenu"
        :handle-toggle-side-menu="handleToggleSideMenu"
      />
    </header>
  </client-only>
</template>

<script>
import ShoppingCart from '~/components/cart/shoppingCart.vue';
import SearchForm from '~/components/product/SearchForm.vue';
export default {
  components: {
    ShoppingCart,
    SearchForm
  },
  data () {
    return {
      showSideMenu: false
    };
  },
  computed: {
    cartItemsNumber () {
      return this.$store.getters['cart/getCartItemsNumber'];
    }
  },
  methods: {
    handleToggleSideMenu () {
      this.showSideMenu = !this.showSideMenu;
    }
  }
};
</script>
