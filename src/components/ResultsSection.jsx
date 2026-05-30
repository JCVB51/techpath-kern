import { forwardRef } from 'react'
import OpportunityCard from './OpportunityCard.jsx'
import ResultsControls from './ResultsControls.jsx'

const ResultsSection = forwardRef(function ResultsSection(
  {
    student,
    opportunities,
    totalCount,
    savedOpportunityIds,
    onToggleSave,
    selectedMatchLevel,
    selectedOpportunityType,
    selectedSortOption,
    onMatchLevelChange,
    onOpportunityTypeChange,
    onSortOptionChange,
  },
  ref,
) {
  const highCount = opportunities.filter((item) => item.matchLevel === 'High').length
  const mediumCount = opportunities.filter((item) => item.matchLevel === 'Medium').length
  const isFiltered = opportunities.length !== totalCount

  return (
    <section className="results-section" ref={ref} id="results-section">
      <div className="results-section__intro card">
        <h2 className="section-title">Your Matched Opportunities</h2>
        <p className="section-subtitle">
          Ranked results for <strong>{student.name || 'you'}</strong>
          {student.city ? ` in ${student.city}` : ''}. Use the filters below to
          explore by match level or type, and sort by best match, deadline, or
          opportunity type.
        </p>

        <div className="results-summary">
          <span className="results-summary__item">
            {isFiltered
              ? `${opportunities.length} of ${totalCount} opportunities shown`
              : `${totalCount} opportunities found`}
          </span>
          {highCount > 0 && (
            <span className="results-summary__item results-summary__item--high">
              {highCount} high match{highCount !== 1 ? 'es' : ''}
            </span>
          )}
          {mediumCount > 0 && (
            <span className="results-summary__item results-summary__item--medium">
              {mediumCount} medium match{mediumCount !== 1 ? 'es' : ''}
            </span>
          )}
        </div>

        <div className="profile-summary">
          <span>{student.gradeLevel}</span>
          <span>GPA: {student.gpa}</span>
          <span>{student.careerInterest}</span>
          {student.skills && <span>Skills: {student.skills}</span>}
          {student.careerGoal && (
            <span className="profile-summary__goal">{student.careerGoal}</span>
          )}
        </div>
      </div>

      <ResultsControls
        selectedMatchLevel={selectedMatchLevel}
        selectedOpportunityType={selectedOpportunityType}
        selectedSortOption={selectedSortOption}
        onMatchLevelChange={onMatchLevelChange}
        onOpportunityTypeChange={onOpportunityTypeChange}
        onSortOptionChange={onSortOptionChange}
      />

      {opportunities.length === 0 ? (
        <div className="results-section__empty card">
          <p>
            No opportunities match these filters yet. Try changing the filters or
            showing all matches.
          </p>
        </div>
      ) : (
        <div className="opportunity-grid">
          {opportunities.map((opportunity, index) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              rank={index + 1}
              isSaved={savedOpportunityIds.includes(opportunity.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </section>
  )
})

export default ResultsSection
