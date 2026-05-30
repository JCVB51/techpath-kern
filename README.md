# TechPath Kern

**AI Opportunity Navigator for Kern County Students**

TechPath Kern is a hackathon project designed to help Kern County students discover scholarships, internships, hackathons, STEM programs, summer opportunities, and career pathways they might otherwise miss.

The project is focused on students in Kern County, California, especially high school students, college students, first-generation students, low-income students, and students interested in technology, computer science, AI, engineering, or STEM careers.

---

## Project Purpose

Many students miss valuable academic and career opportunities because information is scattered across many websites, deadlines are hard to track, and eligibility requirements can be confusing.

TechPath Kern helps students find relevant opportunities by allowing them to enter a short profile and receive personalized recommendations, simple eligibility explanations, application checklists, and a 30-day action plan.

---

## Problem Statement

Kern County students often miss scholarships, internships, STEM programs, hackathons, and career-building opportunities because:

- Opportunities are spread across many different websites.
- Deadlines are difficult to track.
- Eligibility requirements are often confusing.
- Students may not know what local or regional opportunities exist.
- First-generation and low-income students may not have enough guidance on applications, essays, or career pathways.

---

## Solution

TechPath Kern uses AI-assisted matching to connect students with opportunities that fit their background, interests, skills, and goals.

Students can enter information such as:

- GPA
- Grade level
- School or city
- Career interests
- Skills
- Career goals
- Optional eligibility information

The app then returns:

- Matching scholarships
- Internship opportunities
- Hackathons and STEM events
- Summer programs
- Simple eligibility explanations
- Application checklists
- Essay topic ideas
- A personalized 30-day action plan

---

## Example Use Case

A student enters:

> I am a CS student from Bakersfield interested in AI.

TechPath Kern can return:

- Local or regional scholarships related to computer science or STEM
- Internship or technology opportunity suggestions
- Hackathons or coding events
- Recommended skills to learn
- A roadmap toward becoming a machine learning engineer
- Action steps for the next 30 days

---

## Target Users

TechPath Kern is designed for:

- High school students in Kern County
- College students in Kern County
- First-generation college students
- Low-income students
- Students interested in technology, AI, computer science, engineering, or STEM
- Students who need help understanding scholarships and career pathways

---

## Key Features

### Student Profile Form

Students enter basic academic and career information so the app can personalize recommendations.

### Opportunity Matching

The app matches students with relevant scholarships, internships, STEM programs, hackathons, and other opportunities.

### Simple Eligibility Explanations

The app explains why a student may be a good match for each opportunity using clear and simple language.

### Application Checklists

Each opportunity can include a checklist of possible application materials, such as essays, transcripts, recommendation letters, resumes, or forms.

### 30-Day Action Plan

The app generates a short roadmap with practical next steps the student can take over the next month.

---

## AI/ML Component

TechPath Kern uses AI to assist with:

- Matching students to opportunities
- Explaining eligibility requirements
- Summarizing opportunity descriptions
- Suggesting essay topics
- Generating personalized learning and career roadmaps

For the hackathon MVP, the project uses a curated opportunity dataset and AI-assisted explanations instead of training a custom machine learning model.

---

## Hackathon Tracks

This project aligns with the following hackathon themes:

### AI + ML

Uses AI to personalize opportunity discovery, explain eligibility, and generate student roadmaps.

### Social Impact

Helps reduce opportunity gaps for students who may not have easy access to college and career guidance.

### Education

Supports college readiness, STEM exploration, scholarship preparation, and career planning.

### Open Track

Can expand into a broader platform for local jobs, mentorship, school programs, and community resources.

---

## Minimum Viable Product

The first version of TechPath Kern will include:

- A student profile form
- A curated opportunity dataset
- A results page with matched opportunities
- Simple match explanations
- Application checklist suggestions
- A 30-day action plan

---

## Tech Stack

Planned stack:

- React
- Vite
- JavaScript
- CSS or Tailwind CSS
- JSON-based opportunity data
- Optional AI API integration

---

## Suggested Project Structure

```txt
techpath-kern/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StudentForm.jsx
│   │   ├── OpportunityCard.jsx
│   │   ├── ResultsSection.jsx
│   │   └── RoadmapCard.jsx
│   ├── data/
│   │   └── opportunities.json
│   ├── utils/
│   │   ├── matchOpportunities.js
│   │   └── sampleProfiles.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── README.md
├── package.json
└── vite.config.js
