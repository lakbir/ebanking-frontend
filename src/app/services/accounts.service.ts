import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  backendHost:string = environment.backendHost+"accounts";
  constructor( private http: HttpClient) { }

  public getAccountById(accountId: string, page: number, size: number): Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.backendHost+"/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId: string, amount: number, description: string){
    let data = {accountId: accountId, amount: amount, description: description};
    return this.http.post(this.backendHost+"/debit",data);
  }

  public credit(accountId: string, amount: number, description: string){
    let data = {accountId: accountId, amount: amount, description: description};
    return this.http.post(this.backendHost+"/credit",data);
  }

  public virement(accountSource: string, accountDestination:string, amount: number, description: string){
    let data = {accountSource: accountSource, accountDestination: accountDestination, amount: amount, description: description};
    return this.http.post(this.backendHost+"/virement",data);
  }
}
