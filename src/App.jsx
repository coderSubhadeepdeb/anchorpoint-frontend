import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import OurTeam from './pages/OurTeam';
import Projects from './pages/Projects';
import ProjectGalleryPage from './pages/ProjectImage';


const GeometricBackground = () => {
  const location = useLocation();
  

  const getOpacity = () => {
    if (location.pathname === '/login' || location.pathname.includes('/adminpanel')) {
      return 'opacity-10';
    }
    return 'opacity-20';
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-neutral-100"></div>
      
      {/* Geometric pattern - inspired by architectural blueprints */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #00000008 1px, transparent 1px),
            linear-gradient(180deg, #00000008 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      ></div>
      
      {/* Architectural image on the left side */}
      <div 
        className={`absolute left-0 top-1/4 w-48 h-64 ${getOpacity()}`}
        style={{
          backgroundImage: "url('https://i.pinimg.com/originals/e2/55/4a/e2554ae446ad1adfd760a05d7a140c9b.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
        }}
      ></div>
      
      {/* Architectural image on the right side */}
      <div 
        className={`absolute right-0 top-1/3 w-48 h-64 ${getOpacity()}`}
        style={{
          backgroundImage: "url('https://i.pinimg.com/originals/e2/55/4a/e2554ae446ad1adfd760a05d7a140c9b.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
        }}
      ></div>
      
      {/* Architectural skyline elements */}
      <div className={`absolute bottom-0 left-0 w-full h-1/3 ${getOpacity()}`}>
       
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-stone-800/10 to-transparent"></div>
        
     
        <div className="absolute bottom-0 left-5 h-32 w-16 bg-stone-700/10"></div>
        <div className="absolute bottom-0 left-28 h-40 w-20 bg-stone-700/10"></div>
        <div className="absolute bottom-0 left-56 h-24 w-14 bg-stone-700/10"></div>
        <div className="absolute bottom-0 right-20 h-36 w-16 bg-stone-700/10"></div>
        <div className="absolute bottom-0 right-40 h-28 w-22 bg-stone-700/10"></div>
        <div className="absolute bottom-0 right-60 h-32 w-18 bg-stone-700/10"></div>
        
        {/* Modern architecture elements */}
        <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 h-44 w-12 bg-stone-700/10">
          <div className="absolute top-0 left-0 w-full h-4 bg-amber-400/10"></div>
          <div className="absolute top-8 left-0 w-full h-4 bg-amber-400/10"></div>
          <div className="absolute top-16 left-0 w-full h-4 bg-amber-400/10"></div>
        </div>
       
        <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 w-0 h-0 
          border-l-[30px] border-l-transparent border-b-[50px] border-b-stone-700/10 border-r-[30px] border-r-transparent">
        </div>
      </div>
      
      {/* Floating architectural elements */}
      <div className={`absolute top-20 left-10 w-24 h-24 rotate-45 bg-stone-700/5 ${getOpacity()}`}></div>
      <div className={`absolute top-40 right-16 w-16 h-16 bg-amber-400/5 ${getOpacity()}`}></div>
      <div className={`absolute top-1/3 left-1/4 w-12 h-12 rotate-45 border border-stone-700/10 ${getOpacity()}`}></div>
      
      {/* Blueprint circles */}
      <div className={`absolute top-1/2 left-3/4 w-16 h-16 rounded-full border-2 border-stone-700/10 ${getOpacity()}`}></div>
      <div className={`absolute top-2/3 left-1/5 w-12 h-12 rounded-full border-2 border-amber-400/10 ${getOpacity()}`}></div>
      

      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0000000a 1px, transparent 1px),
            linear-gradient(to bottom, #0000000a 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
     
      <div className={`absolute top-20 right-1/4 w-0 h-0 border-r-[60px] border-r-transparent border-b-[100px] border-b-amber-400/10 border-l-[60px] border-l-transparent ${getOpacity()}`}></div>
      <div className={`absolute bottom-40 left-1/3 w-0 h-0 border-t-[80px] border-t-transparent border-r-[140px] border-r-amber-400/10 border-b-[80px] border-b-transparent ${getOpacity()}`}></div>
    </div>
  );
};



    

function App() {
  return (  
    <div className="min-h-screen flex flex-col">
      <GeometricBackground />
      <Header/>
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
        
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<OurTeam/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/images/:projectId" element={<ProjectGalleryPage />} />
          <Route path="/adminpanel" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;