import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetail } from '../models/customerDetail';
import {Customer} from "../models/customer"
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }
  getCustomerDetails():Observable<ListResponseModel<CustomerDetail>>{
    let newPath=this.apiUrl+"customers/getcustomerdetails"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath)
  }
  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getbyid?id="+userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }
}
