import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../interfaces';

const JSON_DATA_LOCALSTORAGE_KEY = 'cart_data';
const CART_EXPIRATION_DELAY = 1000 * 60 * 60; // 1 hour

type SerializedCart = {
  cartMap: [string, Product][];
  cartItemsQuantity: [string, number][];
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  protected cartMap = new Map<string, Product>();
  private cartItemsQuantity = new Map<string, number>();
  private readonly cartItems = signal<CartItem[]>([]);
  private readonly cartTimer: number;

  readonly cartItemsWithQuantity = this.cartItems.asReadonly();
  readonly cartItemsTotalPrice = computed(() =>
    this.cartItems().reduce((total, item) => total + item.totalPrice, 0),
  );
  readonly totalCartItemsQuantity = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0),
  );

  constructor() {
    this.getCartFromLocalStorage();
    this.cartTimer = window.setInterval(() => this.clearCart(), CART_EXPIRATION_DELAY);
  }

  addToCart(product: Product, quantity = 1): void {
    const nextQuantity = this.getQuantity(product.uuid) + quantity;

    this.cartMap.set(product.uuid, product);
    this.cartItemsQuantity.set(product.uuid, nextQuantity);
    this.saveCartToLocalStorage();
  }

  removeFromCart(productUuid: string): void {
    this.cartMap.delete(productUuid);
    this.cartItemsQuantity.delete(productUuid);
    this.saveCartToLocalStorage();
  }

  updateCartItemQuantity(productUuid: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productUuid);
      return;
    }

    this.cartItemsQuantity.set(productUuid, quantity);
    this.saveCartToLocalStorage();
  }

  getCartItems(): Product[] {
    return Array.from(this.cartMap.values());
  }

  clearCart(): void {
    this.cartMap.clear();
    this.cartItemsQuantity.clear();
    this.saveCartToLocalStorage();
  }

  isProductInCart(productUuid: string): boolean {
    return this.cartMap.has(productUuid);
  }

  getCartFromLocalStorage(): void {
    const cartData = this.readStoredCart();

    this.cartMap = new Map(cartData.cartMap);
    this.cartItemsQuantity = new Map(cartData.cartItemsQuantity);
    this.refreshCartItems();
  }

  private getQuantity(productUuid: string): number {
    return this.cartItemsQuantity.get(productUuid) ?? 0;
  }

  private saveCartToLocalStorage(): void {
    const cartData: SerializedCart = {
      cartMap: Array.from(this.cartMap.entries()),
      cartItemsQuantity: Array.from(this.cartItemsQuantity.entries()),
    };

    window.localStorage.setItem(JSON_DATA_LOCALSTORAGE_KEY, JSON.stringify(cartData));
    this.refreshCartItems();
  }

  private readStoredCart(): SerializedCart {
    const defaultCart: SerializedCart = {
      cartMap: [],
      cartItemsQuantity: [],
    };

    try {
      const cartData = window.localStorage.getItem(JSON_DATA_LOCALSTORAGE_KEY);
      return cartData ? JSON.parse(cartData) as SerializedCart : defaultCart;
    } catch {
      window.localStorage.removeItem(JSON_DATA_LOCALSTORAGE_KEY);
      return defaultCart;
    }
  }

  private refreshCartItems(): void {
    this.cartItems.set(Array.from(this.cartMap.values()).map(product => {
      const quantity = this.getQuantity(product.uuid);

      return {
        product,
        quantity,
        totalPrice: product.price * quantity,
      };
    }));
  }
}
