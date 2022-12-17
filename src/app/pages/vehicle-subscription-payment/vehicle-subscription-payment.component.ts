import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleOwner } from 'src/app/model/vehicle_owner';
import { PAYMENT_TYPE, VehicleSubscription, VehicleSubscriptionPayment } from 'src/app/model/vehicle_subscription_payments';
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

  paymentForm=new FormGroup({
    vehicle_id: new FormControl(),
    // owner_id: new FormControl(),
    vehicle_subscription_id: new FormControl(),
    paid_on: new FormControl(),
    next_payment: new FormControl(),
    
  })
  vehicle= new FormControl('')
  payment= new FormControl('')

  constructor(private _VSPService: VehicleSubscriptionPaymentsService, public _common: CommonService) { }
  vsp: VehicleSubscriptionPayment[] = []
  owners:VehicleOwner[]=[]
  vehicles:Vehicle[]=[]
  paymentOptions:VehicleSubscription[]=[]

  filteredVehicle: Observable<Vehicle[]>;
  filteredPayment: Observable<VehicleSubscription[]>;

  selectedPayment:VehicleSubscriptionPayment

  ngOnInit(): void {
    this._VSPService.getAllVehicleSubscriptionPayments().subscribe(data => {
      console.log(data);
      if (!data.isError) {
        this.vsp = data.data.VehicleSubscriptionPayments
        this.owners = data.data.Owners
        this.vehicles = data.data.Vehicles
        this.paymentOptions = data.data.PaymentOptions

        this.filteredVehicle = this.vehicle.valueChanges.pipe(
          startWith(''),
          map(value => this._filterVehicle(value || '')),
        );
        this.filteredPayment = this.payment.valueChanges.pipe(
          startWith(''),
          map(value => this._filterPayment(value || '')),
        );
        this.dtOptions = this._common.getDataTableSettings();
      }
    })
  }
  onFormSubmit(isEdit:boolean=false){
    this.paymentForm.patchValue({
      vehicle_id:this.vehicle.value,
      vehicle_subscription_id:this.payment.value
    })
    if(!isEdit){
      this._VSPService.createVehicleSubscriptionPayment(this.paymentForm.value).subscribe(data=>{
        console.log(data);
        this.clearForm()
      })
    }else{
      let paid = new Date(this.selectedPayment.paid_on);
      let next = new Date(this.selectedPayment.next_payment);
      this.paymentForm.patchValue({
        paid_on:paid.getFullYear()+'-'+(paid.getMonth()+1)+'-'+paid.getDate(),
        next_payment:next.getFullYear()+'-'+(paid.getMonth()+1)+'-'+next.getDate(),
      })
      // this.paymentForm.patchValue({
      //   paid_on:new Date(this.selectedPayment.paid_on),
      //   next_payment:new Date(this.selectedPayment.next_payment)
      // })
      this._VSPService.updateVehicleSubscriptionPayment(this.paymentForm.value,this.selectedPayment.subscription_payment_id).subscribe(data=>{
        console.log(data);
        this.clearForm()
      })
    }
    
  }

  clearForm(){
    this.vehicle.reset()
    this.payment.reset()
    this.paymentForm.reset();
    this.selectedPayment=undefined

  }

  selectPayment(item: VehicleSubscriptionPayment) {
    console.log(item);
    this.selectedPayment=item
    this.vehicle.setValue(this.selectedPayment.vehicle_id);
    this.payment.setValue(this.selectedPayment.subscription.subscription_id);
    this.paymentForm.patchValue({
      paid_on:new Date(this.selectedPayment.paid_on),
      next_payment:new Date(this.selectedPayment.next_payment)
    })
    
  }

  deletePayment(item: VehicleSubscriptionPayment) {
    console.log(item);
  }

  private _filterVehicle(value: string) {
    const filterValue = this._normalizeValue(value);
    return this.vehicles.filter(veh => this._normalizeValue(veh.brand + ' ' + veh.name+' '+veh.number_plate).includes(filterValue));
  }
  private _filterPayment(value: string) {
    const filterValue = this._normalizeValue(value);
    return this.paymentOptions.filter(payment => this._normalizeValue(payment.type_name + ' ' + payment.amount).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
