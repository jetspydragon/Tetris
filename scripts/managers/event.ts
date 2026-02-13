export class Event<T> {
    private listeners = new Set<(data: T) => void>();

    subscribe(handler: (data: T) => void): void {
        this.listeners.add(handler);
    }

    unsubscribe(handler: (data: T) => void): void {
        this.listeners.delete(handler);
    }

    emit(data: T): void {
        for (const handler of this.listeners) {
            handler(data);
        }
    }
}
