import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './core/features/navbar/navbar.component';
import { ViewportScroller } from "@angular/common";
import {FooterComponent} from "./core/features/footer/footer.component";

@Component({
    selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    RouterModule,
    FooterComponent
],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = $localize`angular-shopping-cart`;
  constructor(viewport: ViewportScroller) {
    viewport.setOffset([0, 100]);
  }
}
