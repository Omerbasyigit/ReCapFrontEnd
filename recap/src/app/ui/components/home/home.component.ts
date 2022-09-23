import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 carDetails:Car[]
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getAllCar();
  }

  getAllCar(){
    this.carService.getAllDetails().subscribe(response=>{
      this.carDetails=response.data
    })
      
  }
}
