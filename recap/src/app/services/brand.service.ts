import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }

  getAllBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }
  getBrandDetailByID(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath=this.apiUrl+"brands/getbyid?brandId="+brandId
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }
  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
  deleteBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/delete"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/update"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
}
