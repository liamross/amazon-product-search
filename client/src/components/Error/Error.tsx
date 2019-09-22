import {Button, IButtonProps, NonIdealState} from '@blueprintjs/core';
import React, {FC} from 'react';

interface ErrorProps {
  text?: IButtonProps['text'];
  onClick: IButtonProps['onClick'];
}

const Error: FC<ErrorProps> = ({onClick, text = 'Return to home'}) => {
  return (
    <NonIdealState
      icon="error"
      title="Error"
      description="There was an issue with your request."
      action={<Button text={text} onClick={onClick} />}
    />
  );
};

export default Error;
