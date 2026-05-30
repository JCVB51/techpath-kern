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
import {
  compareDeadlineSoonest,
  getDeadlineStatus,
} from './utils/deadlineUtils.js'

const DEFAULT_MATCH_LEVEL = 'All Matches'
const DEFAULT_OPPORTUNITY_TYPE = 'All Types'
const DEFAULT_LOCATION_FILTER = 'All Locations'
const DEFAULT_DEADLINE_FILTER = 'Active Only'
const DEFAULT_SORT_OPTION = 'Best Match'

const KERN_CITIES = [
  'delano',
  'wasco',
  'shafter',
  'arvin',
  'lamont',
  'taft',
  'ridgecrest',
  'mcfarland',
  'tehachapi',
]

function normalizeLocation(location) {
  return (location || '').toLowerCase()
}

function isKernCountyLocation(location) {
  const loc = normalizeLocation(location)
  return (
    loc.includes('bakersfield') ||
    loc.includes('kern county') ||
    loc.includes('kern,') ||
    KERN_CITIES.some((city) => loc.includes(city))
  )
}

function matchesLocationFilter(opportunity, locationFilter) {
  const loc = normalizeLocation(opportunity.location)

  if (locationFilter === DEFAULT_LOCATION_FILTER) {
    return true
  }

  if (locationFilter === 'Bakersfield / Kern County') {
    return isKernCountyLocation(opportunity.location)
  }

  if (locationFilter === 'Central Valley') {
    return loc.includes('central valley') || loc.includes('kern county') || loc.includes('kern,')
  }

  if (locationFilter === 'California') {
    return (
      loc.includes('california') ||
      loc.includes(', ca') ||
      loc.endsWith(' ca') ||
      loc.includes('central valley') ||
      isKernCountyLocation(opportunity.location)
    )
  }

  if (locationFilter === 'Remote / Online') {
    return (
      loc.includes('remote') ||
      loc.includes('online') ||
      loc.includes('virtual') ||
      loc.includes('hybrid')
    )
  }

  return true
}

function matchesDeadlineFilter(opportunity, deadlineFilter) {
  const status = getDeadlineStatus(opportunity.deadline)

  if (deadlineFilter === 'Active Only') {
    return status !== 'Expired'
  }

  if (deadlineFilter === 'Include Expired') {
    return true
  }

  if (deadlineFilter === 'Due Soon') {
    return status === 'Due Soon'
  }

  if (deadlineFilter === 'Rolling / Ongoing') {
    return status === 'Rolling'
  }

  return true
}

function getLocalRelevanceScore(location) {
  const loc = normalizeLocation(location)

  if (loc.includes('bakersfield')) return 1
  if (loc.includes('kern county') || loc.includes('kern,')) return 2
  if (KERN_CITIES.some((city) => loc.includes(city))) return 3
  if (loc.includes('central valley')) return 4
  if (loc.includes('california') || loc.includes(', ca') || loc.endsWith(' ca')) return 5
  if (
    loc.includes('remote') ||
    loc.includes('online') ||
    loc.includes('virtual') ||
    loc.includes('hybrid')
  ) {
    return 6
  }

  return 7
}

function getDisplayedOpportunities(
  matched,
  matchLevel,
  opportunityType,
  locationFilter,
  deadlineFilter,
  sortOption,
) {
  let results = matched.filter((opportunity) => {
    const levelMatch =
      matchLevel === DEFAULT_MATCH_LEVEL || opportunity.matchLevel === matchLevel
    const typeMatch =
      opportunityType === DEFAULT_OPPORTUNITY_TYPE || opportunity.type === opportunityType
    const locationMatch = matchesLocationFilter(opportunity, locationFilter)
    const deadlineMatch = matchesDeadlineFilter(opportunity, deadlineFilter)
    return levelMatch && typeMatch && locationMatch && deadlineMatch
  })

  results = [...results]

  if (sortOption === 'Deadline Soonest') {
    results.sort(compareDeadlineSoonest)
  } else if (sortOption === 'Opportunity Type') {
    results.sort((a, b) => {
      const typeCompare = a.type.localeCompare(b.type)
      if (typeCompare !== 0) return typeCompare
      return b.matchScore - a.matchScore
    })
  } else if (sortOption === 'Most Local') {
    results.sort((a, b) => {
      const localCompare =
        getLocalRelevanceScore(a.location) - getLocalRelevanceScore(b.location)
      if (localCompare !== 0) return localCompare
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
  const [selectedLocationFilter, setSelectedLocationFilter] = useState(DEFAULT_LOCATION_FILTER)
  const [selectedDeadlineFilter, setSelectedDeadlineFilter] = useState(DEFAULT_DEADLINE_FILTER)
  const [selectedSortOption, setSelectedSortOption] = useState(DEFAULT_SORT_OPTION)
  const resultsRef = useRef(null)
  const shouldScrollToResultsRef = useRef(false)

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
    setSelectedLocationFilter(DEFAULT_LOCATION_FILTER)
    setSelectedDeadlineFilter(DEFAULT_DEADLINE_FILTER)
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
        selectedLocationFilter,
        selectedDeadlineFilter,
        selectedSortOption,
      ),
    [
      matchedOpportunities,
      selectedMatchLevel,
      selectedOpportunityType,
      selectedLocationFilter,
      selectedDeadlineFilter,
      selectedSortOption,
    ],
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
              selectedLocationFilter={selectedLocationFilter}
              selectedDeadlineFilter={selectedDeadlineFilter}
              selectedSortOption={selectedSortOption}
              onMatchLevelChange={setSelectedMatchLevel}
              onOpportunityTypeChange={setSelectedOpportunityType}
              onLocationFilterChange={setSelectedLocationFilter}
              onDeadlineFilterChange={setSelectedDeadlineFilter}
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
