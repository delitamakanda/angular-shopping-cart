import {Component, inject} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
    selector: 'app-pagination',
    imports: [],
    template: `
    <div class="nav-item">
      <button [disabled]="!hasPreviousPage" (click)="previousPage()">Previous</button>
      <button [disabled]="!hasMorePage" (click)="nextPage()">Next</button>
    </div>
  `,
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  productService = inject(ProductService);

  get hasMorePage(): boolean {
    return this.productService.hasMorePage();
  }

  get hasPreviousPage(): boolean {
    return this.productService.hasPreviousPage();
  }

  nextPage(): void {
    this.productService.setPageNext();
    this.scrollToTop();
  }

  previousPage(): void {
    this.productService.setPagePrevious();
    this.scrollToTop();
  }

  private scrollToTop(): void {
    requestAnimationFrame(() => {
      window.scrollTo({top: 0, behavior:'smooth'});
    })
  }
}
