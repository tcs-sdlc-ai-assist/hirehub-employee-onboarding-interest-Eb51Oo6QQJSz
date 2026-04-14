import React from 'react';

const features = [
  {
    title: 'Streamlined Onboarding',
    description:
      'Easily manage candidate submissions and approvals with a centralized portal. Reduce paperwork and accelerate hiring.',
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h10M7 11h10M7 15h6" />
      </svg>
    ),
  },
  {
    title: 'Department Collaboration',
    description:
      'Assign candidates to departments and enable seamless communication between HR and hiring managers.',
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="4" />
        <circle cx="16" cy="16" r="4" />
        <path d="M12 12l2 2M8 12l4 4" />
      </svg>
    ),
  },
  {
    title: 'Status Tracking',
    description:
      'Monitor onboarding progress with real-time status updates. Approve or reject submissions with ease.',
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M5 12l5 5L19 7" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
  {
    title: 'Secure & Reliable',
    description:
      'Your data is protected with robust security measures. Access the portal anytime, anywhere.',
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M12 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
];

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 bg-white shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          Welcome to HireHub Onboarding Portal
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-2xl">
          Simplify your hiring process. Manage candidate onboarding, collaborate across departments, and track progress—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/submissions"
            className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            View Submissions
          </a>
          <a
            href="/departments"
            className="px-6 py-3 rounded-md bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition"
          >
            Explore Departments
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Why HireHub?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="mb-4 text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 bg-blue-50 flex flex-col items-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
          Ready to get started?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/submissions/new"
            className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Submit a Candidate
          </a>
          <a
            href="/departments"
            className="px-6 py-3 rounded-md bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition"
          >
            Learn More
          </a>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;