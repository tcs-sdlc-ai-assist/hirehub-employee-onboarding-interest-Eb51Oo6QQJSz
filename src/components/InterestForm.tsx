import React, { useState } from 'react';
import type { FormErrors } from '../types/types';
import { validateCandidateName } from '../utils/validators';
import { loadSubmissions, saveSubmissions } from '../utils/storage';

interface InterestFormData {
  candidateName: string;
  email: string;
  departmentId: string;
  notes?: string;
}

const departments = [
  { id: 'eng', name: 'Engineering' },
  { id: 'hr', name: 'Human Resources' },
  { id: 'sales', name: 'Sales' },
  { id: 'marketing', name: 'Marketing' },
];

const validateEmail = (email: string): string | undefined => {
  if (!email || email.trim().length === 0) {
    return 'Email is required.';
  }
  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Invalid email address.';
  }
  return undefined;
};

const validateDepartmentId = (departmentId: string): string | undefined => {
  if (!departmentId || departmentId.trim().length === 0) {
    return 'Department is required.';
  }
  return undefined;
};

const validateNotes = (notes?: string): string | undefined => {
  if (notes && notes.length > 500) {
    return 'Notes must be 500 characters or less.';
  }
  return undefined;
};

const validateInterestForm = (formData: InterestFormData): FormErrors => {
  const errors: FormErrors = {};
  errors.candidateName = validateCandidateName(formData.candidateName);
  errors.email = validateEmail(formData.email);
  errors.departmentId = validateDepartmentId(formData.departmentId);
  errors.notes = validateNotes(formData.notes);
  return errors;
};

const InterestForm: React.FC = () => {
  const [formData, setFormData] = useState<InterestFormData>({
    candidateName: '',
    email: '',
    departmentId: '',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [banner, setBanner] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: undefined,
    }));
    setBanner(null);
  };

  const checkDuplicateEmail = (email: string): boolean => {
    const submissions = loadSubmissions();
    return submissions.some(sub => sub.notes && sub.notes.includes(email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBanner(null);
    setSuccess(false);

    const validationErrors = validateInterestForm(formData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) {
      setBanner({ type: 'error', message: 'Please fix the errors below.' });
      return;
    }

    // Duplicate email check (search in notes for email)
    if (checkDuplicateEmail(formData.email)) {
      setBanner({ type: 'error', message: 'This email has already submitted interest.' });
      setErrors(prev => ({
        ...prev,
        email: 'Duplicate email detected.',
      }));
      return;
    }

    setSubmitting(true);
    try {
      // Save as a Submission in localStorage (notes stores email for demo)
      const submissions = loadSubmissions();
      const newSubmission = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        candidateName: formData.candidateName.trim(),
        departmentId: formData.departmentId,
        submittedAt: new Date().toISOString(),
        status: 'pending' as const,
        notes: `Interest Email: ${formData.email}${formData.notes ? '\n' + formData.notes : ''}`,
      };
      saveSubmissions([...submissions, newSubmission]);
      setSuccess(true);
      setBanner({ type: 'success', message: 'Interest submitted successfully!' });
      setFormData({
        candidateName: '',
        email: '',
        departmentId: '',
        notes: '',
      });
      setErrors({});
    } catch (err) {
      setBanner({ type: 'error', message: 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2 className="header-title" style={{ fontSize: '1.7rem', marginBottom: '1rem' }}>
        Express Your Interest
      </h2>
      <p className="text-muted mb-2">
        Fill out the form below to let us know you're interested in joining HireHub.
      </p>
      {banner && (
        <div
          className={`mb-2 p-2 rounded ${
            banner.type === 'error' ? 'text-error' : 'text-success'
          }`}
          style={{
            background: banner.type === 'error' ? '#fee2e2' : '#dcfce7',
            border: `1px solid ${banner.type === 'error' ? '#f87171' : '#22c55e'}`,
          }}
          role="alert"
        >
          {banner.message}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="candidateName">Full Name</label>
          <input
            id="candidateName"
            name="candidateName"
            type="text"
            autoComplete="name"
            value={formData.candidateName}
            onChange={handleChange}
            disabled={submitting}
            required
            aria-invalid={!!errors.candidateName}
            aria-describedby={errors.candidateName ? 'candidateName-error' : undefined}
          />
          {errors.candidateName && (
            <div className="form-error" id="candidateName-error">
              {errors.candidateName}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={submitting}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <div className="form-error" id="email-error">
              {errors.email}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="departmentId">Department</label>
          <select
            id="departmentId"
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            disabled={submitting}
            required
            aria-invalid={!!errors.departmentId}
            aria-describedby={errors.departmentId ? 'departmentId-error' : undefined}
          >
            <option value="">Select department...</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <div className="form-error" id="departmentId-error">
              {errors.departmentId}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="notes">
            Additional Notes <span className="text-muted">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            disabled={submitting}
            aria-invalid={!!errors.notes}
            aria-describedby={errors.notes ? 'notes-error' : undefined}
            maxLength={500}
            placeholder="Tell us more about your interest..."
          />
          {errors.notes && (
            <div className="form-error" id="notes-error">
              {errors.notes}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          style={{ width: '100%', marginTop: '1em' }}
        >
          {submitting ? 'Submitting...' : 'Submit Interest'}
        </button>
      </form>
      <div className="mt-3 text-center">
        <a href="/" className="text-muted" style={{ textDecoration: 'underline' }}>
          &larr; Back to Home
        </a>
      </div>
    </div>
  );
};

export default InterestForm;