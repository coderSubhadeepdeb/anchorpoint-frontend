import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    
    return (  
        <>  
            <Header/>
            <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Navigate to="/login" replace />} />
                <Route path="/teams" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
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
