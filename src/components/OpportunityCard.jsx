function getMatchBadgeClass(matchLevel) {
  if (matchLevel === 'High') {
    return 'match-badge match-badge--excellent'
  }

  if (matchLevel === 'Medium') {
    return 'match-badge match-badge--strong'
  }

  return 'match-badge match-badge--low'
}

function OpportunityCard({ opportunity, rank }) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-card__header">
        <div>
          {rank && <p className="opportunity-card__rank">#{rank} ranked match</p>}
          <p className="opportunity-card__type">{opportunity.type}</p>
          <h3 className="opportunity-card__title">{opportunity.name}</h3>
        </div>
        <div className="opportunity-card__match">
          <span className={getMatchBadgeClass(opportunity.matchLevel)}>
            {opportunity.matchLevel} Match
          </span>
          {typeof opportunity.matchScore === 'number' && (
            <span className="match-score">{opportunity.matchScore}% match</span>
          )}
        </div>
      </div>

      <p className="opportunity-card__location">
        <strong>Location:</strong> {opportunity.location}
      </p>

      <p className="opportunity-card__deadline">
        <strong>Deadline:</strong> {opportunity.deadline}
      </p>

      <div className="opportunity-card__section opportunity-card__section--highlight">
        <h4>Why it matches you</h4>
        <p>{opportunity.whyItMatches}</p>
      </div>

      {opportunity.missingRequirements?.length > 0 && (
        <div className="opportunity-card__section opportunity-card__section--tips">
          <h4>Tips before you apply</h4>
          <p className="tips-intro">
            This could still be a great fit — here are a few things to review:
          </p>
          <ul className="checklist checklist--tips">
            {opportunity.missingRequirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="opportunity-card__section">
        <h4>Application checklist</h4>
        <ul className="checklist">
          {opportunity.checklist.map((item, index) => (
            <li key={`${opportunity.id}-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      <button type="button" className="btn btn--outline">
        Learn More / Apply Soon
      </button>
    </article>
  )
}

export default OpportunityCard
