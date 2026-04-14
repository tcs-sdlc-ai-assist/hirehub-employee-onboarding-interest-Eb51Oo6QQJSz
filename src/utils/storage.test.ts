import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  saveSubmissions,
  loadSubmissions,
  clearSubmissions,
  saveAdminAuthToken,
  loadAdminAuthToken,
  clearAdminAuthToken,
} from './storage';
import type { Submission } from '../types/types';

const SUBMISSIONS_KEY = 'hirehub_submissions';
const ADMIN_AUTH_KEY = 'hirehub_admin_auth';

const mockSubmissions: Submission[] = [
  {
    id: '1',
    candidateName: 'Alice Smith',
    departmentId: 'dept1',
    submittedAt: '2024-06-01T10:00:00Z',
    status: 'pending',
    notes: 'First candidate',
  },
  {
    id: '2',
    candidateName: 'Bob Jones',
    departmentId: 'dept2',
    submittedAt: '2024-06-02T11:30:00Z',
    status: 'approved',
  },
];

describe('storage.ts', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('saveSubmissions & loadSubmissions', () => {
    it('should save and load submissions correctly', () => {
      saveSubmissions(mockSubmissions);
      const loaded = loadSubmissions();
      expect(loaded).toEqual(mockSubmissions);
    });

    it('should return empty array if nothing is stored', () => {
      const loaded = loadSubmissions();
      expect(loaded).toEqual([]);
    });

    it('should return empty array if stored data is invalid', () => {
      localStorage.setItem(SUBMISSIONS_KEY, '{"not":"an array"}');
      const loaded = loadSubmissions();
      expect(loaded).toEqual([]);
    });

    it('should handle corrupted JSON gracefully', () => {
      localStorage.setItem(SUBMISSIONS_KEY, 'invalid-json');
      const loaded = loadSubmissions();
      expect(loaded).toEqual([]);
    });

    it('should not duplicate submissions on multiple saves', () => {
      saveSubmissions(mockSubmissions);
      saveSubmissions(mockSubmissions);
      const loaded = loadSubmissions();
      expect(loaded).toEqual(mockSubmissions);
    });
  });

  describe('clearSubmissions', () => {
    it('should remove submissions from localStorage', () => {
      saveSubmissions(mockSubmissions);
      clearSubmissions();
      expect(localStorage.getItem(SUBMISSIONS_KEY)).toBeNull();
      expect(loadSubmissions()).toEqual([]);
    });
  });

  describe('saveAdminAuthToken & loadAdminAuthToken', () => {
    it('should save and load admin auth token correctly', () => {
      saveAdminAuthToken('test-token');
      const token = loadAdminAuthToken();
      expect(token).toBe('test-token');
    });

    it('should return null if no token is stored', () => {
      const token = loadAdminAuthToken();
      expect(token).toBeNull();
    });
  });

  describe('clearAdminAuthToken', () => {
    it('should remove admin auth token from sessionStorage', () => {
      saveAdminAuthToken('test-token');
      clearAdminAuthToken();
      expect(sessionStorage.getItem(ADMIN_AUTH_KEY)).toBeNull();
      expect(loadAdminAuthToken()).toBeNull();
    });
  });

  describe('error handling', () => {
    it('should not throw if localStorage is unavailable', () => {
      // Simulate localStorage throwing error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => {
        throw new Error('localStorage unavailable');
      };
      expect(() => saveSubmissions(mockSubmissions)).not.toThrow();
      localStorage.setItem = originalSetItem;
    });

    it('should not throw if sessionStorage is unavailable', () => {
      const originalSetItem = sessionStorage.setItem;
      sessionStorage.setItem = () => {
        throw new Error('sessionStorage unavailable');
      };
      expect(() => saveAdminAuthToken('token')).not.toThrow();
      sessionStorage.setItem = originalSetItem;
    });
  });
});