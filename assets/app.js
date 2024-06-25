import React ,{useState} from 'react'
import { createRoot } from 'react-dom/client';
import './styles/app.css';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import AboutUS from './Pages/AboutUSPage';
import Prices from './Pages/PricesPage';
import LoginPage from './Pages/LoginPage';
import authAPI from './Services/authAPI';
import AdminRedirect from './Components/AdminRedirect';
import ContactFormPage from './Pages/ContactFormPage';
import axios from 'axios';

authAPI.setup();
axios.defaults.headers["Content-Type"] = "application/ld+json ";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());

    return (
      <HashRouter>
        <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
        <main className="container pt-5">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={setIsAuthenticated} />} />
            <Route path="/admin" element={isAuthenticated ? <AdminRedirect/>: <Navigate to="/login"/>}/>
            <Route path="/aboutUs" element={<AboutUS/>}/>
            <Route path="/contactForm" element={<ContactFormPage/>}/>
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
    
  