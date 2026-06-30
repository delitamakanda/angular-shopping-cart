import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../../core/interfaces';
import { CommentsComponent } from '../../core/features/comments/comments.component';
import { CartService } from '../../core/services/cart.service';
import { ProductStoreService } from 'src/app/core/state/product.store.service';
import { ConfirmDirective } from '../../shared/directives/confirm.directive';
import { RateComponent } from '../../shared/components/rate/rate.component';

@Component({
  selector: 'app-product',
  standalone: true,
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeHolderResolution: 40,
      },
    },
    ProductStoreService,
  ],
  imports: [
    CommonModule,
    CurrencyPipe,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    ConfirmDirective,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommentsComponent,
    RateComponent,
    FormsModule,
  ],
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(ProductStoreService);

  protected readonly base64Background = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5v';
  protected readonly choices = Array.from({ length: 10 }, (_, index) => index + 1);
  protected quantity = 1;
  protected isCommentsVisible = false;
  protected rating = 0;

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['productData'] as Product),
    ).subscribe(productData => this.store.loadProductById(productData.uuid));
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.quantity);
  }

  toggleComments(): void {
    this.isCommentsVisible = !this.isCommentsVisible;
  }
}
