import { Component, OnInit } from '@angular/core';
import { PAYMENT_TYPE, VehicleSubscriptionPayment } from 'src/app/model/vehicle_subscription_payments';
import { CommonService } from 'src/app/services/common.service';
import { VehicleSubscriptionPaymentsService } from 'src/app/services/vehicle-subscription-payments.service';

@Component({
  selector: 'app-vehicle-subscription-payment',
  templateUrl: './vehicle-subscription-payment.component.html',
  styleUrls: ['./vehicle-subscription-payment.component.scss']
})
export class VehicleSubscriptionPaymentComponent implements OnInit {
  dtOptions: any;
  public PAYMENT_TYPE: PAYMENT_TYPE

  constructor(private _VSPService: VehicleSubscriptionPaymentsService, public _common: CommonService) { }
  vsp: VehicleSubscriptionPayment[] = []
  ngOnInit(): void {
    this._VSPService.getAllVehicleSubscriptionPayments().subscribe(data => {
      console.log(data);
      if (!data.isError) {
        this.vsp = data.data
        this.dtOptions = this._common.getDataTableSettings();
      }
    })
  }

  selectPayment(item: VehicleSubscriptionPayment) {
    console.log(item);
  }

  deletePayment(item: VehicleSubscriptionPayment) {
    console.log(item);
  }

}
