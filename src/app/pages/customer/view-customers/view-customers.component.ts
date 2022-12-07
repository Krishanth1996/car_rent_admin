import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss']
})
export class ViewCustomersComponent implements OnInit  {

  customers: Customer[];
  dtOptions: any;

  selectedImage:string;

  constructor(private _customerService:CustomerService, public _common:CommonService) {}
  
  ngOnInit(): void {
      this._customerService.getAllCustomers().subscribe(data=>{
        if(!data.isError){
          this.customers=data.data;
          this.dtOptions = this._common.getDataTableSettings();
        } 
      })
    }

  }
