import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploadForm from "../components/AdminForm"
import ProjectsByCategory from "../components/ProjectsByCategory";

const api = axios.create({
    baseURL: 'https://anchorpoint-api.onrender.com',
    withCredentials: true
});

const Admin = () => {

    const categories = ['residential', 'commercial', 'architectural', 'others'];
    const adminData = localStorage.getItem('admin');
    const accessToken = localStorage.getItem('accessToken');
    const admin = adminData ? JSON.parse(adminData) : null;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Make logout request to backend
            const response = await api.post('/api/v1/admins/logout',
                {}, // empty body
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            
            // Clear local storage
            localStorage.removeItem('admin');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            
            // Clear cookies by setting expired date
            document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            
            // Show success message
            toast.success('Logged out successfully');
            
            // Redirect to login page
            navigate('/login');
            
        } catch (error) {
            console.error('Logout error:', error);
            const errorMessage = error.response?.data?.message || 'Logout failed. Please try again.';
            toast.error(errorMessage);
            
            // If logout failed but we want to force clear client-side state
            localStorage.removeItem('admin');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
        }
    };

    return(
    <> 
        <div className="w-full p-4 mt-16 space-y-6">
            <div className="w-full min-h-[200px] rounded-xl shadow-md p-6 flex items-center justify-center flex-col mx-auto max-w-7xl border-1 border-gray-300 gap-3">
                <div className="text-4xl font-bold text-gray-500"> Welcome back to the Admin Panel</div>
                <div className="flex flex-col bg-gray-100 lg:flex-row gap-6 w-auto max-w-7xl  overflow-hidden rounded-lg shadow-md p-1 lg:p-6 justify-center items-center">
                        <div className="flex flex-col justify-center content-center gap-3 p-3 bg-white rounded-lg">
                            <div className="text-gray-500 text-lg lg:text-xl font-bold text-center">Admin Information</div>
                            <div className="flex flex-col justify-start content-center px-3">
                                <span className="text-gray-500 text-md lg:text-lg text-center">Admin ID : {admin?.username || 'Not available'}</span>
                                <span className="text-gray-500 text-md lg:text-lg text-center">Admin Email : {admin?.email || 'Not available'}</span>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-40 h-10">
                                <button className="w-full h-full rounded-lg bg-gray-500 text-white hover:bg-gray-700 hover:text-gray-300 text-center"
                                onClick={handleLogout}
                                >Log Out
                                </button>
                        </div>
                </div>
                 
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto overflow-hidden">
                {/* Form section - takes full width on mobile, half on desktop */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-xl overflow-hidden">
                        <ImageUploadForm/>
                    </div>
                </div>

                {/* Projects section - takes full width on mobile, half on desktop */}
                <div className="w-full lg:w-1/2 p-5 bg-gray-50 rounded-lg  ">
                    <div className="w-full space-y-6 overflow-y-auto max-h-full lg:max-h-170     shadow-lg rounded-xl p-6 ">
                        {categories.map((category) => (
                            <ProjectsByCategory 
                                key={category} 
                                category={category} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Admin;