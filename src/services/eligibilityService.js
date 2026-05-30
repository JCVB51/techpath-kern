// Helper functions that explain eligibility in simple, student-friendly language.

const KERN_AREA_KEYWORDS = [
  'kern',
  'bakersfield',
  'delano',
  'wasco',
  'shafter',
  'arvin',
  'tehachapi',
  'ridgecrest',
  'taft',
  'mc farland',
  'mcfarland',
]

function normalizeText(text) {
  return (text || '').toLowerCase().trim()
}

function parseGpa(gpaValue) {
  const gpa = parseFloat(gpaValue)
  return Number.isNaN(gpa) ? null : gpa
}

function splitList(text) {
  return normalizeText(text)
    .split(/[,;/]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function textIncludesKeyword(text, keywords) {
  const normalized = normalizeText(text)
  return keywords.some((keyword) => normalized.includes(keyword))
}

function countKeywordMatches(studentText, opportunityList) {
  const studentWords = splitList(studentText).join(' ')
  let matches = 0

  for (const item of opportunityList) {
    const keyword = normalizeText(item)
    if (studentWords.includes(keyword) || keyword.split(' ').some((word) => studentWords.includes(word))) {
      matches += 1
    }
  }

  return matches
}

function isKernCountyStudent(city) {
  return textIncludesKeyword(city, KERN_AREA_KEYWORDS)
}

function isGradeLevelEligible(gradeLevel, allowedGradeLevels) {
  if (!gradeLevel) return false
  return allowedGradeLevels.includes(gradeLevel)
}

function isGpaEligible(gpaValue, minimumGpa) {
  const gpa = parseGpa(gpaValue)

  if (minimumGpa === 0) return true
  if (gpa === null) return false

  return gpa >= minimumGpa
}

/**
 * Returns a list of requirements the student may still need to meet.
 */
export function getMissingRequirements(studentProfile, opportunity) {
  const missing = []

  if (!isGradeLevelEligible(studentProfile.gradeLevel, opportunity.gradeLevels)) {
    missing.push(
      `This opportunity is open to: ${opportunity.gradeLevels.join(', ')}. Your grade level is ${studentProfile.gradeLevel || 'not listed'}.`,
    )
  }

  const studentGpa = parseGpa(studentProfile.gpa)
  if (opportunity.minimumGpa > 0) {
    if (studentGpa === null) {
      missing.push('Add a valid GPA so we can check if you meet the minimum requirement.')
    } else if (studentGpa < opportunity.minimumGpa) {
      missing.push(
        `Minimum GPA is ${opportunity.minimumGpa}. Your GPA is ${studentGpa}.`,
      )
    }
  }

  const interestMatches = countKeywordMatches(
    `${studentProfile.careerInterest} ${studentProfile.careerGoal}`,
    opportunity.interests,
  )
  if (interestMatches === 0) {
    missing.push(
      `This opportunity focuses on: ${opportunity.interests.slice(0, 3).join(', ')}. Your career interest may not align closely yet.`,
    )
  }

  const skillMatches = countKeywordMatches(studentProfile.skills, opportunity.skills)
  if (skillMatches === 0) {
    missing.push(
      `Helpful skills include: ${opportunity.skills.slice(0, 3).join(', ')}. Consider building these skills over time.`,
    )
  }

  if (
    textIncludesKeyword(opportunity.location, ['bakersfield', 'kern']) &&
    studentProfile.city &&
    !isKernCountyStudent(studentProfile.city)
  ) {
    missing.push(
      `This is a local Kern County opportunity. Confirm that ${studentProfile.city} meets any residency requirements.`,
    )
  }

  return missing
}

/**
 * Returns a simple explanation of why a student may or may not qualify.
 */
export function explainEligibility(studentProfile, opportunity) {
  const reasons = []
  const missing = getMissingRequirements(studentProfile, opportunity)

  if (isGradeLevelEligible(studentProfile.gradeLevel, opportunity.gradeLevels)) {
    reasons.push(`Your grade level (${studentProfile.gradeLevel}) fits this opportunity.`)
  }

  if (isGpaEligible(studentProfile.gpa, opportunity.minimumGpa)) {
    if (opportunity.minimumGpa > 0) {
      reasons.push(`Your GPA meets the minimum requirement of ${opportunity.minimumGpa}.`)
    } else {
      reasons.push('There is no minimum GPA requirement for this opportunity.')
    }
  }

  const interestMatches = countKeywordMatches(
    `${studentProfile.careerInterest} ${studentProfile.careerGoal}`,
    opportunity.interests,
  )
  if (interestMatches > 0) {
    reasons.push(
      `Your career interest connects with topics like ${opportunity.interests.slice(0, 2).join(' and ')}.`,
    )
  }

  const skillMatches = countKeywordMatches(studentProfile.skills, opportunity.skills)
  if (skillMatches > 0) {
    reasons.push('Some of your listed skills match what this opportunity looks for.')
  }

  if (isKernCountyStudent(studentProfile.city)) {
    reasons.push(`Because you are in ${studentProfile.city}, local Kern County opportunities are especially relevant.`)
  }

  if (reasons.length === 0 && missing.length > 0) {
    return 'You may still be able to apply, but you should review the requirements carefully before starting.'
  }

  if (reasons.length === 0) {
    return 'This opportunity may be worth exploring. Compare your profile with the listed requirements.'
  }

  return reasons.join(' ')
}
