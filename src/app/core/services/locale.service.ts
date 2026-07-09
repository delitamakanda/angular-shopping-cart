import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, SupportedLocale } from '../../constants';

const LOCALE_REGEX = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(?=/|$)`);

export function extractLocale(url: string): SupportedLocale {
  const match = LOCALE_REGEX.exec(url);
  return (match?.[1] as SupportedLocale | undefined) ?? DEFAULT_LOCALE;
}

export function stripLocale(url: string): string {
  const stripped = url.replace(LOCALE_REGEX, '');
  return stripped === '' ? '/' : stripped;
}

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly router = inject(Router);

  readonly current = signal<SupportedLocale>(extractLocale(this.router.url));
  readonly pathWithoutLocale = signal(stripLocale(this.router.url));

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(event => {
      this.current.set(extractLocale(event.urlAfterRedirects));
      this.pathWithoutLocale.set(stripLocale(event.urlAfterRedirects));
    });
  }

  /** Builds an absolute, locale-prefixed router link, e.g. link('home', 'cart') -> ['/', 'fr', 'home', 'cart']. */
  link(...segments: string[]): string[] {
    return ['/', this.current(), ...segments];
  }
}
