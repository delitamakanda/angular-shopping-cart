import {Injectable, signal} from '@angular/core';
import {Product} from "../interfaces/product.interface";
import {CartItem} from "../features/products/card/interfaces";

const JSON_DATA_LOCALSTORAGE_KEY = 'cart_data';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartTimer!: number | null;
  cartItemsWithQuantity = signal<CartItem[]>([]);
  cartItemsTotalPrice = signal(0);

  constructor() {
    this.startCartTimer();
  }

  cartMap: Map<string, Product> = new Map();
  cartItemsQuantity: Map<string, number> = new Map();

  addToCart(product: Product): void {
    this.cartMap.set(product.uuid, product);
    this.cartItemsQuantity.set(product.uuid, (this.cartItemsQuantity.get(product.uuid) || 0) + 1);
    this.saveCartToLocalStorage();
  }

  removeFromCart(productUuid: string): void {
    this.cartMap.delete(productUuid);
    this.cartItemsQuantity.delete(productUuid);
    this.saveCartToLocalStorage();
  }

  updateCartItemQuantity(productUuid: string, quantity: number): void {
    this.cartItemsQuantity.set(productUuid, quantity);
    this.saveCartToLocalStorage();
  }

  getTotalCartItemsQuantity(): number {
    return Array.from(this.cartItemsQuantity.values()).reduce((acc, curr) => acc + curr, 0);
  }

  getTotalCartItemsPrice(): number {
    return Array.from(this.cartItemsQuantity.entries()).reduce((acc, [productUuid, quantity]) => acc + (this.cartMap.get(productUuid)?.price || 0) * quantity, 0);
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
    const cartData = JSON.parse(<string>window.localStorage.getItem(JSON_DATA_LOCALSTORAGE_KEY)) || {
      cartMap: [],
      cartItemsQuantity: [],
    };
    this.cartMap = new Map(cartData.cartMap);
    this.cartItemsQuantity = new Map(cartData.cartItemsQuantity);
    this.formattedCartItemsWithQuantity();
  }

  private saveCartToLocalStorage(): void {
    window.localStorage.setItem(JSON_DATA_LOCALSTORAGE_KEY, JSON.stringify({
      cartMap: Array.from(this.cartMap.entries()),
      cartItemsQuantity: Array.from(this.cartItemsQuantity.entries()),
    }));
    this.formattedCartItemsWithQuantity();
  }

  private startCartTimer(): void {
    this.cartTimer = window.setInterval(() => {
       this.clearCart();
       }, 1000 * 60 * 60); // 1 hour
  }

  private formattedCartItemsWithQuantity() {
    this.cartItemsWithQuantity.set(Array.from(this.cartMap.values()).map(product => ({
      product,
      quantity: this.cartItemsQuantity.get(product.uuid) || 0,
      totalPrice: (this.cartMap.get(product.uuid)?.price || 0) * (this.cartItemsQuantity.get(product.uuid) || 0),
    })));
    this.cartItemsTotalPrice.set(this.getTotalCartItemsPrice());
  }
}
