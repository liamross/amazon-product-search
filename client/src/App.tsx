import {PanelStack} from '@blueprintjs/core';
import React, {FC} from 'react';
import Home from './pages/Home';

const App: FC = () => {
  return (
    <PanelStack
      className="App"
      initialPanel={{
        component: Home,
        title: 'All items',
      }}
    />
  );
};

export default App;
