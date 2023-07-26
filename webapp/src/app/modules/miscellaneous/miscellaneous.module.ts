import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterV2Component } from './footer-v2/footer-v2.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
    ],
    declarations: [
        NotFoundComponent,
        FooterV2Component,
    ],
    exports: [
        FooterV2Component,
    ],
})
export class MiscellaneousModule { }
