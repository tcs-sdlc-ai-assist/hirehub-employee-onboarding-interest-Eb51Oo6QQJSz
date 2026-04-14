import type { Submission } from '../types/types';

/**
 * Storage keys used in localStorage/sessionStorage
 */
const SUBMISSIONS_KEY = 'hirehub_submissions';
const ADMIN_AUTH_KEY = 'hirehub_admin_auth';

/**
 * Save submissions array to localStorage
 * @param submissions Array of Submission objects
 */
export function saveSubmissions(submissions: Submission[]): void {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  } catch (err) {
    // Optionally log or handle error
  }
}

/**
 * Load submissions array from localStorage
 * @returns Array of Submission objects, or empty array if not found/invalid
 */
export function loadSubmissions(): Submission[] {
  try {
    const data = localStorage.getItem(SUBMISSIONS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      // Optionally validate shape
      return parsed as Submission[];
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Remove all submissions from localStorage
 */
export function clearSubmissions(): void {
  try {
    localStorage.removeItem(SUBMISSIONS_KEY);
  } catch (err) {
    // Optionally log or handle error
  }
}

/**
 * Save admin authentication token to sessionStorage
 * @param token string
 */
export function saveAdminAuthToken(token: string): void {
  try {
    sessionStorage.setItem(ADMIN_AUTH_KEY, token);
  } catch (err) {
    // Optionally log or handle error
  }
}

/**
 * Load admin authentication token from sessionStorage
 * @returns token string or null if not found
 */
export function loadAdminAuthToken(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY);
  } catch {
    return null;
  }
}

/**
 * Remove admin authentication token from sessionStorage
 */
export function clearAdminAuthToken(): void {
  try {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  } catch (err) {
    // Optionally log or handle error
  }
}