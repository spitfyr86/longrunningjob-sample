import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../../services/security/security.service';




@Component({
    selector: 'ngx-identity',
    templateUrl: './identity.component.html',
    styleUrls: ['./identity.component.scss'],
    host: { 'class': 'profile-box' },
})
export class IdentityComponent implements OnInit {

    authenticated = false;
    name: string = '';

    userMenu = [
        { title: 'Sign out', link: '/logout' },
    ];

    constructor(private securityService: SecurityService,
        private ngZone: NgZone,
        private router: Router) {

    }

    ngOnInit() {
        this.authenticated = this.securityService.isAuthenticated();
        
        if (this.authenticated) {
            this.name = "Admin"
        }
    }

    goToMessageEncoder() {
        this.ngZone.run(() => this.router.navigateByUrl('/message'));
    }
}
