export class AssignmentService {
    constructor(storage) {
        this.storage = storage;
        this.assignments = this.storage.load().map((item, index) => ({
            id: item.id || `legacy-${index}-${Date.now()}`,
            title: item.title,
            course: item.course || 'N/A',
            date: item.date,
            completed: Boolean(item.completed)
        }));
        this.storage.save(this.assignments);
    }

    getAllSorted() {
        return [...this.assignments].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    addAssignment({ title, course, date }) {
        const newAssignment = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            title: title.trim(),
            course: course && course.trim() ? course.trim() : 'N/A',
            date,
            completed: false
        };
        this.assignments.push(newAssignment);
        this.storage.save(this.assignments);
        return newAssignment;
    }

    toggleComplete(id) {
        const target = this.assignments.find((item) => item.id === id);
        if (!target) {
            return null;
        }
        target.completed = !target.completed;
        this.storage.save(this.assignments);
        return target;
    }
}
