import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// ─── AXIOS GLOBAL CONFIGURATION (CENTRALIZED) ─────────────────────
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error('❌ VITE_API_URL is not defined! Check your .env file.');
} else {
  console.log('✅ Axios baseURL set to:', API_BASE_URL);
  axios.defaults.baseURL = API_BASE_URL;
}

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);