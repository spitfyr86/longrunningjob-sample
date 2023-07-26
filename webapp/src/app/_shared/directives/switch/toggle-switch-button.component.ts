import { Component, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const TOGGLE_SWITH_BUTTON_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleSwitchButtonComponent), // tslint:disable-line
  multi: true,
};

@Component({
  selector: 'ngx-toggle-switch-button',
  templateUrl: 'toggle-switch-button.component.html',
  styleUrls: ['./toggle-switch-button.component.scss'],
  providers: [TOGGLE_SWITH_BUTTON_CONTROL_VALUE_ACCESSOR],
})
export class ToggleSwitchButtonComponent implements ControlValueAccessor {

  private onTouchedCallback = (v: any) => {
  }
  private onChangeCallback = (v: any) => {
  }

  private _checked: boolean;
  private _disabled: boolean;
  private _name: string;

  @Input() set checked(v: boolean) {
    this._checked = v !== false;
  }

  get checked() {
    return this._checked;
  }

  @Input() set disabled(v: boolean) {
    this._disabled = v !== false;
  }

  get disabled() {
    return this._disabled;
  }

  @Output() change = new EventEmitter<boolean>();

  constructor() {
  }

  @HostListener('click')
  onToggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.change.emit(this.checked);
    this.onChangeCallback(this.checked);
    this.onTouchedCallback(this.checked);
  }


  writeValue(obj: any): void {
    if (obj !== this.checked) {
      this.checked = !!obj;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
