import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product:any = {}

  constructor(private api:ApiService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const id = res.id
      console.log(id);
      this.getProduct(id)
      
    })
  }

  getProduct(id:any){
    this.api.getaproductApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.product = res[0]
        console.log(this.product);
        
        
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
    }
    else{
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
          alert(err.error)
          
        }

      })

    }
    else{
      alert('Please Login')
    }
    
  }

}
