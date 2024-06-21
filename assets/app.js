import React from 'react'
import { createRoot } from 'react-dom/client';
import './styles/app.css';

export default function App() {
    return (
      <h1>Bonjour à tous</h1>
    )
  }

  const container = document.querySelector('#app');
  const root = createRoot(container);
  root.render(<App />);
    
  