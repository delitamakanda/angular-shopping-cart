import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ConfirmDirective } from '../../../shared/directives/confirm.directive';
import { CartItem } from '../../interfaces';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    RouterLink,
    ConfirmDirective,
  ],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cartService = inject(CartService);
  readonly cartItemsWithQuantity = this.cartService.cartItemsWithQuantity;
  readonly cartItemsTotalPrice = this.cartService.cartItemsTotalPrice;
  readonly base64Background = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5';

  get cartItems(): CartItem[] {
    return this.cartItemsWithQuantity();
  }

  get totalCartPrice(): number {
    return this.cartItemsTotalPrice();
  }
}
