import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

//memorize selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatorQuantity, cartItem) =>
        accumulatorQuantity + cartItem.quantity,
      0
    )
);
