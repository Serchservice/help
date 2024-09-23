import { action, computed, makeAutoObservable, observable } from 'mobx';
import store from 'store2';
import Store from './Store';
import { HelpCategory } from '@serchservice/contently';

const STORAGE_KEY = "help"

/**
 * Store for managing HelpCategory[] data.
 * @implements Store<HelpCategory[]>
 */
class HelpRepository implements Store<HelpCategory[]> {
    /** The current content data. */
    content: HelpCategory[] = [];

    constructor() {
        makeAutoObservable(this, {
            content: observable,
            read: computed,
            set: action,
            clear: action
        });
        const saved = store.get(STORAGE_KEY);
        if (saved && Array.isArray(JSON.parse(saved))) {
            this.content = JSON.parse(saved).map((item: Map<string, object>) => HelpCategory.fromJson(item));
        }
    }

    /**
     * Get the current content data.
     * @returns {HelpCategory[]} The current content data.
     */
    get read(): HelpCategory[] {
        return this.content;
    }

    /**
     * Set new content data.
     * @param {HelpCategory[]} data - The new content data.
     */
    set(data: HelpCategory[]): void {
        this.content = data;
        store.set(STORAGE_KEY, JSON.stringify(data.map((item) => item.toJson())));
    }

    /**
     * Clear the content data.
     */
    clear(): void {
        this.content = [];
        store.remove(STORAGE_KEY);
    }
}

const HelpDb = new HelpRepository();
export default HelpDb;