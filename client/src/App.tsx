import {PanelStack} from '@blueprintjs/core';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import useData from 'use-data';
import {AmazonItem} from './../../shared/types';
import {AmazonListItem, deleteAllItems, getAllItems} from './api/items';
import Error from './components/Error/Error';
import Loading from './components/Loading/Loading';
import Home from './pages/Home';

export interface ItemContextValue {
  addItem: (item: AmazonItem) => void;
  deleteItem: (asin: AmazonItem['asin']) => void;
  clearItems: () => void;
  deleting: boolean;
  items: AmazonListItem[];
}

export const ItemContext = createContext<ItemContextValue>({
  addItem: () => {},
  deleteItem: () => {},
  clearItems: () => {},
  deleting: false,
  items: [],
});

const App: FC = () => {
  const {data: items, loading, error, setData, fireFetch} = useData(getAllItems);

  const handleDeleteItem = useCallback(
    (asin: AmazonItem['asin']) => {
      setData(prev => {
        if (!prev) return [];
        const removeIndex = prev.findIndex(prevItem => prevItem.asin === asin);
        const newVal = [...prev.slice(0, removeIndex), ...prev.slice(removeIndex + 1)];
        return newVal;
      });
    },
    [setData],
  );

  const handleAddItem = useCallback(
    (item: AmazonItem) => {
      setData(prev => {
        if (!prev) return [item];
        const exists = prev.some(prevItem => prevItem.asin === item.asin);
        if (!exists) return [item, ...prev];
        return prev;
      });
    },
    [setData],
  );

  const [deleting, setDeleting] = useState(false);
  const handleClearItems = useCallback(async () => {
    setDeleting(true);
    try {
      await deleteAllItems();
      setData([]);
    } catch (error) {
      console.error(error);
      // TODO: Display error.
    }
    setDeleting(false);
  }, [setData]);

  const value = useMemo(
    () => ({
      addItem: handleAddItem,
      deleteItem: handleDeleteItem,
      clearItems: handleClearItems,
      deleting,
      items: items || [],
    }),
    [handleAddItem, handleDeleteItem, handleClearItems, deleting, items],
  );

  if (loading) return <Loading />;
  if (error || !items) return <Error onClick={() => fireFetch()} text={'Retry'} />;

  return (
    <ItemContext.Provider value={value}>
      <PanelStack
        className="App"
        initialPanel={{
          component: Home,
          props: {items},
          title: 'All items',
        }}
      />
    </ItemContext.Provider>
  );
};

export default App;
