import { HomeComponent } from './modules/home/home.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './modules/login/login.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { LandingComponent } from './modules/landing/landing.component';
import { MessageComponent } from './modules/message/message.component';
import { AuthGuard } from './_shared/services/security/auth.guard';

export const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'message', component: MessageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];

const config: ExtraOptions = {
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})

export class AppRoutingModule {
}
