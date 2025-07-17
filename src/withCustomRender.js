import React, { use, useEffect, useRef } from "react";

const withCustomRender = (WrappedComponent) => {
  return (props) => {
    const { customRender } = props;
    const containerRef = useRef(null);

    useEffect(() => {
      if (containerRef.current && typeof customRender === 'function') {
        customRender(props, containerRef.current);
      }
    }, [customRender, props]);
   
    if (typeof customRender === 'function') {
      return <div ref={containerRef}></div>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withCustomRender; 