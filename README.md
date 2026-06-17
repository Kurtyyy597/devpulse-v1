# DevPulse v1

DevPulse is a full-stack session management application designed to help users organize, track, and monitor learning or productivity sessions. It provides workflow-driven progress tracking, dashboard analytics, archive management, recovery tools, and productivity insights through a clean and responsive user interface.

This version focuses on frontend-backend architecture, state management, validation, API integration, and user experience while using an in-memory data layer. Future versions will introduce database persistence and authentication.

## Live Demo

Frontend: [Add your deployed frontend URL]

Backend API: [Add your deployed backend URL]

---

## Features

### Session Management

* Create sessions
* View session details
* Update sessions
* Delete sessions
* Permanent deletion

### Workflow & Progress Tracking

* Planned → Open → In Progress → Halfway → Almost Done → Completed → Closed
* Progress calculation based on session status
* Completion rate tracking

### Archive & Recovery

* Archive sessions
* Restore archived sessions
* Soft delete sessions
* Restore deleted sessions
* Trash bin management
* Permanent deletion

### Bulk Actions

* Bulk archive
* Bulk restore archive
* Bulk delete
* Bulk restore delete
* Bulk permanent delete

### Dashboard Analytics

* Total sessions
* Overall progress
* Completion rate
* Total duration
* Average session duration
* Activity statistics
* Mood breakdown
* Status breakdown
* Recent sessions
* Upcoming deadlines
* Overdue session monitoring

### Productivity Features

* Mood tracking
* Activity tracking
* Due date management
* Overdue session detection

### User Experience

* Command palette
* Keyboard shortcuts
* URL-synced filters
* Responsive design
* Light and dark mode support
* Toast notifications

### Validation & Error Handling

* Client-side validation
* Server-side validation
* Custom error handling
* Zod schema validation

---

## Tech Stack

### Frontend

* React
* TypeScript
* React Query
* React Hook Form
* Axios
* Material UI (MUI)
* Recharts
* Lucide React
* React Router DOM
* React Toastify

### Backend

* Node.js
* Express.js
* TypeScript
* Zod

---

## Architecture

The application follows a frontend-backend architecture with clear separation of concerns.

### Frontend

* Pages
* Reusable Components
* Custom Hooks
* API Service Layer
* React Query Data Management
* URL State Synchronization

### Backend

* Routes
* Controllers
* Services
* Validation Middleware
* Error Middleware
* Business Logic Layer

---

## Key Learning Objectives

This project was intentionally built without a database to focus on:

* Frontend and backend integration
* REST API design
* State management with React Query
* Form handling and validation
* Service-layer architecture
* TypeScript best practices
* User experience and application workflows

---

## Future Improvements (DevPulse v2)

* PostgreSQL integration
* Prisma ORM
* Authentication & Authorization
* User accounts
* Persistent storage
* Advanced analytics
* Session collaboration

---

## Screenshots

Add screenshots of:

1. Dashboard
2. Sessions Page
3. Session Details
4. Archive Management
5. Trash Bin
6. Command Palette

---

## Author

Kurt Allen Marquez

Open to entry-level, junior, internship, and fresh graduate opportunities in Software Engineering, Web Development, and IT.
