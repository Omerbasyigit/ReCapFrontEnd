import { Component, OnInit } from '@angular/core';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers:CustomerDetail[]=[]
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomerDetails();
  }
  getCustomerDetails(){
    this.customerService.getCustomerDetails().subscribe(response=>{
      this.customers=response.data
    })
  }
}
