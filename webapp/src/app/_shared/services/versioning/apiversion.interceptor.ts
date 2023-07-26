import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiVersionInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('api-version')) {
            const authReq = req.clone({ headers: req.headers.set('api-version', '1.0') });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
