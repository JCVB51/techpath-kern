import { useState } from 'react'
import Header from './components/Header.jsx'
import StudentForm from './components/StudentForm.jsx'
import ResultsSection from './components/ResultsSection.jsx'
import RoadmapCard from './components/RoadmapCard.jsx'
import sampleOpportunities from './data/sampleOpportunities.js'

function App() {
  const [studentProfile, setStudentProfile] = useState(null)
  const [showResults, setShowResults] = useState(false)

  function handleFormSubmit(formData) {
    setStudentProfile(formData)
    setShowResults(true)
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <StudentForm onSubmit={handleFormSubmit} />

        {showResults && studentProfile && (
          <>
            <ResultsSection
              student={studentProfile}
              opportunities={sampleOpportunities}
            />
            <RoadmapCard student={studentProfile} />
          </>
        )}
      </main>

      <footer className="footer">
        <p>TechPath Kern · Built for Kern County students · Hackathon MVP</p>
      </footer>
    </div>
  )
}

export default App
