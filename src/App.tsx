import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Services from './pages/Services';

function App() {
  // Estado Global del Idioma
  const [lang, setLang] = useState<'es' | 'en'>('es');

  // Función para cambiar idioma
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col selection:bg-red-100 selection:text-red-900">
        
        {/* Pasamos el idioma y la función al Navbar */}
        <Navbar lang={lang} toggleLang={toggleLang} />
        
        <div className="flex-1">
            <Routes>
                {/* Pasamos 'lang' a las páginas que lo necesiten */}
                <Route path="/" element={<Home lang={lang} />} /> 
                <Route path="/tienda" element={<Shop lang={lang} />} />
                <Route path="/servicios" element={<Services lang={lang} />} />
            </Routes>
        </div>

        <Footer text={lang === 'es' ? "© 2025 PLANTAS ELÉCTRICAS Y TRANSPORTES S.A.S. Todos los derechos reservados." : "© 2025 POWER PLANTS AND TRANSPORT S.A.S All rights reserved."} />
        <WhatsAppBtn lang={lang} />

      </div>
    </BrowserRouter>
  );
}

export default App;