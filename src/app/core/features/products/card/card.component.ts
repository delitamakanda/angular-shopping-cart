import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product: Product = {} as Product;
  @Output() deleteProduct = new EventEmitter<string>();
  userIsAdmin = false;

  handleDeleteProduct(): void {
    this.deleteProduct.emit(this.product.uuid);
  }
}
