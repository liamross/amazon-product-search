import React, {FC} from 'react';
import {AmazonItem} from '../../../../shared/types';
import {prettyDate} from '../../utils/dateUtils';
import DeleteButton from '../DeleteButton/DeleteButton';

interface ItemInfoProps {
  item: AmazonItem;
  onDelete: () => void;
  disabled?: boolean;
}

const ItemInfo: FC<ItemInfoProps> = ({item, onDelete, disabled}) => {
  const {x, z, y, units} = item.dimensions;

  const dimensionsString = `${x} ${units} x ${z} ${units} x ${y} ${units}`;

  return (
    <div className="ItemInfo">
      <div className="ItemInfo__grid">
        <div className="ItemInfo__img">
          <img src={item.imgUrl} alt={item.name} />
        </div>
        <div className="ItemInfo__label">{'Name:'}</div>
        <div className="ItemInfo__name">{item.name}</div>

        <div className="ItemInfo__label">{'ASIN:'}</div>
        <div className="ItemInfo__asin">{item.asin}</div>

        <div className="ItemInfo__label">{'Dimensions:'}</div>
        <div className="ItemInfo__dimensions">{dimensionsString}</div>

        <div className="ItemInfo__label">{'Rank:'}</div>
        <div className="ItemInfo__rank">{item.rank.map(rank => `${rank.category} (#${rank.rank})`).join(' | ')}</div>

        <div className="ItemInfo__label">{'Category:'}</div>
        <div className="ItemInfo__category">{item.category.map(category => category).join(' > ')}</div>

        <div className="ItemInfo__label">{'Date saved:'}</div>
        <div className="ItemInfo__date">{prettyDate(new Date(item.storedDate))}</div>
      </div>
      <DeleteButton isItem onConfirm={onDelete} disabled={disabled} />
    </div>
  );
};

export default ItemInfo;
