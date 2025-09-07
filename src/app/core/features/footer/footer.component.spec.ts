import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {ActivatedRoute} from "@angular/router";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: {                 get: (param: string) => param === 'legal-notice' ? 'legal-notice' : null
              } }  }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.credits).toContain(currentYear.toString());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct copyright notice', () => {
    const expectedCopyrightNotice = new Date().getFullYear() + ' ' +'- Angular Shopping Cart';
    expect(component.credits).toEqual(expectedCopyrightNotice);
  });

  it('should not contain the current year if it is not a new year', () => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    expect(component.credits).not.toContain(lastYear.toString());
  });

  it('should display the legal notice link when the query parameter is "legal-notice"', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[href="/static-pages/legal-notice"]').textContent).toContain('Mentions légales');
  });
});
