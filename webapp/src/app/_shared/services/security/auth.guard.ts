import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { SecurityService } from './security.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

    // constructor(private securityService: SecurityService, private router: Router) { }
    constructor(private jwtHelper: JwtHelperService, private router: Router) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //get the jwt token which are present in the local storage
        const token = localStorage.getItem("jwt");

        //Check if the token is expired or not and if token is expired then redirect to login page and return false
        const isTokenExpired = this.jwtHelper.isTokenExpired(token);
        if (token && !isTokenExpired){
            return true;
        }

        this.router.navigate(["login"]);
        return false;
    }
}
