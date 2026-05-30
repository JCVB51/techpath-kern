function RoadmapCard({ student, roadmap }) {
  const firstName = student.name ? student.name.split(' ')[0] : 'Student'

  return (
    <section className="card roadmap-card">
      <h2 className="section-title">Your 30-Day Action Plan</h2>
      <p className="section-subtitle">
        {firstName}, here is a simple roadmap to help you move forward over the
        next month.
      </p>

      <ol className="roadmap-list">
        {roadmap.map((weekPlan) => (
          <li key={weekPlan.week} className="roadmap-step">
            <p className="roadmap-step__day">{weekPlan.week}</p>
            {weekPlan.steps.map((step) => (
              <div key={step.title} className="roadmap-step__item">
                <h3 className="roadmap-step__title">{step.title}</h3>
                <p className="roadmap-step__description">{step.description}</p>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default RoadmapCard
