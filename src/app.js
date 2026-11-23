import { LocalStorageAdapter } from './storage.js';
import { AssignmentService } from './assignmentService.js';

const service = new AssignmentService(new LocalStorageAdapter('assignments'));

const form = document.getElementById('assignmentForm');
const titleInput = document.getElementById('title');
const courseInput = document.getElementById('course');
const dueDateInput = document.getElementById('dueDate');
const tableBody = document.getElementById('assignmentTableBody');
const titleError = document.getElementById('titleError');
const dateError = document.getElementById('dateError');

export function renderDashboard() {
    const sorted = service.getAllSorted();
    tableBody.innerHTML = '';

    sorted.forEach((item) => {
        const row = document.createElement('tr');
        if (item.completed) {
            row.classList.add('completed-row');
        }

        const statusCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.setAttribute('aria-label', `Mark ${item.title} complete`);
        checkbox.addEventListener('change', () => {
            service.toggleComplete(item.id);
            renderDashboard();
        });
        statusCell.appendChild(checkbox);

        const titleCell = document.createElement('td');
        titleCell.textContent = item.title;

        const courseCell = document.createElement('td');
        courseCell.textContent = item.course || 'N/A';

        const dateCell = document.createElement('td');
        dateCell.textContent = item.date;

        row.append(statusCell, titleCell, courseCell, dateCell);
        tableBody.appendChild(row);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    titleError.style.display = 'none';
    dateError.style.display = 'none';

    let isValid = true;
    const titleValue = titleInput.value.trim();
    const courseValue = courseInput.value.trim();
    const dateValue = dueDateInput.value;

    if (titleValue === '') {
        titleError.style.display = 'block';
        isValid = false;
    }

    if (dateValue === '') {
        dateError.innerText = 'Please select a date.';
        dateError.style.display = 'block';
        isValid = false;
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(dateValue);
        selectedDate.setMinutes(selectedDate.getMinutes() + selectedDate.getTimezoneOffset());

        if (selectedDate < today) {
            dateError.innerText = 'Due date cannot be in the past.';
            dateError.style.display = 'block';
            isValid = false;
        }
    }

    if (isValid) {
        service.addAssignment({
            title: titleValue,
            course: courseValue,
            date: dateValue
        });
        renderDashboard();
        form.reset();
    }
});

renderDashboard();
