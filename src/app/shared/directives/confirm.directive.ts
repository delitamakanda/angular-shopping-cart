import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appConfirm]',
  standalone: true
})
export class ConfirmDirective {
  @Input('appConfirm') message!: string;
  @Output() confirmEvent: EventEmitter<void> = new EventEmitter();

 @HostListener('click')
 openDialog(): void {
  const confirmation = confirm(this.message);
  if (confirmation) {
    this.confirmEvent.emit();
  }
 }

}
