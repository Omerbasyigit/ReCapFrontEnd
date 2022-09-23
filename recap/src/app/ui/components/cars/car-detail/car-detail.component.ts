import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail:Car
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]){
        this.getCarDetailByCarId(params["carId"])
      }
      
    })
    
  }
  getCarDetailByCarId(id:number){
    this.carService.getCarDetail(id).subscribe(response=>{
      this.carDetail=response.data;
      localStorage.setItem("carId",this.carDetail.carId.toString())
    })
  }
 

  
}
