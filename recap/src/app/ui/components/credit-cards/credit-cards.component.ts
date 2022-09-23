import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css']
})
export class CreditCardsComponent implements OnInit {

  creditCardForm:FormGroup
  userId:number=Number(localStorage.getItem("userId"));
  customer:Customer
  creditCards:CreditCard[]=[]
  creditCard:CreditCard={id:0,cardNumber:"",customerId:0,cvv:"",expirationDate:new Date(0),customerName:"",customerLastName:""}
  constructor(private creditCardService:CreditCardService,private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["customerId"]){
        this.getByCustomerId(params["customerId"])
      }
      else{
        this.createCreditCardForm()
        this.getCustomerByUserId()
      }
    })
  }

  getAll(){
    this.creditCardService.getAll().subscribe(response=>{
      this.creditCards=response.data;
    })
  }
  getByCustomerId(customerId:number){
    this.creditCardService.getByCustomerId(customerId).subscribe(response=>{
      this.creditCard=response.data
    })
  }
  getCustomerByUserId(){
    this.customerService.getCustomerByUserId(this.userId).subscribe(response=>{
      this.customer=response.data
    })
  }
  addCreditCard(){
    if(this.creditCardForm.valid){
      let creditCard=Object.assign({customerId:this.customer.customerId},this.creditCardForm.value)
      this.creditCardService.addCard(creditCard).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i=0;i<responseError.error.Errors.length;i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
          }
        }
      })
    }

  }
  getCreditCards(){
    this.creditCardService.getAllCreditCards(this.customer.customerId).subscribe(response=>{
      this.creditCards=response.data
      this.toastrService.success(response.message)
    })
  }
  createCreditCardForm(){
    this.creditCardForm=this.formBuilder.group({
      cardNumber:["",Validators.required],
      customerName:["",Validators.required],
      customerLastName:["",Validators.required],
      cvv:["",Validators.required],
      expirationDate:["",Validators.required]
    })
  }
}

