// Helper functions that explain eligibility in simple, encouraging language.

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
  'mcfarland',
  'lamont',
  'rosamond',
]

const STEM_KEYWORDS = [
  'stem',
  'science',
  'technology',
  'engineering',
  'math',
  'computer',
  'coding',
  'programming',
  'software',
  'ai',
  'artificial intelligence',
  'machine learning',
  'data',
  'robotics',
  'cyber',
  'tech',
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
    const parts = keyword.split(' ').filter((word) => word.length > 2)

    if (studentWords.includes(keyword) || parts.some((word) => studentWords.includes(word))) {
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

function isStemStudent(studentProfile) {
  const profileText = normalizeText(
    `${studentProfile.careerInterest} ${studentProfile.skills} ${studentProfile.careerGoal}`,
  )
  return STEM_KEYWORDS.some((keyword) => profileText.includes(keyword))
}

/**
 * Returns supportive notes about things the student may want to double-check.
 */
export function getMissingRequirements(studentProfile, opportunity) {
  const notes = []

  if (!isGradeLevelEligible(studentProfile.gradeLevel, opportunity.gradeLevels)) {
    notes.push(
      `You may need to double-check grade level — this opportunity lists: ${opportunity.gradeLevels.slice(0, 4).join(', ')}${opportunity.gradeLevels.length > 4 ? ', and others' : ''}. Your profile shows ${studentProfile.gradeLevel || 'no grade selected'}.`,
    )
  }

  const studentGpa = parseGpa(studentProfile.gpa)
  if (opportunity.minimumGpa > 0) {
    if (studentGpa === null) {
      notes.push(
        'You may need to double-check your GPA — adding a valid number helps confirm eligibility.',
      )
    } else if (studentGpa < opportunity.minimumGpa) {
      notes.push(
        `This could still be worth reviewing if you meet other requirements — the listed minimum GPA is ${opportunity.minimumGpa} and your profile shows ${studentGpa}. Some programs allow appeals or look at your full application.`,
      )
    }
  }

  const interestMatches = countKeywordMatches(
    `${studentProfile.careerInterest} ${studentProfile.careerGoal}`,
    opportunity.interests,
  )
  if (interestMatches === 0) {
    notes.push(
      `This opportunity focuses on areas like ${opportunity.interests.slice(0, 3).join(', ')}. It could still be worth exploring if you want to try something new in that field.`,
    )
  }

  const skillMatches = countKeywordMatches(studentProfile.skills, opportunity.skills)
  if (skillMatches === 0) {
    notes.push(
      `Helpful skills for this opportunity include ${opportunity.skills.slice(0, 3).join(', ')}. Many programs welcome beginners who are willing to learn.`,
    )
  }

  if (
    textIncludesKeyword(opportunity.location, ['bakersfield', 'kern', 'central valley']) &&
    studentProfile.city &&
    !isKernCountyStudent(studentProfile.city)
  ) {
    notes.push(
      `This is a Kern County–focused opportunity. You may need to double-check whether students from ${studentProfile.city} are eligible for local residency requirements.`,
    )
  }

  const tagText = normalizeText(
    `${studentProfile.careerInterest} ${studentProfile.careerGoal} ${studentProfile.skills}`,
  )
  const firstGenTag = opportunity.eligibilityTags.some((tag) =>
    normalizeText(tag).includes('first-generation'),
  )
  if (firstGenTag && !tagText.includes('first') && !tagText.includes('first-gen')) {
    notes.push(
      'This program supports first-generation students. If that describes you, it could be an especially good fit — you may want to confirm eligibility on the application page.',
    )
  }

  return notes
}

/**
 * Returns an encouraging explanation of why a student may be a good match.
 */
export function explainEligibility(studentProfile, opportunity) {
  const strengths = []

  if (isGradeLevelEligible(studentProfile.gradeLevel, opportunity.gradeLevels)) {
    strengths.push(
      `You are a strong fit because your grade level (${studentProfile.gradeLevel}) matches what this opportunity accepts.`,
    )
  }

  const studentGpa = parseGpa(studentProfile.gpa)
  if (opportunity.minimumGpa === 0) {
    strengths.push('You are a strong fit because there is no minimum GPA requirement listed.')
  } else if (isGpaEligible(studentProfile.gpa, opportunity.minimumGpa)) {
    strengths.push(
      `You are a strong fit because your GPA of ${studentGpa} meets the listed minimum of ${opportunity.minimumGpa}.`,
    )
  } else if (studentGpa !== null && studentGpa >= opportunity.minimumGpa - 0.3) {
    strengths.push(
      `Your GPA of ${studentGpa} is close to the listed minimum of ${opportunity.minimumGpa} — this could still be worth reviewing alongside your other strengths.`,
    )
  }

  const interestMatches = countKeywordMatches(
    `${studentProfile.careerInterest} ${studentProfile.careerGoal}`,
    opportunity.interests,
  )
  if (interestMatches >= 2) {
    strengths.push(
      `You are a strong fit because your career interest aligns closely with ${opportunity.interests.slice(0, 2).join(' and ')}.`,
    )
  } else if (interestMatches === 1) {
    strengths.push(
      `Your career interest connects with topics like ${opportunity.interests[0]} — a good sign for this ${opportunity.type.toLowerCase()}.`,
    )
  }

  const skillMatches = countKeywordMatches(studentProfile.skills, opportunity.skills)
  if (skillMatches >= 2) {
    strengths.push('You are a strong fit because several of your listed skills match what this opportunity values.')
  } else if (skillMatches === 1) {
    strengths.push('At least one of your skills matches what this opportunity is looking for.')
  }

  if (isKernCountyStudent(studentProfile.city)) {
    strengths.push(
      `Because you are in ${studentProfile.city}, local Kern County opportunities like this one are especially relevant to you.`,
    )
  }

  if (isStemStudent(studentProfile) && countKeywordMatches('stem technology engineering', opportunity.interests) > 0) {
    strengths.push('Your STEM and technology interests make this type of opportunity a natural area to explore.')
  }

  if (strengths.length === 0) {
    return 'This could still be worth reviewing — compare your profile with the listed requirements and reach out to the program contact if you have questions.'
  }

  return strengths.slice(0, 3).join(' ')
}
