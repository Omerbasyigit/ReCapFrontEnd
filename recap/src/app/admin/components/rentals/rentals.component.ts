import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  rentals:RentalDetail[]=[]
  rental:Rental={id:0,carId:0,customerId:0,rentDate:new Date(11/11/11),returnDate:new Date(12/12/12)}
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails(){
    this.rentalService.getRentalDetails().subscribe(response=>{
      this.rentals=response.data
    })
  }
}
