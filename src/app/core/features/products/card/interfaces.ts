import {Product} from "../../../interfaces";

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}
