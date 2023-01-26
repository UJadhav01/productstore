import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
//pagination

post:any;
page:number=1;
count:number=0;
tableSize:number=10;

authenticated:boolean=false;

productData:any;
  constructor(private _http:ApiService) { }

  ngOnInit(): void {
this.getAllProduct();
  }

getAllProduct(){
  this._http.getProducts().subscribe((res)=>{
    this.productData=res;
    // console.log(res);
        })
}

  onTableDataChange(event:any){
    this.page=event;
    this.getAllProduct();
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllProduct();
  }
}
