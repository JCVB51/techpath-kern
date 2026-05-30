# TechPath Kern

**AI Opportunity Navigator for Kern County Students**

TechPath Kern helps Kern County students discover scholarships, internships, STEM programs, hackathons, summer opportunities, and career pathways they might otherwise miss. Students enter a short profile and receive ranked matches, clear eligibility guidance, application checklists, and a personalized 30-day action plan.

Built for high school and college students in Bakersfield and across Kern County — especially first-generation, low-income, and STEM-interested learners.

---

## Problem Statement

Many Kern County students miss valuable academic and career opportunities because:

- Information is scattered across many websites, school bulletins, and social posts.
- Deadlines are difficult to track and easy to miss.
- Eligibility requirements are often confusing or written in formal language.
- First-generation and low-income students may not have enough guidance on applications, essays, or career pathways.
- Local and regional opportunities are hard to discover compared to national programs.

The result is a gap between students who have support networks and students who never hear about programs that could change their path.

---

## Solution

TechPath Kern helps students move from:

> “I don’t know what opportunities exist.”

to:

> “Here are my best matches, here is why I fit, here is what I need to double-check, and here is my 30-day action plan.”

The app combines a student profile, rule-based opportunity matching, filters for local relevance, a saved-opportunities workflow, and a roadmap that updates based on what the student chooses to pursue.

---

## Key Features

- **Student profile form** — name, city, grade level, GPA, career interest, skills, and career goal
- **Demo profile** — one-click fill for hackathon demos
- **Form validation** — friendly, student-readable error messages
- **Rule-based AI-style opportunity matching** — scores and ranks opportunities from a curated dataset
- **Match levels and match scores** — High, Medium, and Low with percentage scores
- **Eligibility explanations** — clear, encouraging reasons why an opportunity fits
- **Tips before applying** — supportive notes on things to review, not harsh rejection language
- **Filters and sorting** — match level, opportunity type, and sort options
- **Location filter and Most Local sorting** — focus on Bakersfield, Kern County, Central Valley, California, or remote options
- **Saved opportunities** — students can save matches and build an application plan
- **Saved opportunity filters** — filter saved items by opportunity type
- **Application checklists** — step-by-step materials for each opportunity
- **Personalized 30-day roadmap** — Week 1–4 action steps based on the student profile
- **Roadmap updates from saved opportunities** — roadmap personalizes when students save opportunities
- **Navbar and polished UI** — single-page navigation between Home, Profile, Results, Saved, and Roadmap

---

## AI / ML Approach

TechPath Kern uses an **explainable rule-based recommendation engine** for the hackathon MVP. We did **not** train a custom machine learning model for this version.

The engine scores each opportunity based on factors such as:

- GPA and grade level eligibility
- Location relevance (Kern County, Bakersfield, Central Valley, California)
- Career interests and career goals
- Skills
- Eligibility tags (first-generation, STEM, local residency, and more)
- Broad STEM and technology relevance

Match levels (High, Medium, Low) and `whyItMatches` explanations are generated from transparent rules so students and judges can understand *why* a result appears.

### Future AI / ML possibilities

A production version could add:

- Embeddings and semantic search for interest matching
- LLM-powered eligibility explanations in plain language
- Personalized essay feedback and draft suggestions
- Trained ranking models using historical application outcomes
- Smarter deadline and document recommendations

---

## Hackathon Track Alignment

| Track | How TechPath Kern fits |
|-------|-------------------------|
| **AI + ML** | Rule-based personalization, match scoring, eligibility explanations, and roadmap generation designed for future AI enhancement |
| **Social Impact** | Reduces opportunity gaps for first-generation, low-income, and underserved Kern County students |
| **Education** | Supports college readiness, STEM exploration, scholarships, and career planning |
| **Open Track** | Can expand into mentorship, local jobs, school programs, and community partner integrations |

---

## Demo Flow

Follow this flow for a live hackathon demo:

