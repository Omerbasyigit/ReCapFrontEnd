import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  customerId:number=Number(localStorage.getItem("customerId"))
  creditCards:CreditCard[]=[]
  car:Car
  carId:number=Number(localStorage.getItem("carId"))
  selectedCard:string;
  constructor(private creditCardService:CreditCardService) { }
  ngOnInit(): void {
    
    this.getCreditCards()
    
    this.isSelectedCard()
  }

  getCreditCards(){
    
    this.creditCardService.getAllCreditCards(this.customerId).subscribe(response=>{
     this.creditCards=response.data
    
    })
  }

  onSelected(card:any){
    console.log(card)

  }
  isSelectedCard(){
    if(this.selectedCard==null){
      return false
    }
    else{
      localStorage.setItem("cardNumber",this.selectedCard)
      return true
    }
  }
}
