function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <p className="header__badge">Kern County · Hackathon MVP</p>
        <h1 className="header__title">TechPath Kern</h1>
        <p className="header__tagline">
          AI Opportunity Navigator for Kern County Students
        </p>
        <p className="header__description">
          Enter your profile once and discover scholarships, internships, STEM
          programs, and career pathways matched to your goals.
        </p>
        <div className="header__tracks" aria-label="Hackathon tracks">
          <span className="header__track">AI + ML</span>
          <span className="header__track">Education</span>
          <span className="header__track">Social Impact</span>
        </div>
      </div>
    </header>
  )
}

export default Header
