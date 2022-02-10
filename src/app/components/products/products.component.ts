import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  public dateDay: string;
  constructor(private _productService: ProductService,) {
    this.dateDay = (new Date()).toISOString().split('T')[0];
   }

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

}
