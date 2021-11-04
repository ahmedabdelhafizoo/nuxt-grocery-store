export default ({ store }) => {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  cartItems && store.commit('cart/setCartItems', cartItems);
};
