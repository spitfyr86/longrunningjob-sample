import {
    NgModule,
    ModuleWithProviders,
    InjectionToken,
    CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

// Guards
import { AuthGuard } from './services/security/auth.guard';

// Services
import { AlertService } from './services/helpers/alert.service';
import { AuthInterceptor } from './services/security/auth.interceptor';
import { SecurityService } from './services/security/security.service';
import { SlimLoaderService } from './services/helpers/slim-loader.service';
import { StorageService } from './services/storage.service';
import { SupportService } from './services/support.service';

// Components
import { AlertComponent } from './directives/alert/alert.component';
import { AlertModalComponent } from './components/modal/alert/alert-modal.component';
import { ConfirmationModalComponent } from './components/modal/confirmation/confirmation-modal.component';
import { SlimComponent } from './directives/slim/slim.component';
import { ToggleSwitchButtonComponent } from './directives/switch/toggle-switch-button.component';

import { ModalService } from './services/helpers/modal.service';
import { SectionNotFoundComponent } from './components/section-notfound/section-notfound.component';

import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbUserModule,
    NbSpinnerModule,
    NbIconModule,
    NbSelectModule,
} from '@nebular/theme';
import { BaThemeConfigProvider } from './theme/theme.configProvider';

import { ConsoleLogger, Logger, NoopLogger } from './services/helpers/log.service';
import { environment } from '../../environments/environment';

// adsense
import { AdsenseModule } from 'ng2-adsense';
import { AppLogoComponent } from './components/app-logo/app-logo.component';
import { SectionFooterComponent } from './components/section-footer/section-footer.component';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LoadingBarModule, LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { CookieConsentComponent } from './components/modal/cookie-consent/cookie-consent.component';

const CON_SERVICES = [
    AuthGuard,
    ModalService,
    SecurityService,
    StorageService,
    SupportService,
];

const NB_MODULES = [
    NbActionsModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NbSelectModule,
];

const MODULE_SERVICES = [
    AlertService,
    SlimLoaderService,
];

const UI_MODULES = [
    AdsenseModule.forRoot({
        adClient: 'ca-pub-7640562161899788',
        adSlot: 7259870550,
    }),
    CarouselModule.forRoot(),
    NbSpinnerModule,
    NgsRevealModule,
    LoadingBarModule,
    TooltipModule.forRoot(),
];

const UI_COMPONENTS = [
    AlertComponent,
    AlertModalComponent,
    AppLogoComponent,
    ConfirmationModalComponent,
    SectionFooterComponent,
    SectionNotFoundComponent,
    SlimComponent,
    ToggleSwitchButtonComponent,
];

const MODAL_COMPONENTS = [
    AlertModalComponent,
    ConfirmationModalComponent
];

const logProvider = {
    provide: Logger,
    useClass: environment['DEBUG_MODE'] ? ConsoleLogger : NoopLogger,
};

const NG_PIPES = [
    DatePipe,
];

@NgModule({
    imports: [
        HttpClientModule,
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NB_MODULES,
        UI_MODULES,
    ],
    declarations: [
        UI_COMPONENTS,
        CookieConsentComponent,
    ],
    exports: [
        NB_MODULES,
        UI_COMPONENTS,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },
        logProvider,
        NG_PIPES,
        NgbActiveModal,

    ],
    entryComponents: [
        ...MODAL_COMPONENTS,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                // Providers
                ...CON_SERVICES,
                ...MODULE_SERVICES,
                BaThemeConfigProvider,

            ],
        };
    }
}
