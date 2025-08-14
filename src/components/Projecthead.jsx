import React from 'react';
import image from '../images/Headproj.jpg';

const Projecthead = () => {
  return (
    <div
            className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat py-12 text-center"
            style={{ backgroundImage: `url('${image}')`, height: "450px" }}
        >
            <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                <div className="flex h-full items-center justify-center">
                    <div className="text-white">
                        <h2 className="mb-4 text-4xl lg:text-6xl font-semibold">Projects</h2>
                        
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Projecthead
