import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import {Notyf} from "notyf";

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with a duration of 3000ms', () => {
  // Re-initialize the service to trigger the constructor
  service = new ToastService();

  const options = (service as any).options;

  // Validate that the service was constructed with correct options
  expect(service['options'].duration).toBe(3000);
  expect(service['options'].position.x).toBe('center');
  expect(service['options'].position.y).toBe('top');
});

  it('should initialize with position centered horizontally', () => {
  // Create a new instance of the service to ensure we test constructor behavior
  const toastService = new ToastService();

  // Access the options used for initialization
  const options = (toastService as any).options;

  // Verify that the horizontal position is set to 'center'
  expect(options.position.x).toBe('center');
});

});
