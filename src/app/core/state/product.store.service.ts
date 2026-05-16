import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Category, Product } from '../interfaces';
import { ProductService } from '../services/product.service';
import { ToastService } from '../services/toast.service';
import { catchError, combineLatest} from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService {
  private readonly api = inject(ProductService);
  private readonly toastService = inject(ToastService);
  private state = signal<ProductState>(initialState);

  readonly products = computed(() => this.state().products);
  readonly categories = computed(() => this.state().categories);
  readonly product = computed(() => this.state().product);
  readonly searchValue = computed(() => this.state().searchValue);
  readonly limit = computed(() => this.state().limit)
  readonly offset = computed(() => this.state().offset);
  readonly ordering = computed(() => this.state().ordering);
  readonly totalCount = computed(() => this.state().totalCount);
  readonly category = computed(() => this.state().category);
  readonly minPrice = computed(() => this.state().minPrice);
  readonly maxPrice = computed(() => this.state().maxPrice);
  readonly hasMorePage = computed(() => this.state().hasMorePage)
  readonly hasPreviousPage = computed(() => this.state().hasPreviousPage)
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  readonly productsSearched = computed(() => {
    const str = this.searchValue();
    return str === '' ? this.products() : this.products().filter((product: any) => product.name.toLowerCase().includes(str));
  });

  readonly currentPage = computed(() => Math.floor(this.offset() / this.limit()) + 1);

  readonly totalPages = computed(() => Math.ceil(this.totalCount() / this.limit()));

  constructor() {
    effect(() => {
      const params = {
        limit: this.limit(),
        q: this.searchValue(),
        offset: this.offset(),
        ordering: this.ordering(),
        category_name_in: this.category(),
        min_price: this.minPrice(),
        max_price: this.maxPrice(),
      };
     this.loadProducts(params);
    });
  }

  loadProducts(params: any): void {
    this.state.update(state => ({ ...state, loading: true, error: null }));
    combineLatest([
      this.api.getCategories(),
      this.api.getAll(params)
    ]).subscribe({
      next: ([categories, response]) => {
        this.toastService.success('Products loaded successfully');
        this.state.update(state => ({
          ...state,
          categories,
          products: response.results,
          hasMorePage: !!response.next,
          hasPreviousPage: !!response.previous,
          totalCount: response.count,
          loading: false,
          error: null,
        }));
      },
      error: (err) => {
        this.state.update(state => ({ ...state, loading: false, error: err.message }));
        this.toastService.error(`Error fetching products: ${err.message}`);
      }
    });
  }

  loadProductById(uuid: string): void {
    this.state.update(state => ({ ...state, loading: true, error: null }));
    this.api.getById(uuid).pipe(
      catchError((err) => {
        this.state.update(state => ({ ...state, loading: false, error: err.message }));
        this.toastService.error(`Error fetching product: ${err.message}`);
        throw err;
      })
    ).subscribe({
      next: (product) => {
        this.state.update(state => ({ ...state, product, loading: false, error: null }));
      }
    });
  }

  addProduct(newProduct: Product): void {
    this.api.add(newProduct).subscribe({
      next: (product) => {
        this.state.update(state => ({ ...state, products: [...state.products, product] }));
        this.toastService.success('Product added successfully');
      },
      error: (err) => {
        this.toastService.error(`Error adding product: ${err.message}`);
      }
    });
  }

  removeProductById(uuid: string): void {
    this.api.removeById(uuid).subscribe({
      next: () => {
        this.state.update(state => ({ ...state, products: state.products.filter(product => product.uuid !== uuid) }));
        this.toastService.success('Product removed successfully');
      },
      error: (err) => {
        this.toastService.error(`Error removing product: ${err.message}`);
      }
    });
  }

  updateProductById(uuid: string, updatedProduct: Product): void {
    this.api.updateById(uuid, updatedProduct).subscribe({
      next: (product) => {
        this.state.update(state => ({
          ...state,
          products: state.products.map(p => p.uuid === uuid ? product : p)
        }));
        this.toastService.success('Product updated successfully');
      },
      error: (err) => {
        this.toastService.error(`Error updating product: ${err.message}`);
      }
    });
  }

  setSearchValue(searchValue: string): void {
    this.state.update(state => ({ ...state, searchValue }));
  }

  setLimit(limit: number): void {
    this.state.update(state => ({ ...state, limit }));
  }

  setOffset(offset: number): void {
    this.state.update(state => ({ ...state, offset }));
  }

  setOrdering(ordering: string): void {
    this.state.update(state => ({ ...state, ordering }));
  }

  setTotalCount(totalCount: number): void {
    this.state.update(state => ({ ...state, totalCount }));
  }

  setCategory(category: string): void {
    this.state.update(state => ({ ...state, category }));
  }

  setPriceRange(minPrice: number, maxPrice: number): void {
    this.state.update(state => ({ ...state, minPrice, maxPrice }));
  }

  setPagination(hasMorePage: boolean, hasPreviousPage: boolean, totalCount: number): void {
    this.state.update(state => ({ ...state, hasMorePage, hasPreviousPage, totalCount }));
  }

  setLoading(loading: boolean): void {
    this.state.update(state => ({ ...state, loading }));
  }
  
  setError(error: string | null): void {
    this.state.update(state => ({ ...state, error }));
  }

  nextPage(): void {
    this.setOffset(this.offset() + this.limit());
  }

  previousPage(): void {
    this.setOffset(this.offset() - this.limit());
  }

  goToPage(page: number): void {
    this.setOffset((page - 1) * this.limit());
  }


  removeProduct(uuid: string): void {
    this.state.update(state => ({ ...state, products: state.products.filter(product => product.uuid !== uuid) }));
    if (this.state().product?.uuid === uuid) {
      this.state.update(state => ({ ...state, product: null }));
    }
  }

  updateProduct(uuid: string, updatedProduct: Product): void {
    this.state.update(state => ({
      ...state,
      products: state.products.map(product => product.uuid === uuid ? updatedProduct : product)
    }));
    if (this.state().product?.uuid === uuid) {
      this.state.update(state => ({ ...state, product: updatedProduct }));
    }
  }

  resetState(): void {
    this.state.set(initialState);
  }

  resetFilters(): void {
    this.state.update(state => ({ ...state, searchValue: '', category: '', minPrice: 0, maxPrice: 1000  }));
    this.setOffset(0);
  }
}

