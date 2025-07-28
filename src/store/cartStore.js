import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],
  
  initializeCart: (initialCart) => {
    set({ cart: initialCart });
  },
  
  handleQuantityChange: (id, newQuantity) => {
    console.log('Updating quantity for item: VALLLLLLL', id, 'to', newQuantity);
    set(state => ({
      cart: state.cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, 99)) }
          : item
      )
    }));
  },
  
  handleRemove: (id) => {
    set(state => ({
      cart: state.cart.filter(item => item.id !== id)
    }));
  },
  
  handleCheckout: () => {
    alert('Proceeding to checkout!');
  },
}));

console.log('Cart store initialized with methods:', useCartStore.getState());

// Expose store methods globally
window.cartStore = {
  getCart: () => useCartStore.getState().cart,
  handleQuantityChange: (id, newQuantity) => useCartStore.getState().handleQuantityChange(id, newQuantity),
  handleRemove: (id) => useCartStore.getState().handleRemove(id),
  handleCheckout: () => useCartStore.getState().handleCheckout(),
  initializeCart: (initialCart) => useCartStore.getState().initializeCart(initialCart),
};

export { useCartStore };
export default useCartStore;