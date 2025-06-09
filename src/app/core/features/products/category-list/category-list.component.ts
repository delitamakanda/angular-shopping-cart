import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {CommonModule} from "@angular/common";
import {Category} from "../../../interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  @Output() selectedCategory = new EventEmitter<Category>();
  productService = inject(ProductService);
  categories$!: Observable<Category[]>;

  ngOnInit():void {
    this.categories$ = this.productService.getCategories();
  }

  selectCategory(category: Category): void {
    this.selectedCategory.emit(category);
  }

}
