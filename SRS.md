Here's a **simple, detailed SRS** tailored for a **React-based To-Do app on Windows**, including **UI requirements** and **architecture**.

---

# Software Requirements Specification (SRS)
## To-Do List Application (React for Windows)

### 1. Introduction
**1.1 Purpose**  
A simple, local-first task management app for individual Windows users.

**1.2 Scope**  
React-based desktop app (runs in a browser or as Electron wrapper). Tasks persist locally using `localStorage`. No backend, no accounts.

---

### 2. Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-01 | The system shall allow a user to add a new task with a **title** (required, max 50 chars), **description** (optional, max 200 chars), **due date** (optional, YYYY-MM-DD), and **priority** (Low/Medium/High, default Medium). |
| FR-02 | The system shall auto‑generate a **created date** and a unique **id** for each task. |
| FR-03 | The system shall allow a user to **edit** any field of an existing task. |
| FR-04 | The system shall allow a user to **delete** a task (move to a “recycle bin”). |
| FR-05 | The system shall keep deleted tasks for **7 days** and then permanently remove them. |
| FR-06 | The system shall allow a user to **restore** a deleted task within those 7 days. |
| FR-07 | The system shall allow a user to **mark a task as complete/incomplete** (checkbox). |
| FR-08 | The system shall **persist all tasks** (active + deleted) to `localStorage` after every change. |
| FR-09 | On app launch, the system shall load persisted tasks and show **only incomplete tasks** by default. |
| FR-10 | The system shall provide **filtering** by: (a) priority, (b) completion status, (c) due date range. |
| FR-11 | The system shall provide a **search** by title/description (case‑insensitive, partial match). |

---

### 3. UI Requirements (React‑specific)

These are **testable** and exam‑friendly.

| ID | UI Requirement |
|----|----------------|
| UI-01 | **Layout**: Main view split into two columns – left: task list; right: task form (add/edit). On narrow windows (<800px), stack vertically. |
| UI-02 | **Task list** displays each task as a card with: title, priority badge (color‑coded), due date (if any), and a checkbox for complete/incomplete. |
| UI-03 | **Priority badge colors**: High = red, Medium = yellow, Low = green. |
| UI-04 | **Task form** contains fields: title (input), description (textarea), due date (date picker), priority (dropdown). An “Add/Update” button. |
| UI-05 | **Inline edit**: Clicking on a task card populates the form with its data and changes button text to “Update”. |
| UI-06 | **Delete action**: Each task card has a trash can icon. Clicking it moves task to deleted list (no confirmation required for simplicity). |
| UI-07 | **Filter bar** above task list: dropdown for priority, toggle for show/hide completed, date range picker (start/end). A “Clear Filters” button. |
| UI-08 | **Search bar** above task list: text input with magnifying glass icon. Updates results as user types (debounced 300ms). |
| UI-09 | **Recycle bin view**: A button “Deleted Tasks” opens a modal/list showing tasks deleted within last 7 days, each with a “Restore” button. |
| UI-10 | **Responsive feedback**: On add/update/delete, show a non‑intrusive toast message (“Task added”, etc.) for 2 seconds. |
| UI-11 | **Validation feedback**: If title is empty or exceeds 50 chars, the form shows a red error message under the field and disables the submit button. |
| UI-12 | **Dark / light mode toggle** (bonus, but exam‑simple): a sun/moon icon in header toggles CSS class. |

---

### 4. Non‑Functional Requirements

| ID | NFR |
|----|-----|
| NFR-01 | **Performance**: Load existing tasks and render list within **1 second** on a typical Windows laptop (8GB RAM, SSD). |
| NFR-02 | **Persistence**: All task changes shall be saved to `localStorage` within **500ms**. |
| NFR-03 | **Usability**: Adding a new task shall require **no more than 3 user actions** (type title, set priority, click Add). |
| NFR-04 | **Reliability**: No data loss during normal use; app must handle malformed `localStorage` data gracefully (reset to empty array). |
| NFR-05 | **Browser support**: Works on latest Chrome, Edge, Firefox on Windows 10/11. |

---

### 5. Constraints & Assumptions

| ID | Constraint / Assumption |
|----|-------------------------|
| C-01 | **Technology stack**: React 18+ (functional components, hooks), no external state libraries (use `useState` + `useEffect`). |
| C-02 | **Storage**: Only `localStorage`; no database, no network calls. |
| C-03 | **Environment**: Runs in a browser; optionally wrapped as an Electron desktop app, but not required for the lab. |
| C-04 | **Single user** per device – no authentication, no multi‑user. |
| C-05 | **Date format**: All dates stored as ISO string (YYYY-MM-DD). |

---

### 6. Architecture (for the lab exam)

**Architectural style:** **Model-View-Controller (MVC)** adapted to React (where “View” is React components, “Controller” is custom hooks / event handlers, “Model” is plain JavaScript objects + `localStorage` service).

#### Component Diagram (text for exam)

```
┌─────────────┐     ┌─────────────────────────────────────────┐
│    User     │ ←→  │                 View                     │
└─────────────┘     │  (React components: TaskList, TaskForm,  │
                    │   FilterBar, SearchBar, RecycleBinModal) │
                    └──────────────────┬──────────────────────┘
                                       │ events
                                       ▼
                    ┌─────────────────────────────────────────┐
                    │             Controllers                  │
                    │  (Custom hooks: useTaskManager,         │
                    │   useFilters, useSearch)                │
                    └──────────────────┬──────────────────────┘
                                       │ calls
                                       ▼
                    ┌─────────────────────────────────────────┐
                    │                Model                     │
                    │  - Task (class/interface)                │
                    │  - TaskStorage (read/write localStorage) │
                    │  - TaskRepository (CRUD + filtering)     │
                    └─────────────────────────────────────────┘
```

#### Data Flow (example: add a task)

1. **View** – User fills form, clicks “Add”.
2. **Controller** – `useTaskManager` receives title, description, etc. Calls `TaskRepository.add()`.
3. **Model** – Creates new `Task` object, validates rules (max length). Saves to `localStorage` via `TaskStorage`.
4. **Model** returns updated task list.
5. **Controller** updates React state → **View** re‑renders task list.

#### Key files structure (for coding exam)

```
src/
├── models/
│   ├── Task.js          # Task class with validation
│   └── TaskStorage.js   # localStorage read/write
├── hooks/
│   ├── useTaskManager.js  # add, delete, edit, complete, restore
│   └── useFilters.js      # filtering + search logic
├── components/
│   ├── TaskList.jsx
│   ├── TaskCard.jsx
│   ├── TaskForm.jsx
│   ├── FilterBar.jsx
│   ├── SearchBar.jsx
│   └── RecycleBinModal.jsx
├── App.jsx
└── index.js
```

---

### 7. Traceability (exam bonus)

| Requirement | Implemented in |
|-------------|----------------|
| FR-01 (add task) | `TaskForm` + `useTaskManager` + `Task.validate()` |
| FR-08 (persistence) | `TaskStorage` (called after every mutation) |
| UI-03 (priority badges) | `TaskCard` component with CSS classes |
| NFR-05 (browser) | Tested manually on Chrome/Edge |

---

## What an Examiner Would Ask from This SRS

1. *“Show me the React component that handles UI‑05 (inline edit).”*  
2. *“Where is FR-05 (7‑day deletion) implemented? Write the logic.”*  
3. *“Your UI‑11 says validation disables submit button – write the JSX condition.”*  
4. *“How would you test NFR‑01 (load under 1 second) in a lab exam?”*

---

**Ready for the next step (UML diagrams or code)?** Just say “Step 3” or “UML”.