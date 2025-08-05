import { StrictMode } from 'react'
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './app.css'
import { store } from './app/store'; // <-- Import the store
import { Provider } from 'react-redux'; // <-- Import the Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the App component with the Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
