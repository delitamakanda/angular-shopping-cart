import {ResolveFn} from "@angular/router";
import {Product} from "../interfaces/product.interface";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {ProductService} from "../services/product.service";

export const productResolver: ResolveFn<Product> = (route, state): Observable<Product> => {
  const productService = inject(ProductService);
  return  productService.getById(route.params['uuid']);

};
