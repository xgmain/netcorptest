import React from 'react';
import ReactDOM from 'react-dom/client'; 
import Main from './main';
import { BrowserRouter } from 'react-router-dom';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot( document.getElementById('app') );

root.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
);