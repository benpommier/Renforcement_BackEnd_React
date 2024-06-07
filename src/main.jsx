import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './UserContext'; // Assurez-vous que le chemin est correct

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
