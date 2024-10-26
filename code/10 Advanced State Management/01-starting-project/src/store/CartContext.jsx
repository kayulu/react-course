import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

// create a context managing object
export const CartContext = createContext(
  // these are dummy properties added only for better autocompletion in the editor
  {
    items: [],
    addItemToCart: () => {},
    updateCartItemQuantity: () => {},
  }
);

// state is the 'latest' state snapshot that is managed by 'useReducer' hook
function reducer(state, action) {
  const updatedItems = [...state.items];
  switch (action.type) {
    case "ADD_ITEM":
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = { 
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
        updatedItems.push({
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...state,
        items: updatedItems,
      };
    case "UPDATE_ITEM":
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
  }
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, dispatch] = useReducer(reducer, {items: []});

  // this is what we want to expose to consumers
  const cartCtx = {
    items: shoppingCartState.items,
    addItemToCart: (id) => dispatch({type: "ADD_ITEM", payload: {id: id}}),
    updateCartItemQuantity: (id, amount) => dispatch({type: "UPDATE_ITEM", payload: {id, amount}}), // shorthand syntax
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
