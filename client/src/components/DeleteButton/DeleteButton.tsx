import {Button, Classes, H5, IButtonProps, Intent, Popover} from '@blueprintjs/core';
import React, {FC, MouseEvent, useCallback, useState} from 'react';

interface DeleteButtonProps extends IButtonProps {
  onConfirm: (event: MouseEvent<HTMLElement>) => void;
  isItem?: boolean;
}

const DeleteButton: FC<DeleteButtonProps> = ({isItem, onConfirm, ...buttonProps}) => {
  const [open, setOpen] = useState(false);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <div className="DeleteButton">
      <Popover popoverClassName={Classes.POPOVER_CONTENT_SIZING} enforceFocus={false} onClose={onClose} isOpen={open}>
        <Button {...buttonProps} intent={Intent.DANGER} text={isItem ? 'Delete item' : 'Delete all'} onClick={onOpen} />
        <div>
          <H5>Confirm deletion</H5>
          <p>{`Are you sure you want to delete ${
            isItem ? 'this item' : 'all of your saved items'
          }? You won't be able to recover ${isItem ? 'it' : 'them'}.`}</p>
          <div className="DeleteButton__buttons">
            <Button className={`${Classes.POPOVER_DISMISS} DeleteButton__cancel`} onClick={onClose}>
              Cancel
            </Button>
            <Button intent={Intent.DANGER} className={Classes.POPOVER_DISMISS} onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default DeleteButton;
