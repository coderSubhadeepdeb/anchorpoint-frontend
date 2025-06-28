import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactPopup from '../Pages/ContactUs';
import fileImage from '../Images/file.svg';

const Header = () => {
    const [showContact, setShowContact] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white border-b border-white/20 z-50 shadow-md">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                className="flex items-center gap-2 text-grey-600 dark:text-white"
                                to="/"
                            >
                                <img
                                    src={fileImage}
                                    className="w-10 h-auto sm:w-12 md:w-14 lg:w-18 xl:w-24"
                                    alt="File Icon"
                                />
                                <span className="text-lg sm:text-xl font-montserrat font-bold text-gray-800">
                                    Anchorpoint
                                </span>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center gap-10 text-md">
                            <Link className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white/75" to="/">
                                Home
                            </Link>
                            <Link className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white/75" to="/finalgallery">
                                Projects
                            </Link>
                            <Link className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white/75" to="/teams">
                                Our Team
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowContact(true)}
                                className="hidden sm:inline-block rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-600 transition-colors"
                            >
                                Contact Us
                            </button>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
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
                            <Link className="block text-gray-700 hover:text-gray-900" to="/" onClick={() => setMobileMenuOpen(false)}>
                                Home
                            </Link>
                            <Link className="block text-gray-700 hover:text-gray-900" to="/finalgallery" onClick={() => setMobileMenuOpen(false)}>
                                Projects
                            </Link>
                            <Link className="block text-gray-700 hover:text-gray-900" to="/teams" onClick={() => setMobileMenuOpen(false)}>
                                Our Team
                            </Link>
                            <button
                                onClick={() => {
                                    setShowContact(true);
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full text-left text-gray-700 hover:text-gray-900"
                            >
                                Contact Us
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Contact Popup */}
            {showContact && <ContactPopup onClose={() => setShowContact(false)} />}
        </>
    );
};

export default Header;
