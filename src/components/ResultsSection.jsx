import { forwardRef } from 'react'
import OpportunityCard from './OpportunityCard.jsx'

const ResultsSection = forwardRef(function ResultsSection(
  { student, opportunities },
  ref,
) {
  const highCount = opportunities.filter((item) => item.matchLevel === 'High').length
  const mediumCount = opportunities.filter((item) => item.matchLevel === 'Medium').length

  return (
    <section className="results-section" ref={ref} id="results-section">
      <div className="results-section__intro card">
        <h2 className="section-title">Your Matched Opportunities</h2>
        <p className="section-subtitle">
          Ranked results for <strong>{student.name || 'you'}</strong>
          {student.city ? ` in ${student.city}` : ''}. Opportunities are sorted
          from best fit to lowest based on your grade, GPA, interests, skills,
          and location.
        </p>

        <div className="results-summary">
          <span className="results-summary__item">
            {opportunities.length} opportunities found
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

      <div className="opportunity-grid">
        {opportunities.map((opportunity, index) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            rank={index + 1}
          />
        ))}
      </div>
    </section>
  )
})

export default ResultsSection
