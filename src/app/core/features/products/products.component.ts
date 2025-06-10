import {Component, effect, inject, OnInit} from '@angular/core';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductService } from '../../services/product.service';
import {PaginationComponent} from "../pagination/pagination.component";
import {Product} from "../../interfaces";
import {SearchBarComponent} from "../search-bar/search-bar/search-bar.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CategoryListComponent} from "./category-list/category-list.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {CommonObservableDestruction} from "../../../shared/helpers/common.observable";

@Component({
    selector: 'app-products',
  imports: [
    CardComponent,
    SharedModule,
    PaginationComponent,
    SearchBarComponent,
    MatProgressSpinnerModule,
    CategoryListComponent,
    MatGridListModule,
  ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent extends CommonObservableDestruction implements OnInit {
  productService = inject(ProductService);
  products = this.productService.products;
  isLoading = false;
  // filterCategory = '';
  // propCategories = ['Electronics', 'Computers', 'Clothing', 'Accessories', 'Smartphones'];
  breakpointsCols = 4
  get allProducts(): Product[] {
    return this.products();
  }

  constructor(private breakpointsObs: BreakpointObserver) {
    super();
    effect(() => {
      this.isLoading = true;
      this.productService.getAll()
        .subscribe();
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  ngOnInit() : void{
    this.breakpointsObs.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(this.untilDestroyed()).subscribe((result) => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.breakpointsCols = 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.breakpointsCols = 2;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.breakpointsCols = 3;
      } else {
        this.breakpointsCols = 4;
      }
    })
  }

  removeProduct(uuid: string): void {
    this.productService.removeById(uuid);
  }

}
