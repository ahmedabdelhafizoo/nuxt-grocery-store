<template>
  <div class="form col mx-2 mx-md-5">
    <input
      v-model.trim="query"
      type="search"
      class="form__input"
      placeholder="Serch for product"
      @input="handleSearch"
    >
  </div>
</template>

<script>
import { debounce } from 'lodash';
export default {
  name: 'SearchForm',
  data () {
    return {
      query: '',
      offset: 0
    };
  },
  mounted () {
    this.$eventBus.$off('changeOffset');
    this.$eventBus.$on('changeOffset', (payload) => {
      this.offset = payload;
      this.fireSearchEvent();
    });
  },
  methods: {
    handleSearch: debounce(function () {
      if (this.query) {
        this.offset = 0;
        this.fireSearchEvent();
      }
    }, 500),
    handleSearchEvent () {
      this.$eventBus.$emit('handleSearch', {
        query: this.query,
        offset: this.offset
      });
    },
    fireSearchEvent () {
      if (this.$route.name === 'index') {
        this.handleSearchEvent();
      } else {
        this.$router.push('/', () => {
          this.handleSearchEvent();
        });
      }
    }
  }
};
</script>
