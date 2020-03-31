import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Details from './Details';

function App() {
  return (
    <BrowserRouter >

      <Details />
    </BrowserRouter>
  );
}

export default App;
