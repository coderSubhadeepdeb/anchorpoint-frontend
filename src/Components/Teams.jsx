import React from 'react'

export default function TeamSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-manrope text-5xl font-bold text-gray-900">
            Our team
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-12 lg:gap-16">
          {[
            {
              name: "Antonio Roberto",
              role: "Chief Architect",
              image: "https://pagedone.io/asset/uploads/1696238374.png"
            },
            {
              name: "Patricia Angely",
              role: " Architectural Visualiser",
              image: "https://pagedone.io/asset/uploads/1696238396.png"
            },
            {
              name: "Harshita Baruah",
              role: " Architectural Designer",
              image: "https://pagedone.io/asset/uploads/1696238411.png"
            },
            {
              name: "Yasmine Tano",
              role: "Architectural Designer",
              image: "https://pagedone.io/asset/uploads/1696238425.png"
            }
          ].map((member, index) => (
            <div key={index} className="group text-center w-[200px]">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={`${member.name} image`}
                  className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border-2 border-transparent group-hover:border-indigo-600"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 group-hover:text-indigo-600">
                {member.name}
              </h4>
              <span className="text-gray-500 transition-all duration-500 group-hover:text-gray-900">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}