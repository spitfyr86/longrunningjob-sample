import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { LogoutComponent } from './logout.component';
import { SharedModule } from '../../_shared/shared.module';

const components = [
    LogoutComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    SharedModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
  ],
})
export class LogoutModule { }
