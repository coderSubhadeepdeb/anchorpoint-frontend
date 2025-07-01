import React from 'react';
import { motion } from 'framer-motion';
import Img1 from "../Images/Teams.jpg"; // Adjust the path as necessary

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const TeamPage = () => {
    const teamMembers = [
        {
            name: "Harshitha Raghava",
            role: "Chief Architect",
            bio: "With 12 years of experience in sustainable design, Harshitha leads our architectural vision. She holds a Master's in Architecture from ETH Zurich and has worked on award-winning projects across Europe and Asia. Her approach blends traditional techniques with innovative materials to create spaces that stand the test of time.",
            expertise: ["Sustainable Design", "Project Leadership", "Historical Preservation"],
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Harsita. Baruah",
            role: "Architectural Designer",
            bio: "Specializing in residential transformations, Harstr brings a meticulous eye for detail to every project. After studying at the Architectural Association in London, he developed a signature style that balances functionality with artistic expression. His work has been featured in 8 international design publications.",
            expertise: ["Residential Design", "Space Planning", "Material Innovation"],
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Amogh Mahimkar",
            role: "Architectural Visualizer",
            bio: "Amogh's photorealistic renderings help clients envision spaces before construction begins. A graduate of SCI-Arc's digital design program, he combines technical precision with artistic flair. His visualization workflow incorporates VR technology for immersive client experiences.",
            expertise: ["3D Rendering", "VR Walkthroughs", "Lighting Simulation"],
            image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Tejaswini Prakash Naik",
            role: "Architectural Designer",
            bio: "Tejaswini's expertise in adaptive reuse transforms forgotten structures into vibrant community spaces. With dual degrees in Architecture and Urban Planning, she approaches each project considering both micro and macro environmental impacts. Her designs have revitalized 14 historic buildings across India.",
            expertise: ["Adaptive Reuse", "Urban Planning", "Community Engagement"],
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        }
    ];

    return (
        
        <div className="min-h-screen bg-white relative overflow-hidden">
            
            
    
            <div
                className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat py-12 text-center"
                style={{ backgroundImage: `url('${Img1}')`, height: "400px" }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    <div className="flex h-full items-center justify-center">
                        <div className="text-white">
                            <h2 className="mb-4 text-4xl lg:text-6xl font-semibold">Our Team</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 text-center">
                <div className="relative">
                    <svg className="absolute -top-8 left-1/2 -translate-x-1/2 h-16 w-16 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                </div>

                <div className="mt-10 max-w-2xl mx-auto relative">
                    <p className="text-lg leading-8 text-gray-600 relative">
                        <svg className="absolute -left-8 -top-4 h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                        </svg>
                        AnchorPoint was created by five friends who shared a passion for architecture and design. What started as casual conversations among us quickly turned into a dream to create meaningful, inspiring spaces. With our unique strengths and a deep love for what we do, we decided to team up and bring our creative visions to life through our projects. At AnchorPoint, we believe in the power of collaboration, turning ideas into reality with passion and teamwork.
                        <svg className="absolute -right-8 -bottom-4 h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                        </svg>
                    </p>
                </div>
            </div>

      
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="relative max-w-7xl mx-auto px-6 pb-32 lg:px-8"
            >
                <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-16">
                    MEET OUR TEAM
                </motion.h2>

                <motion.div variants={containerVariants} className="grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                    {teamMembers.map((member) => (
                        <motion.div 
                            key={member.name} 
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="group relative flex flex-col items-center text-center"
                        >
                        
                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-200 transition-all duration-300 mb-6">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="mt-2 px-4">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">{member.role}</p>
                                <p className="mt-4 text-base text-gray-600">{member.bio}</p>
                                <div className="mt-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Expertise</h4>
                                    <div className="mt-2 flex flex-wrap gap-2 justify-center">
                                        {member.expertise.map((skill) => (
                                            <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-500">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

        
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                className="relative bg-gray-50 py-24 sm:py-32"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-16 top-full -translate-y-1/2 transform-gpu opacity-50 blur-3xl">
                        <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#303030] to-[#f6f6f7]"></div>
                    </div>
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-16">
                            OUR DESIGN PHILOSOPHY
                        </motion.h2>
                        <motion.div variants={containerVariants} className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                            {[
                                {
                                    name: "Contextual Harmony",
                                    description: "We design structures that converse with their surroundings, respecting local materials and cultural narratives while introducing contemporary functionality."
                                },
                                {
                                    name: "Human-Centered",
                                    description: "Every curve and corner serves human experience first - creating spaces that feel instinctively right for their intended use and users."
                                },
                                {
                                    name: "Sustainable Futures",
                                    description: "Our projects embed ecological responsibility, using renewable materials and energy-positive systems that reduce environmental impact."
                                }
                            ].map((item) => (
                                <motion.div 
                                    key={item.name} 
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.03 }}
                                    className="flex flex-col bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-0.5 w-8 bg-blue-600"></div>
                                        <h3 className="ml-4 text-lg font-medium leading-6 text-gray-900">{item.name}</h3>
                                    </div>
                                    <div className="mt-4 flex-grow">
                                        <p className="text-base text-gray-600">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TeamPage;