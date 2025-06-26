import { ConfirmDirective } from './confirm.directive';

describe('ConfirmDirective', () => {
  it('should create an instance', () => {
    const directive = new ConfirmDirective();
    expect(directive).toBeTruthy();
  });

  /*
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
   */

  // test cases for ConfirmDirective with jasmine
  it('should emit confirmEvent when the user clicks confirm', () => {
    const directive = new ConfirmDirective();
    const confirmSpy = spyOn(directive.confirmEvent, 'emit');
    spyOn(window, 'confirm').and.returnValue(true);
    directive.openDialog();
    expect(confirmSpy).toHaveBeenCalledWith();
  });

  it('should not emit confirmEvent when the user clicks cancel', () => {
    const directive = new ConfirmDirective();
    const confirmSpy = spyOn(directive.confirmEvent, 'emit');
    spyOn(window, 'confirm').and.returnValue(false);
    directive.openDialog();
    expect(confirmSpy).not.toHaveBeenCalledWith();
  });
});
