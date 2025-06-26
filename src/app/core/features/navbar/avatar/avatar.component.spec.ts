import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import {provideRouter, Router} from "@angular/router";
import {routes} from "../../../../app.routes";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {API_URL} from "../../../../constants";
import {AuthService} from "../../../services/auth.service";
import {of} from "rxjs";

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),  // Mock HttpClient for testing purposes
        { provide: API_URL, useValue: 'https://example.com/api' },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disconnect user when disconnect button is clicked', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    spyOn(authService, 'logout').and.returnValue(of());
    spyOn(router, 'navigate').and.returnValue(of() as any);

    component.disconnect();

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should open and close the menu when the button is clicked', () => {
    component.openMenu = false;
    component.toggleMenu();
    expect(component.openMenu).toBeTruthy();

    component.toggleMenu();
    expect(component.openMenu).toBeFalsy();
  })
});
