import OpportunityCard from './OpportunityCard.jsx'

function ResultsSection({ student, opportunities }) {
  return (
    <section className="results-section">
      <div className="results-section__intro card">
        <h2 className="section-title">Your Matched Opportunities</h2>
        <p className="section-subtitle">
          Here are matched opportunities for{' '}
          <strong>{student.name || 'you'}</strong>
          {student.city ? ` in ${student.city}` : ''}, ranked by how well they
          fit your profile.
        </p>
        <div className="profile-summary">
          <span>{student.gradeLevel}</span>
          <span>GPA: {student.gpa}</span>
          <span>{student.careerInterest}</span>
        </div>
      </div>

      <div className="opportunity-grid">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </section>
  )
}

export default ResultsSection
