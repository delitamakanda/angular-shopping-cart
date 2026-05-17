import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Category} from "../../../interfaces";
import {MatButtonModule} from "@angular/material/button";
import { ProductStoreService } from 'src/app/core/state/product.store.service';
import { MatCardModule } from "@angular/material/card";
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  private readonly router = inject(Router);
  readonly store = inject(ProductStoreService);
  

  resetCategoryFilter(): void {
    this.store.setCategory('');
    this.router.navigate(['/'], { queryParams: {}, replaceUrl: true });
  }

  async selectCategory(category: Category): Promise<void> {
    await this.router.navigate(['/'], {
      queryParams: { category: encodeURIComponent(category.name), sort: null },
      queryParamsHandling: 'merge',
    });
    this.store.setCategory(encodeURIComponent(category.name));
  }

}
