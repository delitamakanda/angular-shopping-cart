import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [
        {
          provide: DialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: DIALOG_DATA,
          useValue: {
            message: 'Do you want to proceed?',
            title: 'Confirmation'
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
