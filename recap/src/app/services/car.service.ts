import { HttpClient } from '@angular/common/http';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }
  getAllDetails():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getalldetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getAllByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl+"cars/getalldetailbybrandid?brandid="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getAllByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl+"cars/getalldetailbycolorid?colorid="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetail(id:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetail?id="+id;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }
  getAllByBrandAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getallbybrandandcolorid?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  addCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  deleteCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/delete";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  updateCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
}
