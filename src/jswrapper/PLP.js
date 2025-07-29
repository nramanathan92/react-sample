import React from "react";
import { createRoot } from "react-dom/client";
import PLP from "../../src/PLP";

export const render = ({container, ...props}) => {
    createRoot(container).render(
        <PLP {...props} />
    );
}

export default render;
