import { Component } from '@angular/core';
import { cart_Products, product } from '../../models/product';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {
  loading:boolean=false;
  products:product[] = [];
  categories:string[] = [];
  cartProducts:cart_Products[]=[];
  productExisted:string ="";
  handelError:any;
  constructor(private _ProductsService: ProductsService) {
    this.getProducts();     //this point to class
    this.getAllCategories(); //this بستعملها لما اكون جوا حاجه وعايز انادي علي حاجه من بره 
  }

  getProducts() {
    this.loading=true;
    this._ProductsService.getAllProducts().subscribe((data:any) => {
      this.loading=false;
      this.products = data;
    },(error=>{
    this.loading=true;
      alert(error)
      
    }) );
  }

  getAllCategories(){
    this.loading=true;
    this._ProductsService.getAllCategories().subscribe((data:any)=>{
      this.loading=false;
      this.categories= data;
    })
  }

  filterCategory(event:any){
    let value =event.target.value;
    (value == "all")?this.getProducts():this.getSpecificCategory(value);
  }

  getSpecificCategory(keyword:string){
    this.loading=true;
    this._ProductsService.getProductsByCategory(keyword).subscribe((data:any)=>{
      this.loading=false;
      this.products=data;
    })
  }

  
  addToCart(event:any){
    if("cart" in localStorage){
      this.cartProducts =JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(item =>item.item.id ==event.item.id)//ببحث لو فيه ايتم ف الاري ال هي دي بتاعه مشابه لل اي دي ال جاي من الايفنت 
      if(exist){ //معني كده لو ال الاجزيست فيها داتا تعمل كذا 
        this.productExisted ="Product Is Aleady In Your Cart";
        // alert("Product Is Aleady In Your Cart");
      }else{
        this.cartProducts.push(event);   //بعمل بوش في الاري وبعدين ابعته ناتي للوكال
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    }else{
      this.cartProducts.push(event);   //بعمل بوش في الاري وبعدين ابعته ناتي للوكال
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }    
  }

}
