import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './redux/customerSlice';
import productReducer from './redux/productSlice';
import storeReducer from './redux/storeSlice';
import saleReducer from './redux/saleSlice'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore({
    reducer: {
        customers: customerReducer,
        products: productReducer,
        stores: storeReducer,
        sale: saleReducer, 
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
