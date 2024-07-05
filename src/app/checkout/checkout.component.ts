import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public payPalConfig ? : IPayPalConfig;

  proceedToPayStatus:boolean = true
  makePaymentStatus:boolean = false

  checkoutForm = this.fb.group({
    uname:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    flat:["",[Validators.required, Validators.pattern('[a-zA-Z0-9:,. ]*')]],
    place:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pincode:["",[Validators.required, Validators.pattern('[0-9]*')]],
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}
  grandTotal:any = ""

  cancel(){
    this.checkoutForm.reset()
  }

  proceedToPay(){
    if(this.checkoutForm.valid){
      this.proceedToPayStatus = false
      this.grandTotal = sessionStorage.getItem("total")
      
    }
    else{
      alert('Please fill the form completely')
    }
  }

  back(){
    this.proceedToPayStatus = true
  }

  makePayment(){
    this.makePaymentStatus = true
    this.initConfig()
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.grandTotal,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.grandTotal
                        }
                    }
                },

            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },

        // invokes when the payment is successfull
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.api.getcartCount()
            alert('Payment Successfull')

            this.proceedToPayStatus = true
            this.makePaymentStatus = false
            this.router.navigateByUrl('/')
        },

        // payment cancel
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            alert('Payment Cancelled')
            this.proceedToPayStatus = false

        },
        // error in gateway
        onError: err => {
            console.log('OnError', err);
            alert('Oops... Transaction failed please try again after sometime')

        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
}

}
