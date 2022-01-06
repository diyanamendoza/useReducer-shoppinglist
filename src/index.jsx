import React from 'react'
import { render, ReactDOM } from 'react-dom';
import App from './App';
import { ItemsProvider } from "./context/itemsContext";

render(
    <React.StrictMode>
        <ItemsProvider>
            <App />
        </ItemsProvider>
    </React.StrictMode>
    , document.getElementById('root'));
