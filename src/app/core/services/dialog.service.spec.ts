import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import {Dialog} from "@angular/cdk/dialog";
import { of } from "rxjs";

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService, {
        provide: Dialog,
        useValue: { open: () => ({ closed: of() }) }  // Mock the Dialog service for testing purposes
      }]
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should confirm a dialog', () => {
    service.alertConfirm({ message: 'happy', title: 'life'}).subscribe(result => {
      expect(result).toBeTruthy()
    });
  });
});
