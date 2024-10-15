import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('index.tsx: Starting to render the app');

const rootElement = document.getElementById('root');
console.log('index.tsx: Root element:', rootElement);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('index.tsx: App rendered');
} else {
  console.error('Root element not found');
}
