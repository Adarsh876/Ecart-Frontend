import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = 'http://localhost:3000'

  wishlistCount = new BehaviorSubject(0)

  cartCount = new BehaviorSubject(0) 

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWishlistCount() // to avoid the removal of the value while refresh
      this.getcartCount()
    }
  }

  getallproductsapi(){
    return this.http.get(`${this.server_url}/allproducts`)
  }

  registerApi(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  loginApi(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  getaproductApi(id:any){
    return this.http.get(`${this.server_url}/get-product/${id}`)
  }

  addTokenToHeader(){
    // create a object for the class http headers
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")  // getting token from the session storage
    if(token){
      // appending token to the headers of the request
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistApi(product:any){
    return this.http.post(`${this.server_url}/add-wishlist`,product,this.addTokenToHeader())
  }

  getWishlistItemsApi(){
    return this.http.get(`${this.server_url}/wishlist/allproduct`,this.addTokenToHeader())
  }

  getWishlistCount(){
    this.getWishlistItemsApi().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  removeItemsfromWishlitApi(id:any){
    return this.http.delete(`${this.server_url}/wishlist/removeItem/${id}`,this.addTokenToHeader())
  }

  // add to cart
  addToCartApi(product:any){
    return this.http.post(`${this.server_url}/add-cart`,product,this.addTokenToHeader())
  }

  //get item from cart
  getCartApi(){
    return this.http.get(`${this.server_url}/cart/all-product`,this.addTokenToHeader())
  }

  getcartCount(){
    this.getCartApi().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

  // remove item from cart
  removeItemsfromCartApi(id:any){
    return this.http.delete(`${this.server_url}/cart/removeItem/${id}`,this.addTokenToHeader())
  }

  // increment item in the cart
  incrementCartApi(id:any){
    return this.http.get(`${this.server_url}/cart/increment/${id}`,this.addTokenToHeader())
  }

  // decrement item in the cart
  decrementCartApi(id:any){
    return this.http.get(`${this.server_url}/cart/decrement/${id}`,this.addTokenToHeader())
  }

  // empty cart
  emptyCartApi(){
    return this.http.delete(`${this.server_url}/cart/empty`,this.addTokenToHeader())
  }

 
}
