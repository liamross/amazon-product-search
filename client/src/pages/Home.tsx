import {IPanelProps} from '@blueprintjs/core';
import React, {FC} from 'react';
import useData from 'use-data';
import {getAllItems} from '../api/items';
import Layout from '../components/Layout/Layout';
import ListItem from '../components/ListItem/ListItem';
import Item from './Item';

const Home: FC<IPanelProps> = ({openPanel}) => {
  const {data, loading, error} = useData(getAllItems);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <Layout>
      {data!.map(item => (
        <ListItem
          key={item.asin}
          onClick={() => openPanel({component: Item, props: {item}, title: item.name})}
          item={item}
        />
      ))}
    </Layout>
  );
};

export default Home;
