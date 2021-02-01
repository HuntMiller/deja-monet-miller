import React from 'react';
import reasons from '../reasons.json';

function ReasonProvider(props) {
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { reasons: reasons?.list ?? [] });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
}

export default ReasonProvider;