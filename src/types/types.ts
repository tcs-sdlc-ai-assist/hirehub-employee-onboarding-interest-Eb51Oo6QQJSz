export interface Submission {
  id: string;
  candidateName: string;
  departmentId: string;
  submittedAt: string; // ISO date string
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
}

export interface FormErrors {
  [field: string]: string | undefined;
}

export interface EditFormData {
  candidateName: string;
  departmentId: string;
  notes?: string;
}