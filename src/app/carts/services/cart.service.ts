import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl:string="https://fakestoreapi.com/";
  constructor( private _HttpClient:HttpClient) { }
 
  creatNewCart(model:any){
    return this._HttpClient.post(this.baseUrl+'carts' , model)
  }

}
