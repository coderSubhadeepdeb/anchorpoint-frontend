import React from 'react'
import ProjectHeader from './ProjectHeader'
import { Routes, Route } from 'react-router-dom'
import AllProjects from './AllProjects'
import ResidentialProj from './ResidentialProj'
import CommercialProj from './CommercialProj'
import ArchProj from './ArchProj'
import OtherProj from './OtherProj'

const ProjectMain = () => {
  return (
    <div>
        <ProjectHeader/>
        <Routes>
                
            <Route path="all" element={<AllProjects />} />
            <Route path="residential" element={<ResidentialProj />} />
            <Route path="commercial" element={<CommercialProj/>} />
            <Route path="architectural" element={<ArchProj/>} />
            <Route path="others" element={<OtherProj/>} />
        </Routes>
    </div>
  )
}

export default ProjectMain
