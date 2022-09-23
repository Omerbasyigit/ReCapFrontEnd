import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
  cardNumber:string
  carId:number=Number(localStorage.getItem("carId"))
  userId:number= Number(localStorage.getItem("userId")) 
  customer:Customer
  rentals:Rental[]=[]
  rental:Rental
  rentalAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,
    private rentalService:RentalService,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.createRentalAddForm()
    this.GetCustomerByUserId()
    this.getRentalDetail()
    
  }

  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
     rentDate:["",Validators.required],
     returnDate:["",Validators.required]
    })
  }
  addRental(){
    if(this.rentalAddForm.valid){
      let rental=Object.assign({userId:this.userId,customerId:this.customer.customerId,carId:this.carId},this.rentalAddForm.value)
      this.rentalService.add(rental).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i=0;i<responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage)
            
          }
        }
        else{this.toastrService.info("Girdiğiniz tarih aralıklarında kiralama uygun değil")}
      })
    }
    else{this.toastrService.error("Lütfen boş alanları doldurunuz")}
  }
  GetCustomerByUserId(){
    this.customerService.getCustomerByUserId(this.userId).subscribe(response=>{
      this.customer=response.data
      localStorage.setItem("customerId",this.customer.customerId.toString())
    })
  }

 getRentalDetail(){
  this.rentalService.getRental(this.carId).subscribe(response=>{
    this.rentals=response.data
    this.rentals.reverse()
    this.rental=this.rentals[0]
  })
 }
 isCardNumberSelected(){
  if(localStorage.getItem("cardNumber")===null){
   return false
  }
  else{
    this.cardNumber=localStorage.getItem("cardNumber")
    return true
  }
 }
}

