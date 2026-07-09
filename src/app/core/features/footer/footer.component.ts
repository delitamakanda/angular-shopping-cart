import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LocaleService } from "../../services/locale.service";
import { SupportedLocale } from "../../../constants";

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
              <a [routerLink]="localeService.link('home', 'static-pages', entry[0])">{{ entry[1] }}</a>
          }
        </nav>
        <nav class="footer-locale" aria-label="Language">
          <span i18n>Langue:</span>
          @for(locale of availableLocales; track locale.code) {
            <a [href]="localeHref(locale.code)" [class.active]="localeService.current() === locale.code">{{ locale.label }}</a>
          }
        </nav>
      </div>
    </footer>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly localeService = inject(LocaleService);
  readonly credits = new Date().getFullYear() + ' - Angular Shopping Cart';
  readonly staticPagesDictionary: Record<string, string> = {
    'legal-notice':'Mentions légales',
    'terms-of-use': 'Conditions d\'utilisation',
    'privacy-policy': 'Politique de confidentialité',
    'terms-of-sale': 'Conditions générales de vente',
    'cookies-policy': 'Politique de cookies',
  }
  readonly availableLocales: { code: SupportedLocale; label: string }[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' }
  ]

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

  localeHref(code: string): string {
    return `/${code}${this.localeService.pathWithoutLocale()}`;
  }
}
