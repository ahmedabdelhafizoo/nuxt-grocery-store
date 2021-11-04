<template>
  <div v-if="product" class="item d-flex align-items-center border-bottom p-3">
    <div
      class="
        item__quantity
        align-self-start
        d-flex
        flex-column
        align-items-center
        rounded
        bg-light
        border
        px-2
        ml-auto
        me-2
      "
    >
      <small
        @click="increaseQuantity(product.id)"
      ><font-awesome-icon
        icon="plus"
      /></small>
      <p class="fw-bold my-2">
        {{ product.quantity }}
      </p>
      <small
        @click="decreaseQuantity(product.id)"
      ><font-awesome-icon
        icon="minus"
      /></small>
    </div>
    <nuxt-link :to="`/product/${product.id}`" class="item__img me-2">
      <img :src="product.images[0]" alt="item image" class="mw-100 mh-100">
    </nuxt-link>
    <div class="item__info flex-grow-1">
      <nuxt-link :to="`/product/${product.id}`" class="mb-1 h6 name text-dark">
        {{ product.title }}
      </nuxt-link>
      <h6 class="m-0">
        <span
          class="me-4 text-muted"
        >${{ product.price }} x {{ product.quantity }}</span>
        <span class="total-value">${{ product.price * product.quantity }}</span>
      </h6>
    </div>
    <a
      href="#"
      class="remove-icon h4 m-0 ml-auto"
      @click.prevent="deleteCartItem(product.id)"
    >&times;</a>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'CartItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations('cart', [
      'decreaseQuantity',
      'increaseQuantity',
      'deleteCartItem'
    ])
  }
};
</script>
