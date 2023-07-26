import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgsRevealModule } from 'ngx-scrollreveal';

import { ThemeModule } from '../../@theme/theme.module';

import { HomeComponent } from './home.component';
// import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SharedModule } from '../../_shared/shared.module';
import {NgcCookieConsentModule} from 'ngx-cookieconsent';
import {
    NbDialogModule,
    NbLayoutModule,
    NbSidebarModule,
    NbSidebarService,
    NbCardModule,
    NbSpinnerModule,
    NbActionsModule,
    NbIconModule,
} from '@nebular/theme';
import { ConfigurationService } from '../../_shared/services/configuration.service';
import { CommonModule } from '@angular/common';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const components = [
    HomeComponent,
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ThemeModule,
        NgsRevealModule,
        SharedModule,
        NbActionsModule,
        NbIconModule,
        NbLayoutModule,
        NbSidebarModule.forRoot(),
        ModalModule.forRoot(),
        NbDialogModule.forRoot(),
        NbCardModule,
        NbSpinnerModule,
        MiscellaneousModule,
        NgcCookieConsentModule,
        ThemeModule,
        NgsRevealModule,
        SharedModule,
        NgcCookieConsentModule,
        MatButtonModule,
        MatCommonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        ...components,
    ],
    providers: [
        NbSidebarService,
        ConfigurationService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
