import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ConfigurationService } from '../../_shared/services/configuration.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'ngx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    authenticated = false;
    registerPage: string = '';
    private subscription: Subscription;
    noCookiePreference: boolean = true;

    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    isModalShown: boolean = false;

    constructor(private configurationService: ConfigurationService,
        private jwtHelper : JwtHelperService,
        private ngZone: NgZone,
        private router: Router) {

        this.registerPage = `${this.configurationService.serverSettings.identityUrl}/account/register`;
        this.noCookiePreference = this.hasAcceptedCookies() === false ? true : false;
    }

    showIntro() {
        this.showModal();
        interval(118000).pipe(take(4)).subscribe(() => this.hideModal());
    }

    showModal(): void {
        this.isModalShown = true;
    }

    hideModal(): void {
        if (this.autoShownModal) {
            this.autoShownModal.hide();
        }
    }

    onHidden(): void {
        this.isModalShown = false;
    }

    ngOnInit() {
        this.authenticated = this.isUserAuthenticated();

        if (!this.authenticated) {
            this.showModal();
            interval(118000).pipe(take(4)).subscribe(() => this.hideModal());
        }
    }

    login() {
        this.ngZone.run(() => this.router.navigateByUrl('/message'));
    }

    hasAcceptedCookies() {
        let cookiePreference = sessionStorage.getItem('cookiePreference');

        if (!cookiePreference) {
            return false;
        } else {
            return cookiePreference === 'accepted' ? true : false;
        }
    }
    
    isUserAuthenticated() {
        const token = localStorage.getItem("jwt");
        const isTokenExpired = this.jwtHelper.isTokenExpired(token);

        if (token && !isTokenExpired){
            return true;
        }
        else {
            return false;
        }
    }
}
