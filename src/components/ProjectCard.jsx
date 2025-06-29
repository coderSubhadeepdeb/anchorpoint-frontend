const ProjectCard = ({ project, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            
        <div className="h-48 overflow-hidden">
            {project.images?.length > 0 ? (
                <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                </div>
            )}
        </div>

        <div className="p-4">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg truncate">{project.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {project.category}
                </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
            </p>

            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    {project.images?.length || 0} images
                </span>
                <button
                    onClick={() => onDelete(project._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete project"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
  );
};

export default ProjectCard;