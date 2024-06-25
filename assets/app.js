import React from 'react'
import { createRoot } from 'react-dom/client';
import './styles/app.css';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import AboutUS from './Pages/AboutUS';
import Prices from './Pages/Prices';
import LoginPage from './Pages/LoginPage';
import authAPI from './Services/authAPI';

authAPI.setup();


export default function App() {
    return (
      <HashRouter>
        <Navbar/>
        <main className="container pt-5">
          <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/aboutUs" element={<AboutUS/>} />
            <Route path="/prices" element={<Prices/>} />
            <Route path="/" element={<Homepage/>} />
          </Routes>
        </main>
      </HashRouter>
    )
  }

const container = document.querySelector('#app');
const root = createRoot(container);
root.render(<App />);
    
  