import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import InterestForm from './components/InterestForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const DepartmentsPage: React.FC = () => {
  const departments = [
    { id: 'eng', name: 'Engineering', description: 'Product development and engineering.' },
    { id: 'hr', name: 'Human Resources', description: 'People operations and HR.' },
    { id: 'sales', name: 'Sales', description: 'Revenue and client relationships.' },
    { id: 'marketing', name: 'Marketing', description: 'Brand and growth.' },
  ];
  return (
    <div className="app-container">
      <h2 className="header-title" style={{ fontSize: '1.7rem', marginBottom: '1rem' }}>
        Departments
      </h2>
      <div className="department-list">
        {departments.map(dept => (
          <div className="department-card" key={dept.id}>
            <div className="department-title">{dept.name}</div>
            <div className="text-muted">{dept.description}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <a href="/" className="text-muted" style={{ textDecoration: 'underline' }}>
          &larr; Back to Home
        </a>
      </div>
    </div>
  );
};

const SubmissionsPage: React.FC = () => (
  <InterestForm />
);

const NotFoundPage: React.FC = () => (
  <div className="app-container" style={{ textAlign: 'center', marginTop: '4em' }}>
    <h2 className="header-title" style={{ fontSize: '2rem', marginBottom: '1em' }}>
      404 - Page Not Found
    </h2>
    <p className="text-muted mb-2">
      Sorry, the page you are looking for does not exist.
    </p>
    <a href="/" className="text-muted" style={{ textDecoration: 'underline' }}>
      &larr; Back to Home
    </a>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/submissions/new" element={<SubmissionsPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;