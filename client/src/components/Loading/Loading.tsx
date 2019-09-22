import {Spinner} from '@blueprintjs/core';
import React, {FC} from 'react';

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className="Loading">
      <Spinner />
    </div>
  );
};

export default Loading;
