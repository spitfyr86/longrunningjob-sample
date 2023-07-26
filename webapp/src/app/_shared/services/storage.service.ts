import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    private storage: Storage;

    constructor() {
        this.storage = localStorage; // sessionStorage;
    }

    public retrieve(key: string): any {
        const item = this.storage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }

        return null;
    }

    public store(key: string, value: any): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    public remove(key: string): void {
        this.storage.removeItem(key);
    }
}
