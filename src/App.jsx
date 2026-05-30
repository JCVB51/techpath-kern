import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import StudentForm from './components/StudentForm.jsx'
import ResultsSection from './components/ResultsSection.jsx'
import RoadmapCard from './components/RoadmapCard.jsx'
import sampleOpportunities from './data/sampleOpportunities.js'
import { matchOpportunities } from './utils/matchOpportunities.js'

function App() {
  const [studentProfile, setStudentProfile] = useState(null)
  const [matchedOpportunities, setMatchedOpportunities] = useState([])
  const resultsRef = useRef(null)

  function handleFormSubmit(formData) {
    const results = matchOpportunities(formData, sampleOpportunities)
    setStudentProfile(formData)
    setMatchedOpportunities(results)
  }

  useEffect(() => {
    if (studentProfile && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [studentProfile, matchedOpportunities])

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <StudentForm onSubmit={handleFormSubmit} />

        {studentProfile && matchedOpportunities.length > 0 && (
          <>
            <ResultsSection
              ref={resultsRef}
              student={studentProfile}
              opportunities={matchedOpportunities}
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
