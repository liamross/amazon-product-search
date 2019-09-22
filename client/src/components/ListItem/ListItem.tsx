import React, {ButtonHTMLAttributes, FC} from 'react';
import {AmazonListItem} from '../../api/items';

interface ListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: AmazonListItem;
}

const ListItem: FC<ListItemProps> = ({item, ...buttonProps}) => {
  return (
    <button className="ListItem" {...buttonProps}>
      <div className="ListItem__grid">
        <div className="ListItem__img">
          <img src={item.imgUrl} />
        </div>
        <div className="ListItem__name">{item.name}</div>
        <div className="ListItem__asin">{item.asin}</div>
      </div>
    </button>
  );
};

export default ListItem;
