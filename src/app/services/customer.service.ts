import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backendHost:string = environment.backendHost;
  constructor(private http: HttpClient) { }

  // not used
  getCustomers(): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost);
  }

  searchCustomers(keyword:string): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+"/search?keyword="+keyword);
  }
}
