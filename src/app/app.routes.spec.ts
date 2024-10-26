import {TestBed} from '@angular/core/testing';
import {Router} from "@angular/router";
import { RouterTestingModule} from "@angular/router/testing";
import { routes } from './app.routes';


describe('Router', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: []
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(router).toBeTruthy();
  });

  it('should navigate to home page when "/" route is accessed', () => {
    router.navigate(['']).then(() => {
      expect(router.url).toBe('/');
    });
  });

  it('should navigate to login page when "/login" route is accessed', () => {
    router.navigate(['login']).then(() => {
      expect(router.url).toBe('/login');
    });
  });

  it('should navigate to not found page when "/unknown" route is accessed', () => {
    router.navigate(['unknown']).then(() => {
      expect(router.url).toBe('/not-found');
    });
  });
})
