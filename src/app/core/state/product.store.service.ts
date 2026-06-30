import { computed, inject, Injectable, signal } from '@angular/core';
import { Category, Product } from '../interfaces';
import { ProductQueryParams, ProductService } from '../services/product.service';
import { ToastService } from '../services/toast.service';

export interface ProductState {
  products: Product[];
  categories: Category[];
  product: Product | null;
  searchValue: string;
  limit: number;
  offset: number;
  ordering: string;
  totalCount: number;
  category: string;
  minPrice: number;
  maxPrice: number;
  hasMorePage: boolean;
  hasPreviousPage: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  product: null,
  searchValue: '',
  limit: 10,
  offset: 0,
  ordering: '-created_at',
  totalCount: 0,
  category: '',
  minPrice: 0,
  maxPrice: 1000,
  hasMorePage: false,
  hasPreviousPage: false,
  loading: false,
  error: null,
};

@Injectable()
export class ProductStoreService {
  private readonly api = inject(ProductService);
  private readonly toastService = inject(ToastService);
  private readonly state = signal<ProductState>({ ...initialState });

  readonly products = computed(() => this.state().products);
  readonly categories = computed(() => this.state().categories);
  readonly product = computed(() => this.state().product);
  readonly searchValue = computed(() => this.state().searchValue);
  readonly limit = computed(() => this.state().limit);
  readonly offset = computed(() => this.state().offset);
  readonly ordering = computed(() => this.state().ordering);
  readonly totalCount = computed(() => this.state().totalCount);
  readonly category = computed(() => this.state().category);
  readonly minPrice = computed(() => this.state().minPrice);
  readonly maxPrice = computed(() => this.state().maxPrice);
  readonly hasMorePage = computed(() => this.state().hasMorePage);
  readonly hasPreviousPage = computed(() => this.state().hasPreviousPage);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  readonly productsSearched = computed(() => {
    const searchValue = this.searchValue().toLowerCase().trim();
    return searchValue === ''
      ? this.products()
      : this.products().filter(product => product.name.toLowerCase().includes(searchValue));
  });

  readonly currentPage = computed(() => Math.floor(this.offset() / this.limit()) + 1);
  readonly totalPages = computed(() => Math.ceil(this.totalCount() / this.limit()));

  loadProducts(params: ProductQueryParams): void {
    this.patchState({ loading: true, error: null });

    this.api.getAll(params).subscribe({
      next: response => {
        this.patchState({
          products: response.results,
          hasMorePage: !!response.next,
          hasPreviousPage: !!response.previous,
          totalCount: response.count,
          loading: false,
          error: null,
        });
      },
      error: error => this.handleError('fetching products', error),
    });
  }

  loadProductById(uuid: string): void {
    this.patchState({ loading: true, error: null });

    this.api.getById(uuid).subscribe({
      next: product => this.patchState({ product, loading: false, error: null }),
      error: error => this.handleError('fetching product', error),
    });
  }

  addProduct(newProduct: Product): void {
    this.api.add(newProduct).subscribe({
      next: product => {
        this.patchState({ products: [...this.products(), product] });
        this.toastService.success('Product added successfully');
      },
      error: error => this.handleError('adding product', error),
    });
  }

  removeProduct(uuid: string): void {
    this.api.removeById(uuid).subscribe({
      next: () => {
        this.removeProductFromState(uuid);
        this.toastService.success('Product removed successfully');
      },
      error: error => this.handleError('removing product', error),
    });
  }

  updateProduct(uuid: string, updatedProduct: Product): void {
    this.api.updateById(uuid, updatedProduct).subscribe({
      next: product => {
        this.patchProductInState(uuid, product);
        this.toastService.success('Product updated successfully');
      },
      error: error => this.handleError('updating product', error),
    });
  }

  setSearchValue(searchValue: string): void {
    this.patchState({ searchValue, offset: 0 });
  }

  setLimit(limit: number): void {
    this.patchState({ limit, offset: 0 });
  }

  setOffset(offset: number): void {
    this.patchState({ offset: Math.max(offset, 0) });
  }

  setOrdering(ordering: string): void {
    this.patchState({ ordering, offset: 0 });
  }

  setCategory(category: string): void {
    this.patchState({ category, offset: 0 });
  }

  setPriceRange(minPrice: number, maxPrice: number): void {
    this.patchState({ minPrice, maxPrice, offset: 0 });
  }

  nextPage(): void {
    if (this.hasMorePage()) {
      this.setOffset(this.offset() + this.limit());
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.setOffset(this.offset() - this.limit());
    }
  }

  goToPage(page: number): void {
    this.setOffset((page - 1) * this.limit());
  }

  resetState(): void {
    this.state.set({ ...initialState });
  }

  resetFilters(): void {
    this.patchState({ searchValue: '', category: '', minPrice: 0, maxPrice: 1000, offset: 0 });
  }

  getCategories(): void {
    this.patchState({ loading: true, error: null });

    this.api.getCategories().subscribe({
      next: categories => this.patchState({ categories, loading: false, error: null }),
      error: error => this.handleError('fetching categories', error),
    });
  }

  private removeProductFromState(uuid: string): void {
    this.patchState({
      products: this.products().filter(product => product.uuid !== uuid),
      product: this.product()?.uuid === uuid ? null : this.product(),
    });
  }

  private patchProductInState(uuid: string, updatedProduct: Product): void {
    this.patchState({
      products: this.products().map(product => product.uuid === uuid ? updatedProduct : product),
      product: this.product()?.uuid === uuid ? updatedProduct : this.product(),
    });
  }

  private patchState(partialState: Partial<ProductState>): void {
    this.state.update(state => ({ ...state, ...partialState }));
  }

  private handleError(action: string, error: unknown): void {
    const message = this.getErrorMessage(error);
    this.patchState({ loading: false, error: message });
    this.toastService.error(`Error ${action}: ${message}`);
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error';
  }
}
