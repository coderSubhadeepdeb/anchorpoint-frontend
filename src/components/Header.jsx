import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactPopup from '../pages/ContactUs';
import fileImage from '../images/file.svg';

const Header = () => {
    const [showContact, setShowContact] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll detection for a more compact header on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuOpen && !event.target.closest('.mobile-menu-button, .mobile-menu')) {
                setMobileMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen]);

    return (
        <div>
            <header className={`fixed top-0 left-0 w-full bg-white border-b transition-all duration-300 z-50 ${isScrolled ? 'py-2 shadow-lg' : 'py-0 shadow-md'}`}>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                className="flex items-center gap-2 text-grey-600"
                                to="/"
                            >
                                <img
                                    src={fileImage}
                                    className="w-8 h-auto sm:w-10 md:w-12"
                                    alt="File Icon"
                                />
                                <span className="text-lg sm:text-xl font-montserrat font-bold text-gray-800">
                                    Anchorpoint
                                </span>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-md">
                            <Link className="text-gray-600 hover:text-gray-900 transition-colors" to="/">
                                Home
                            </Link>
                            <Link className="text-gray-600 hover:text-gray-900 transition-colors" to="/projects">
                                Projects
                            </Link>
                            <Link className="text-gray-600 hover:text-gray-900 transition-colors" to="/teams">
                                Our Team
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowContact(true)}
                                className="hidden sm:inline-block rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 transition-colors"
                            >
                                Contact Us
                            </button>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden mobile-menu-button">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="rounded-md bg-gray-100 p-2 text-gray-600 transition hover:text-gray-900"
                                    aria-label="Toggle menu"
                                >
                                    {mobileMenuOpen ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mobile-menu mt-2 bg-white shadow-lg rounded-md p-4 space-y-3 border border-gray-200">
                            <Link 
                                className="block text-gray-700 hover:text-gray-900 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" 
                                to="/" 
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                className="block text-gray-700 hover:text-gray-900 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" 
                                to="/projects" 
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Projects
                            </Link>
                            <Link 
                                className="block text-gray-700 hover:text-gray-900 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" 
                                to="/teams" 
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Our Team
                            </Link>
                            <button
                                onClick={() => {
                                    setShowContact(true);
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full text-left py-2 px-3 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                Contact Us
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Contact Popup */}
            {showContact && <ContactPopup onClose={() => setShowContact(false)} />}
        </div>
    );
};

export default Header;