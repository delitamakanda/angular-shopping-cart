import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import { CommentsComponent } from '../../comments/comments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommentsComponent,
    CurrencyPipe,
    SharedModule,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product: Product = {} as Product;
  @Output() deleteProduct = new EventEmitter<string>();
  userIsAdmin = false;
  isCommentsVisible = false;

  handleDeleteProduct(): void {
    this.deleteProduct.emit(this.product.uuid);
  }


  toggleComments(): void {
    this.isCommentsVisible =!this.isCommentsVisible;
  }
}
