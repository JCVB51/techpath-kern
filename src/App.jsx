import { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import StudentForm from './components/StudentForm.jsx'
import ResultsSection from './components/ResultsSection.jsx'
import SavedOpportunities from './components/SavedOpportunities.jsx'
import RoadmapCard from './components/RoadmapCard.jsx'
import opportunities from './data/opportunities.js'
import { matchOpportunities } from './utils/matchOpportunities.js'
import { generateRoadmap } from './services/roadmapService.js'

const DEFAULT_MATCH_LEVEL = 'All Matches'
const DEFAULT_OPPORTUNITY_TYPE = 'All Types'
const DEFAULT_SORT_OPTION = 'Best Match'

function parseDeadline(deadline) {
  if (!deadline) return Number.MAX_SAFE_INTEGER

  const lower = deadline.toLowerCase()
  if (lower.includes('rolling') || lower.includes('open year-round')) {
    return Number.MAX_SAFE_INTEGER - 1
  }

  const parsed = Date.parse(deadline)
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed
}

function getDisplayedOpportunities(matched, matchLevel, opportunityType, sortOption) {
  let results = matched.filter((opportunity) => {
    const levelMatch =
      matchLevel === DEFAULT_MATCH_LEVEL || opportunity.matchLevel === matchLevel
    const typeMatch =
      opportunityType === DEFAULT_OPPORTUNITY_TYPE || opportunity.type === opportunityType
    return levelMatch && typeMatch
  })

  results = [...results]

  if (sortOption === 'Deadline Soonest') {
    results.sort((a, b) => parseDeadline(a.deadline) - parseDeadline(b.deadline))
  } else if (sortOption === 'Opportunity Type') {
    results.sort((a, b) => {
      const typeCompare = a.type.localeCompare(b.type)
      if (typeCompare !== 0) return typeCompare
      return b.matchScore - a.matchScore
    })
  } else {
    results.sort((a, b) => b.matchScore - a.matchScore)
  }

  return results
}

function SectionPlaceholder({ id, title, message }) {
  return (
    <section className="card section-placeholder page-section" id={id}>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle section-subtitle--flush">{message}</p>
    </section>
  )
}

function App() {
  const [studentProfile, setStudentProfile] = useState(null)
  const [matchedOpportunities, setMatchedOpportunities] = useState([])
  const [savedOpportunities, setSavedOpportunities] = useState([])
  const [selectedMatchLevel, setSelectedMatchLevel] = useState(DEFAULT_MATCH_LEVEL)
  const [selectedOpportunityType, setSelectedOpportunityType] = useState(DEFAULT_OPPORTUNITY_TYPE)
  const [selectedSortOption, setSelectedSortOption] = useState(DEFAULT_SORT_OPTION)
  const resultsRef = useRef(null)
  const shouldScrollToResultsRef = useRef(false)

  // Start at the top on first load/refresh (ignore restored scroll position or URL hash).
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    window.scrollTo(0, 0)
  }, [])

  function handleFormSubmit(formData) {
    const matches = matchOpportunities(formData, opportunities)
    setStudentProfile(formData)
    setMatchedOpportunities(matches)
    setSavedOpportunities([])
    setSelectedMatchLevel(DEFAULT_MATCH_LEVEL)
    setSelectedOpportunityType(DEFAULT_OPPORTUNITY_TYPE)
    setSelectedSortOption(DEFAULT_SORT_OPTION)
    shouldScrollToResultsRef.current = true
  }

  function toggleSaveOpportunity(opportunity) {
    setSavedOpportunities((prev) => {
      const alreadySaved = prev.some((item) => item.id === opportunity.id)
      if (alreadySaved) {
        return prev.filter((item) => item.id !== opportunity.id)
      }
      return [...prev, opportunity]
    })
  }

  const savedOpportunityIds = savedOpportunities.map((item) => item.id)

  // Use saved opportunities for the roadmap when available; otherwise top matches.
  const roadmapOpportunities = useMemo(() => {
    if (savedOpportunities.length > 0) {
      return savedOpportunities
    }
    return matchedOpportunities
  }, [savedOpportunities, matchedOpportunities])

  const roadmap = useMemo(() => {
    if (!studentProfile || roadmapOpportunities.length === 0) {
      return []
    }
    return generateRoadmap(studentProfile, roadmapOpportunities)
  }, [studentProfile, roadmapOpportunities])

  const displayedOpportunities = useMemo(
    () =>
      getDisplayedOpportunities(
        matchedOpportunities,
        selectedMatchLevel,
        selectedOpportunityType,
        selectedSortOption,
      ),
    [matchedOpportunities, selectedMatchLevel, selectedOpportunityType, selectedSortOption],
  )

  useEffect(() => {
    if (shouldScrollToResultsRef.current && studentProfile && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      shouldScrollToResultsRef.current = false
    }
  }, [studentProfile, matchedOpportunities])

  const hasResults = studentProfile && matchedOpportunities.length > 0

  return (
    <div className="app">
      <Navbar />
      <Header />

      <main className="main-content">
        <StudentForm onSubmit={handleFormSubmit} />

        {!hasResults && (
          <>
            <section className="card empty-state page-section" id="results">
              <h2 className="section-title">Ready to explore?</h2>
              <p className="section-subtitle section-subtitle--flush">
                Fill out your profile above or click <strong>Use Demo Profile</strong>{' '}
                to try a sample student from Bakersfield. We will rank scholarships,
                internships, STEM programs, and more based on your answers.
              </p>
              <ul className="empty-state__steps">
                <li>1. Enter your profile (or use the demo)</li>
                <li>2. See ranked opportunity matches</li>
                <li>3. Save opportunities and follow your 30-day action plan</li>
              </ul>
            </section>

            <SectionPlaceholder
              id="saved"
              title="My Saved Opportunities"
              message="Save opportunities from your results to build a personal application plan. Submit your profile first to see matched opportunities."
            />

            <SectionPlaceholder
              id="roadmap"
              title="Your 30-Day Action Plan"
              message="After you submit your profile, TechPath Kern will generate a personalized week-by-week roadmap based on your top matches."
            />
          </>
        )}

        {hasResults && (
          <>
            <ResultsSection
              ref={resultsRef}
              student={studentProfile}
              opportunities={displayedOpportunities}
              totalCount={matchedOpportunities.length}
              savedOpportunityIds={savedOpportunityIds}
              onToggleSave={toggleSaveOpportunity}
              selectedMatchLevel={selectedMatchLevel}
              selectedOpportunityType={selectedOpportunityType}
              selectedSortOption={selectedSortOption}
              onMatchLevelChange={setSelectedMatchLevel}
              onOpportunityTypeChange={setSelectedOpportunityType}
              onSortOptionChange={setSelectedSortOption}
            />
            <SavedOpportunities savedOpportunities={savedOpportunities} />
            <RoadmapCard
              student={studentProfile}
              roadmap={roadmap}
              hasSavedOpportunities={savedOpportunities.length > 0}
            />
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
