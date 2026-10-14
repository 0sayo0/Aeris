<div align="center">

# AERIS

### Weather, without the noise.

A modern weather application built to deliver essential
weather information through a clean, responsive interface.

**React · TypeScript · TanStack Query · Tailwind CSS**

[**Live Application**](https://aeris-rouge-eight.vercel.app) ·
[**Source Code**](https://github.com/0sayo0/Aeris)

</div>

---

## Overview

**Aeris** is a weather application that allows users to
search for a city and retrieve its current weather conditions.

The project focuses on more than displaying API data.
It demonstrates the implementation of a maintainable
React application with clearly separated responsibilities,
runtime data validation, asynchronous state management,
and automated testing.

The interface prioritizes simplicity, readability,
and responsive design.

---

## Features

- **Location search:** Search by city and country.
- **Current weather:** View temperature and weather conditions.
- **Additional metrics:** Check feels-like temperature,
  humidity, minimum temperature, and maximum temperature.
- **Asynchronous state handling:** Loading, success,
  and error states.
- **Input validation:** Form validation with React Hook Form
  and Zod.
- **API response validation:** Runtime validation of external
  data using Zod schemas.
- **Client-side caching:** Server-state management and caching
  with TanStack Query.
- **Responsive interface:** Layout designed for mobile
  and desktop devices.
- **Automated testing:** Tests for forms, components,
  data fetching, and application states.

---

## Tech Stack

| Category      | Technologies                     |
| ------------- | -------------------------------- |
| Core          | React 19, TypeScript             |
| Build Tool    | Vite                             |
| Styling       | Tailwind CSS v4                  |
| UI Components | shadcn/ui, Base UI, Lucide React |
| Server State  | TanStack Query v5                |
| Forms         | React Hook Form                  |
| Validation    | Zod                              |
| HTTP          | Native Fetch API                 |
| Testing       | Vitest, React Testing Library    |
| Code Quality  | ESLint, Prettier                 |
| Automation    | GitHub Actions                   |
| Deployment    | Vercel                           |
| Weather Data  | OpenWeather API                  |

---

## Architecture

Aeris follows a **feature-oriented architecture**.

Application-wide configuration and reusable UI primitives
are separated from weather-specific functionality.

```text
src/
├── app/
│   ├── providers.tsx
│   └── query-client.ts
│
├── components/
│   └── ui/
│
├── config/
│   └── env.ts
│
├── features/
│   └── weather/
│       ├── api/
│       │   ├── get-coordinates.ts
│       │   ├── get-current-weather.ts
│       │   └── get-weather-by-search.ts
│       │
│       ├── components/
│       │   ├── weather-card.tsx
│       │   ├── weather-error.tsx
│       │   ├── weather-search-form.tsx
│       │   └── weather-skeleton.tsx
│       │
│       ├── constants/
│       ├── hooks/
│       ├── schemas/
│       ├── types/
│       └── weather-page.tsx
│
├── lib/
├── test/
├── App.tsx
├── index.css
└── main.tsx
```

### Architectural Responsibilities

**`app/`**

Defines application-level providers and shared configuration
for TanStack Query.

**`components/ui/`**

Contains reusable UI primitives that are independent
of the weather feature.

**`config/`**

Centralizes environment-variable validation.

**`features/weather/api/`**

Encapsulates external API communication and coordinates
the weather retrieval process.

**`features/weather/hooks/`**

Connects weather data fetching to TanStack Query.

**`features/weather/schemas/`**

Defines validation rules for user input and
external API responses.

**`features/weather/components/`**

Contains weather-specific presentation components.

**`features/weather/weather-page.tsx`**

Coordinates the search interface and renders the
appropriate loading, error, or success state.

---

## Data Flow

The weather retrieval process follows a predictable,
validated sequence.

```text
User
  │
  ▼
WeatherSearchForm
  │
  ▼
React Hook Form + Zod
  │
  ▼
WeatherPage
  │
  ▼
useWeatherQuery
  │
  ▼
TanStack Query
  │
  ▼
getWeatherBySearch
  │
  ├──► getCoordinates
  │       │
  │       ▼
  │     OpenWeather Geocoding API
  │       │
  │       ▼
  │     Zod Validation
  │
  └──► getCurrentWeather
          │
          ▼
        OpenWeather Weather API
          │
          ▼
        Zod Validation
          │
          ▼
        Weather Data Transformation
          │
          ▼
        WeatherCard
```

### How It Works

1. The user enters a city and selects a country.
2. React Hook Form validates the input using a Zod schema.
3. The validated search updates the page state.
4. TanStack Query manages the asynchronous request.
5. The Geocoding API resolves the location into coordinates.
6. The Weather API retrieves the current conditions.
7. Zod validates the received API data.
8. The response is transformed into the application's
   internal weather model.
9. The interface renders the corresponding result.

The application also handles loading states,
request failures, and locations that cannot be found.

---

## Engineering Decisions

### Feature-Oriented Organization

Weather-related functionality is grouped within
a dedicated feature directory.

This reduces unnecessary coupling between application-wide
configuration, reusable components, and domain-specific logic.

### Runtime Validation with Zod

TypeScript provides static type checking, but it does not
validate data received from external APIs at runtime.

Aeris uses Zod to validate both user input and relevant
external API response structures.

### TanStack Query for Server State

TanStack Query manages asynchronous weather requests,
including loading, error, and success states.

Weather queries use a five-minute `staleTime` to reduce
unnecessary refetching of recently retrieved data.

### Native Fetch API

The application uses the browser's native Fetch API
rather than introducing an additional HTTP client.

This keeps the network layer lightweight while
maintaining explicit control over requests and
response validation.

### Separation of Data and Presentation

API functions handle external communication and
data transformation.

React components consume the resulting weather model
without depending directly on the raw API response format.

This separation improves maintainability and testability.

---

## Getting Started

### Prerequisites

- Node.js 24
- npm
- An OpenWeather API key

The repository includes an `.nvmrc` file specifying
the development Node.js version.

### 1. Clone the Repository

```bash
git clone https://github.com/0sayo0/Aeris.git
cd Aeris
```

### 2. Install Dependencies

```bash
npm ci
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

Add the following variable:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

Replace the placeholder with your OpenWeather API key.

A `.env.example` file is included as a configuration reference.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local address displayed by Vite in your terminal.

---

## Available Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the development server             |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build             |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format files using Prettier              |
| `npm run format:check` | Check formatting                         |
| `npm run typecheck`    | Run TypeScript checks                    |
| `npm run check`        | Run formatting, linting, and type checks |
| `npm run test`         | Run tests in watch mode                  |
| `npm run test:run`     | Run tests once                           |
| `npm run verify`       | Run checks, tests, and production build  |

---

## Testing

Aeris uses **Vitest** and **React Testing Library**
to verify application behavior.

The repository includes tests covering:

- Search form validation.
- Submission of valid and normalized input.
- Loading-state behavior.
- Weather data rendering.
- Error-state rendering.
- External API request handling.
- Weather data transformation.

Tests use mocks where appropriate to avoid relying
on live external API requests.

To run the test suite:

```bash
npm run test:run
```

To execute the complete project verification:

```bash
npm run verify
```

---

## Continuous Integration

The repository includes a GitHub Actions workflow
located at:

`.github/workflows/ci.yml`

The workflow runs on:

- Pull requests targeting `main`.
- Pushes to `main`.
- Manual workflow dispatch.

The CI pipeline:

1. Checks out the repository.
2. Configures the required Node.js version.
3. Installs dependencies with `npm ci`.
4. Runs the project verification script.

The verification process includes formatting,
linting, TypeScript checks, automated tests,
and a production build.

---

## Environment & Security

Aeris communicates directly with the OpenWeather API
from the browser.

The API key is configured using the
`VITE_OPENWEATHER_API_KEY` environment variable.

**Important:** Environment variables prefixed with `VITE_`
are exposed to client-side code during the build process.

Therefore, this value must not be treated as a secret
in the deployed application.

A backend proxy or serverless API layer would be
required to keep provider credentials outside
the browser.

---

## Project Status

**Functional application — available online.**

The project serves as a practical implementation of
modern React development, API integration, runtime
validation, server-state management, and automated testing.

Additional technical improvements may be introduced
as the project evolves.

---

## Author

**Jonathan Saúl Morales Espinosa**

Full Stack Software Developer

[Portfolio](https://jonathanmoralesdev.com) ·
[GitHub](https://github.com/0sayo0) ·
[LinkedIn](https://www.linkedin.com/in/jonathan-morales-dev/)

---

<div align="center">

**Aeris — Weather, without the noise.**

</div>
