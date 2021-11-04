<template>
  <div>
    <AppHeader />
    <LoadingSpinner />
    <Nuxt />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue';
import LoadingSpinner from '~/components/layout/LoadingSpinner.vue';
export default {
  components: {
    AppHeader,
    LoadingSpinner
  }
};
</script>
