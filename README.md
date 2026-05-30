# TechPath Kern

**AI Opportunity Navigator for Kern County Students**

TechPath Kern helps Kern County students discover scholarships, internships, STEM programs, hackathons, summer opportunities, and career pathways they might otherwise miss.

Built for high school and college students — especially first-generation, low-income, and STEM-interested learners in Bakersfield and across Kern County.

**Hackathon tracks:** AI + ML · Education · Social Impact

---

## Quick Start

```bash
git clone <repository-url>
cd techpath-kern
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Demo Flow (for judges)

1. Open the app and read the landing section.
2. Click **Use Demo Profile** to fill in a sample Bakersfield student (Maria Lopez).
3. Click **Find My Opportunities**.
4. Review ranked opportunity cards (High / Medium / Low match).
5. Scroll to the personalized **30-Day Action Plan**.

Or fill out the form manually to test different profiles (healthcare, AgTech, first-gen, etc.).

---

## MVP Features

- **Student profile form** with validation and demo profile button
- **12 curated demo opportunities** locally relevant to Kern County
- **Rule-based matching** — scores opportunities by interest, skills, GPA, grade, location, and eligibility tags
- **Eligibility explanations** — encouraging, student-friendly match reasons
- **Tips before you apply** — supportive notes on things to double-check
- **Opportunity cards** — type, deadline, location, checklist, match score
- **30-day roadmap** — personalized Week 1–4 action plan based on top matches
- **Responsive layout** for laptop and mobile demo screens

> **Note:** Opportunity data in `src/data/opportunities.js` is demo/sample data for the hackathon MVP. Entries are not verified real programs unless noted otherwise. No official links are included.

---

## Tech Stack

- **React 19** + **Vite 6**
- **JavaScript** (no TypeScript)
- **Plain CSS** (no UI library)
- Local JavaScript data files — no external database
- No authentication in MVP
- No AI API yet — matching uses rule-based logic designed for future AI integration

---

## Project Structure

```txt
techpath-kern/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .gitignore
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Layout, form submit, match + roadmap flow
    ├── index.css                # Global styles
    ├── components/
    │   ├── Header.jsx           # Landing header + hackathon track badges
    │   ├── StudentForm.jsx      # Profile form, validation, demo button
    │   ├── ResultsSection.jsx   # Ranked results + profile summary
    │   ├── OpportunityCard.jsx  # Single opportunity card
    │   └── RoadmapCard.jsx      # 30-day action plan
    ├── data/
    │   └── opportunities.js     # Curated demo opportunity dataset
    ├── utils/
    │   └── matchOpportunities.js # Rule-based scoring and ranking
    └── services/
        ├── eligibilityService.js # Match explanations + tips
        └── roadmapService.js     # Personalized 30-day roadmap
```

---

## How Data Flows

1. Student submits the profile form in `StudentForm.jsx`.
2. `App.jsx` calls `matchOpportunities(profile, opportunities)`.
3. `matchOpportunities.js` scores each opportunity and uses `eligibilityService.js` for explanations.
4. Results render in `ResultsSection.jsx` → `OpportunityCard.jsx`.
5. `generateRoadmap()` in `roadmapService.js` builds a 4-week plan from the profile and top matches.
6. `RoadmapCard.jsx` displays the roadmap.

---

## Target Users

- High school students in Kern County
- College students in Kern County
- First-generation college students
- Low-income students
- Students interested in AI, computer science, engineering, healthcare, AgTech, or STEM careers

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable demo / submission branch |
| `testing` | Integrated MVP — frontend + backend-style logic |
| `frontend` | UI work (merged into `testing`) |
| `backend` | Data and matching logic (merged into `testing`) |

### Merge `testing` → `main`

When `testing` is ready:

```bash
git checkout main
git pull origin main
git merge testing
npm install
npm run build
git push origin main
```

Resolve any conflicts in favor of the integrated `testing` MVP unless `main` has submission-specific changes.

---

## Future Work

- AI API integration for smarter match explanations and essay suggestions
- Verified real opportunity dataset with official sources
- User accounts and saved profiles
- Deadline reminders and calendar export
- Counselor / teacher dashboard

---

## License

Hackathon MVP — check with the team before production use.
