/**
 * Builds a simple 30-day roadmap based on the student profile and top matches.
 */
export function generateRoadmap(studentProfile, matchedOpportunities) {
  const firstName = studentProfile.name ? studentProfile.name.split(' ')[0] : 'Student'
  const careerInterest = studentProfile.careerInterest || 'your career interest'
  const topMatches = matchedOpportunities.slice(0, 3)
  const topMatchNames = topMatches.map((item) => item.name)
  const topMatchList =
    topMatchNames.length > 0
      ? topMatchNames.join(', ')
      : 'the opportunities in your results'

  const highPriorityChecklist = topMatches.flatMap((item) => item.checklist.slice(0, 1))

  return [
    {
      week: 'Week 1',
      steps: [
        {
          title: 'Review your top matches',
          description: `${firstName}, start by reading the details for ${topMatchList}. Write down deadlines and eligibility notes for each one.`,
        },
        {
          title: 'Pick two priority opportunities',
          description:
            'Choose one opportunity you feel confident about and one that stretches your goals. Focus on quality over quantity.',
        },
        {
          title: 'Create a simple tracking sheet',
          description:
            'List each opportunity, its deadline, required materials, and status (not started, in progress, submitted).',
        },
      ],
    },
    {
      week: 'Week 2',
      steps: [
        {
          title: 'Start your application materials',
          description:
            'Begin your resume, personal statement, or project portfolio. Use the checklists from your matched opportunities as a guide.',
        },
        {
          title: 'Gather school documents',
          description:
            'Request transcripts, ask a teacher or mentor for a recommendation letter, and collect any GPA or enrollment proof you may need.',
        },
        {
          title: 'Draft your first essay or cover letter',
          description: `Write a first draft explaining why you are interested in ${careerInterest} and how this opportunity supports your goals.`,
        },
      ],
    },
    {
      week: 'Week 3',
      steps: [
        {
          title: 'Build skills connected to your goals',
          description: `Spend time practicing skills related to ${careerInterest}. Try a free online tutorial, school club, or small personal project.`,
        },
        {
          title: 'Get feedback on your materials',
          description:
            'Ask a teacher, counselor, family member, or friend to review your resume or essay and suggest improvements.',
        },
        {
          title: 'Prepare for interviews or events',
          description:
            'If any matched opportunities involve interviews, hackathons, or workshops, practice introducing yourself and your goals.',
        },
      ],
    },
    {
      week: 'Week 4',
      steps: [
        {
          title: 'Submit at least one application',
          description:
            highPriorityChecklist.length > 0
              ? `Complete key checklist items such as: ${highPriorityChecklist.slice(0, 2).join('; ')}.`
              : 'Submit at least one application or registration form from your matched opportunities.',
        },
        {
          title: 'Follow up and stay organized',
          description:
            'Confirm that your submissions were received, set reminders for upcoming deadlines, and note any next steps.',
        },
        {
          title: 'Plan your next month',
          description: `Keep exploring ${careerInterest} opportunities in Kern County. Save new programs, scholarships, and events to revisit later.`,
        },
      ],
    },
  ]
}

export default generateRoadmap
