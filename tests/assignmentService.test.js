import { describe, it, expect } from 'vitest';
import { AssignmentService } from '../src/assignmentService.js';

function createMockStorage(initial = []) {
    let data = [...initial];
    return {
        load: () => [...data],
        save: (items) => { data = [...items]; }
    };
}

describe('US-03: AssignmentService - Mark Complete', () => {
    it('toggles an assignment from Pending (false) to Completed (true) and back', () => {
        const service = new AssignmentService(createMockStorage());
        const item = service.addAssignment({
            title: 'Sprint 2 Report',
            course: 'CS 319',
            date: '2026-12-01'
        });

        expect(item.completed).toBe(false);

        const completedItem = service.toggleComplete(item.id);
        expect(completedItem.completed).toBe(true);

        const revertedItem = service.toggleComplete(item.id);
        expect(revertedItem.completed).toBe(false);
    });

    it('safely returns null without crashing when toggling a non-existent ID', () => {
        const service = new AssignmentService(createMockStorage());
        const result = service.toggleComplete('non-existent-id');
        expect(result).toBeNull();
    });
});

describe('US-04: AssignmentService - Progress Bar Calculation', () => {
    it('returns 0% without NaN when the assignment list is empty', () => {
        const service = new AssignmentService(createMockStorage());
        expect(service.calculateProgress()).toEqual({
            completedCount: 0,
            totalCount: 0,
            percentage: 0
        });
    });

    it('calculates accurate completion counts and rounded percentages', () => {
        const service = new AssignmentService(createMockStorage());
        const a1 = service.addAssignment({ title: 'Task 1', course: 'CS 319', date: '2026-12-01' });
        const a2 = service.addAssignment({ title: 'Task 2', course: 'CS 319', date: '2026-12-02' });
        service.addAssignment({ title: 'Task 3', course: 'CS 319', date: '2026-12-03' });
        service.addAssignment({ title: 'Task 4', course: 'CS 319', date: '2026-12-04' });

        service.toggleComplete(a1.id);
        expect(service.calculateProgress()).toEqual({
            completedCount: 1,
            totalCount: 4,
            percentage: 25
        });

        service.toggleComplete(a2.id);
        expect(service.calculateProgress()).toEqual({
            completedCount: 2,
            totalCount: 4,
            percentage: 50
        });
    });
});
