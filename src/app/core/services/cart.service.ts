import { Injectable } from '@angular/core';
import {Product} from "../interfaces/product.interface";

const JSON_DATA_LOCALSTORAGE_KEY = 'cart_data';

@Injectable({
  providedIn: 'root',
})
export class CartService {

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
  }

  isProductInCart(productUuid: string): boolean {
    return this.cartMap.has(productUuid);
  }

  private saveCartToLocalStorage(): void {
    window.localStorage.setItem(JSON_DATA_LOCALSTORAGE_KEY, JSON.stringify({
      cartMap: Array.from(this.cartMap.entries()),
      cartItemsQuantity: Array.from(this.cartItemsQuantity.entries()),
    }));
  }
}
