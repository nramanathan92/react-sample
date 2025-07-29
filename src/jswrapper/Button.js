import React from "react";
import { createRoot } from "react-dom/client";
import Button from "../../src/components/atoms/Button";

export const render = ({container, ...props}) => {
    createRoot(container).render(
        <Button {...props} />
    );
}

export default render;