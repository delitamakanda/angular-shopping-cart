import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = [
    {
      category: ['Electronics', 'Computers'],
      created_at: '2022-01-01',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image_url: 'https://example.com/image1.jpg',
      name: 'Product 1',
      price: '19.99',
      status: 'active',
      stock_quantity: 100,
      updated_at: '2022-01-01',
      uuid: '1234567890',
    },
    {
      category: ['Clothing', 'Accessories'],
      created_at: '2022-01-02',
      description: 'Duis auctor velit id libero convallis, vel consectetur nunc ultricies.',
      image_url: 'https://example.com/image2.jpg',
      name: 'Product 2',
      price: '29.99',
      status: 'inactive',
      stock_quantity: 50,
      updated_at: '2022-01-02',
      uuid: '9876543210',
    },
    {
      category: ['Electronics', 'Smartphones'],
      created_at: '2022-01-03',
      description: 'Nullam auctor neque vel mi faucibus, vel tempus neque lobortis.',
      image_url: 'https://example.com/image3.jpg',
      name: 'Product 3',
      price: '39.99',
      status: 'active',
      stock_quantity: 200,
      updated_at: '2022-01-03',
      uuid: '0987654321',
    }
  ] as Product[];

  removeProduct(uuid: string): void {
    console.log(`Deleting product with UUID: ${uuid}`);
    this.products = this.products.filter((product) => product.uuid!== uuid);
  }

}
