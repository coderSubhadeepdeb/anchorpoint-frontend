import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectCard from './ProjectCard';

const api = axios.create({
    baseURL: 'https://anchorpoint-api.onrender.com',  // Replace with your backend URL
    withCredentials: true // Automatically sends cookies
});

const ProjectsByCategory = ({ category }) => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/v1/projects/category/${category}`);
                
                if (response.data.success) {
                    setProjects(response.data.data);
                } else {
                    setProjects([]);
                    toast.warning(`No projects found in ${category} category`);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err.message);
                setProjects([]);
                toast.error(`Failed to load ${category} projects`);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [category]);

    const handleDelete = async (projectId) => {
        try {
            const projectToDelete = projects.find(p => p._id === projectId);
            
            const toastId = toast.loading(`Deleting "${projectToDelete?.title}"...`, {
                autoClose: false
            });

            const response = await api.delete(`/api/v1/projects/${projectId}`);
            
            if (response.data.success) {
                setProjects(prevProjects => 
                    prevProjects.filter(project => project._id !== projectId)
                );
                toast.update(toastId, {
                    render: `"${projectToDelete.title}" deleted successfully`,
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000
                });
            } else {
                toast.update(toastId, {
                    render: `Failed to delete "${projectToDelete.title}"`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000
                });
            }
        } catch (err) {
            console.error('Error deleting project:', err);
            const projectToDelete = projects.find(p => p._id === projectId);
            toast.update(projectId, {
                render: `Error deleting "${projectToDelete?.title || 'project'}"`,
                type: 'error',
                autoClose: 3000
            });
        }
    };

    // Don't render the component if there are no projects
    if (!loading && projects.length === 0) {
        return null;
    }


    if (loading) {
        return (
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
                <div className="flex space-x-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-200 rounded-lg w-64 h-80 animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="p-4 mb-8">
            <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
            
            <div className="relative">
                <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-4 w-max">
                        {projects.map((project) => (
                            <div key={project._id} className="w-64 flex-shrink-0">
                                <ProjectCard 
                                    project={project} 
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsByCategory;

