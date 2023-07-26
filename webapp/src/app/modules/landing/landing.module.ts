import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { SharedModule } from '../../_shared/shared.module';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing.component';

const components = [
    LandingComponent
];

@NgModule({
  imports: [
    ThemeModule,
    NgsRevealModule,
    SharedModule,
    FormsModule      
  ],
  declarations: [
    ...components,
  ],
  providers: [
  ],
})
export class LandingModule { }
