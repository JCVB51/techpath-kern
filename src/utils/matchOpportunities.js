import {
  explainEligibility,
  getMissingRequirements,
} from '../services/eligibilityService.js'

const MAX_SCORE = 100

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
  'engineering',
  'developer',
]

const INTEREST_ALIASES = {
  ai: ['artificial intelligence', 'machine learning', 'data science'],
  cs: ['computer science', 'software', 'programming', 'coding'],
  engineering: ['engineering', 'robotics', 'mechanical', 'electrical'],
  healthcare: ['healthcare', 'health', 'nursing', 'medical', 'biology'],
  agtech: ['agriculture', 'agtech', 'farm', 'agricultural'],
}

function parseGpa(gpaValue) {
  const gpa = parseFloat(gpaValue)
  return Number.isNaN(gpa) ? null : gpa
}

function normalizeText(text) {
  return (text || '').toLowerCase().trim()
}

function splitList(text) {
  return normalizeText(text)
    .split(/[,;/]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function expandKeywords(text) {
  const normalized = normalizeText(text)
  const expanded = new Set([normalized])

  for (const [key, aliases] of Object.entries(INTEREST_ALIASES)) {
    if (normalized.includes(key) || aliases.some((alias) => normalized.includes(alias))) {
      expanded.add(key)
      aliases.forEach((alias) => expanded.add(alias))
    }
  }

  return [...expanded]
}

function countMatches(studentText, opportunityItems) {
  const studentWords = expandKeywords(splitList(studentText).join(' ')).join(' ')
  let matches = 0

  for (const item of opportunityItems) {
    const keywords = expandKeywords(item)
    const matched = keywords.some((keyword) => {
      const parts = keyword.split(' ').filter((part) => part.length > 2)
      return studentWords.includes(keyword) || parts.some((part) => studentWords.includes(part))
    })

    if (matched) matches += 1
  }

  return matches
}

function countTagMatches(studentProfile, eligibilityTags) {
  const profileText = normalizeText(
    `${studentProfile.careerInterest} ${studentProfile.careerGoal} ${studentProfile.skills} ${studentProfile.city} ${studentProfile.gradeLevel}`,
  )
  let matches = 0

  for (const tag of eligibilityTags || []) {
    const tagWords = normalizeText(tag).split(/[\s-]+/).filter((word) => word.length > 2)
    if (tagWords.some((word) => profileText.includes(word))) {
      matches += 1
    }
  }

  return matches
}

function isKernCountyCity(city) {
  const normalized = normalizeText(city)
  const kernKeywords = [
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
  ]
  return kernKeywords.some((keyword) => normalized.includes(keyword))
}

function isLocalOpportunity(location) {
  const loc = normalizeText(location)
  return (
    loc.includes('kern') ||
    loc.includes('bakersfield') ||
    loc.includes('central valley')
  )
}

function hasStemRelevance(studentProfile, opportunity) {
  const profileText = normalizeText(
    `${studentProfile.careerInterest} ${studentProfile.skills} ${studentProfile.careerGoal}`,
  )
  const opportunityText = normalizeText(
    `${opportunity.interests.join(' ')} ${opportunity.type} ${opportunity.description}`,
  )

  const studentStem = STEM_KEYWORDS.some((keyword) => profileText.includes(keyword))
  const opportunityStem =
    STEM_KEYWORDS.some((keyword) => opportunityText.includes(keyword)) ||
    normalizeText(opportunity.type).includes('stem')

  return studentStem && opportunityStem
}

function scoreOpportunity(studentProfile, opportunity) {
  let score = 0
  const reasons = []

  // Grade level match (up to 18 points)
  if (opportunity.gradeLevels.includes(studentProfile.gradeLevel)) {
    score += 18
    reasons.push(
      `You are a strong fit because your grade level (${studentProfile.gradeLevel}) is listed as eligible.`,
    )
  } else {
    score += 3
  }

  // GPA match (up to 18 points)
  const studentGpa = parseGpa(studentProfile.gpa)
  if (opportunity.minimumGpa === 0) {
    score += 10
  } else if (studentGpa !== null && studentGpa >= opportunity.minimumGpa) {
    score += 18
    reasons.push(
      `You are a strong fit because your GPA of ${studentGpa} meets the listed minimum of ${opportunity.minimumGpa}.`,
    )
  } else if (studentGpa !== null && studentGpa >= opportunity.minimumGpa - 0.3) {
    score += 8
    reasons.push(
      `Your GPA of ${studentGpa} is close to the listed minimum — this could still be worth reviewing.`,
    )
  }

  // Career interest match (up to 22 points)
  const interestText = `${studentProfile.careerInterest} ${studentProfile.careerGoal}`
  const interestMatches = countMatches(interestText, opportunity.interests)
  if (interestMatches >= 2) {
    score += 22
    reasons.push(
      `You are a strong fit because your career interest aligns with ${opportunity.interests.slice(0, 2).join(' and ')}.`,
    )
  } else if (interestMatches === 1) {
    score += 14
    reasons.push(
      `Your career interest connects with ${opportunity.interests[0]} — a good match for this ${opportunity.type.toLowerCase()}.`,
    )
  }

  // Skills match (up to 18 points)
  const skillMatches = countMatches(studentProfile.skills, opportunity.skills)
  if (skillMatches >= 2) {
    score += 18
    reasons.push('You are a strong fit because several of your skills match what this opportunity values.')
  } else if (skillMatches === 1) {
    score += 10
    reasons.push('At least one of your listed skills is relevant here.')
  }

  // Location relevance (up to 12 points)
  if (isLocalOpportunity(opportunity.location) && isKernCountyCity(studentProfile.city)) {
    score += 12
    reasons.push(
      `Because you are in ${studentProfile.city}, this local Kern County opportunity is especially relevant.`,
    )
  } else if (isLocalOpportunity(opportunity.location)) {
    score += 5
    reasons.push('This opportunity serves students in Kern County and the Central Valley.')
  }

  // Eligibility tag match (up to 12 points)
  const tagMatches = countTagMatches(studentProfile, opportunity.eligibilityTags)
  if (tagMatches >= 2) {
    score += 12
    reasons.push('Your profile aligns with several eligibility areas for this opportunity.')
  } else if (tagMatches === 1) {
    score += 6
  }

  // Broad STEM/tech relevance bonus (up to 10 points)
  if (hasStemRelevance(studentProfile, opportunity)) {
    score += 10
    reasons.push('Your STEM and technology background makes this a natural opportunity to explore.')
  }

  return { score: Math.min(score, MAX_SCORE), reasons }
}

function getMatchLevel(score, missingRequirements) {
  const hardGaps = missingRequirements.filter(
    (note) =>
      note.includes('grade level') ||
      (note.includes('minimum GPA is') && !note.includes('could still be worth reviewing')),
  ).length

  if (score >= 72 && hardGaps <= 1) return 'High'
  if (score >= 48) return 'Medium'
  return 'Low'
}

function buildWhyItMatches(reasons, opportunity, studentProfile) {
  if (reasons.length > 0) {
    return reasons.slice(0, 3).join(' ')
  }

  return explainEligibility(studentProfile, opportunity)
}

/**
 * Compares a student profile against opportunities and returns ranked matches.
 */
export function matchOpportunities(studentProfile, opportunities) {
  const matched = opportunities.map((opportunity) => {
    const { score, reasons } = scoreOpportunity(studentProfile, opportunity)
    const missingRequirements = getMissingRequirements(studentProfile, opportunity)
    const matchLevel = getMatchLevel(score, missingRequirements)

    return {
      ...opportunity,
      matchScore: score,
      matchLevel,
      whyItMatches: buildWhyItMatches(reasons, opportunity, studentProfile),
      missingRequirements,
    }
  })

  return matched.sort((a, b) => b.matchScore - a.matchScore)
}

export default matchOpportunities
