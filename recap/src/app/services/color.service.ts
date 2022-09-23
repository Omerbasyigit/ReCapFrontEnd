import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }

  getAllColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"colors/getall")
  }
  getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl+"colors/getbyid?colorid="+colorId
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }
  addColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"colors/add"
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
  deleteColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"colors/delete"
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
  updateColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"colors/update"
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
}
