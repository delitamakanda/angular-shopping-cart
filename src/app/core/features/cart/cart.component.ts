import {Component, effect, inject} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ConfirmDirective} from "../../../shared/directives/confirm.directive";
import {CartItem} from "../products/card/interfaces";

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    RouterLink,
    ConfirmDirective,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  cartItemsWithQuantity = this.cartService.cartItemsWithQuantity;
  cartItemsTotalPrice = this.cartService.cartItemsTotalPrice;
  base64Background = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5'

  get cartItems(): CartItem[] {
    return this.cartItemsWithQuantity();
  }
  get totalCartPrice(): number {
    return this.cartItemsTotalPrice();
  }
  constructor() {
    effect(() => {
      this.cartService.getCartFromLocalStorage();
    })
  }

}
