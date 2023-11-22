import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item._id === newItem._id && item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.products.push(newItem);
      }

      state.quantity += newItem.quantity;
      state.total += newItem.price * newItem.quantity;
    },
    // Remove product action
    removeProduct: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (itemIndex >= 0) {
        state.quantity -= 1;
        state.total -=
          state.products[itemIndex].price * state.products[itemIndex].quantity;
        state.products.splice(itemIndex, 1);
      }
    },
    // Increment quantity
    incrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (item) {
        item.quantity += 1;
        state.total += item.price;
      }
    },
    // Decrement quantity
    decrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.total -= item.price;
        } else {
          state = cartSlice.caseReducers.removeProduct(state, action);
        }
      }
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
