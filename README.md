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