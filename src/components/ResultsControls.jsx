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

const SORT_OPTIONS = ['Best Match', 'Deadline Soonest', 'Opportunity Type']

function ResultsControls({
  selectedMatchLevel,
  selectedOpportunityType,
  selectedSortOption,
  onMatchLevelChange,
  onOpportunityTypeChange,
  onSortOptionChange,
}) {
  return (
    <div className="results-controls card">
      <h3 className="results-controls__title">Filter & Sort Results</h3>
      <p className="results-controls__hint">
        Narrow your matches by level or type, then choose how to sort them.
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
