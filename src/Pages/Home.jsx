import React from 'react'
import Header from '../Components/Header'
import Carousel from '../Components/Carousel'
import { AnimatedTestimonials} from '../Components/AnimatedTestimoials'
import Byline from '../Components/Byline'
import Img1 from "../Images/Ongoing1.png";
import Img2 from "../Images/Ongoing2.png";
import Img3 from "../Images/Completed1.png";

import { Ongoing } from '../Components/Ongoing';
import TeamSection from '../Components/Teams'
const Home = () => {
  const slides = [
    {
      src: Img1,
      title: "Boho Luxe",
      status:"Ongoing",
      button: "See More",
    },
    {
      src: Img2,
      title: "Eager Beavers",
      status:"Ongoing",
      button: "See More",
    },
    {
      src: Img3,
      title: "The Earth Haven",
      status:"Completed",
      button: "See More",
    },
 
  ];
  return (
    <>
    
    <Header/>
    <Carousel/>
     <Byline/>
    <AnimatedTestimonials autoplay={true}
        testimonials={[
          {
            name: "Satya Nandella",
            designation: "UI Designer",
            quote: "I recently hired this interior design service, and I couldn’t be happier with the results! The team was incredibly professional and attentive, taking the time to understand my style and needs. They transformed my space into something beautiful and functional, with amazing attention to detail. Highly recommend!",
            src: "https://fortune.com/img-assets/wp-content/uploads/2024/05/SN_02-Gray-Table_00198.jpg?w=1440&q=75",
          },
          {
            name: "Sundar Pichai",
            designation: "Frontend Dev",
            quote: "I recently hired this interior design service, and I couldn’t be happier with the results! The team was incredibly professional and attentive, taking the time to understand my style and needs. They transformed my space into something beautiful and functional, with amazing attention to detail. Highly recommend!",
            src: "https://ztd-euwest2-prod-s3.s3.eu-west-2.amazonaws.com/sundar_4e29dcb79b.jpg",
          },
          {
            name: "Jhonny Dep",
            designation: "CEO Help",
            quote: "I recently hired this interior design service, and I couldn’t be happier with the results! The team was incredibly professional and attentive, taking the time to understand my style and needs. They transformed my space into something beautiful and functional, with amazing attention to detail. Highly recommend!",
            src: "https://hips.hearstapps.com/hmg-prod/images/actor-johnny-depp-attends-the-jeanne-du-barry-photocall-at-news-photo-1685634329.jpg?crop=1.00xw:0.669xh;0,0.0477xh&resize=640:*",
          },
        ]}
        />
    <TeamSection/>
    <div className='w-100vw text-black flex justify-center'>
      <h1 className='text-xl md:text-3xl lg:text-5xl font-semibold mb-6 py-10'>Our Recent Projects</h1>
    </div>
    <div className='"relative overflow-hidden w-full h-full py-20"'>
    <Ongoing slides={slides}/>
    </div>
        
    
       
        
    </>
    
  )
}

export default Home
