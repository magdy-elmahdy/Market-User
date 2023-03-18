import { Component } from '@angular/core';
import { cart_Products } from 'src/app/products/models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  
  cartProducts:cart_Products[]=[];
  total:number=0;
  sendData:any;
  productIdQuantity:any[]=[];
  success:boolean=false;
  constructor(private _CartService:CartService){
    this.getCartProducts();
  }

  getCartProducts(){
    if('cart' in localStorage){
    this.cartProducts =JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal();
  }
  plusAmount(index:number){
      this.cartProducts[index].quantity++;
      this.getCartTotal();
      localStorage.setItem('cart' ,JSON.stringify(this.cartProducts));
  }
  minsAmount(index:number){
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  detectChange(){
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  deleteProduct(i:number){
    this.cartProducts.splice(i,1);
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  clearData(){
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  getCartTotal(){
    this.total=0;
    for(let i in this.cartProducts){
      this.total+=this.cartProducts[i].item.price * this.cartProducts[i].quantity; 
    }
  }
  sendOrder(){
    // let pro = this.cartProducts.map(item=>{
    //   return {productId:item.item.id , quantity:item.quantity}
    // })
    for(let i in this.cartProducts){
      this.productIdQuantity.push({productId:this.cartProducts[i].item.id ,quantity:this.cartProducts[i].quantity}) 
    }
    let Model = {
      userId:12,
      date:new Date(),
      products:this.productIdQuantity
    }
    this._CartService.creatNewCart(Model).subscribe(res=>{
      this.success=true;
    })
    
    
  }

  
}
