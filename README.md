# HireHub Onboarding Portal

A modern onboarding portal for HireHub, built with TypeScript, React 18+, Vite, and React Router v6. This portal streamlines candidate submissions, department management, and onboarding workflows.

---

## Tech Stack

- **TypeScript**
- **React 18+**
- **Vite**
- **React Router v6**

---

## Features

- Candidate submission management
- Department listing and details
- Edit forms with validation and error handling
- Typed data models for reliability
- Fast development with Vite

---

## Folder Structure

```
src/
  types/
    types.ts         # Shared type contracts (Submission, Department, etc.)
  components/        # Reusable React components
  pages/             # Route-level components/pages
  hooks/             # Custom React hooks
  services/          # API and business logic
  App.tsx            # Main app entry (with router)
  main.tsx           # Vite root entrypoint
  index.css          # Global styles
README.md            # Project documentation
```

---

## Setup & Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/your-org/hirehub-onboarding-portal.git
   cd hirehub-onboarding-portal
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```

4. **Build for production:**
   ```
   npm run build
   ```

5. **Preview production build:**
   ```
   npm run preview
   ```

---

## Usage

- Access the portal at [http://localhost:5173](http://localhost:5173) after running `npm run dev`.
- Use the navigation to view departments, submit candidates, and manage onboarding status.
- All forms are fully typed and validated for data integrity.

---

## Type Contracts

All shared types are defined in [`src/types/types.ts`](src/types/types.ts):

- `Submission`
- `Department`
- `FormErrors`
- `EditFormData`

These types are used throughout the codebase for strict type safety.

---

## Development Notes

- **Routing Ownership:** The router is defined in `App.tsx`. Do not duplicate router setup in `main.tsx`.
- **Type Safety:** Always use the shared types from `src/types/types.ts`.
- **Async Operations:** Handle loading and error states for all API calls.
- **Testing:** Use `@testing-library/react` for component tests. Test files follow the naming convention: `ComponentName.test.tsx`.

---

## License

MIT License

---

## Contact

For questions or support, contact the HireHub engineering team.