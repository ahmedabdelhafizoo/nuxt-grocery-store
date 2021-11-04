export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    store.commit('updateLoadingStatus', true);
    config.params = {
      apiKey: process.env.API_KEY
    };
  });

  $axios.onResponse(() => {
    store.commit('updateLoadingStatus', false);
  });

  $axios.onError(() => {
    store.commit('updateLoadingStatus', false);
  });
}
