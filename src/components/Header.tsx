import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadAdminAuthToken, clearAdminAuthToken } from '../utils/storage';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/submissions', label: 'Submissions' },
  { to: '/departments', label: 'Departments' },
];

const Header: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(!!loadAdminAuthToken());
  }, [location]);

  const handleLogout = () => {
    clearAdminAuthToken();
    setIsAdmin(false);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/admin/login');
  };

  return (
    <header
      className="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(37,99,235,0.04)',
      }}
    >
      <div
        className="app-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            textDecoration: 'none',
          }}
          aria-label="HireHub Home"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="4"
              width="24"
              height="24"
              rx="6"
              fill="#2563eb"
            />
            <path
              d="M12 20v-8l8 4-8 4z"
              fill="#fff"
            />
          </svg>
          <span className="header-title" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            HireHub
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1em',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              style={{
                fontWeight: 500,
                color:
                  location.pathname === link.to
                    ? 'var(--color-accent)'
                    : 'var(--color-text)',
                background:
                  location.pathname === link.to
                    ? 'var(--color-background)'
                    : 'transparent',
                padding: '0.5em 1em',
                borderRadius: 'var(--border-radius)',
                transition: 'color var(--transition), background var(--transition)',
              }}
              tabIndex={0}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={isAdmin ? handleLogout : handleLogin}
            style={{
              marginLeft: '1em',
              background: isAdmin ? 'var(--color-error)' : 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              padding: '0.5em 1em',
              fontWeight: 600,
              transition: 'background var(--transition), color var(--transition)',
            }}
            aria-label={isAdmin ? 'Logout' : 'Admin Login'}
          >
            {isAdmin ? 'Logout' : 'Admin Login'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;