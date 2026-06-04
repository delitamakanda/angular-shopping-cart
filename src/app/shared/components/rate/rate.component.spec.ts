import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { RateComponent } from './rate.component';

describe('RateComponent', () => {
  let component: RateComponent;
  let fixture: ComponentFixture<RateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize rate to 0', () => {
    expect(component.rate).toBe(0);
  });

  it('should call onChange with rate when changeRate is called', () => {
    const spy = vi.spyOn(component, 'onChange');
    component.changeRate(5);
    expect(spy).toHaveBeenCalledWith(5);
  })
});
