import { ConfirmDirective } from './confirm.directive';
import { describe, it, expect, vi } from 'vitest';

describe('ConfirmDirective', () => {
  it('should create an instance', () => {
    const directive = new ConfirmDirective();
    expect(directive).toBeTruthy();
  });

  // test cases for ConfirmDirective with jasmine
  it('should emit confirmEvent when the user clicks confirm', () => {
    const directive = new ConfirmDirective();
    const confirmSpy = vi.spyOn(directive.confirmEvent, 'emit');
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    directive.openDialog();
    expect(confirmSpy).toHaveBeenCalledWith();
  });

  it('should not emit confirmEvent when the user clicks cancel', () => {
    const directive = new ConfirmDirective();
    const confirmSpy = vi.spyOn(directive.confirmEvent, 'emit');
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    directive.openDialog();
    expect(confirmSpy).not.toHaveBeenCalledWith();
  });
});
