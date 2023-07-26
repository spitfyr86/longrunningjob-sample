import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidLogin?: boolean;
  url = environment.API_URL + '/api/authentication/';

  constructor(private router: Router, 
    private http: HttpClient,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService) { }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);

    this.http.post(this.url + "login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      // this.toastr.success("Logged In successfully");
      this.router.navigate(["/message"]);
    }, err => {
      this.invalidLogin = true;
    });
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