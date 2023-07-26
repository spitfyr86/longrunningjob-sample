import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../_shared/shared.module';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const components = [
    LoginComponent
];

@NgModule({
  imports: [
    ThemeModule,
    NgsRevealModule,
    CommonModule,
    SharedModule,
    FormsModule      
  ],
  declarations: [
    ...components,
  ],
  providers: [
  ],
})
export class LoginModule { }
