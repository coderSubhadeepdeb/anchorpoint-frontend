import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
        <header className=" left-0 w-full bg-white border-b border-white/20 z-50 shadow-md">
                        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-center">        
                                <div className="hidden md:flex items-center gap-10 text-md">
                                    <Link className="text-gray-500 hover:text-gray-700 " to="all">
                                        All
                                    </Link>
                                    <Link className="text-gray-500 hover:text-gray-700 " to="residential">
                                        Residential
                                    </Link>
                                    <Link className="text-gray-500 hover:text-gray-700 " to="commercial">
                                        Commercial
                                    </Link>
                                    <Link className="text-gray-500 hover:text-gray-700 " to="architectural">
                                        Architectural
                                    </Link>
                                    <Link className="text-gray-500 hover:text-gray-700 " to="others">
                                        Others
                                    </Link>
                                </div>
        
                                <div className="flex items-center gap-4">
        
                                    {/* Mobile Menu Button */}
                                    <div className="md:hidden absolute right-4">
                                        <button
                                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                            className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
        
                            {/* Mobile Menu Dropdown */}
                            {mobileMenuOpen && (
                                <div className="md:hidden mt-2 bg-white shadow-lg rounded-md p-4 space-y-3">
                                    <Link className="block text-gray-700 hover:text-gray-900" to="all" onClick={() => setMobileMenuOpen(false)}>
                                        All
                                    </Link>
                                    <Link className="block text-gray-700 hover:text-gray-900" to="residential" onClick={() => setMobileMenuOpen(false)}>
                                        Residential
                                    </Link>
                                    <Link className="block text-gray-700 hover:text-gray-900" to="commercial" onClick={() => setMobileMenuOpen(false)}>
                                        Commercial
                                    </Link>
                                    <Link className="block text-gray-700 hover:text-gray-900" to="architectural" onClick={() => setMobileMenuOpen(false)}>
                                        Architectural
                                    </Link>
                                    <Link className="block text-gray-700 hover:text-gray-900" to="others" onClick={() => setMobileMenuOpen(false)}>
                                        Others
                                    </Link>
                                </div>
                            )}
                        </div>
        </header>
    </div>
  )
}

export default ProjectHeader
