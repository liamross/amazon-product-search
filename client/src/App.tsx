import React, {FC} from 'react';
import useData from 'use-data';
import {getAllItems} from './api/items';
import './App.scss';

const App: FC = () => {
  const {data, loading, error} = useData(getAllItems);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="App">
      {data!.map(item => (
        <p>{item.asin}</p>
      ))}
    </div>
  );
};

export default App;
