import { Directive, HostBinding } from '@angular/core';

import { BaThemeConfigProvider } from '../../../theme/theme.configProvider';
import { isMobile } from '../../theme.constants';

@Directive({
  selector: '[baThemeRun]' // tslint:disable-line
})
// tslint:disable-next-line
export class BaThemeRun {

  private _classes: string[] = [];
  @HostBinding('class') classesString: string;

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  // tslint:disable-next-line
  public ngOnInit(): void {
    this._assignTheme();
    this._assignMobile();
  }

  private _assignTheme(): void {
    this._addClass(this._baConfig.getConfig().theme.name);
  }

  private _assignMobile(): void {
    if (isMobile()) {
      this._addClass('mobile');
    }
  }

  private _addClass(cls: string) {
    this._classes.push(cls);
    this.classesString = this._classes.join(' ');
  }
}
