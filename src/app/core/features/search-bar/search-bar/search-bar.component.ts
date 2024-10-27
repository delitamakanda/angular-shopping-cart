import {Component, inject, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {ProductService} from "../../../services/product.service";

@Component({
  imports: [
    ReactiveFormsModule,
  ],
  selector: 'app-search-bar',
  standalone: true,
  template: `
    <input [formControl]="searchControl"
           class="form-control me-2"
           placeholder="Search"
           type="search"/>
  `
})
export class SearchBarComponent implements OnInit {
  searchControl: FormControl = new FormControl<string>('');
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.productService.setSearchTerm(value);
    });
  }

}
