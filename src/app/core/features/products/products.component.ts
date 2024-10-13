import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Product } from '../../interfaces/product.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CardComponent,
    SharedModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  private productService = inject(ProductService);
  products: Product[] = [];
  filterCategory = '';
  propCategories = ['Electronics', 'Computers', 'Clothing', 'Accessories', 'Smartphones'];

  ngOnInit(): void {
    this.productService.getAll()
    .subscribe((products) => {
      this.products = products;
    });
  }


  removeProduct(uuid: string): void {
    console.log(`Deleting product with UUID: ${uuid}`);
    this.products = this.products.filter((product) => product.uuid!== uuid);
  }

}
