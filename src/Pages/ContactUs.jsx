"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const ContactUs = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-4 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Contact Info Section - Stack on mobile, column on desktop */}
            <div className="bg-gray-50 md:col-span-5 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Get In <span className="text-teal-600">Touch</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Have questions or want to discuss a project? Reach out to us.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    icon: (
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    ),
                    title: "Our Office",
                    text: "123 Business Ave, Suite 100"
                  },
                  {
                    icon: (
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    ),
                    title: "Email Us",
                    text: "contact@llpworkshop.com"
                  },
                  {
                    icon: (
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    ),
                    title: "Call Us",
                    text: "+1 (555) 123-4567"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                        {item.icon}
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-7 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Send us a message</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      {...register("firstName", { required: "First name is required" })}
                      id="firstName"
                      type="text"
                      className={`w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-teal-500 focus:border-teal-500`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      {...register("lastName", { required: "Last name is required" })}
                      id="lastName"
                      type="text"
                      className={`w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-teal-500 focus:border-teal-500`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    id="email"
                    type="email"
                    className={`w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    id="message"
                    rows={3}
                    className={`w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    {...register("newsletter")}
                    id="newsletter"
                    type="checkbox"
                    className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-xs sm:text-sm text-gray-700">
                    Subscribe to our newsletter
                  </label>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex justify-between items-center">
                {isSubmitSuccessful && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs sm:text-sm text-green-600"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactUs;