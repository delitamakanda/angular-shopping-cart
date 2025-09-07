import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  template: `
    <footer>
      <ul>
        @for(
          entry of staticPages; track entry
          ) {
          <li>
            <a [routerLink]="['/static-pages', entry[0]]">{{ entry[1] }}</a>
          </li>
        }
      </ul>
      <p>{{ credits }}. All rights reserved.</p>
    </footer>`,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  readonly credits = new Date().getFullYear() + ' - Angular Shopping Cart';
  readonly staticPagesDictionary: Record<string, string> = {
    'legal-notice': 'Mentions légales',
    'terms-of-use': 'Conditions d\'utilisation',
    'privacy-policy': 'Politique de confidentialité',
    'terms-of-sale': 'Conditions générales de vente',
    'cookies-policy': 'Politique de cookies',
  }

  get staticPages(): [string, string][] {
    return Object.entries(this.formatStaticPageObject(this.staticPagesDictionary));
  }

   formatStaticPageObject(staticPages: Record<string, string>) : Record<string, string>  {
    const formattedPages: Record<string, string> = {};
    for (const [key, value] of Object.entries(staticPages)) {
      formattedPages[key.toLowerCase()] = value;
    }
    return formattedPages;
  }
}
