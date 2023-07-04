import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Router from "./router"; // Assuming you saved the router code in "router.js"
import MainRouter from './router';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);


