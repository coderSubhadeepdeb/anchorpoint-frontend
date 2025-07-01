import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Projectsnew from "./Pages/Projectsnew";
import FinalGallery from "./Pages/FinalGallery";
import TeamPage from "./Pages/Teams";
import Footer from "./Components/Footer";

function App() {
    return (


        <div> 
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
              
                <Route path="/projects" element={<FinalGallery />} />
                <Route path="/teams" element={<TeamPage />} />
            </Routes>
            <Footer/>
        </div>

    );
}

export default App;