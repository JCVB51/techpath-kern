const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Profile', href: '#profile' },
  { label: 'Results', href: '#results' },
  { label: 'Saved', href: '#saved' },
  { label: 'Roadmap', href: '#roadmap' },
]

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__inner">
        <a className="navbar__brand" href="#home">
          TechPath Kern
        </a>
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a className="navbar__link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
