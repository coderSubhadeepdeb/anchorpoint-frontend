import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    
    return (  
        <>
            <Routes>
                
                <Route path="/" element={<Navigate to="/login" replace />} />
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
                <Route path="*" element={<Navigate to="/adminpanel" replace />} />
            </Routes>
        </>
    )
}

export default App
