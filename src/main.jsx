
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import { SocketContextProvider } from './contexts/socketContext.jsx';
import './index.css';
import { store } from './redux/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <SocketContextProvider>
                    <App />
                </SocketContextProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
)
