import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { WpsComponent } from './wps.component';
import { WpsRoutingModule } from './wps-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../_shared/shared.module';
import { NbMenuModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

const PAGES_COMPONENTS = [
    WpsComponent,
];

@NgModule({
    imports: [
        CommonModule,
        MiscellaneousModule,
        NbLayoutModule,
        NbMenuModule,
        NbSidebarModule,
        RouterModule,
        SharedModule,
        ThemeModule,
        WpsRoutingModule,
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WpsModule {
}
