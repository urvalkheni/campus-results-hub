# EduResult - Campus Results Hub

A React-based campus results portal for searching student records, reviewing semester performance, and managing demo academic workflows in one place.

## Overview

EduResult is a single-page student result portal built with React and Vite. It lets a student search by Student ID and view a complete academic profile, semester-wise marks, SGPA/CGPA, performance analytics, and a downloadable report. The app also includes a demo admin dashboard for managing student records and reviewing mark change requests.

This project is useful as a front-end portfolio piece for campus systems, academic dashboards, and admin-style interfaces that need routing, local data handling, and structured UI components.

## Features

- Student ID search: Find one of the built-in demo student records from the home page and open the detailed result view.
- Semester-wise results: Inspect marks, grades, grade points, SGPA, and subject credits for all eight semesters.
- Student profile summary: See the student's name, branch, batch, email, enrollment date, total credits, and CGPA.
- Performance analytics: Compare a student's CGPA against the class average, recent semester trend, and current rank.
- Class leaderboard: Show the top five students by CGPA and highlight the current student's standing.
- Academic report download: Export a text-based academic report for the selected student.
- Mark change requests: Students can submit a mark change request for a semester and subject with a reason and requested marks.
- Admin login and dashboard: A demo admin area is available for searching, adding, editing, and deleting student records.
- Pending request review: Admins can approve or reject pending mark change requests and leave review comments.
- CSV and JSON export: Admins can export the current student list for offline use.
- Responsive UI and theme toggle: The interface adapts to different screen sizes and supports light/dark mode.

## Tech Stack

- TypeScript
- React 18
- Vite
- React Router DOM
- TanStack Query
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives
- Lucide React icons
- Sonner and shadcn toast components

## Project Structure

- `src/main.tsx` -> React entry point that mounts the app.
- `src/App.tsx` -> Global providers and route definitions.
- `src/pages/` -> Route-level screens for the home page, student results, admin dashboard, and 404 page.
- `src/components/` -> Reusable UI blocks for search, profile cards, analytics, dialogs, tables, and the dashboard.
- `src/components/ui/` -> Shared shadcn/ui primitives used across the app.
- `src/lib/mockData.ts` -> Demo student records, grade logic, and GPA calculations.
- `src/lib/requestData.ts` -> In-memory mark change request store and approval helpers.
- `src/hooks/` -> Shared hooks such as toast and mobile detection helpers.
- `src/index.css` -> Theme tokens, fonts, gradients, shadows, and custom animations.
- `public/` -> Static assets served directly by Vite.
- Root config files such as `vite.config.ts`, `tailwind.config.ts`, `components.json`, `tsconfig*.json`, and `eslint.config.js` -> Build, styling, aliasing, and linting setup.

## Setup & Installation

This project uses Node.js and npm.

```bash
git clone <repo-url>
cd campus-results-hub
npm install
npm run dev
```

1. `git clone <repo-url>` downloads the repository to your computer.
2. `cd campus-results-hub` moves into the project folder.
3. `npm install` installs all required dependencies.
4. `npm run dev` starts the local development server.

Open the app in your browser at `http://localhost:8080`.

## Usage Examples

```bash
npm run dev
```

Starts the development server with hot reload for local development.

```bash
npm run build
```

Creates a production-ready build in the `dist` folder.

```bash
npm run preview
```

Previews the production build locally after it has been generated.

For the student portal, enter one of the built-in demo IDs such as `CSE2021001`, `CSE2021002`, `ECE2021001`, or `ME2021001`.

For the admin dashboard, use the demo credentials:

- Username: `admin`
- Password: `admin123`

## Example Output

The exact values change because the demo marks are generated in memory for the bundled student records.

```text
Student ID: CSE2021001
Name: Rahul Kumar Singh
Branch: Computer Science & Engineering
CGPA: 8.42
Total Credits: 176

Semester 3
SGPA: 8.16
Database Management Systems -> 72 | B+
Operating Systems -> 81 | A
Software Engineering -> 74 | B+
```

## How It Works

1. The user enters a Student ID on the home page.
2. The app looks up the student in the in-memory demo dataset.
3. If the student exists, the app navigates to the result page and loads their profile, semester tabs, analytics, and leaderboard data.
4. The user can download a text report or submit a mark change request from the student view.
5. The admin dashboard uses a separate demo login and lets the user manage records, review pending requests, and export student data.

## Limitations / Notes

- All academic data is mock data stored in memory, not in a database.
- Student edits, added records, and mark change requests are not persisted after a refresh.
- The admin login is demo-only and uses hardcoded credentials.
- Marks for the bundled student records are randomly generated when the app loads.
- The report download is a `.txt` file, not a PDF.
- The CSV/JSON import control is present in the admin UI, but the imported data is not wired into the student list.
- No external API or backend service is connected.

## Learning Outcomes

This project demonstrates:

- React routing and page composition
- TypeScript data modeling and utility functions
- Local state management and in-memory data updates
- Form handling, dialogs, tabs, tables, and dashboards
- GPA and CGPA calculation logic
- Browser-based file export patterns
- Responsive UI design with Tailwind CSS and component primitives

## Future Improvements

- Connect the app to a real backend and database.
- Replace the demo admin login with proper authentication and authorization.
- Persist student changes and mark requests across sessions.
- Wire the CSV/JSON import flow into the student management table.
- Generate actual PDF reports instead of plain text downloads.

## Disclaimer

This project is a demo academic portal built for learning and portfolio use. It is not a production-grade student records system and should not be used as-is for real institutional data.
