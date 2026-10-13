import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FichaPropiedad from "./pages/PropertyDetails";

import Admin from "./pages/Admin";
import NuevaPropiedad from "./pages/NewProperty";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import ScrollManager from "./components/ScrollManager"; // <-- Importamos el ScrollManager

function App() {
  const isProd = import.meta.env.MODE === 'production';
  
  return (
    <div className="flex flex-col min-h-screen text-color-white">
      <Router basename={isProd ? '/react-template-project-rs' : '/'}>
        
        {/* MAGIA ACÁ: Lo ponemos directamente adentro del Router para que escuche todo */}
        <ScrollManager />

        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>}/>
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>}/>
          <Route path="/fichaProp/:id" element={<MainLayout><FichaPropiedad /></MainLayout>}/>
          
          {/* --- Public Admin --- */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Admin Protected */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <MainLayout><Admin /></MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/nueva" element={
              <ProtectedRoute>
                <MainLayout><NuevaPropiedad /></MainLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
