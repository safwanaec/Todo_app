# TaskFlow — React To-Do List App

> A local-first task manager built with **React 18 + Vite**, following **OOP principles** and **Test-Driven Development (TDD)**.

---

## Table of Contents

1. [Overview](#overview)
2. [Live Demo](#live-demo)
3. [Installation & Setup](#installation--setup)
4. [How to Run](#how-to-run)
5. [Project Architecture](#project-architecture)
6. [File Structure](#file-structure)
7. [Development Process](#development-process)
8. [SRS Requirements Coverage](#srs-requirements-coverage)
9. [Testing Process & Results](#testing-process--results)
10. [Features](#features)

---

## Overview

**TaskFlow** is a fully-featured, browser-based To-Do list application. All data is stored locally using `localStorage` — no backend, no database, no login required.

Built for a Windows environment, it runs in **Chrome, Edge, and Firefox** and is designed with a clean MVC-inspired architecture adapted for React.

**Core technologies:**

| Technology | Purpose |
|---|---|
| React 18 (functional components + hooks) | UI & state management |
| Vite 8 | Build tool & dev server |
| Vitest + Testing Library | Unit testing |
| Lucide React | UI icons |
| CSS Variables | Theming (light/dark mode) |
| `localStorage` | Data persistence |

---

## Live Demo

The app runs at **`http://localhost:5173/`** after starting the dev server.

Features demonstrated:
- ✅ Clean two-column layout (task list left, form right)
- 🌙 Dark/light mode toggle with smooth transition
- ➕ Adding tasks with priority badges (High=red, Medium=yellow, Low=green)
- 🍞 Toast notifications auto-dismissing after 2 seconds
- 🗑️ Recycle bin with 7-day countdown and restore button

---

## Installation & Setup

### Prerequisites

- **Node.js** v18 or higher — install via [NVM for Windows](https://github.com/coreybutler/nvm-windows):

```bash
# Install NVM for Windows using winget
winget install CoreyButler.NVMforWindows

# After restarting the terminal:
nvm install 20
nvm use 20
node --version   # should print v20.x.x
npm --version
```

### Install Project Dependencies

```bash
# Clone or navigate to the project directory
cd d:\Safwan\Todo_app

# Install all runtime and dev dependencies
npm install
```

**Dependencies installed:**

| Package | Type | Purpose |
|---|---|---|
| `react` | runtime | Core React library |
| `react-dom` | runtime | React DOM renderer |
| `lucide-react` | runtime | Icon components |
| `vite` | dev | Fast build tool & HMR dev server |
| `@vitejs/plugin-react` | dev | React plugin for Vite |
| `vitest` | dev | Vite-native unit test runner |
| `jsdom` | dev | DOM environment for tests |
| `@testing-library/react` | dev | UI component testing utilities |
| `@testing-library/jest-dom` | dev | Custom DOM matchers |

---

## How to Run

```bash
# Start the development server (hot-reload)
npm run dev
# → Opens at http://localhost:5173/

# Run all unit tests (one-time run)
npm run test -- --run

# Run tests in watch mode (re-runs on file changes)
npm run test

# Run tests with coverage report
npm run test -- --coverage

# Build for production
npm run build
```

---

## Project Architecture

The application follows **MVC adapted for React**, as specified in the SRS:

```
┌─────────────┐     ┌──────────────────────────────────────────┐
│    User     │ ←→  │                  View                     │
└─────────────┘     │  React components: TaskList, TaskForm,    │
                    │  FilterBar, SearchBar, RecycleBinModal    │
                    └─────────────────┬────────────────────────┘
                                      │ events
                                      ▼
                    ┌──────────────────────────────────────────┐
                    │              Controllers                   │
                    │  Custom hooks: useTaskManager,            │
                    │  useFilters                               │
                    └─────────────────┬────────────────────────┘
                                      │ calls
                                      ▼
                    ┌──────────────────────────────────────────┐
                    │                 Model                     │
                    │  Task (class) · TaskValidator             │
                    │  TaskStorage (localStorage)               │
                    │  TaskRepository (CRUD + business rules)   │
                    └──────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Files | Responsibility |
|---|---|---|
| **Model** | `Task.js`, `TaskValidator.js`, `TaskStorage.js`, `TaskRepository.js` | Data structures, validation, persistence, business logic |
| **Controller** | `hooks/useTaskManager.js`, `hooks/useFilters.js` | Bridge between UI and Model; manages React state |
| **View** | All `components/*.jsx` + `App.jsx` | Renders UI, handles user interaction |

### Data Flow — Adding a Task

```
1. User fills TaskForm → clicks "Add"
2. TaskForm → calls useTaskManager.addTask(data)
3. useTaskManager → calls TaskRepository.add(data)
4. TaskRepository → creates Task object, validates via TaskValidator
5. TaskRepository → calls TaskStorage.saveTasks() → writes to localStorage
6. Repository returns updated task list
7. useTaskManager updates React state → TaskList re-renders with new card
8. Toast message displayed for 2 seconds
```

### Task State Machine

```
[*] → Active
Active → Completed    (mark complete checkbox)
Completed → Active    (uncheck)
Active → Deleted      (click delete icon)
Completed → Deleted   (click delete icon)
Deleted → Active      (restore from RecycleBin)
Deleted → [*]         (purged after 7 days)
```

---

## File Structure

```
d:\Safwan\Todo_app\
├── index.html                    # App entry point (title, meta)
├── package.json                  # Scripts + dependencies
├── vite.config.js                # Vite + Vitest configuration
├── eslint.config.js              # ESLint rules
├── SRS.md                        # Software Requirements Specification
├── instructions.md               # UML diagrams & development plan
│
└── src/
    ├── main.jsx                  # React root mount point
    ├── App.jsx                   # Top-level app: layout, state, routing
    ├── index.css                 # Full global CSS (light/dark, layout, tokens)
    ├── setupTests.js             # Vitest setup (jest-dom + vi alias)
    │
    ├── models/                   # OOP Data Layer
    │   ├── Task.js               # Task class (constructor, defaults)
    │   ├── TaskValidator.js      # Validation pure functions
    │   ├── TaskStorage.js        # localStorage read/write (static class)
    │   ├── TaskRepository.js     # CRUD + business rules (OOP class)
    │   ├── TaskValidator.test.js # 5 tests
    │   ├── TaskStorage.test.js   # 3 tests
    │   └── TaskRepository.test.js# 5 tests
    │
    ├── hooks/                    # Controller Layer
    │   ├── useTaskManager.js     # Task state + CRUD operations
    │   ├── useFilters.js         # Filter/search logic
    │   ├── useTaskManager.test.js# 2 tests
    │   └── useFilters.test.js    # 3 tests
    │
    └── components/               # View Layer
        ├── Header.jsx            # App title, dark mode toggle, recycle bin btn
        ├── TaskForm.jsx          # Add/Edit form with validation
        ├── TaskList.jsx          # Renders list of TaskCards
        ├── TaskCard.jsx          # Individual task card with badge & actions
        ├── FilterBar.jsx         # Priority, status, date range filters
        ├── SearchBar.jsx         # Debounced (300ms) search input
        ├── RecycleBinModal.jsx   # Modal for deleted tasks + restore
        ├── Toast.jsx             # Auto-dismiss notification (2s)
        ├── TaskForm.test.jsx     # 2 tests
        ├── TaskCard.test.jsx     # 2 tests
        ├── TaskList.test.jsx     # 1 test
        └── RecycleBinModal.test.jsx # 1 test
```

---

## Development Process

The app was built using a strict **Test-Driven Development (TDD)** approach across 5 phases:

### Phase 1 — Project Setup
- Scaffolded React + Vite project with `npx create-vite`
- Installed `lucide-react` for icons
- Created folder structure: `models/`, `hooks/`, `components/`, `utils/`
- Configured **Vitest** in `vite.config.js` with `jsdom` environment
- Created `setupTests.js` to import jest-dom matchers and map `jest → vi`

### Phase 2 — Domain Models (TDD)
Tests written first, then implementation:
- **`Task.js`** — OOP class using `crypto.randomUUID()` for unique IDs, ISO date strings
- **`TaskValidator.js`** — validates title (1–50 chars) and description (0–200 chars)
- **`TaskStorage.js`** — static class with safe `JSON.parse` wrapped in try/catch, resets to `[]` on corruption
- **`TaskRepository.js`** — OOP class managing in-memory task array, syncing to `TaskStorage` after every mutation; auto-purges tasks deleted >7 days ago on construction

### Phase 3 — Hooks / Controllers (TDD)
- **`useTaskManager.js`** — holds a `TaskRepository` ref, exposes CRUD methods that update React state via `useState`
- **`useFilters.js`** — React hook with state for priority/completion/dateRange/searchText; `getFilteredTasks()` applies all filters in order

### Phase 4 — UI Components (TDD)
- Built each component to satisfy its pre-written test
- Fixed test selector issues (used `getByRole('button', { name: /add/i })` over `getByText` for precision)
- Used `defaultPriority = 'Medium'` guard in `TaskCard` to avoid `null.toLowerCase()` errors

### Phase 5 — Integration & Styling
- Assembled all hooks and components in `App.jsx` with `useMemo` for filtered task list
- Applied `dark` CSS class on root `.app` div based on state
- Persisted theme preference in `localStorage`
- Wrote comprehensive `index.css` with CSS custom properties for effortless theming

---

## SRS Requirements Coverage

| ID | Requirement | Implementation |
|---|---|---|
| **FR-01** | Add task (title, desc, due date, priority) | `TaskForm` + `TaskRepository.add()` |
| **FR-02** | Auto-generate id + createdAt | `Task` constructor |
| **FR-03** | Edit any field of existing task | Inline edit via `TaskForm` + `updateTask()` |
| **FR-04** | Soft delete → recycle bin | `TaskRepository.softDelete()` |
| **FR-05** | 7-day retention then permanent purge | `purgeExpiredDeletedTasks()` in constructor |
| **FR-06** | Restore deleted task | `RecycleBinModal` restore button + `restoreTask()` |
| **FR-07** | Mark complete / incomplete | Checkbox in `TaskCard` → `toggleComplete()` |
| **FR-08** | Persist all changes to localStorage | `TaskStorage.saveTasks()` called after every mutation |
| **FR-09** | Load tasks on startup | `TaskRepository` constructor calls `TaskStorage.loadTasks()` |
| **FR-10** | Filter by priority / status / date range | `FilterBar` + `useFilters.getFilteredTasks()` |
| **FR-11** | Search by title / description (case-insensitive) | `SearchBar` (debounced 300ms) + `useFilters` |
| **UI-01** | 2-column layout, stacks under 800px | CSS Grid + `@media (max-width: 800px)` breakpoint |
| **UI-02** | Task cards with title, badge, due date, checkbox | `TaskCard` component |
| **UI-03** | Priority badge colors (High=red, Medium=yellow, Low=green) | CSS `.badge-high / medium / low` classes |
| **UI-04** | Form with title, desc, due date, priority, Add button | `TaskForm` component |
| **UI-05** | Click card → prefill form (inline edit) | `setEditingTask(task)` → `<TaskForm initialData={...}>` |
| **UI-06** | Trash icon deletes task | `Trash2` icon in `TaskCard.onDelete` |
| **UI-07** | Filter bar with Clear Filters button | `FilterBar` component |
| **UI-08** | Search bar with 300ms debounce | `SearchBar` using `setTimeout` in `useEffect` |
| **UI-09** | Recycle bin modal with Restore button | `RecycleBinModal` component |
| **UI-10** | Toast messages for add/update/delete/restore | `Toast` component with 2s auto-dismiss |
| **UI-11** | Validation error + disabled submit on invalid title | `TaskForm` error state + button disabled check |
| **UI-12** | Dark/light mode toggle (sun/moon icon) | `Header` + CSS variables + `localStorage` persistence |
| **NFR-04** | Handle corrupted localStorage gracefully | `TaskStorage.loadTasks()` returns `[]` on parse error |

---

## Testing Process & Results

### Testing Strategy

Tests are divided into 3 layers following the architecture:

| Layer | What Is Tested | Files |
|---|---|---|
| **Model** | Validation rules, storage read/write, repository CRUD | `*.test.js` in `models/` |
| **Hooks** | Business logic, state updates, filter behaviour | `*.test.js` in `hooks/` |
| **Components** | UI rendering, user interactions, prop handling | `*.test.jsx` in `components/` |

### Test Setup

```javascript
// vite.config.js — Vitest config
test: {
  globals: true,
  environment: 'jsdom',        // simulates browser DOM
  setupFiles: './src/setupTests.js',
}

// setupTests.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';
window.jest = vi;              // maps jest.fn() → vi.fn() for compatibility
```

### Full Test Results

```
✓ src/models/TaskValidator.test.js      (5 tests)   4ms
✓ src/models/TaskStorage.test.js        (3 tests)   5ms
✓ src/models/TaskRepository.test.js     (5 tests)   7ms
✓ src/hooks/useTaskManager.test.js      (2 tests)  22ms
✓ src/hooks/useFilters.test.js          (3 tests)  22ms
✓ src/components/TaskForm.test.jsx      (2 tests) 319ms
✓ src/components/TaskCard.test.jsx      (2 tests) 258ms
✓ src/components/TaskList.test.jsx      (1 test)   78ms
✓ src/components/RecycleBinModal.test.jsx (1 test) 46ms

 Test Files  9 passed (9)
      Tests  24 passed (24)
   Duration  3.51s
```

---

## Features

| Feature | Description |
|---|---|
| ✅ Add Task | Title (required, max 50), description (max 200), due date, priority |
| ✏️ Edit Task | Click any card to prefill the form for inline editing |
| 🗑️ Soft Delete | Tasks go to recycle bin, not permanently deleted |
| ♻️ Restore | Restore any deleted task within 7 days |
| ✔️ Complete | Checkbox marks tasks done with strikethrough styling |
| 🔍 Search | Case-insensitive partial match, debounced 300ms |
| 🎚️ Filters | Priority (All/Low/Medium/High), Status, Date Range |
| 🌙 Dark Mode | Toggle persisted across sessions via localStorage |
| 🍞 Toasts | 2-second feedback messages for all CRUD actions |
| 📱 Responsive | 2-column above 800px, single column below |
| 💾 Persistent | All data saved to `localStorage` after every change |
| 🛡️ Validation | Title required, max chars enforced, graceful error recovery |
