import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
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
});
