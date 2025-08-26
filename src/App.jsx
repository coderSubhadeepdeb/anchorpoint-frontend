import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import OurTeam from './pages/OurTeam'
import Projects from './pages/Projects'

import ProjectGalleryPage from './pages/ProjectImage'

function App() {
    
    return (  
        <>  
            <Header/>
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
            <Footer/>
        </>
    )
}

export default App
