import React from 'react'
import { createRoot } from 'react-dom/client';
import './styles/app.css';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';

export default function App() {
    return (
      <>
      <Navbar/>
      <div className="container pt-5">
        <Homepage/>
      </div>
      </>
    )
  }

const container = document.querySelector('#app');
const root = createRoot(container);
root.render(<App />);
    
  