import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChangeFn = (value: number) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-rate',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RateComponent),
      multi: true
    },
  ],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.scss'
})
export class RateComponent {
  rate = 0;

  onChange: OnChangeFn = () => {};
  onTouched: OnTouchedFn = () => {};

  writeValue(value: number): void {
    this.rate = value;
  }

  registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }

  changeRate(rate: number) {
    this.rate = rate;
    this.onChange(rate);
  }
}
