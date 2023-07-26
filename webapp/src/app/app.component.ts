import { Component, OnInit } from '@angular/core';
import {
    Router,
    NavigationStart,
    RoutesRecognized,
    RouteConfigLoadStart,
    RouteConfigLoadEnd,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityService } from './_shared/services/security/security.service';

@Component({
    selector: 'ngx-app',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {

    authenticated = false;
    subscription: Subscription;

    constructor(private securityService: SecurityService, private router: Router) {

        this.authenticated = this.securityService.isAuthenticated();

        router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                // Navigation started.
            } else if (event instanceof RoutesRecognized) {
                // Router parses the URL and the routes are recognized.
            } else if (event instanceof RouteConfigLoadStart) {
                // Before the Router lazyloads a route configuration.
            } else if (event instanceof RouteConfigLoadEnd) {
                // Route has been lazy loaded.
            } else if (event instanceof NavigationEnd) {
                // Navigation Ended Successfully.
                if (event.url === '/home') {
                    document.querySelectorAll('body')[0].style.overflow = 'auto';
                }
            } else if (event instanceof NavigationCancel) {
                // Navigation is canceled as the Route-Guard returned false during navigation.
            } else if (event instanceof NavigationError) {
                // Navigation fails due to an unexpected error.
                console.error(event.error);
            }
        });
    }
}
