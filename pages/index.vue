<template>
  <div class="container">
    <div v-if="products && products.products && products.products.length">
      <div class="row pt-5 pb-3 justify-content-center">
        <ProductCard
          v-for="product in products.products"
          :key="product.id"
          :product="product"
        />
      </div>
      <!-- pagination -->
      <div class="text-center mb-5">
        <button
          class="btn btn--white border px-3 py-2"
          :disabled="
            products.products.length < productsNumber || products.offset === 0
          "
          @click="
            $eventBus.$emit('changeOffset', products.offset - productsNumber)
          "
        >
          Prev
        </button>
        <button
          class="btn btn--white border px-3 py-2"
          :disabled="
            products.offset === 990 ||
              products.offset + productsNumber >= products.totalProducts
          "
          @click="
            $eventBus.$emit('changeOffset', products.offset + productsNumber)
          "
        >
          Next
        </button>
      </div>
      <!-- end pagination -->
    </div>

    <div v-if="!products" class="py-5">
      <div class="col-lg-8 mx-auto text-center px-0">
        <img
          src="@/assets/images/online_groceries.svg"
          alt="online_groceries image"
          class="col-10 col-md-7 col-xl-5"
          width="auto"
          height="auto"
        >
        <h1 class="h2 mt-5 text-uppercase">
          The spoonacular grocery products API allows you to search through all
          products
        </h1>
      </div>
    </div>

    <!-- show this when the query not founded -->
    <div
      v-if="products && products.products && products.products.length === 0"
      class="my-5 text-center col-md-6 col-lg-4 mx-auto"
    >
      <img src="@/assets/images/404.svg" alt="not found image">
      <h4 class="mt-4">
        Not Founded
      </h4>
    </div>

    <div
      v-if="products && products.message"
      class="my-5 text-center col-md-6 col-lg-4 mx-auto"
    >
      <h4 class="mt-4">
        {{ products.message }}
      </h4>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/product/ProductCard.vue';
const handleSrachEvent = (eventBus, store) => {
  eventBus.$off('handleSearch');
  eventBus.$on('handleSearch', (payload) => {
    console.log('fire evente !!', payload);
    store.dispatch('getProducts', payload);
  });
};
export default {
  name: 'Home',
  components: { ProductCard },
  data () {
    return {
      productsNumber: 10
    };
  },
  fetch ({ $eventBus, store }) {
    if (process.client) {
      handleSrachEvent($eventBus, store);
    }
  },
  head () {
    return {
      title: 'Home'
    };
  },
  computed: {
    products () {
      return this.$store.getters.getProducts;
    }
  },
  created () {
    handleSrachEvent(this.$eventBus, this.$store);
  }
};
</script>
