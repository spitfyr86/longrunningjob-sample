import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbActionsModule,
    NbLayoutModule,
    NbMenuModule,
    NbSearchModule,
    NbSidebarModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbThemeModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
    FooterComponent,
    HeaderComponent,
    SearchInputComponent,
    TinyMCEComponent,
} from './components';
import {
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
    NumberWithCommasPipe,
} from './pipes';
import {
    OneColumnLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import { AuthGuard } from '../_shared/services/security/auth.guard';
import { ModalService } from '../_shared/services/helpers/modal.service';
import { StorageService } from '../_shared/services/storage.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IdentityComponent } from '../_shared/components/identity/identity.component';
import { SHURIKEN_THEME } from './styles/theme.shuriken';
import { SharedModule } from '../_shared/shared.module';
import { RouterModule } from '@angular/router';
// import { SampleLayoutComponent } from './layouts/sample/sample.layout';

const NB_MODULES = [
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbSecurityModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ...NB_MODULES,
    ],
    exports: [
        HeaderComponent,
    ],
    declarations: [
        CapitalizePipe,
        FooterComponent,
        HeaderComponent,
        IdentityComponent,
        NumberWithCommasPipe,
        OneColumnLayoutComponent,
        PluralPipe,
        RoundPipe,
        // SampleLayoutComponent,
        SearchInputComponent,
        ThreeColumnsLayoutComponent,
        TimingPipe,
        TinyMCEComponent,
        TwoColumnsLayoutComponent,
    ],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders<ThemeModule> {
        return {
            ngModule: ThemeModule,
            providers: [
                ...NbThemeModule.forRoot(
                    {
                        name: 'shuriken',
                        // name: 'default',
                    },
                    [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME, SHURIKEN_THEME],
                ).providers,
                AuthGuard,
                ModalService,
                StorageService,
                ...NbSidebarModule.forRoot().providers,
                ...NbMenuModule.forRoot().providers,
            ],
        };
    }
}
