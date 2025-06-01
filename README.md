# Product Sales Dashboard

## Overview

A modern, responsive Vue 3 application for managing and viewing products and their sales performance. The dashboard allows users to filter products, view detailed sales data in a modal, and interact with a clean, intuitive interface.

## Features

- Product listing with real-time filtering
- Detailed sales summary for each product in a modal dialog
- Sales table with sorting and pagination
- Responsive design for desktop and mobile
- Robust error handling and loading states

## Architecture

- **components/**: Reusable UI components (ProductList, ProductCard, ProductDetails)
- **services/**: API abstraction layer for backend communication
- **tests/**: Unit tests for core business logic and UI components

## Design Decisions

- **Separation of Concerns**: API logic is isolated in the `services/` directory, while UI logic is handled by Vue components.
- **Reusability**: Filtering, sorting, and pagination logic are designed for easy extension and reuse.
- **Extensibility**: The codebase is structured to allow straightforward addition of new features or product fields.
- **Testability**: Core logic is covered by unit tests, and API calls are easily mockable for testing.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev
4. Run unit tests:
   ```bash
   npm run test

## Testing
- Unit tests are written using Vitest and Vue Test Utils.
- Tests cover product filtering, modal behavior, and API integration (with mocked HTTP requests).
- All business logic is designed to be easily testable and maintainable.
## Extensibility
- Adding new product fields or filters requires only updating the model and UI.
- Business logic is decoupled from UI for easy maintenance and future growth.

## Deployment Struggles & Lessons Learned
- CORS Issues:
Integrating a frontend hosted on GitHub Pages with a backend on a different domain (Railway, AWS, Azure, etc.) required careful CORS configuration on the backend. Browsers block cross-origin requests unless the backend explicitly allows them.
- Mixed Content Errors:
When the frontend is served over HTTPS, the backend must also use HTTPS. Otherwise, browsers block API requests due to security policies. This required choosing a backend host that provides HTTPS by default.
- Cloud Hosting Complexity:
Attempted to use AWS Elastic Beanstalk and Azure App Service for backend hosting. Both platforms presented challenges:
AWS Elastic Beanstalk: Required configuring load balancers and SSL certificates for HTTPS, which was time-consuming and not straightforward for a short-term project.
Azure App Service: Free tier quotas and region limitations made deployment difficult, and subscription registration issues blocked progress.
- Railway as a Solution:
Ultimately, Railway was chosen for backend hosting because it offers:
Free tier with automatic HTTPS
Simple GitHub integration and deployment
Easy environment variable management
- Frontend Environment Variables:
The frontend uses environment variables (e.g., VITE_API_URL) to point to the backend API. These are managed via GitHub Actions secrets for security and flexibility.
- Documentation & Community:
Stack Overflow and official docs were invaluable for troubleshooting CORS, HTTPS, and deployment issues.
## Tips for Future Developers
- Plan for CORS and HTTPS early when deploying frontend and backend separately.
- Choose hosting platforms that match your project’s complexity and timeline—sometimes simpler is better!
- Use environment variables for API URLs and secrets, and manage them securely.
- Check platform quotas and region availability before committing to a cloud provider.
- Leverage community resources (Stack Overflow, GitHub Discussions) for troubleshooting.