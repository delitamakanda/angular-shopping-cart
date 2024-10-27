import {TestBed} from '@angular/core/testing';
import {Router} from "@angular/router";
import { provideRouter } from "@angular/router";
import { routes } from './app.routes';


describe('Router', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideRouter(routes)
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(router).toBeTruthy();
  });

  it('should navigate to home page when "/" route is accessed', () => {
    router.navigate(['']);
    expect(router.url).toBe('/');
  });

  it('should navigate to login page when "/login" route is accessed', () => {
    const routerSpy = spyOn(router, 'navigate');
    router.navigate(['login']);
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to not found page when "/unknown" route is accessed', () => {
    const routerSpy = spyOn(router, 'navigate');
    router.navigate(['unknown']);
    expect(routerSpy).toHaveBeenCalledWith(['unknown']);
  });
})
