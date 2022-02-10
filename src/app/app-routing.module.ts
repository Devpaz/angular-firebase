import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path: '', redirectTo: 'list-products', pathMatch: 'full'},
  {path: 'list-products', component: ListProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: 'edit-product/:id', component: CreateProductComponent},
  {path: '**', redirectTo: 'list-products', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
