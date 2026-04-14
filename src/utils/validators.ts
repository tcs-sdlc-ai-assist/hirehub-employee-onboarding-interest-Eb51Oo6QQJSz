import type { EditFormData, FormErrors } from '../types/types';

/**
 * Validates the candidate name field.
 * @param candidateName - The candidate's name.
 * @returns An error message if invalid, otherwise undefined.
 */
export function validateCandidateName(candidateName: string): string | undefined {
  if (!candidateName || candidateName.trim().length === 0) {
    return 'Candidate name is required.';
  }
  if (candidateName.trim().length < 2) {
    return 'Candidate name must be at least 2 characters.';
  }
  return undefined;
}

/**
 * Validates the department ID field.
 * @param departmentId - The department ID.
 * @returns An error message if invalid, otherwise undefined.
 */
export function validateDepartmentId(departmentId: string): string | undefined {
  if (!departmentId || departmentId.trim().length === 0) {
    return 'Department is required.';
  }
  return undefined;
}

/**
 * Validates the notes field.
 * @param notes - The notes string (optional).
 * @returns An error message if invalid, otherwise undefined.
 */
export function validateNotes(notes?: string): string | undefined {
  if (notes && notes.length > 500) {
    return 'Notes must be 500 characters or less.';
  }
  return undefined;
}

/**
 * Validates the EditFormData object.
 * @param formData - The form data to validate.
 * @returns An object containing errors for each field, if any.
 */
export function validateEditForm(formData: EditFormData): FormErrors {
  const errors: FormErrors = {};

  errors.candidateName = validateCandidateName(formData.candidateName);
  errors.departmentId = validateDepartmentId(formData.departmentId);
  errors.notes = validateNotes(formData.notes);

  return errors;
}