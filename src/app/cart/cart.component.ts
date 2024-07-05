import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allProducts:any = []
  total:any = 0

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllItemCart()
  }

  getAllItemCart(){
    this.api.getCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allProducts = res
        this.getGrandTotal()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  getGrandTotal(){
    this.total = Math.ceil(this.allProducts.map((item:any)=>item.grandTotal).reduce((n1:any,n2:any)=>n1+n2))
    console.log(this.total);
  }

  removeItem(id:any){
    this.api.removeItemsfromCartApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllItemCart()
        this.api.getcartCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }

    })


  }

  incrementItem(id:any){
    this.api.incrementCartApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllItemCart()
        this.api.getcartCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }

    })
  }

  decrementItem(id:any){
    this.api.decrementCartApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllItemCart()
        this.api.getcartCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }

    })
  }

  emptyCart(){
    this.api.emptyCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllItemCart()
        this.api.getcartCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  checkout(){
    sessionStorage.setItem("total",JSON.stringify(this.total))
  }

}
