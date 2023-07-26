 import { BrowserModule } from '@angular/platform-browser';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { NgModule } from '@angular/core';
 import { HttpClientModule } from '@angular/common/http';
 import { CoreModule } from './@core/core.module';
 import { ThemeModule } from './@theme/theme.module';
 import { AppComponent } from './app.component';
 import { AppRoutingModule } from './app-routing.module';
 import { CommonModule } from '@angular/common';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { NbLayoutModule, NbActionsModule } from '@nebular/theme';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { SharedModule } from './_shared/shared.module';
 import { HomeModule } from './modules/home/home.module';
 import { LogoutModule } from './modules/logout/logout.module';
 import { LandingModule } from './modules/landing/landing.module';
 import { LoginModule } from './modules/login/login.module';
 import { MessageModule } from './modules/message/message.module';
 import { WpsModule } from './modules/wps.module';
 import {
     NbMenuModule,
     NbSidebarModule,
     NbToastrModule,
     NbWindowModule,
 } from '@nebular/theme';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';

//function is use to get jwt token from local storage
export function tokenGetter() {
    return localStorage.getItem("jwt");
}

 @NgModule({
     declarations: [AppComponent],
     imports: [
         CommonModule,
         BrowserModule,
         BrowserAnimationsModule,
         FormsModule,
         HttpClientModule,
         AppRoutingModule,
         NbActionsModule,
         NbLayoutModule,
         NbMenuModule.forRoot(),
         NbSidebarModule.forRoot(),
         NbToastrModule.forRoot(),
         NbWindowModule.forRoot(),
         ToastrModule.forRoot(),
         NgbModule,
         ReactiveFormsModule,
         ThemeModule.forRoot(),
         CoreModule.forRoot(),
         SharedModule.forRoot(),
         HomeModule,
         LogoutModule,
         LoginModule,
         MessageModule,
         LandingModule,
         WpsModule,
         JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              allowedDomains: ["localhost:7299"],
              disallowedRoutes: []
            }
        })
     ],
     bootstrap: [AppComponent],
 })
 export class AppModule {
 }
