import React from 'react';
import { motion } from 'framer-motion';

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Harshita Raghava",
      role: "Chief Architect",
      image: "https://res.cloudinary.com/dtvm7xvmo/image/upload/v1756308061/Harshitha_Raghava_nsdx7d.jpg"
    },
    {
      name: "Harsita Baruah",
      role: "Interior Designer",
      image: "https://res.cloudinary.com/dtvm7xvmo/image/upload/v1756308061/Harsita_Baruah_hr5jpc.png"
    },
    {
      name: "Amogh Mahimkar",
      role: "3D Visualizer",
      image: "https://res.cloudinary.com/dtvm7xvmo/image/upload/v1756308063/Amogh_Mahimkar_ixyqa8.png"
    },
    {
      name: "Tejaswini Prakash Naik",
      role: "Architectural Designer",
      image: "https://res.cloudinary.com/dtvm7xvmo/image/upload/v1756308060/Tejaswini_Naik_xag287.jpg"
    },
    {
      name: "Yasmine Tano",
      role: "Architectural Planner",
      image: "https://res.cloudinary.com/dtvm7xvmo/image/upload/v1756308061/Somya_Chheda_gskdhq.png"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-manrope text-5xl font-bold text-gray-900">
            Our team
          </h2>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* First row with 3 members */}
          <motion.div 
            className="flex flex-wrap justify-center gap-15 md:gap-18 lg:gap-20 mb-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {teamMembers.slice(0, 3).map((member, index) => (
              <motion.div 
                key={index} 
                className="group text-center w-[200px]"
                variants={itemVariants}
              >
                <div className="relative mb-6">
                  <motion.img
                    src={member.image}
                    alt={`${member.name} image`}
                    className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border-2 border-transparent group-hover:border-blue-200"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 group-hover:text-gray-700">
                  {member.name}
                </h4>
                <span className="text-gray-500 transition-all duration-500 group-hover:text-gray-900">
                  {member.role}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row with 2 members */}
          <motion.div 
            className="flex flex-wrap justify-center gap-10 md:gap-12 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {teamMembers.slice(3, 5).map((member, index) => (
              <motion.div 
                key={index + 3} 
                className="group text-center w-[200px]"
                variants={itemVariants}
              >
                <div className="relative mb-6">
                  <motion.img
                    src={member.image}
                    alt={`${member.name} image`}
                    className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border-2 border-transparent group-hover:border-blue-200"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 group-hover:text-gray-700">
                  {member.name}
                </h4>
                <span className="text-gray-500 transition-all duration-500 group-hover:text-gray-900">
                  {member.role}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}