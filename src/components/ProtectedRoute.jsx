import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { checkAuth } from '../utils/auth';



const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            const { isAuthenticated } = await checkAuth();
            setIsAuthenticated(isAuthenticated);
            if (!isAuthenticated) {
                navigate('/login');
            }
        };
        verifyAuth();
    }, [navigate]);

    if (isAuthenticated === null) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;