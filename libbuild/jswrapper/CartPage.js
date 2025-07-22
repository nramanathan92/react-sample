import React from "react";
import { createRoot } from "react-dom/client";
import CartPage from "../../src/CartPage";

export const render = ({container, ...props}) => {
    createRoot(container).render(
        <CartPage {...props} />
    );
}

export default render;