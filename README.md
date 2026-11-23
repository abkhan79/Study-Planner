# 📚 Study Planner Dashboard - Sprint 2

## 👤 Developer Information
* **Name:** Aliya Khan
* **Course:** CS 319 / Project Assignment

## 🛠️ Technologies Used
* **Frontend UI Layout:** HTML5, CSS3
* **Logic & Architecture:** JavaScript (ES6 Modules structured with Single Responsibility & Dependency Inversion)
* **Data Storage:** Browser Client-Side Memory (`localStorage` via `LocalStorageAdapter`)
* **Automated Testing:** Vitest (`vitest`)

## ⚙️ How to Run the App Locally
Because Sprint 2 uses modular JavaScript (`<script type="module">`), serve the folder over a local HTTP server:

1. Clone or unzip the project folder and open Terminal inside the `Study Planner` directory.
2. Start a local static server using Python (built into macOS) or Node:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in Safari, Chrome, or Firefox.

## 🧪 How to Run Automated Tests
1. Ensure Node.js (v18+) is installed, then install dev dependencies from the project root:
   ```bash
   npm install
   ```
2. Run the full Vitest test suite from the project root directory:
   ```bash
   npm test
   ```

## ✨ Trying Sprint 2 Functionality
* **Add Assignments (US-01 & US-02):** Enter an assignment title, optional course name, and future due date, then click **Save Assignment**.
* **Mark Complete (US-03):** Click the checkbox in the **Done** column to toggle an assignment between Pending and Completed (with strikethrough styling) and persist across page refreshes.
* **Live Progress Bar (US-04):** Watch the **Study Progress** bar and percentage label update automatically as items are added, checked off, or deleted.
* **Delete Assignments (US-05):** Click **Delete** on any row to remove unwanted assignments and recalculate progress immediately.

## ⚠️ Known Limitations
* Data is stored locally in the browser's `localStorage`, so clearing site data or switching browsers/devices will reset saved assignments.
* Assignments cannot yet be edited in place or filtered by course/status.
