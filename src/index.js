// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for the quiz
import App from './App'; // Your main Quiz App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App /> {/* Our Quiz App */}
    </React.StrictMode>
);