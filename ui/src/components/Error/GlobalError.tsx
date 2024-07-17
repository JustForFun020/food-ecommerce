import React from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = (props: GlobalErrorProps) => {
  const { error, reset } = props;

  return <div>GlobalError</div>;
};

export default GlobalError;
