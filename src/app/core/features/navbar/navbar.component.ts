
import {Component, effect, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';
import {AuthService} from "../../services/auth.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIcon} from "@angular/material/icon";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../products/card/interfaces";

@Component({
    selector: 'app-navbar',
  imports: [
    RouterLink,
    FormsModule,
    AvatarComponent,
    MatSlideToggleModule,
    MatIcon
],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  cartService = inject(CartService);
  isDarkMode = false;
  cartItemsWithQuantity = this.cartService.cartItemsWithQuantity;
  logoPath = './assets/icons/icon-72x72.png';

  constructor() {
    effect(() => {
      this.cartService.getCartFromLocalStorage();
    })
  }

  get cartItems(): CartItem[] {
    return this.cartItemsWithQuantity();
  }

  ngOnInit(): void {
    const themeSwitcher = localStorage.getItem('theme');
    this.isDarkMode = themeSwitcher === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    const classList = document.body.classList;
    classList.remove('light-mode', 'dark-mode');
    classList.add(this.isDarkMode? 'dark-mode' : 'light-mode');
  }

}
