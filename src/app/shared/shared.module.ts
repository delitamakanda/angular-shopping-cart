import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarPipe } from './pipes/avatar.pipe';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { ConfirmDirective } from './directives/confirm.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AvatarPipe,
    ProductFilterPipe,
    ConfirmDirective,
  ],
  exports: [AvatarPipe, ProductFilterPipe,ConfirmDirective]
})
export class SharedModule { }
