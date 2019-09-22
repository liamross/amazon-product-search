import {IPanelProps} from '@blueprintjs/core';
import React, {FC, useCallback, useContext, useState} from 'react';
import {AmazonItem} from '../../../shared/types';
import {ItemContext} from '../App';
import DeleteButton from '../components/DeleteButton/DeleteButton';
import Layout from '../components/Layout/Layout';
import ListItem from '../components/ListItem/ListItem';
import Search from '../components/Search/Search';
import Item from './Item';

interface HomeProps extends IPanelProps {
  items: AmazonItem[];
}

const Home: FC<HomeProps> = ({openPanel}) => {
  const {clearItems, deleting, items} = useContext(ItemContext);

  const [searchVal, setSearchVal] = useState('');
  const handleSearch = useCallback(
    () =>
      openPanel({
        component: Item,
        props: {asin: searchVal.toUpperCase()},
        title: 'New item',
      }),
    [searchVal, openPanel],
  );

  return (
    <Layout>
      <Search value={searchVal} onChange={setSearchVal} onSearch={handleSearch} />
      {items.map(item => (
        <ListItem
          key={item.asin}
          disabled={deleting}
          onClick={() =>
            openPanel({
              component: Item,
              props: {asin: item.asin},
              title: item.name,
            })
          }
          item={item}
        />
      ))}
      {items.length ? <DeleteButton onConfirm={clearItems} disabled={deleting} /> : null}
    </Layout>
  );
};

export default Home;
