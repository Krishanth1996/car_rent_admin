import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss']
})
export class ViewCustomersComponent implements OnInit  {

  customers: Customer[];
  selectedCustomer:Customer;
  dtOptions: any;

  selectedImage:string;
  @ViewChild(AddCustomerComponent) addCustomer: AddCustomerComponent;
  constructor(private _customerService:CustomerService, public _common:CommonService) {}
  
  ngOnInit(): void {
    this.getAllCustomers()
    }
    getAllCustomers(){
      this._customerService.getAllCustomers().subscribe(data=>{
        if(!data.isError){
          this.customers=data.data;
          this.dtOptions = this._common.getDataTableSettings();
        } 
      })
    }
    deleteCustomer(id:any){
      this._customerService.deleteCustomer(id).subscribe(data=>{
        if(!data.isError){
         this.customers=this.customers.filter(customer=>customer.id != id)
        }
      })
    }

    selectCustomer(customer:Customer){
      this.selectedCustomer=customer;
      this.addCustomer.setCustomer(customer);
    }

    clearCustomer(event:any){
      this.selectedCustomer=undefined;
      this.addCustomer.setCustomer(undefined)
      this.getAllCustomers()
    }
  }
