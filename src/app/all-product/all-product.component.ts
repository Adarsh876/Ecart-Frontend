import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{
  allProducts:any = []

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getallproductsapi().subscribe({
      next:(res:any)=>{
        this.allProducts = res
        console.log(res);
        this.api.getcartCount()
        this.api.getWishlistCount()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('Product added to the wishlist successfully')
        },
        error:(err:any)=>{
          console.log(err);
          alert(err.error)
          
        }
      })
      
    }else{
      alert('Please Login')
    }

  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('Product added to the cart successfully')
          this.api.getcartCount()
        },
        error:(err:any)=>{
          console.log(err);
          alert('oops')
          
        }

      })

    }
    else{
      alert('Please Login')
    }
    
  }

}
