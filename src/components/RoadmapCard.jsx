function RoadmapCard({ student }) {
  const firstName = student.name ? student.name.split(' ')[0] : 'Student'

  const steps = [
    {
      day: 'Days 1–5',
      title: 'Research your top matches',
      description:
        'Pick two opportunities from your results and read the full requirements, deadlines, and eligibility details.',
    },
    {
      day: 'Days 6–10',
      title: 'Build your application materials',
      description:
        'Start your resume, draft a personal statement, and list teachers or mentors who could write recommendations.',
    },
    {
      day: 'Days 11–20',
      title: 'Strengthen your skills',
      description: `Practice skills related to ${student.careerInterest || 'your career interest'} through free online tutorials, school clubs, or small projects.`,
    },
    {
      day: 'Days 21–30',
      title: 'Apply and follow up',
      description:
        'Submit at least one application, ask for feedback on your essays, and set reminders for upcoming deadlines.',
    },
  ]

  return (
    <section className="card roadmap-card">
      <h2 className="section-title">Your 30-Day Action Plan</h2>
      <p className="section-subtitle">
        {firstName}, here is a simple roadmap to help you move forward over the
        next month.
      </p>

      <ol className="roadmap-list">
        {steps.map((step) => (
          <li key={step.day} className="roadmap-step">
            <p className="roadmap-step__day">{step.day}</p>
            <h3 className="roadmap-step__title">{step.title}</h3>
            <p className="roadmap-step__description">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default RoadmapCard
