import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const api = axios.create({
    baseURL: 'https://anchorpoint-api.onrender.com',  // Replace with your backend URL
    withCredentials: true // Automatically sends cookies
});

const ImageUploadForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'residential',
        images: []
    });
    const [previewImages, setPreviewImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const categories = [
        { value: 'residential', label: 'Residential Interior' },
        { value: 'commercial', label: 'Commercial Interior' },
        { value: 'architectural', label: 'Architectural Projects' },
        { value: 'others', label: 'Others' }
    ];

    const handleInputChange = (e) => {
    const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
    
        // Filter for allowed file types
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const validFiles = files.filter(file => allowedTypes.includes(file.type));
    
        // Check if adding these files would exceed the 15 image limit
        if (formData.images.length + validFiles.length > 15) {
            toast.error('You can upload a maximum of 15 images');
            return;
        }
    
        // Add new files to existing ones
        const newImages = [...formData.images, ...validFiles];
        setFormData({
            ...formData,
            images: newImages
        });
    
        // Create preview URLs
        const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...newPreviewUrls]);
    };

    const removeImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
            setFormData({
            ...formData,
            images: newImages
        });
    
        const newPreviews = [...previewImages];
        URL.revokeObjectURL(newPreviews[index]); // Clean up memory
        newPreviews.splice(index, 1);
        setPreviewImages(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.title || !formData.description || !formData.category) {
            toast.error('Please fill all required fields');
            return;
        }

        if (formData.images.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        setIsSubmitting(true);


        try {
            // Create FormData for file upload
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
      
            // Append all images
            formData.images.forEach((image) => {
                formDataToSend.append('images', image);
            });

        // Make API call
        const response = await api.post('/api/v1/projects/add', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true // Important for cookies/auth
        });

        if (response.data.success) {
            toast.success('Project created successfully!');
        
            // Reset form after successful submission
            setFormData({
            title: '',
            description: '',
            category: 'residential',
            images: []
            });
            setPreviewImages([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            toast.error(response.data.message || 'Failed to create project');
        }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response?.data?.message || 'An error occurred while submitting the form');
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-8 ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Submission Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter project title"
              />
            </div>
            
            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Describe your project..."
              />
            </div>
            
            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images (Max 15) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload images</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG, WEBP up to 15 images
                  </p>
                </div>
              </div>
              
              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Images ({previewImages.length}/15)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadForm;