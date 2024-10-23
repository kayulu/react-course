import { createContext } from "react";

const CartContext = createContext({
    // these are dummy properties added only for better autocompletion in the editor
    items: [],
    addItemToCart: () => {},
    updateCartItemQuantity: () => {}
});
export default CartContext;