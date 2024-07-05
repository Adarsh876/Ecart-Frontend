import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allProducts:any = []

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getWishlistItem()
  }

  getWishlistItem(){
    this.api.getWishlistItemsApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allProducts = res
        console.log(this.allProducts);
        
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }

    })

  }

  removeItem(id:any){
    this.api.removeItemsfromWishlitApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getWishlistItem()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
 

  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          this.api.removeItemsfromWishlitApi(product._id)
          
          alert('Product added to the cart successfully')
          this.api.getcartCount()
          this.removeItem(product._id)
        },
        error:(err:any)=>{
          console.log(err);
          alert(err.error)
          
        }

      })

    }
    else{
      alert('Please Login')
    }
    
  }

}
