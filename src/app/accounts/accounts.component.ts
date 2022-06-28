import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationFormGroup! : FormGroup;
  errorMessage! : string;

  constructor(private fb: FormBuilder, private accountService:AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control('')
    });

    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null, [Validators.required]),
      amount: this.fb.control(0),
      desc: this.fb.control(null),
      accountDestination: this.fb.control(null)
    })
  }

  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccountById(accountId,this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId :string = this.accountFormGroup.value.accountId;
    if(this.operationFormGroup.value.operationType == 'DEBIT'){
      this.accountService.debit(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.desc).subscribe({
        next : (data) => {
          alert("Success Debit");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error : (err) => {
          console.error(err);
          alert("Erreur Debit")
        }
        }
      );
    }else if (this.operationFormGroup.value.operationType == 'CREDIT'){
      this.accountService.credit(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.desc).subscribe({
          next : (data) => {
            alert("Success CREDIT");
            this.operationFormGroup.reset();
            this.handleSearchAccount();
          },
          error : (err) => {
            console.error(err);
            alert("Erreur CREDIT")
          }
        }
      );
    }else if (this.operationFormGroup.value.operationType == 'VIREMENT'){
      this.accountService.virement(accountId,this.operationFormGroup.value.accountDestination, this.operationFormGroup.value.amount, this.operationFormGroup.value.desc).subscribe({
          next : (data) => {
            alert("Success VIREMENT");
            this.operationFormGroup.reset();
            this.handleSearchAccount();
          },
          error : (err) => {
            console.error(err);
            alert("Erreur VIREMENT")
          }
        }
      );
    }

  }
}
