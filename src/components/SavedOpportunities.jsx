import { useState } from 'react'

const SAVED_TYPE_FILTERS = [
  'All Saved',
  'Scholarship',
  'Internship',
  'STEM Program',
  'Hackathon',
  'Summer Program',
  'Career Resource',
]

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
  const [selectedSavedType, setSelectedSavedType] = useState('All Saved')

  const filteredSaved =
    selectedSavedType === 'All Saved'
      ? savedOpportunities
      : savedOpportunities.filter((item) => item.type === selectedSavedType)

  return (
    <section className="saved-opportunities-section page-section" id="saved">
      <div className="section-header">
        <div>
          <p className="section-label">Your application plan</p>
          <h2 className="section-title">My Saved Opportunities</h2>
          <p className="section-subtitle section-subtitle--flush">
            Save opportunities from your results to build a simple application plan.
            Filter by type and use the checklist plus next action to stay organized.
          </p>
          <p className="saved-opportunities__hint">
            Saving opportunities will personalize your 30-day roadmap.
          </p>
        </div>
        {savedOpportunities.length > 0 && (
          <span className="saved-opportunities__count">
            {savedOpportunities.length} saved
          </span>
        )}
      </div>

      <div className="card saved-opportunities">
        {savedOpportunities.length === 0 ? (
          <div className="saved-opportunities__empty">
            <p>
              No saved opportunities yet. Click <strong>Save Opportunity</strong> on
              any matched card in Results to add it here.
            </p>
          </div>
        ) : (
          <>
            <label className="saved-opportunities__filter">
              <span>Filter saved by type</span>
              <select
                value={selectedSavedType}
                onChange={(event) => setSelectedSavedType(event.target.value)}
              >
                {SAVED_TYPE_FILTERS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            {filteredSaved.length === 0 ? (
              <div className="saved-opportunities__empty saved-opportunities__empty--filter">
                <p>
                  No saved opportunities match this filter yet. Try selecting{' '}
                  <strong>All Saved</strong> or save more opportunities from Results.
                </p>
              </div>
            ) : (
              <ul className="saved-opportunities__list">
                {filteredSaved.map((opportunity) => (
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
          </>
        )}
      </div>
    </section>
  )
}

export default SavedOpportunities
