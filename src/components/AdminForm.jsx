import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: 'https://anchorpoint-api.onrender.com',
  withCredentials: true
});

const ImageUploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'residential',
    videoLink: '',
    images: [],
    imageTitles: [],
    imageDescriptions: []
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
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const validFiles = files.filter(file => allowedTypes.includes(file.type));

    if (formData.images.length + validFiles.length > 50) {
      toast.error('You can upload a maximum of 50 images');
      return;
    }

    const newImages = [...formData.images, ...validFiles];
    const newImageTitles = [...formData.imageTitles, ...Array(validFiles.length).fill('')];
    const newImageDescriptions = [...formData.imageDescriptions, ...Array(validFiles.length).fill('')];
    
    setFormData({
      ...formData,
      images: newImages,
      imageTitles: newImageTitles,
      imageDescriptions: newImageDescriptions
    });

    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);

  };
  

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    const newImageTitles = [...formData.imageTitles];
    newImageTitles.splice(index, 1);
    
    const newImageDescriptions = [...formData.imageDescriptions];
    newImageDescriptions.splice(index, 1);
    
    setFormData({
      ...formData,
      images: newImages,
      imageTitles: newImageTitles,
      imageDescriptions: newImageDescriptions
    });

    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleImageMetadataChange = (index, field, value) => {
    if (field === 'title') {
      const newImageTitles = [...formData.imageTitles];
      newImageTitles[index] = value;
      setFormData({
        ...formData,
        imageTitles: newImageTitles
      });
    } else if (field === 'description') {
      const newImageDescriptions = [...formData.imageDescriptions];
      newImageDescriptions[index] = value;
      setFormData({
        ...formData,
        imageDescriptions: newImageDescriptions
      });
    }
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
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('videoLink', formData.videoLink || "");
      formDataToSend.append('imageTitles', JSON.stringify(formData.imageTitles));
      formDataToSend.append('imageDescriptions', JSON.stringify(formData.imageDescriptions));
  
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      const response = await api.post('/api/v1/projects/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (response.data.success) {
        toast.success('Project created successfully!');
        setFormData({
          title: '',
          description: '',
          category: 'residential',
          videoLink: '',
          images: [],
          imageTitles: [],
          imageDescriptions: []
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Submission Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
      
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
            

            <div>
              <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 mb-1">
                Video Link (Optional)
              </label>
              <input
                type="url"
                id="videoLink"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="https://youtube.com/example"
              />
              <p className="text-xs text-gray-500 mt-1">
                Add a link to a video showcase (YouTube, Vimeo, etc.)
              </p>
            </div>
            
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images (Max 50) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
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
                    PNG, JPG, JPEG, WEBP up to 50 images
                  </p>
                </div>
              </div>
              
              {/* Image Previews with Metadata */}
              {previewImages.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Image Details ({previewImages.length}/50)</h3>
                  <div className="space-y-6">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-1/3">
                            <div className="relative group">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="h-48 w-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                &times;
                              </button>
                            </div>
                          </div>
                          <div className="md:w-2/3 space-y-4">
                            <div>
                              <label htmlFor={`image-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Image Title
                              </label>
                              <input
                                type="text"
                                id={`image-title-${index}`}
                                value={formData.imageTitles[index] || ''}
                                onChange={(e) => handleImageMetadataChange(index, 'title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Enter image title"
                              />
                            </div>
                            <div>
                              <label htmlFor={`image-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Image Description
                              </label>
                              <textarea
                                id={`image-description-${index}`}
                                value={formData.imageDescriptions[index] || ''}
                                onChange={(e) => handleImageMetadataChange(index, 'description', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Describe this image..."
                              />
                            </div>
                          </div>
                        </div>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
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