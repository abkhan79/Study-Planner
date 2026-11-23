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
