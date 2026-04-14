import {
  validateCandidateName,
  validateDepartmentId,
  validateNotes,
  validateEditForm,
} from './validators';

describe('validateCandidateName', () => {
  it('returns undefined for valid candidate name', () => {
    expect(validateCandidateName('John Doe')).toBeUndefined();
    expect(validateCandidateName('  Alice  ')).toBeUndefined();
  });

  it('returns error if candidate name is empty', () => {
    expect(validateCandidateName('')).toBe('Candidate name is required.');
    expect(validateCandidateName('   ')).toBe('Candidate name is required.');
  });

  it('returns error if candidate name is too short', () => {
    expect(validateCandidateName('A')).toBe('Candidate name must be at least 2 characters.');
    expect(validateCandidateName(' a ')).toBe('Candidate name must be at least 2 characters.');
  });
});

describe('validateDepartmentId', () => {
  it('returns undefined for valid department id', () => {
    expect(validateDepartmentId('engineering')).toBeUndefined();
    expect(validateDepartmentId('  sales  ')).toBeUndefined();
  });

  it('returns error if department id is empty', () => {
    expect(validateDepartmentId('')).toBe('Department is required.');
    expect(validateDepartmentId('   ')).toBe('Department is required.');
  });
});

describe('validateNotes', () => {
  it('returns undefined for undefined or short notes', () => {
    expect(validateNotes(undefined)).toBeUndefined();
    expect(validateNotes('')).toBeUndefined();
    expect(validateNotes('Some notes')).toBeUndefined();
    expect(validateNotes('a'.repeat(500))).toBeUndefined();
  });

  it('returns error if notes exceed 500 characters', () => {
    expect(validateNotes('a'.repeat(501))).toBe('Notes must be 500 characters or less.');
    expect(validateNotes('a'.repeat(1000))).toBe('Notes must be 500 characters or less.');
  });
});

describe('validateEditForm', () => {
  it('returns no errors for valid form data', () => {
    const data = {
      candidateName: 'Jane Smith',
      departmentId: 'hr',
      notes: 'Looking forward to joining.',
    };
    expect(validateEditForm(data)).toEqual({
      candidateName: undefined,
      departmentId: undefined,
      notes: undefined,
    });
  });

  it('returns errors for invalid fields', () => {
    const data = {
      candidateName: '',
      departmentId: '',
      notes: 'a'.repeat(600),
    };
    expect(validateEditForm(data)).toEqual({
      candidateName: 'Candidate name is required.',
      departmentId: 'Department is required.',
      notes: 'Notes must be 500 characters or less.',
    });
  });

  it('returns only relevant errors', () => {
    const data = {
      candidateName: 'A',
      departmentId: 'engineering',
      notes: undefined,
    };
    expect(validateEditForm(data)).toEqual({
      candidateName: 'Candidate name must be at least 2 characters.',
      departmentId: undefined,
      notes: undefined,
    });
  });
});