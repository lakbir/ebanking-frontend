import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Observable} from "rxjs";
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
    this.accountObservable = this.accountService.getAccountById(accountId,this.currentPage, this.pageSize);
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }
}
