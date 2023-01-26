import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { ProductsModel } from './products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
//pagination

post:any;
page:number=1;
count:number=0;
tableSize:number=10;


  productForm!: FormGroup;
  productsModel:ProductsModel=new ProductsModel();
  //for storing getAllProducts data
  productData!:any;
  constructor(private fb: FormBuilder,private _http:ApiService) {}
dataToSend!:any;
  ngOnInit(){
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productImage:['', Validators.required],
      productCategory: ['', Validators.required],
      productPrice: ['', Validators.required],
      productRating: ['', Validators.required],
    })
    this.getAllProducts();
  }

//method to get data from user for posting data to json-server
  postProductDetails(){
    this.productsModel.productName=this.productForm.value.productName;
    this.productsModel.productImage=this.productForm.value.productImage;
    this.productsModel.productCategory=this.productForm.value.productCategory;
    this.productsModel.productPrice=this.productForm.value.productPrice;
    this.productsModel.productRating=this.productForm.value.productRating;

    //for posting products data on json-server
    this._http.postProducts(this.productsModel)
    .subscribe((res)=>{
      console.log(res);
      alert("Product added successfully...");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.productForm.reset();
      this.getAllProducts();
    },
    (err)=>{
      alert("Something went wrong...");
    })
  }

  //for getting product data from json-server
getAllProducts(){
  this._http.getProducts()
  .subscribe((res)=>{
    this.productData=res;
    this._http.sub.next(res);
  })
}

  deleteProduct(id: number){
    this._http.deleteProducts(id).subscribe((res)=>{
      alert("Product deleted successfully...");
      this.getAllProducts();

    })
  }

  onEditProduct(product:any){
    this.productsModel.id=product.id;
this.productForm.controls['productName'].setValue(product.productName);
this.productForm.controls['productImage'].setValue(product.productImage);
this.productForm.controls['productCategory'].setValue(product.productCategory);
this.productForm.controls['productPrice'].setValue(product.productPrice);
this.productForm.controls['productRating'].setValue(product.productRating);

  }
  updateProductDetails(){
    this.productsModel.productName=this.productForm.value.productName;
    this.productsModel.productImage=this.productForm.value.productImage;
    this.productsModel.productCategory=this.productForm.value.productCategory;
    this.productsModel.productPrice=this.productForm.value.productPrice;
    this.productsModel.productRating=this.productForm.value.productRating;

    this._http.updateProducts(this.productsModel,this.productsModel.id)
    .subscribe((res)=>{
      alert("Product updated successfully...");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.productForm.reset();
      this.getAllProducts();
    })
  }

  //
  onTableDataChange(event:any){
    this.page=event;
    this.getAllProducts();
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllProducts();
  }
}
