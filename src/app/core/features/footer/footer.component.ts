import { Component, ChangeDetectionStrategy, inject, LOCALE_ID, signal } from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-brand">
          <span class="footer-logo" aria-hidden="true">🛒</span>
          <span i18n>{{ credits }}. Tout droits réservés.</span>
        </p>
        <nav class="footer-links" aria-label="Legal">
          @for(
            entry of staticPages; track entry[0]
            ) {
              <a [routerLink]="['/home/static-pages', entry[0]]">{{ entry[1] }}</a>
          }
        </nav>
        <nav class="footer-locale" aria-label="Language">
          <span i18n>Langue:</span>
          @for(locale of availableLocales; track locale.code) {
            <a [href]="localeHref(locale.code)" [class.active]="currentLocale === locale.code">{{ locale.label }}</a>
          }
        </nav>
      </div>
    </footer>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly router = inject(Router);
  readonly credits = new Date().getFullYear() + ' - Angular Shopping Cart';
  readonly staticPagesDictionary: Record<string, string> = {
    'legal-notice':'Mentions légales',
    'terms-of-use': 'Conditions d\'utilisation',
    'privacy-policy': 'Politique de confidentialité',
    'terms-of-sale': 'Conditions générales de vente',
    'cookies-policy': 'Politique de cookies',
  }
  readonly currentLocale = inject(LOCALE_ID);
  readonly availableLocales = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' }
  ]

  readonly localeCodePattern = this.availableLocales.map(locale => locale.code).join('|');
  readonly localeRegex = new RegExp(`^/(${this.localeCodePattern})(/|$)`);

  readonly currentPath = signal(this.stripLocaleFromPath(this.router.url));

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event) => this.currentPath.set(this.stripLocaleFromPath(event.urlAfterRedirects)));
  }

  get staticPages(): [string, string][] {
    return Object.entries(this.formatStaticPageObject(this.staticPagesDictionary));
  }

   formatStaticPageObject(staticPages: Record<string, string>) : Record<string, string>  {
    const formattedPages: Record<string, string> = {};
    for (const [key, value] of Object.entries(staticPages)) {
      formattedPages[key.toLowerCase()] = $localize`${value}`;
    }
    return formattedPages;
  }

  private stripLocaleFromPath(path: string): string {
    const stripped = path.replace(this.localeRegex, '');
    return stripped === '' ? '/' : stripped;
  }

  localeHref(code: string): string {
    return `/${code}${this.currentPath()}`;
  }
}
