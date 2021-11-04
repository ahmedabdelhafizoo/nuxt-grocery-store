<template>
  <div class="cart shadow" :class="{ show: showSideMenu }">
    <div class="cart__container d-flex flex-column h-100">
      <!-- cart heading -->
      <div
        class="
          d-flex
          align-items-center
          justify-content-between
          border-bottom
          px-3
          py-2
        "
      >
        <span
          class="cart__total d-flex align-items-center"
        ><font-awesome-icon icon="shopping-bag" class="h5 mb-0 me-2" />
          {{ cartItemsNumber }} Item{{ cartItemsNumber > 1 ? "s" : "" }}</span>
        <span
          class="h2 m-0 text-muted cart__close-icon"
          @click="handleToggleSideMenu"
        >
          &times;
        </span>
      </div>
      <!-- end cart heading -->

      <!-- cart items -->
      <div v-if="cart.length" class="cart-items custom-scroll">
        <CartItem
          v-for="product in cart"
          :key="product.id"
          :product="product"
        />
      </div>
      <!-- end cart items -->

      <div v-else class="empty-cart text-center custom-scroll">
        <div class="p-5">
          <img
            src="@/assets/images/cart.svg"
            alt="cart image"
            width="auto"
            height="auto"
          >
          <h6 class="text-muted mt-5">
            Your cart Is Empty!
          </h6>
        </div>
      </div>

      <!-- cart footer -->
      <div class="mt-auto py-3 px-3">
        <nuxt-link
          to="/checkout"
          class="
            btn btn--green
            rounded-pill
            w-100
            d-flex
            align-items-center
            px-4
            text-white
          "
          :class="{ disabled: !cart.length }"
          @click.native="handleToggleSideMenu"
        >
          Checkout
          <span
            class="ms-auto text-dark bg-white py-1 px-3 rounded-pill"
          >${{ totalPrice }}</span>
        </nuxt-link>
      </div>
      <!-- end cart footer -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from './CartItem.vue';
export default {
  name: 'ShppingCart',
  components: { CartItem },
  props: {
    showSideMenu: {
      type: Boolean,
      required: true,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    handleToggleSideMenu: {
      type: Function,
      require: true
    }
  },
  computed: {
    ...mapGetters('cart', {
      cart: 'getCartItems',
      cartItemsNumber: 'getCartItemsNumber',
      totalPrice: 'getTotalPrice'
    })
  },
  methods: {
    toggleSideMenu () {
      this.toggleMenu = !this.toggleMenu;
    }
  }
};
</script>
