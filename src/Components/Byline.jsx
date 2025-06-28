import React from 'react'
import fileImage from '../Images/file.svg';
const Byline = () => {
    return (
        <div className="text-black w-full px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-6">
                    Your One-Stop Destination to Bring Every Vision to Life.
                </h1>

                <div className="flex justify-center mb-6">
                    <img src={fileImage} className="w-24 sm:w-32 md:w-40 h-auto" alt="File Icon" />
                </div>

                <p className="w-full max-w-2xl mx-auto text-center px-4 sm:px-6 py-4 text-sm md:text-base lg:text-lg bg-white rounded-lg shadow-md">
                    At AnchorPoint, we believe in turning your ideas into reality. Our team of passionate and creative designers is here to guide you through every step of the process, bringing your vision to life with care, expertise, and a personal touch. Whether you’re looking to design a new space or transform an existing one, we’re excited to collaborate with you and make your dreams come true. Let’s create something amazing together!
                </p>
            </div>
        </div>


    )
}

export default Byline
