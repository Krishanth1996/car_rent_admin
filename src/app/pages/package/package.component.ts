import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VehicleSubscription } from 'src/app/model/vehicle_subscription_payments';
import { CommonService } from 'src/app/services/common.service';
import { VehicleSubscriptionPaymentsService } from 'src/app/services/vehicle-subscription-payments.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  dtOptions: any;

  packageForm=new FormGroup({
    type_name:new FormControl(),
    amount:new FormControl(),
    is_deleted:new FormControl(false)
  })
  constructor(
    private _VSPService:VehicleSubscriptionPaymentsService,
    public _common: CommonService
    ) { }

  packages:VehicleSubscription[]=[]
  selectedPackage:VehicleSubscription;

  ngOnInit(): void {
    this._VSPService.getAllSubscriptionTypes().subscribe(data=>{
      if(!data.iesError){
        this.packages=data.data
        this.dtOptions = this._common.getDataTableSettings();
      }
    })
  }

  onFormSubmit(isEdit:boolean=false){
    if(!isEdit){
      this._VSPService.createSubscriptionType(this.packageForm.value).subscribe(data=>{
        this.clearForm()
        
      })
    }else{
      this._VSPService.updateSubscriptionType(this.packageForm.value,this.selectedPackage.subscription_id).subscribe(data=>{
        this.clearForm()
      })
    }

  }
  clearForm(){
    this.packageForm.reset()
    this.selectedPackage=undefined
  }
  selectPackage(item:VehicleSubscription){
    this.selectedPackage=item
    this.packageForm.patchValue({
      type_name:this.selectedPackage.type_name,
      amount:this.selectedPackage.amount,
      is_deleted:this.selectedPackage.is_deleted
    })
  }

  deletePackage(item:VehicleSubscription){
    console.log(item);
    this._VSPService.deleteSubscriptionType(item.subscription_id).subscribe(data=>{
      if(data){
        this.packages=this.packages.filter(x=>x.subscription_id!=item.subscription_id)
      }
    })
  }

}