1. **Use Demo Profile** — fills the form with a sample Bakersfield student
2. **Submit the profile** — click **Find My Opportunities**
3. **View ranked opportunity matches** — review High / Medium / Low cards and match scores
4. **Filter and sort results** — try location filter, Most Local, or opportunity type
5. **Save opportunities** — click **Save Opportunity** on 2–3 cards
6. **View saved checklists** — scroll to **My Saved Opportunities** for checklists and next actions
7. **Watch the roadmap update** — the 30-day plan reflects saved opportunities when present

Use the navbar to jump between **Home**, **Profile**, **Results**, **Saved**, and **Roadmap**.

---

## Demo Profile

The built-in demo student is **Maria Lopez**:

| Field | Value |
|-------|-------|
| Name | Maria Lopez |
| City | Bakersfield |
| Grade Level | 11th Grade |
| GPA | 3.5 |
| Career Interest | Artificial Intelligence |
| Skills | Python, teamwork |
| Career Goal | Become a machine learning engineer |

This profile produces strong matches for AI, computer science, and local Kern County STEM opportunities.

---

## Tech Stack

| Technology | Role |
|------------|------|
| **React** | UI components and application state |
| **Vite** | Development server and production build |
| **JavaScript** | Application logic (no TypeScript in MVP) |
| **CSS** | Styling and responsive layout |
| **Local JavaScript data** | Curated opportunities in `src/data/opportunities.js` |
| **Git / GitHub** | Version control and collaboration |
| **Cursor AI** | Used during development for planning and implementation support |

No database, authentication, or external AI API in the MVP.

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
    ├── main.jsx                      # React entry point
    ├── App.jsx                       # State, filters, matching, roadmap flow
    ├── index.css                     # Global styles
    ├── components/
    │   ├── Navbar.jsx                # Sticky single-page navigation
    │   ├── Header.jsx                # Landing section
    │   ├── StudentForm.jsx           # Profile form, validation, demo button
    │   ├── ResultsSection.jsx        # Ranked results display
    │   ├── ResultsControls.jsx       # Filter and sort controls
    │   ├── OpportunityCard.jsx     # Opportunity card UI
    │   ├── SavedOpportunities.jsx    # Saved list, filters, checklists
    │   └── RoadmapCard.jsx           # 30-day action plan
    ├── data/
    │   └── opportunities.js          # Curated demo opportunity dataset
    ├── utils/
    │   └── matchOpportunities.js       # Rule-based scoring and ranking
    └── services/
        ├── eligibilityService.js     # Eligibility explanations and tips
        └── roadmapService.js         # Personalized 30-day roadmap
```

### How data flows

1. Student submits the profile form.
2. `App.jsx` calls `matchOpportunities(profile, opportunities)`.
3. `matchOpportunities.js` scores each opportunity; `eligibilityService.js` adds explanations and tips.
4. Filtered and sorted results render in `ResultsSection.jsx` → `OpportunityCard.jsx`.
5. Saved opportunities are stored in React state.
6. `generateRoadmap()` builds a 4-week plan from the profile and saved (or top matched) opportunities.
7. `RoadmapCard.jsx` displays the roadmap.

---

## How to Run Locally

```bash
git clone <repository-url>
cd techpath-kern
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other commands

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
```

---

## Current Limitations

- Opportunity data is **demo/sample data** for the hackathon MVP.
- There is **no real database** yet — data lives in local JavaScript files.
- There are **no user accounts** — profiles are not persisted after refresh.
- **Saved opportunities** are stored in React state only and reset on page refresh.
- There is **no real AI API integration** yet — matching is rule-based.
- Opportunity sources should be **verified before production use**; demo entries are not official program listings unless explicitly validated.

---

## Future Improvements

- Real verified opportunity database with official sources and links
- Student accounts and persistent profiles
- Persistent saved opportunities across sessions
- Deadline reminders and calendar export
- Counselor or teacher dashboard for school partners
- LLM-powered application assistant and essay feedback
- Semantic matching with embeddings
- Trained ranking models
- School and community partner integrations across Kern County

---

## Team

TechPath Kern was built as an **8-hour hackathon MVP** by a small **2-person team**. The goal was to deliver a complete, demo-ready experience that shows how Kern County students could discover and act on opportunities with clearer guidance than scattered web searches alone.

---

## License

Hackathon MVP — contact the team before production or commercial use.
