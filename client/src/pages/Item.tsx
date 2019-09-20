import {Button, IPanelProps} from '@blueprintjs/core';
import React, {FC} from 'react';
import {AmazonItem} from '../../../shared/types';
import Layout from '../components/Layout/Layout';
import ItemInfo from '../components/ItemInfo/ItemInfo';

interface ItemProps extends IPanelProps {
  item: AmazonItem;
}

const Item: FC<ItemProps> = ({item, closePanel}) => {
  return (
    <Layout isItem>
      <ItemInfo item={item} />
    </Layout>
  );
};

export default Item;
