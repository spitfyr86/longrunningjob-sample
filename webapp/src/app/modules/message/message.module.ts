import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { SharedModule } from '../../_shared/shared.module';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';

const components = [
    MessageComponent
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgsRevealModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components,
  ],
  providers: [
  ],
})
export class MessageModule { }
