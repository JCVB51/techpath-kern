/**
 * Builds a personalized 30-day roadmap based on the student profile and top matches.
 */
export function generateRoadmap(studentProfile, matchedOpportunities) {
  const firstName = studentProfile.name ? studentProfile.name.split(' ')[0] : 'Student'
  const careerInterest = studentProfile.careerInterest || 'your career interest'
  const careerGoal = studentProfile.careerGoal || 'your long-term goals'
  const skills = studentProfile.skills || 'your current skills'
  const city = studentProfile.city || 'Kern County'

  const topMatches = matchedOpportunities.slice(0, 3)
  const topMatchNames = topMatches.map((item) => item.name)
  const topMatchList =
    topMatchNames.length > 0 ? topMatchNames.join(', ') : 'your top matched opportunities'

  const topTypes = [...new Set(topMatches.map((item) => item.type))]
  const hasScholarship = topTypes.includes('Scholarship')
  const hasHackathon = topTypes.includes('Hackathon')
  const hasInternship = topTypes.includes('Internship')
  const hasProgram = topTypes.some((type) =>
    ['STEM Program', 'Summer Program'].includes(type),
  )

  const priorityChecklist = topMatches.flatMap((item) => item.checklist.slice(0, 1))
  const nearestDeadline = topMatches.find((item) => item.deadline !== 'Rolling' && item.deadline !== 'Open year-round')

  let week2Focus = 'Begin your resume, personal statement, or project portfolio using the checklists from your matched opportunities.'
  if (hasScholarship) {
    week2Focus = `Start scholarship materials — draft an essay connecting ${careerInterest} to your goal: "${careerGoal}".`
  } else if (hasInternship) {
    week2Focus = `Update your resume and cover letter highlighting ${skills}, especially for internship opportunities like ${topMatchNames[0] || 'your top match'}.`
  } else if (hasHackathon) {
    week2Focus = 'Form or join a team, pick a simple project idea, and review the hackathon rules and theme for your top match.'
  } else if (hasProgram) {
    week2Focus = 'Complete any program application forms and write a short statement of interest explaining why you want to join.'
  }

  let week3SkillStep = `Practice skills related to ${careerInterest} — try a free online tutorial, school club, or small personal project.`
  if (normalizeIncludes(skills, 'python')) {
    week3SkillStep = `Build on your Python skills with a small project tied to ${careerInterest} — even a simple script or tutorial project counts.`
  } else if (normalizeIncludes(skills, 'javascript')) {
    week3SkillStep = `Try a small JavaScript or web project connected to ${careerInterest} to strengthen your portfolio.`
  } else if (normalizeIncludes(careerInterest, 'health')) {
    week3SkillStep = 'Explore a healthcare STEM resource — shadowing questions, a biology review, or a health careers video series.'
  } else if (normalizeIncludes(careerInterest, 'ag')) {
    week3SkillStep = 'Research one AgTech or agriculture innovation idea in the Central Valley and write down how technology could help local farms.'
  }

  return [
    {
      week: 'Week 1',
      steps: [
        {
          title: 'Review your top 3 matches',
          description: `${firstName}, read the details for ${topMatchList}. Write down each deadline, location, and any tips listed under "Tips before you apply."`,
        },
        {
          title: 'Pick your top two priorities',
          description: hasScholarship
            ? 'Choose one scholarship or grant to focus on first, plus one program or event that builds your skills. Quality beats quantity.'
            : 'Choose one opportunity you feel ready for now and one that stretches your goals — both are worth keeping on your list.',
        },
        {
          title: 'Set up a simple tracker',
          description: nearestDeadline
            ? `Create a tracker with columns for opportunity name, deadline (note: ${nearestDeadline.name} is due ${nearestDeadline.deadline}), materials needed, and status.`
            : 'Create a tracker with columns for opportunity name, deadline, materials needed, and status (not started, in progress, submitted).',
        },
      ],
    },
    {
      week: 'Week 2',
      steps: [
        {
          title: 'Start your application materials',
          description: week2Focus,
        },
        {
          title: 'Gather support documents',
          description:
            'Request your transcript, ask a teacher or counselor for a recommendation letter, and save any GPA or enrollment proof you may need.',
        },
        {
          title: 'Connect with someone in your area',
          description: `Ask a counselor, teacher, or mentor in ${city} about local STEM programs. Kern County has more opportunities than most students realize.`,
        },
      ],
    },
    {
      week: 'Week 3',
      steps: [
        {
          title: 'Strengthen skills for your goal',
          description: week3SkillStep,
        },
        {
          title: 'Get feedback on your work',
          description: `Share your resume, essay, or project idea with someone you trust. Ask: "Does this show why I care about ${careerInterest}?"`,
        },
        {
          title: 'Prepare to show up confidently',
          description: hasHackathon
            ? 'Practice a 30-second intro: your name, school, skills, and what you hope to build. Hackathon teams value clear communicators.'
            : 'Practice a 30-second intro about who you are, what skills you have, and where you want to go — useful for interviews, programs, and networking.',
        },
      ],
    },
    {
      week: 'Week 4',
      steps: [
        {
          title: 'Submit at least one application or registration',
          description:
            priorityChecklist.length > 0
              ? `Take action on your top match — for example: ${priorityChecklist.slice(0, 2).join('; ')}. One completed step is a real win.`
              : 'Submit at least one application or registration from your matched list. Progress matters more than perfection.',
        },
        {
          title: 'Follow up and stay on track',
          description:
            'Confirm submissions were received, set phone reminders for upcoming deadlines, and note any next steps from program contacts.',
        },
        {
          title: 'Plan your next 30 days',
          description: `Keep building toward "${careerGoal}" — save new ${careerInterest} opportunities in Kern County and celebrate what you accomplished this month.`,
        },
      ],
    },
  ]
}

function normalizeIncludes(text, keyword) {
  return (text || '').toLowerCase().includes(keyword.toLowerCase())
}

export default generateRoadmap
