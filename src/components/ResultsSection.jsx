import { forwardRef } from 'react'
import OpportunityCard from './OpportunityCard.jsx'

const ResultsSection = forwardRef(function ResultsSection(
  { student, opportunities },
  ref,
) {
  return (
    <section className="results-section" ref={ref} id="results-section">
      <div className="results-section__intro card">
        <h2 className="section-title">Your Matched Opportunities</h2>
        <p className="section-subtitle">
          Ranked results for <strong>{student.name || 'you'}</strong>
          {student.city ? ` in ${student.city}` : ''}. Matches are calculated
          on the frontend using your profile and opportunity tags.
        </p>
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
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </section>
  )
})

export default ResultsSection
