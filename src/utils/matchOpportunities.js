/**
 * Simple client-side matching for the TechPath Kern MVP.
 * Scores each opportunity against a student profile and returns sorted results.
 */

function normalizeText(text) {
  return (text || '').toLowerCase().trim()
}

function parseGpa(gpa) {
  const value = parseFloat(gpa)
  return Number.isFinite(value) ? value : 0
}

function isCollegeGrade(gradeLevel) {
  const grade = normalizeText(gradeLevel)
  return grade.includes('college')
}

function isHighSchoolGrade(gradeLevel) {
  const grade = normalizeText(gradeLevel)
  return grade.includes('grade') && !grade.includes('college')
}

function gradeMatches(profileGrade, eligibleGrades) {
  if (!eligibleGrades || eligibleGrades.length === 0) {
    return true
  }

  if (eligibleGrades.includes('All')) {
    return true
  }

  if (eligibleGrades.includes(profileGrade)) {
    return true
  }

  const profileIsCollege = isCollegeGrade(profileGrade)
  const profileIsHighSchool = isHighSchoolGrade(profileGrade)

  if (profileIsCollege && eligibleGrades.includes('College')) {
    return true
  }

  if (profileIsHighSchool && eligibleGrades.includes('High School')) {
    return true
  }

  return false
}

function locationMatches(city, location) {
  const studentCity = normalizeText(city)
  const opportunityLocation = normalizeText(location)

  if (!studentCity || !opportunityLocation) {
    return false
  }

  if (
    opportunityLocation.includes('kern county') ||
    opportunityLocation.includes('central valley')
  ) {
    return (
      studentCity.includes('bakersfield') ||
      studentCity.includes('kern') ||
      studentCity.includes('delano') ||
      studentCity.includes('wasco') ||
      studentCity.includes('shafter') ||
      studentCity.includes('tehachapi') ||
      studentCity.includes('ridgecrest')
    )
  }

  return (
    studentCity.includes(opportunityLocation) ||
    opportunityLocation.includes(studentCity)
  )
}

function countTagMatches(studentText, tags) {
  const text = normalizeText(studentText)

  if (!text || !tags || tags.length === 0) {
    return 0
  }

  let matches = 0

  for (const tag of tags) {
    const normalizedTag = normalizeText(tag)
    if (normalizedTag && text.includes(normalizedTag)) {
      matches += 1
    }
  }

  return matches
}

function getMatchLevel(score) {
  if (score >= 75) {
    return 'Excellent Match'
  }

  if (score >= 50) {
    return 'Strong Match'
  }

  return 'Good Match'
}

function scoreOpportunity(profile, opportunity) {
  let score = 0

  // Location match (up to 20 points)
  if (locationMatches(profile.city, opportunity.location)) {
    score += 20
  } else if (normalizeText(opportunity.location).includes('kern county')) {
    score += 10
  }

  // Grade level match (up to 20 points)
  if (gradeMatches(profile.gradeLevel, opportunity.eligibleGrades)) {
    score += 20
  }

  // GPA match (up to 15 points)
  const studentGpa = parseGpa(profile.gpa)
  const minGpa = opportunity.minGpa ?? 0

  if (minGpa === 0) {
    score += 10
  } else if (studentGpa >= minGpa) {
    score += 15
  } else if (studentGpa >= minGpa - 0.3) {
    score += 8
  }

  const tags = opportunity.tags || []
  const studentKeywords = [
    profile.careerInterest,
    profile.skills,
    profile.careerGoal,
  ].join(' ')

  // Career interest + tags (up to 20 points)
  const interestMatches = countTagMatches(profile.careerInterest, tags)
  score += Math.min(interestMatches * 7, 20)

  // Skills + tags (up to 15 points)
  const skillMatches = countTagMatches(profile.skills, tags)
  score += Math.min(skillMatches * 5, 15)

  // Career goal + tags (up to 10 points)
  const goalMatches = countTagMatches(profile.careerGoal, tags)
  score += Math.min(goalMatches * 5, 10)

  // Bonus if any tag appears anywhere in the full profile (up to 10 points)
  const overallMatches = countTagMatches(studentKeywords, tags)
  if (overallMatches > 0) {
    score += Math.min(overallMatches * 2, 10)
  }

  const matchScore = Math.min(Math.round(score), 100)

  return {
    ...opportunity,
    matchScore,
    matchLevel: getMatchLevel(matchScore),
  }
}

export function matchOpportunities(profile, opportunities) {
  const scored = opportunities.map((opportunity) =>
    scoreOpportunity(profile, opportunity),
  )

  return scored.sort((a, b) => b.matchScore - a.matchScore)
}

export default matchOpportunities
