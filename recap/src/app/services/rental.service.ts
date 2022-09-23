import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath)
  }
  add(rental:Rental):Observable<SingleResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/add"
    return this.httpClient.post<SingleResponseModel<Rental>>(newPath,rental)
  }
  getRental(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/getrental?carId="+carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
}
}