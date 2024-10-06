import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getAll(): Promise<any[]> {
    // Mock data
    return Promise.resolve([
      {
        category: ['Electronics', 'Computers'],
        created_at: '2022-01-01',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image_url: 'https://placeholder.com/200x200',
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
        image_url: 'https://placeholder.com/200x200',
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
        image_url: 'https://placeholder.com/200x200',
        name: 'Product 3',
        price: '39.99',
        status: 'active',
        stock_quantity: 200,
        updated_at: '2022-01-03',
        uuid: '0987654321',
      }
    ]);
  }

  getById(uuid: string): Promise<any> {
    // Mock data
    return Promise.resolve({
      category: ['Electronics', 'Computers'],
      created_at: '2022-01-01',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image_url: 'https://placeholder.com/200x200',
      name: 'Product 1',
      price: '19.99',
      status: 'active',
      stock_quantity: 100,
      updated_at: '2022-01-01',
      uuid: '1234567890',
    });
  }

  removeById(uuid: string): Promise<void> {
    // Mock data
    return Promise.resolve();
  }

  updateById(uuid: string, updatedProduct: any): Promise<void> {
    // Mock data
    return Promise.resolve();
  }

  add(newProduct: any): Promise<void> {
    // Mock data
    return Promise.resolve();
  }
}
