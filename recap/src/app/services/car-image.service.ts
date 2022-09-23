import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }

  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getbycarid?CarId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
  deleteImage(carImage:CarImage):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carimages/delete";
    return this.httpClient.post<ResponseModel>(newPath,carImage)
  }
  upload(carImage:CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "carimages/add";
    return this.httpClient.post<ResponseModel>(newPath,carImage);
  }
  updated(carImageAdd:CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "carimages/update";
    return this.httpClient.post<ResponseModel>(newPath,carImageAdd);
  }
}
