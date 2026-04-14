import React, { useState, useEffect } from 'react';
import type { Submission, Department, EditFormData, FormErrors } from '../types/types';
import { validateEditForm } from '../utils/validators';
import { saveSubmissions, loadSubmissions } from '../utils/storage';

interface EditModalProps {
  submission: Submission | null;
  departments: Department[];
  onClose: () => void;
  onUpdate: (updatedSubmission: Submission) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  submission,
  departments,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<EditFormData>({
    candidateName: '',
    departmentId: '',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (submission) {
      setFormData({
        candidateName: submission.candidateName,
        departmentId: submission.departmentId,
        notes: submission.notes || '',
      });
      setErrors({});
      setSuccessMsg('');
      setErrorMsg('');
    }
  }, [submission]);

  if (!submission) return null;

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
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEditForm(formData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) {
      setSuccessMsg('');
      setErrorMsg('Please fix the errors above.');
      return;
    }

    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // Update submission in localStorage
      const allSubmissions = loadSubmissions();
      const updatedSubmission: Submission = {
        ...submission,
        candidateName: formData.candidateName.trim(),
        departmentId: formData.departmentId,
        notes: formData.notes?.trim() || '',
      };
      const updatedList = allSubmissions.map(s =>
        s.id === submission.id ? updatedSubmission : s
      );
      saveSubmissions(updatedList);
      setSuccessMsg('Submission updated successfully.');
      onUpdate(updatedSubmission);
      setTimeout(() => {
        setSaving(false);
        onClose();
      }, 800);
    } catch (err) {
      setErrorMsg('Failed to update submission. Please try again.');
      setSaving(false);
    }
  };

  // Modal overlay styles
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(30, 41, 59, 0.35)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 24px rgba(37,99,235,0.12)',
    padding: '2rem',
    minWidth: '340px',
    maxWidth: '95vw',
    width: '400px',
    position: 'relative',
  };

  const closeBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    color: '#64748b',
    cursor: 'pointer',
  };

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="edit-modal-title">
      <div style={modalStyle}>
        <button
          style={closeBtnStyle}
          onClick={onClose}
          aria-label="Close edit modal"
          type="button"
        >
          &times;
        </button>
        <h2 id="edit-modal-title" style={{ marginBottom: '1rem', color: '#2563eb', fontWeight: 700 }}>
          Edit Submission
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="candidateName">Candidate Name</label>
            <input
              id="candidateName"
              name="candidateName"
              type="text"
              value={formData.candidateName}
              onChange={handleChange}
              disabled={saving}
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
            <label htmlFor="departmentId">Department</label>
            <select
              id="departmentId"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              disabled={saving}
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
            <label htmlFor="notes">Notes <span className="text-muted">(optional)</span></label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              disabled={saving}
              rows={3}
              maxLength={500}
              aria-invalid={!!errors.notes}
              aria-describedby={errors.notes ? 'notes-error' : undefined}
              style={{ resize: 'vertical' }}
            />
            {errors.notes && (
              <div className="form-error" id="notes-error">
                {errors.notes}
              </div>
            )}
          </div>
          {errorMsg && (
            <div className="form-error" style={{ marginBottom: '0.5em' }}>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="form-success" style={{ marginBottom: '0.5em' }}>
              {successMsg}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5em' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              style={{
                background: '#e5e7eb',
                color: '#1e293b',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5em 1em',
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5em 1em',
                fontWeight: 600,
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;