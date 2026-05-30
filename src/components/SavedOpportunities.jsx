function getSuggestedNextAction(type) {
  const actions = {
    Scholarship: 'Start your essay draft and gather your transcript.',
    Internship: 'Update your resume and prepare a short introduction.',
    Hackathon: 'Find a teammate or brainstorm a project idea.',
    'STEM Program': 'Review eligibility and prepare any required forms.',
    'Summer Program': 'Check the deadline and ask about recommendation letters.',
    'Career Resource': 'Save this resource and schedule time to review it.',
  }

  return actions[type] || 'Review the checklist and note the deadline on your calendar.'
}

function getMatchBadgeClass(matchLevel) {
  if (matchLevel === 'High') return 'match-badge match-badge--excellent'
  if (matchLevel === 'Medium') return 'match-badge match-badge--strong'
  return 'match-badge match-badge--low'
}

function SavedOpportunities({ savedOpportunities }) {
  return (
    <section className="card saved-opportunities" id="saved-opportunities">
      <h2 className="section-title">My Saved Opportunities</h2>
      <p className="section-subtitle">
        Save opportunities from your results to build a simple application plan.
        Use the checklist and next action below to stay organized.
      </p>

      {savedOpportunities.length === 0 ? (
        <div className="saved-opportunities__empty">
          <p>
            No saved opportunities yet. Click <strong>Save Opportunity</strong> on
            any matched card above to add it here.
          </p>
        </div>
      ) : (
        <ul className="saved-opportunities__list">
          {savedOpportunities.map((opportunity) => (
            <li key={opportunity.id} className="saved-opportunity">
              <div className="saved-opportunity__header">
                <div>
                  <p className="saved-opportunity__type">{opportunity.type}</p>
                  <h3 className="saved-opportunity__title">{opportunity.name}</h3>
                </div>
                <span className={getMatchBadgeClass(opportunity.matchLevel)}>
                  {opportunity.matchLevel} Match
                </span>
              </div>

              <p className="saved-opportunity__deadline">
                <strong>Deadline:</strong> {opportunity.deadline}
              </p>

              <div className="saved-opportunity__next-action">
                <h4>Suggested next action</h4>
                <p>{getSuggestedNextAction(opportunity.type)}</p>
              </div>

              <div className="saved-opportunity__checklist">
                <h4>Application checklist</h4>
                <ul className="checklist">
                  {opportunity.checklist.map((item, index) => (
                    <li key={`${opportunity.id}-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default SavedOpportunities
