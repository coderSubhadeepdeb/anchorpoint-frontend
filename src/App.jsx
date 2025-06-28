import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/HOme";
import Projectsnew from "./Pages/Projectsnew";
import FinalGallery from "./Pages/FInalGallery";
import TeamPage from "./Pages/Teams";

function App() {
  return (
    <Router>
      <Header />
      <div> {/* Padding for fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projectsnew" element={<Projectsnew />} />
          <Route path="/finalgallery" element={<FinalGallery />} />
          <Route path="/teams" element={<TeamPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;