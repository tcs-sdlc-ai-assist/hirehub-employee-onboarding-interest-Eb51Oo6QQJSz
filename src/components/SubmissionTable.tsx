import React from 'react';
import type { Submission, Department } from '../types/types';

interface SubmissionTableProps {
  submissions: Submission[];
  departments: Department[];
  onEdit: (submission: Submission) => void;
  onDelete: (submissionId: string) => void;
}

const getDepartmentName = (departments: Department[], departmentId: string): string => {
  const dept = departments.find(d => d.id === departmentId);
  return dept ? dept.name : 'Unknown';
};

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const statusColor = (status: Submission['status']): string => {
  switch (status) {
    case 'approved':
      return '#4caf50';
    case 'rejected':
      return '#f44336';
    case 'pending':
    default:
      return '#ff9800';
  }
};

const SubmissionTable: React.FC<SubmissionTableProps> = ({
  submissions,
  departments,
  onEdit,
  onDelete
}) => {
  if (submissions.length === 0) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center', color: '#888' }}>
        No submissions yet.
      </div>
    );
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>#</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Candidate Name</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Department</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Submitted At</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Status</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Notes</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission, idx) => (
          <tr key={submission.id} style={{ background: idx % 2 === 0 ? '#fafafa' : '#fff' }}>
            <td style={{ padding: '8px', textAlign: 'center' }}>{idx + 1}</td>
            <td style={{ padding: '8px' }}>{submission.candidateName}</td>
            <td style={{ padding: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: '#e3f2fd',
                  color: '#1976d2',
                  borderRadius: '12px',
                  padding: '2px 8px',
                  fontSize: '0.9em'
                }}
              >
                {getDepartmentName(departments, submission.departmentId)}
              </span>
            </td>
            <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '0.95em' }}>
              {formatDate(submission.submittedAt)}
            </td>
            <td style={{ padding: '8px', textAlign: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: statusColor(submission.status),
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '2px 10px',
                  fontSize: '0.9em',
                  minWidth: '70px',
                  textTransform: 'capitalize'
                }}
              >
                {submission.status}
              </span>
            </td>
            <td style={{ padding: '8px', color: '#555', fontSize: '0.95em' }}>
              {submission.notes || <span style={{ color: '#bbb' }}>—</span>}
            </td>
            <td style={{ padding: '8px', textAlign: 'center' }}>
              <button
                type="button"
                style={{
                  marginRight: '8px',
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
                onClick={() => onEdit(submission)}
                aria-label={`Edit submission ${submission.candidateName}`}
              >
                Edit
              </button>
              <button
                type="button"
                style={{
                  background: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
                onClick={() => onDelete(submission.id)}
                aria-label={`Delete submission ${submission.candidateName}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionTable;