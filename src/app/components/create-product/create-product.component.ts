import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { error } from 'console';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProduct: FormGroup;
  submitted = false;
  id: string | null;
  titulo = 'Agregar Producto';
  constructor(private fb: FormBuilder,
              private _productService: ProductService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute:ActivatedRoute) {
    this.createProduct =this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required],
      sku:['',Validators.required],
      price:['',Validators.required],
      priceOffer:['',Validators.required],
      dateOffer:['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.editProduct();
  }
  addEditProduct() {
    this.submitted = true;
    if (this.createProduct.invalid){
      return;
    }
    if(this.id === null) {
      this.addProduct();
    }else{
      this.updateProduct(this.id);
    }
  }

  addProduct() {
    const product: any = {
      name:this.createProduct.value.name,
      description:this.createProduct.value.description,
      sku:this.createProduct.value.sku,
      price:this.createProduct.value.price,
      priceOffer:this.createProduct.value.priceOffer,
      dateOffer:this.createProduct.value.dateOffer,
      createdDate: new Date(),
      updatedDate: new Date(),
    }
    this._productService.addProduct(product).then(()  =>{
      this.toastr.success('El producto se agrego con exito!', 'Producto registrado',{
        positionClass:  'toast-bottom-right'
      });
      this.router.navigate(['/list-products']);
    }).catch(error => {
      console.log(error)
    })
  }

  updateProduct(id: string) {
    const product: any = {
      name:this.createProduct.value.name,
      description:this.createProduct.value.description,
      sku:this.createProduct.value.sku,
      price:this.createProduct.value.price,
      priceOffer:this.createProduct.value.priceOffer,
      dateOffer:this.createProduct.value.dateOffer,
      updatedDate: new Date(),
    }
    this._productService.updateProduct(id,product).then(() => {
      this.toastr.info('El producto fue modificado con exito','Producto modificado',{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-products']);
    });
  }

  editProduct() {
    this.titulo = 'Editar Producto'
    if(this.id !== null) {
      this._productService.getProduct(this.id).subscribe(data => {
        this.createProduct.setValue({
          name: data.payload.data()['name'],
          description: data.payload.data()['description'],
          sku: data.payload.data()['sku'],
          price: data.payload.data()['price'],
          priceOffer: data.payload.data()['priceOffer'],
          dateOffer: data.payload.data()['dateOffer'],
        })
      })
    }
  }

}
