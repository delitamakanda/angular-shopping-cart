import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import {signal} from "@angular/core";
import {Dialog} from "@angular/cdk/dialog";

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService, {
        provide: Dialog,
        useValue: { open: () => ({ closed: signal({ }) }) }  // Mock the Dialog service for testing purposes
      }]
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should confirm a dialog', () => {
    service.confirm('Do you want to proceed?', 'Confirmation').subscribe(result => {
      expect(result).toBe(true);
    });
  });
});
