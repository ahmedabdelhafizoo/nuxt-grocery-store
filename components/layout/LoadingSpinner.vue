<template>
  <div
    v-if="loading"
    class="d-flex align-items-center justify-content-center loading-spinner"
  >
    <div class="spinner" />
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  computed: {
    loading () {
      return this.$store.getters.getLoadingStatus;
    }
  }
};
</script>
