import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private _productService: ProductService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this._productService.getProducts().subscribe(data => {
      this.products = [];
      data.forEach((element: any) => {
        this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.products);
    });
  }
  deleteProduct(id: string) {
    this._productService.deleteProduct(id).then(() => {
      this.toastr.error('El producto fue eliminado', 'Registro eliminado',{
        positionClass: 'toast-bottom-right'
      });
      console.log('product eliminado con exito');
    }).catch(error => {
      console.log(error);
    })
  }

}
