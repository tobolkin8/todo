import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import App from './App';
import Wails from '@wailsapp/runtime';

Wails.Init(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("app")
  );
});


