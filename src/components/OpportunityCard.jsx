function OpportunityCard({ opportunity }) {
  const matchClassMap = {
    High: 'match-badge match-badge--high',
    Medium: 'match-badge match-badge--medium',
    Low: 'match-badge match-badge--low',
  }
  const matchClass = matchClassMap[opportunity.matchLevel] || matchClassMap.Medium

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

      {opportunity.missingRequirements?.length > 0 && (
        <div className="opportunity-card__section">
          <h4>Things to double-check</h4>
          <ul className="checklist checklist--notes">
            {opportunity.missingRequirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

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
