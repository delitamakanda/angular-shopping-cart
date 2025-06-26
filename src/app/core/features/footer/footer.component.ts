import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer>
      <p>{{ credits }}. All rights reserved.</p>
    </footer>`,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  readonly credits = new Date().getFullYear() + ' - Angular Shopping Cart';
}
