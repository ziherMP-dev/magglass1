import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('main.tsx: Starting to render the app');

const rootElement = document.getElementById('root');
console.log('main.tsx: Root element:', rootElement);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('main.tsx: Finished rendering the app');
} else {
  console.error('main.tsx: Root element not found');
}