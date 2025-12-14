import {Component, inject} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';


@Component({
    selector: 'app-pagination',
    imports: [
    MatPaginatorModule
],
    template: `
      <mat-paginator (page)="handlePageEvent($event)" [length]="totalCount" [pageSize]="productService.limit" [pageSizeOptions]="pageSizeOptions" aria-label="Select page">
      </mat-paginator>
  `,
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  productService = inject(ProductService);
  pageSizeOptions = [5, 10, 25, 100];

  get totalCount(): number {
    return this.productService.totalCount();
  }

  handlePageEvent(event: PageEvent): void {
    this.productService.setLimit(event.pageSize.toString())
    this.productService.setIndex(event.pageIndex);
    this.scrollToTop();
  }

  private scrollToTop(): void {
    requestAnimationFrame(() => {
      window.scrollTo({top: 0, behavior:'smooth'});
    })
  }
}
