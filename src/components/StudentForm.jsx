import { useState } from 'react'

const initialFormState = {
  name: '',
  city: '',
  gradeLevel: '',
  gpa: '',
  careerInterest: '',
  skills: '',
  careerGoal: '',
}

export const demoStudentProfile = {
  name: 'Maria Lopez',
  city: 'Bakersfield',
  gradeLevel: '11th Grade',
  gpa: '3.5',
  careerInterest: 'Artificial Intelligence',
  skills: 'Python, teamwork',
  careerGoal: 'Become a machine learning engineer',
}

function validateForm(data) {
  const errors = {}

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Your name should be at least 2 characters.'
  }

  if (!data.city.trim()) {
    errors.city = 'Please enter your city (e.g. Bakersfield).'
  }

  if (!data.gradeLevel) {
    errors.gradeLevel = 'Please select your grade level.'
  }

  const gpa = parseFloat(data.gpa)
  if (!data.gpa.trim()) {
    errors.gpa = 'Please enter your GPA (e.g. 3.5).'
  } else if (Number.isNaN(gpa) || gpa < 0 || gpa > 5) {
    errors.gpa = 'GPA should be a number between 0.0 and 5.0.'
  }

  if (!data.careerInterest.trim()) {
    errors.careerInterest = 'Please enter at least one career interest.'
  }

  if (!data.skills.trim()) {
    errors.skills = 'Please list at least one skill.'
  }

  if (!data.careerGoal.trim()) {
    errors.careerGoal = 'Please share a short career goal.'
  } else if (data.careerGoal.trim().length < 10) {
    errors.careerGoal = 'Try writing a little more about your goal (at least 10 characters).'
  }

  return errors
}

function StudentForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [showFormHint, setShowFormHint] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setShowFormHint(true)
      return
    }

    setErrors({})
    setShowFormHint(false)
    onSubmit(formData)
  }

  function handleDemoClick() {
    setFormData(demoStudentProfile)
    setErrors({})
    setShowFormHint(false)
  }

  function fieldClass(fieldName, fullWidth = false) {
    const classes = ['form-field']
    if (fullWidth) classes.push('form-field--full')
    if (errors[fieldName]) classes.push('form-field--invalid')
    return classes.join(' ')
  }

  return (
    <section className="card form-section">
      <h2 className="section-title">Student Profile</h2>
      <p className="section-subtitle">
        Tell us a little about yourself so we can suggest opportunities that
        fit your background and goals.
      </p>

      {showFormHint && Object.keys(errors).length > 0 && (
        <p className="form-message form-message--error" role="alert">
          Please fix the highlighted fields below — we want to make sure your
          matches are accurate.
        </p>
      )}

      <form className="student-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className={fieldClass('name')}>
            <span>Student Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Maria Lopez"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span className="field-error" id="name-error">
                {errors.name}
              </span>
            )}
          </label>

          <label className={fieldClass('city')}>
            <span>City</span>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Bakersfield"
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? 'city-error' : undefined}
            />
            {errors.city && (
              <span className="field-error" id="city-error">
                {errors.city}
              </span>
            )}
          </label>

          <label className={fieldClass('gradeLevel')}>
            <span>Grade Level</span>
            <select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              aria-invalid={Boolean(errors.gradeLevel)}
              aria-describedby={errors.gradeLevel ? 'gradeLevel-error' : undefined}
            >
              <option value="">Select grade level</option>
              <option value="9th Grade">9th Grade</option>
              <option value="10th Grade">10th Grade</option>
              <option value="11th Grade">11th Grade</option>
              <option value="12th Grade">12th Grade</option>
              <option value="College Freshman">College Freshman</option>
              <option value="College Sophomore">College Sophomore</option>
              <option value="College Junior">College Junior</option>
              <option value="College Senior">College Senior</option>
            </select>
            {errors.gradeLevel && (
              <span className="field-error" id="gradeLevel-error">
                {errors.gradeLevel}
              </span>
            )}
          </label>

          <label className={fieldClass('gpa')}>
            <span>GPA</span>
            <input
              type="text"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="e.g. 3.5"
              inputMode="decimal"
              aria-invalid={Boolean(errors.gpa)}
              aria-describedby={errors.gpa ? 'gpa-error' : undefined}
            />
            {errors.gpa && (
              <span className="field-error" id="gpa-error">
                {errors.gpa}
              </span>
            )}
          </label>

          <label className={fieldClass('careerInterest', true)}>
            <span>Career Interest</span>
            <input
              type="text"
              name="careerInterest"
              value={formData.careerInterest}
              onChange={handleChange}
              placeholder="e.g. Artificial Intelligence, Software Engineering"
              aria-invalid={Boolean(errors.careerInterest)}
              aria-describedby={errors.careerInterest ? 'careerInterest-error' : undefined}
            />
            {errors.careerInterest && (
              <span className="field-error" id="careerInterest-error">
                {errors.careerInterest}
              </span>
            )}
          </label>

          <label className={fieldClass('skills', true)}>
            <span>Skills</span>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. Python, teamwork, public speaking"
              aria-invalid={Boolean(errors.skills)}
              aria-describedby={errors.skills ? 'skills-error' : undefined}
            />
            {errors.skills && (
              <span className="field-error" id="skills-error">
                {errors.skills}
              </span>
            )}
          </label>

          <label className={fieldClass('careerGoal', true)}>
            <span>Career Goal</span>
            <textarea
              name="careerGoal"
              value={formData.careerGoal}
              onChange={handleChange}
              rows="3"
              placeholder="e.g. I want to become a machine learning engineer and work on AI tools that help my community."
              aria-invalid={Boolean(errors.careerGoal)}
              aria-describedby={errors.careerGoal ? 'careerGoal-error' : undefined}
            />
            {errors.careerGoal && (
              <span className="field-error" id="careerGoal-error">
                {errors.careerGoal}
              </span>
            )}
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            Find My Opportunities
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleDemoClick}
          >
            Use Demo Profile
          </button>
        </div>
      </form>
    </section>
  )
}

export default StudentForm
