
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import MainStyles from './component/MainStyles/index.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MainStyles>
            <Router>
                <App />
            </Router>
        </MainStyles>
    </React.StrictMode>,
)
