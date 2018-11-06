import React from 'react';
import { render } from 'react-dom';

import { Player } from './Player';

import './scss/index.scss';

const rootNode = document.querySelector('#root');


function App() {
  return (
    <Player />
  );
}

render(
  <App />,
  rootNode,
);
