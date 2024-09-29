import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/features/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-shopping-cart';
}
