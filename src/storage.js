export class LocalStorageAdapter {
    constructor(key = 'assignments') {
        this.key = key;
    }

    load() {
        const raw = localStorage.getItem(this.key);
        return raw ? JSON.parse(raw) : [];
    }

    save(items) {
        localStorage.setItem(this.key, JSON.stringify(items));
    }
}
