# Deployment Guide: hirehub-onboarding-portal

## Overview

This project is a Vite + React 18+ TypeScript application, designed for deployment on [Vercel](https://vercel.com/). This guide covers environment variables, build steps, hosting configuration, and CI/CD integration.

---

## 1. Environment Variables

All environment variables must be prefixed with `VITE_` for client-side access. Define them in a `.env` file at the project root.

**Example `.env`:**
```
VITE_API_BASE_URL=https://api.example.com
VITE_FEATURE_FLAG_ONBOARDING=true
```

**Notes:**
- Never commit `.env` files containing secrets.
- For Vercel, set environment variables in the project dashboard under **Settings > Environment Variables**.

---

## 2. Build & Deployment Steps

### Local Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Vercel Deployment

1. **Connect Repository:**  
   Link your GitHub/GitLab/Bitbucket repo to Vercel.

2. **Configure Build Settings:**  
   - **Framework Preset:** Select "Vite".
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install` (default)

3. **Set Environment Variables:**  
   Add all required `VITE_*` variables in Vercel's dashboard.

4. **Automatic Deployments:**  
   Every push to the main branch triggers a new deployment.

---

## 3. Hosting Configuration

- **Static Hosting:**  
  The app is served as static files from the `dist` directory.
- **Routing:**  
  React Router v6 handles client-side routing. Vercel automatically rewrites all paths to `index.html`.
- **Custom Domains:**  
  Add custom domains via Vercel dashboard.

---

## 4. CI/CD Notes

- **Vercel Integration:**  
  Vercel provides built-in CI/CD. Each commit triggers:
  - Install dependencies
  - Run build
  - Deploy preview/production

- **Branch Deployments:**  
  - Preview deployments for feature branches.
  - Production deployments for main branch.

- **Rollback:**  
  Use Vercel's dashboard to revert to any previous deployment.

---

## 5. Troubleshooting

- **Build Failures:**  
  - Check logs in Vercel dashboard.
  - Ensure all required environment variables are set.
  - Verify Node.js version matches Vercel's default (or set in `vercel.json`).

- **Routing Issues:**  
  - Ensure React Router is configured for client-side navigation.
  - Vercel handles SPA rewrites automatically.

---

## 6. Optional: `vercel.json` Example

If you need custom configuration, add a `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 7. References

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router v6 Docs](https://reactrouter.com/en/main)

---

**For questions or issues, contact your DevOps team or open a ticket in the project repository.**