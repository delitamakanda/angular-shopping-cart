import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {CommonModule} from "@angular/common";
import {Category} from "../../../interfaces";
import {Observable} from "rxjs";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  productService = inject(ProductService);
  router = inject(Router);
  categories$!: Observable<Category[]>;

  ngOnInit():void {
    this.categories$ = this.productService.getCategoriesLegacy();
  }

  resetCategoryFilter(): void {
    this.productService.category.set('');
    this.router.navigate(['/'], { queryParams: {}, replaceUrl: true });
  }

  async selectCategory(category: Category): Promise<void> {
    await this.router.navigate(['/'], {
      queryParams: { category: encodeURIComponent(category.name), sort: null },
      queryParamsHandling: 'merge',
    });
    this.productService.category.set(encodeURIComponent(category.name));
  }

}
