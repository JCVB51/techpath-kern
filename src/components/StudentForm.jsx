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
  name: 'Daniela',
  city: 'Bakersfield',
  gradeLevel: 'College Student',
  gpa: '3.6',
  careerInterest: 'Computer Science / AI',
  skills: 'JavaScript, teamwork, problem solving',
  careerGoal:
    'I want to become a machine learning engineer and build AI tools that help my community.',
}

function StudentForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormState)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(formData)
  }

  function handleDemoClick() {
    setFormData(demoStudentProfile)
    onSubmit(demoStudentProfile)
  }

  return (
    <section className="card form-section">
      <h2 className="section-title">Student Profile</h2>
      <p className="section-subtitle">
        Tell us a little about yourself so we can suggest opportunities that
        fit your background and goals.
      </p>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            <span>Student Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Maria Lopez"
              required
            />
          </label>

          <label className="form-field">
            <span>City</span>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Bakersfield"
              required
            />
          </label>

          <label className="form-field">
            <span>Grade Level</span>
            <select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select grade level</option>
              <option value="9th Grade">9th Grade</option>
              <option value="10th Grade">10th Grade</option>
              <option value="11th Grade">11th Grade</option>
              <option value="12th Grade">12th Grade</option>
              <option value="College Student">College Student</option>
              <option value="College Freshman">College Freshman</option>
              <option value="College Sophomore">College Sophomore</option>
              <option value="College Junior">College Junior</option>
              <option value="College Senior">College Senior</option>
            </select>
          </label>

          <label className="form-field">
            <span>GPA</span>
            <input
              type="text"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="e.g. 3.5"
              required
            />
          </label>

          <label className="form-field form-field--full">
            <span>Career Interest</span>
            <input
              type="text"
              name="careerInterest"
              value={formData.careerInterest}
              onChange={handleChange}
              placeholder="e.g. Artificial Intelligence, Software Engineering"
              required
            />
          </label>

          <label className="form-field form-field--full">
            <span>Skills</span>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. Python, teamwork, public speaking"
              required
            />
          </label>

          <label className="form-field form-field--full">
            <span>Career Goal</span>
            <textarea
              name="careerGoal"
              value={formData.careerGoal}
              onChange={handleChange}
              rows="3"
              placeholder="e.g. I want to become a machine learning engineer and work on AI tools that help my community."
              required
            />
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
            Try Demo Student
          </button>
        </div>
      </form>
    </section>
  )
}

export default StudentForm
