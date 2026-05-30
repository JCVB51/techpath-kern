const weekLabels = {
  'Week 1': 'Research & plan',
  'Week 2': 'Build materials',
  'Week 3': 'Grow & improve',
  'Week 4': 'Apply & follow up',
}

function RoadmapCard({ student, roadmap }) {
  const firstName = student.name ? student.name.split(' ')[0] : 'Student'

  return (
    <section className="card roadmap-card">
      <h2 className="section-title">Your 30-Day Action Plan</h2>
      <p className="section-subtitle">
        {firstName}, here is a simple week-by-week plan to help you take action.
        Small steps add up — you do not need to do everything at once.
      </p>

      <ol className="roadmap-list">
        {roadmap.map((weekPlan, weekIndex) => (
          <li key={weekPlan.week} className="roadmap-step">
            <div className="roadmap-step__header">
              <span className="roadmap-step__number">{weekIndex + 1}</span>
              <div>
                <p className="roadmap-step__day">{weekPlan.week}</p>
                <p className="roadmap-step__theme">
                  {weekLabels[weekPlan.week] || 'Action steps'}
                </p>
              </div>
            </div>
            <ol className="roadmap-step__steps">
              {weekPlan.steps.map((step, stepIndex) => (
                <li key={step.title} className="roadmap-step__item">
                  <span className="roadmap-step__step-num">{stepIndex + 1}</span>
                  <div>
                    <h3 className="roadmap-step__title">{step.title}</h3>
                    <p className="roadmap-step__description">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default RoadmapCard
