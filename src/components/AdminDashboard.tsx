import React, { useEffect, useState } from 'react';
import type { Submission, Department } from '../types/types';
import { loadSubmissions, saveSubmissions, loadAdminAuthToken, clearAdminAuthToken } from '../utils/storage';
import EditModal from './EditModal';
import SubmissionTable from './SubmissionTable';
import { useNavigate } from 'react-router-dom';

const DEPARTMENTS: Department[] = [
  { id: 'eng', name: 'Engineering', description: 'Product development and engineering.' },
  { id: 'hr', name: 'Human Resources', description: 'People operations and HR.' },
  { id: 'sales', name: 'Sales', description: 'Revenue and client relationships.' },
  { id: 'marketing', name: 'Marketing', description: 'Brand and growth.' },
];

const getDepartmentName = (departments: Department[], departmentId: string): string => {
  const dept = departments.find(d => d.id === departmentId);
  return dept ? dept.name : 'Unknown';
};

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editSubmission, setEditSubmission] = useState<Submission | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [tableKey, setTableKey] = useState(0); // force table rerender after delete
  const navigate = useNavigate();

  // Protect route: redirect if not admin
  useEffect(() => {
    if (!loadAdminAuthToken()) {
      navigate('/admin/login', { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSubmissions(loadSubmissions());
  }, [tableKey]);

  // Stat cards
  const total = submissions.length;
  const approved = submissions.filter(s => s.status === 'approved').length;
  const pending = submissions.filter(s => s.status === 'pending').length;
  const rejected = submissions.filter(s => s.status === 'rejected').length;

  const handleEdit = (submission: Submission) => {
    setEditSubmission(submission);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditSubmission(null);
  };

  const handleUpdateSubmission = (updated: Submission) => {
    setSubmissions(prev =>
      prev.map(s => (s.id === updated.id ? updated : s))
    );
    setTableKey(k => k + 1);
  };

  const handleDelete = (submissionId: string) => {
    setDeleteId(submissionId);
    setDeleteError(null);
    setDeleteLoading(true);
    setTimeout(() => {
      try {
        const updated = submissions.filter(s => s.id !== submissionId);
        saveSubmissions(updated);
        setSubmissions(updated);
        setDeleteId(null);
        setDeleteLoading(false);
        setTableKey(k => k + 1);
      } catch (err) {
        setDeleteError('Failed to delete submission.');
        setDeleteLoading(false);
      }
    }, 600);
  };

  const handleLogout = () => {
    clearAdminAuthToken();
    navigate('/');
  };

  // Stat card styles
  const statCardStyle: React.CSSProperties = {
    flex: '1 1 120px',
    minWidth: 120,
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '1.2em 1em',
    margin: '0.5em',
    boxShadow: '0 1px 4px rgba(37,99,235,0.04)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div className="app-container" style={{ maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2em' }}>
        <h1 className="header-title" style={{ fontSize: '2rem', margin: 0 }}>
          Admin Dashboard
        </h1>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.5em 1.2em',
            fontWeight: 600,
            fontSize: '1em',
            marginLeft: '1em',
          }}
        >
          Logout
        </button>
      </div>
      {/* Stat Cards */}
      <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap', marginBottom: '2em' }}>
        <div style={statCardStyle}>
          <span style={{ fontSize: '1.2em', color: '#2563eb', fontWeight: 700 }}>{total}</span>
          <span className="text-muted" style={{ fontSize: '1em' }}>Total Submissions</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: '1.2em', color: '#22c55e', fontWeight: 700 }}>{approved}</span>
          <span className="text-muted" style={{ fontSize: '1em' }}>Approved</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: '1.2em', color: '#f59e42', fontWeight: 700 }}>{pending}</span>
          <span className="text-muted" style={{ fontSize: '1em' }}>Pending</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: '1.2em', color: '#ef4444', fontWeight: 700 }}>{rejected}</span>
          <span className="text-muted" style={{ fontSize: '1em' }}>Rejected</span>
        </div>
      </div>
      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(37,99,235,0.04)', padding: '1.5em 1em' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1em', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#2563eb', fontWeight: 700 }}>
            Candidate Submissions
          </h2>
          <span className="text-muted" style={{ fontSize: '1em' }}>
            {total} {total === 1 ? 'entry' : 'entries'}
          </span>
        </div>
        {deleteError && (
          <div className="form-error" style={{ marginBottom: '1em' }}>
            {deleteError}
          </div>
        )}
        <SubmissionTable
          key={tableKey}
          submissions={submissions}
          departments={DEPARTMENTS}
          onEdit={handleEdit}
          onDelete={deleteLoading ? () => {} : handleDelete}
        />
        {deleteLoading && (
          <div style={{ marginTop: '1em', textAlign: 'center', color: '#2563eb' }}>
            Deleting submission...
          </div>
        )}
      </div>
      {/* Edit Modal */}
      {showEditModal && editSubmission && (
        <EditModal
          submission={editSubmission}
          departments={DEPARTMENTS}
          onClose={handleEditModalClose}
          onUpdate={handleUpdateSubmission}
        />
      )}
    </div>
  );
};

export default AdminDashboard;