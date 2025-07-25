import React, { use, useEffect, useRef } from "react";

const withCustomRender = (WrappedComponent) => {
  return (props) => {
    const { afterDecorate, ...restProps } = props;
    const wrappedRef = useRef(null);

    useEffect(() => {
      if (typeof afterDecorate === 'function') {
        const element = wrappedRef.current;
        if (element) {
          afterDecorate(restProps, element);
        }
      }
    }, [afterDecorate, restProps]);
   
    return <div ref={wrappedRef}><WrappedComponent {...restProps} /></div>;
  };
};

export default withCustomRender; 