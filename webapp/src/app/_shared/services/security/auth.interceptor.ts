import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private storageService: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const authorizationData = this.storageService.retrieve('authorizationData');
        const authHeader = 'Bearer ' + authorizationData;
        // Clone the request to add the new header.
        const authReq = authorizationData ? req.clone({ headers: req.headers.set('Authorization', authHeader) })
            : req.clone({});
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}
