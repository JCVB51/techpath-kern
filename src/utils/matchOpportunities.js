import {
  explainEligibility,
  getMissingRequirements,
} from '../services/eligibilityService.js'

const MAX_SCORE = 100

function parseGpa(gpaValue) {
  const gpa = parseFloat(gpaValue)
  return Number.isNaN(gpa) ? null : gpa
}

function splitList(text) {
  return (text || '')
    .toLowerCase()
    .split(/[,;/]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function countMatches(studentText, opportunityItems) {
  const studentWords = splitList(studentText).join(' ')
  let matches = 0

  for (const item of opportunityItems) {
    const keyword = item.toLowerCase()
    const keywordParts = keyword.split(' ')

    if (
      studentWords.includes(keyword) ||
      keywordParts.some((part) => part.length > 2 && studentWords.includes(part))
    ) {
      matches += 1
    }
  }

  return matches
}

function isKernCountyCity(city) {
  const normalized = (city || '').toLowerCase()
  const kernKeywords = ['kern', 'bakersfield', 'delano', 'wasco', 'shafter', 'arvin', 'tehachapi']
  return kernKeywords.some((keyword) => normalized.includes(keyword))
}

function scoreOpportunity(studentProfile, opportunity) {
  let score = 0
  const reasons = []

  // Grade level match (up to 20 points)
  if (opportunity.gradeLevels.includes(studentProfile.gradeLevel)) {
    score += 20
    reasons.push(`Your grade level (${studentProfile.gradeLevel}) is eligible.`)
  }

  // GPA match (up to 20 points)
  const studentGpa = parseGpa(studentProfile.gpa)
  if (opportunity.minimumGpa === 0) {
    score += 10
  } else if (studentGpa !== null && studentGpa >= opportunity.minimumGpa) {
    score += 20
    reasons.push(`Your GPA of ${studentGpa} meets the minimum of ${opportunity.minimumGpa}.`)
  } else if (studentGpa !== null && studentGpa >= opportunity.minimumGpa - 0.3) {
    score += 10
    reasons.push(`Your GPA is close to the minimum requirement.`)
  }

  // Career interest match (up to 25 points)
  const interestText = `${studentProfile.careerInterest} ${studentProfile.careerGoal}`
  const interestMatches = countMatches(interestText, opportunity.interests)
  if (interestMatches >= 2) {
    score += 25
    reasons.push(`Your career interest strongly matches ${opportunity.interests.slice(0, 2).join(' and ')}.`)
  } else if (interestMatches === 1) {
    score += 15
    reasons.push(`Your career interest relates to this ${opportunity.type.toLowerCase()}.`)
  }

  // Skills match (up to 20 points)
  const skillMatches = countMatches(studentProfile.skills, opportunity.skills)
  if (skillMatches >= 2) {
    score += 20
    reasons.push('Several of your skills match what this opportunity looks for.')
  } else if (skillMatches === 1) {
    score += 10
    reasons.push('At least one of your skills is relevant here.')
  }

  // Local Kern County relevance (up to 15 points)
  const localOpportunity =
    opportunity.location.toLowerCase().includes('kern') ||
    opportunity.location.toLowerCase().includes('bakersfield')

  if (localOpportunity && isKernCountyCity(studentProfile.city)) {
    score += 15
    reasons.push(`This is a local opportunity near ${studentProfile.city}.`)
  } else if (localOpportunity) {
    score += 5
    reasons.push('This opportunity serves students in Kern County.')
  }

  return { score: Math.min(score, MAX_SCORE), reasons }
}

function getMatchLevel(score, missingRequirements) {
  if (score >= 70 && missingRequirements.length <= 1) return 'High'
  if (score >= 45) return 'Medium'
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
