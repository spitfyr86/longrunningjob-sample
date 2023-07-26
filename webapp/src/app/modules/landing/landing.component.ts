import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-msg',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
  })
export class LandingComponent  {

    constructor(private jwtHelper: JwtHelperService, private router: Router) {
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

    public logOut = () => {
        localStorage.removeItem("jwt");
    }

}