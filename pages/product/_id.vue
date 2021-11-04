<template>
  <div v-if="product" class="container py-5">
    <button
      class="btn btn--white mb-3 px-4 border shadow-sm"
      @click="$router.go(-1)"
    >
      <span
        class="me-2 mb-0 h6"
      ><font-awesome-icon
        icon="arrow-circle-left"
      /></span>
      Back
    </button>
    <div class="row single-product">
      <div class="col-md-4 mb-4">
        <div>
          <img :src="product.images[2]" alt="product image" class="border">
        </div>
      </div>
      <div class="col-md-8 mb-4">
        <div>
          <small
            v-if="product.brand"
            class="
              bg-danger
              text-center text-white
              rounded-pill
              px-4
              py-2
              mb-2
              d-inline-block
            "
          >{{ product.brand }}</small>
          <h1 class="name">
            {{ product.title }}
          </h1>
          <h3 class="price">
            ${{ product.price }}
          </h3>
          <p v-if="product.description">
            {{ product.description }}
          </p>
          <client-only>
            <div
              v-if="cart.some((item) => item.id === product.id)"
              class="
                quantity
                align-self-start
                d-inline-flex
                align-items-center
                rounded
                border
                me-2
              "
            >
              <small
                @click="decreaseQuantity(product.id)"
              ><font-awesome-icon
                icon="minus"
              /></small>
              <p class="fw-bold mx-5 mb-0">
                {{ cart.find((p) => p.id === product.id).quantity }}
              </p>
              <small
                @click="increaseQuantity(product.id)"
              ><font-awesome-icon
                icon="plus"
              /></small>
            </div>
            <button v-else class="btn btn--green px-4" @click="addToCart">
              <span
                class="me-2 h6 m-0"
              ><font-awesome-icon
                icon="shopping-bag"
              /></span>
              ADD TO CART
            </button>
          </client-only>
        </div>
      </div>
    </div>

    <div class="info mt-4">
      <h3>Product Nutrition</h3>
      <table class="w-100 bg-white mb-4">
        <thead>
          <tr>
            <th v-if="product.nutrition.calories" class="p-2 border">
              Calories
            </th>
            <th v-if="product.nutrition.fat" class="p-2 border">
              Fat
            </th>
            <th v-if="product.nutrition.protein" class="p-2 border">
              Protein
            </th>
            <th v-if="product.nutrition.carbs" class="p-2 border">
              Carbs
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="product.nutrition.calories" class="p-2 border">
              {{ product.nutrition.calories }}
            </td>
            <td v-if="product.nutrition.fat" class="p-2 border">
              {{ product.nutrition.fat }}
            </td>
            <td v-if="product.nutrition.protein" class="p-2 border">
              {{ product.nutrition.protein }}
            </td>
            <td v-if="product.nutrition.carbs" class="p-2 border">
              {{ product.nutrition.carbs }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="product.nutrition.nutrients.length">
        <h5>Nutrients</h5>
        <table class="w-100 bg-white">
          <thead>
            <tr>
              <th class="p-2 border">
                Name
              </th>
              <th class="p-2 border">
                Amount
              </th>
              <th class="p-2 border">
                Percent Of Daily Needs
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in product.nutrition.nutrients"
              :key="index"
            >
              <td class="p-2 border">
                {{ item.name }}
              </td>
              <td class="p-2 border">
                {{ item.amount }} {{ item.unit }}
              </td>
              <td class="p-2 border">
                {{ item.percentOfDailyNeeds }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'SingleProduct',
  validate ({ params }) {
    return !isNaN(Number(params.id));
  },
  fetch ({ $axios, store, params }) {
    if (
      store.getters.getSingleProduct &&
      store.getters.getSingleProduct.id === Number(params.id)
    ) {
      return true;
    }
    return $axios
      .$get(`food/products/${params.id}`)
      .then((res) => {
        store.commit('setSingleProduct', res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  head () {
    return {
      title: this.product.title
    };
  },
  computed: {
    ...mapGetters({
      product: 'getSingleProduct'
    }),
    ...mapGetters('cart', {
      cart: 'getCartItems'
    })
  },
  methods: {
    ...mapMutations('cart', ['decreaseQuantity', 'increaseQuantity']),
    addToCart () {
      const ProductItem = {
        ...this.product,
        quantity: 1
      };
      this.$store.commit('cart/addCartItem', ProductItem);
    }
  }
};
</script>
