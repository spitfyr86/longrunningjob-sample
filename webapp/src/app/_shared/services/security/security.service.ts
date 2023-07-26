import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { StorageService } from '../storage.service';
import { environment } from '../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class SecurityService {

    private headers: HttpHeaders;
    private authorityUrl = '';

    private authenticationSource = new Subject<boolean>();
    public authenticationChallenge$: Observable<boolean> = this.authenticationSource.asObservable();

    public userData: any;

    constructor(private jwtHelper: JwtHelperService,
        private storageService: StorageService,
    ) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Accept', 'application/json');

        this.authorityUrl = environment.API_URL;

        if (this.isAuthenticated) {
            this.authenticationSource.next(true);
            this.userData = this.storageService.retrieve('userData');
        }
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem("jwt");
        const isTokenExpired = this.jwtHelper.isTokenExpired(token);

        if (token && !isTokenExpired){
            return true;
        }
        else {
            return false;
        }
    }

    public logout(): void{
        localStorage.removeItem("jwt");
    }
}
