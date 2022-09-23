import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditcards/getall";
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
  getByCustomerId(customerId:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditcards/getbycustomerid?customerid="+customerId;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath)
  }
  getAllCreditCards(customerId:number):Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditcards/getallcreditcardsbycustomerid?customerid="+customerId
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath)
  }
  addCard(creditCard:CreditCard):Observable<SingleResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditcards/add";
    return this.httpClient.post<SingleResponseModel<CreditCard>>(newPath,creditCard)
  }
}
