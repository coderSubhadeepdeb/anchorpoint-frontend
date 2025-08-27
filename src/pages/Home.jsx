import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Byline from '../components/Byline';
import Img1 from "../images/Ongoing1.png";
import Img2 from "../images/Ongoing2.png";
import Img3 from "../images/Completed1.png";
import { Ongoing } from '../components/Ongoing';
import TeamSection from '../components/Teams';
// import { AnimatedTestimonials } from '../components/AnimatedTestimonials';

const Home = () => {

    const slides = [
    {
      src:"https://res.cloudinary.com/dtvm7xvmo/image/upload/v1756070478/IMG_20250708_112449_inj0tk.jpg",
      title: "MANÉ Salon ",
      status: "Completed",
      button: "See More",
    },
    {
      src: "https://res.cloudinary.com/dtvm7xvmo/image/upload/v1756070414/IMG_20250708_112532_gozqk6.jpg",
      title: "1BHK in Shivaji Nagar",
      status: "Completed",
      button: "See More",
    },
    {
      src: "https://res.cloudinary.com/dtvm7xvmo/image/upload/v1756070526/IMG_20250708_112058_abjwt1.jpg",
      title: "2BHK in Cuffe Parade",
      status: "Pitching",
      button: "See More",
    },

  ];

  return (
    <div>
        <div className='relative'>

        <Carousel />
        <Byline />
        {/* <AnimatedTestimonials autoplay={true}
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
        /> */}

        <div className='w-100vw text-black flex justify-center'>
          <h1 className='text-xl md:text-3xl lg:text-5xl font-semibold mb-6 py-10'>Our Recent Projects</h1>
        </div>
        <div className='"relative overflow-hidden w-full h-full py-20"'>
          <Ongoing slides={slides} />
        </div>
        <TeamSection />
      </div>
    </div>
  );
};

export default Home;
