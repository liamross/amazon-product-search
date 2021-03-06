import {IPanelProps} from '@blueprintjs/core';
import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import useData from 'use-data';
import {AmazonItem} from '../../../shared/types';
import {deleteItemByAsin, getItemByAsin} from '../api/items';
import {ItemContext} from '../App';
import Error from '../components/Error/Error';
import ItemInfo from '../components/ItemInfo/ItemInfo';
import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading/Loading';

interface ItemProps extends IPanelProps {
  asin: AmazonItem['asin'];
}

const Item: FC<ItemProps> = ({asin, closePanel}) => {
  const {addItem, deleteItem} = useContext(ItemContext);

  const {data: item, loading, error} = useData(() => getItemByAsin(asin));

  const [deleting, setDeleting] = useState(false);
  useEffect(() => setDeleting(false), []);

  useEffect(() => {
    if (item && !deleting && !loading && !error) {
      addItem(item);
    }
  }, [item, deleting, loading, error, addItem]);

  const handleDelete = useCallback(async () => {
    setDeleting(true);
    try {
      await deleteItemByAsin(asin);
      closePanel();
      deleteItem(asin);
    } catch (error) {
      console.error(error);
      // TODO: Display error.
      setDeleting(false);
    }
  }, [asin, closePanel, deleteItem]);

  if (loading) return <Loading />;
  if (error || !item) return <Error onClick={closePanel} />;

  return (
    <Layout isItem>
      <ItemInfo item={item} onDelete={handleDelete} disabled={deleting} />
    </Layout>
  );
};

export default Item;
