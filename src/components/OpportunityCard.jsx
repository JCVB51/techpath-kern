function OpportunityCard({ opportunity }) {
  const matchClass =
    opportunity.matchLevel === 'High'
      ? 'match-badge match-badge--high'
      : 'match-badge match-badge--medium'

  return (
    <article className="opportunity-card">
      <div className="opportunity-card__header">
        <div>
          <p className="opportunity-card__type">{opportunity.type}</p>
          <h3 className="opportunity-card__title">{opportunity.name}</h3>
        </div>
        <span className={matchClass}>{opportunity.matchLevel} Match</span>
      </div>

      <p className="opportunity-card__deadline">
        <strong>Deadline:</strong> {opportunity.deadline}
      </p>

      <div className="opportunity-card__section">
        <h4>Why it matches you</h4>
        <p>{opportunity.whyItMatches}</p>
      </div>

      <div className="opportunity-card__section">
        <h4>Application checklist</h4>
        <ul className="checklist">
          {opportunity.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default OpportunityCard
