import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class SlimLoaderService {
    private slimLoader = new Subject<any>();

    getSlimLoader(): Observable<any> {
        return this.slimLoader.asObservable();
    }

    // tslint:disable-next-line
    start(onComplete?: Function, height?: any, color?: any) {
        const progress = {
            start: true,
            stop: false,
            complete: false,
            reset: false,
            progress: 0,
            height: height || '5px',
            color: color || '#2d6d77',
            onCompleteFn: onComplete || null,
        };
        this.slimLoad(progress);
    }

    stop(height?: any, color?: any) {
        const progress = {
            start: false,
            stop: true,
            complete: false,
            reset: false,
            progress: 0,
            height: height || '5px',
            color: color || '#2d6d77',
            onCompleteFn: null,
        };
        this.slimLoad(progress);
    }

    complete(height?: any, color?: any) {
        const progress = {
            start: false,
            stop: false,
            complete: true,
            reset: false,
            progress: 0,
            height: height || '5px',
            color: color || '#2d6d77',
            onCompleteFn: null,
        };
        this.slimLoad(progress);
    }

    reset(height?: any, color?: any) {
        const progress = {
            start: false,
            stop: false,
            complete: false,
            reset: true,
            progress: 0,
            height: height || '5px',
            color: color || '#2d6d77',
            onCompleteFn: null,
        };
        this.slimLoad(progress);
    }

    slimLoad(progress: any) {
        this.slimLoader.next(<any>progress); // tslint:disable-line
    }

    clear() {
        this.slimLoader.next();
    }
}
