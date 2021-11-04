<template>
  <nuxt-link
    :to="`product/${product.id}`"
    class="product col mb-4 text-center text-dark"
  >
    <div class="h-100">
      <div class="bg-white p-3 h-100 d-flex flex-column">
        <div class="product__img">
          <img :src="product.image" alt="product image">
        </div>
        <h6 class="my-3">
          {{ product.title }}
        </h6>
        <button class="btn btn--green mt-auto">
          View Details
        </button>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      required: true,
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  flex-basis: 250px;
  max-width: 250px;
}
</style>
