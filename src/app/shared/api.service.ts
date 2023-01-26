import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public sub = new Subject<any>();

  constructor(private _http:HttpClient) { }

  postProducts(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  getProducts(){
    return this._http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateProducts(data:any,id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteProducts(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
