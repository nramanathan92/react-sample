import React from "react";
import { createRoot } from "react-dom/client";
import CartPage from "../CartPage";
// Import the cart store to ensure it's included in the bundle
import "../store/cartStore";

export const render = ({container, ...props}) => {
    createRoot(container).render(
        <CartPage {...props} />
    );
}

export default render;