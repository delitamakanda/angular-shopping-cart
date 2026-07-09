import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Category} from "../../../interfaces";
import {MatButtonModule} from "@angular/material/button";
import { ProductStoreService } from 'src/app/core/state/product.store.service';
import { MatCardModule } from "@angular/material/card";
import {MatListModule} from '@angular/material/list';
import {LocaleService} from "../../../services/locale.service";

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
],
  templateUrl: './category-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  private readonly router = inject(Router);
  private readonly localeService = inject(LocaleService);
  readonly store = inject(ProductStoreService);


  resetCategoryFilter(): void {
    this.store.setCategory('');
    this.router.navigate(this.localeService.link('home'), { queryParams: {}, replaceUrl: true });
  }

  async selectCategory(category: Category): Promise<void> {
    await this.router.navigate(this.localeService.link('home'), {
      queryParams: { category: encodeURIComponent(category.name), sort: null },
      queryParamsHandling: 'merge',
    });
    this.store.setCategory(encodeURIComponent(category.name));
  }

}
