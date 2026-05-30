const MATCH_LEVELS = ['All Matches', 'High', 'Medium', 'Low']

const OPPORTUNITY_TYPES = [
  'All Types',
  'Scholarship',
  'Internship',
  'STEM Program',
  'Hackathon',
  'Summer Program',
  'Career Resource',
]

const LOCATION_FILTERS = [
  'All Locations',
  'Bakersfield / Kern County',
  'Central Valley',
  'California',
  'Remote / Online',
]

const DEADLINE_FILTERS = [
  'Active Only',
  'Include Expired',
  'Due Soon',
  'Rolling / Ongoing',
]

const SORT_OPTIONS = [
  'Best Match',
  'Most Local',
  'Deadline Soonest',
  'Opportunity Type',
]

function ResultsControls({
  selectedMatchLevel,
  selectedOpportunityType,
  selectedLocationFilter,
  selectedDeadlineFilter,
  selectedSortOption,
  onMatchLevelChange,
  onOpportunityTypeChange,
  onLocationFilterChange,
  onDeadlineFilterChange,
  onSortOptionChange,
}) {
  return (
    <div className="results-controls card">
      <h3 className="results-controls__title">Filter & Sort Results</h3>
      <p className="results-controls__hint">
        Narrow your matches by level, type, location, or deadline — then choose how
        to sort them.
      </p>

      <div className="results-controls__grid">
        <label className="results-controls__field">
          <span>Match level</span>
          <select
            value={selectedMatchLevel}
            onChange={(event) => onMatchLevelChange(event.target.value)}
          >
            {MATCH_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className="results-controls__field">
          <span>Opportunity type</span>
          <select
            value={selectedOpportunityType}
            onChange={(event) => onOpportunityTypeChange(event.target.value)}
          >
            {OPPORTUNITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="results-controls__field">
          <span>Location</span>
          <select
            value={selectedLocationFilter}
            onChange={(event) => onLocationFilterChange(event.target.value)}
          >
            {LOCATION_FILTERS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="results-controls__field">
          <span>Deadline</span>
          <select
            value={selectedDeadlineFilter}
            onChange={(event) => onDeadlineFilterChange(event.target.value)}
          >
            {DEADLINE_FILTERS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="results-controls__field">
          <span>Sort by</span>
          <select
            value={selectedSortOption}
            onChange={(event) => onSortOptionChange(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

export default ResultsControls
