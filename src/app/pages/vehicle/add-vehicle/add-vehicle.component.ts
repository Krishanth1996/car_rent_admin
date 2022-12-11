import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/model/vehicle';
import { CommonService } from 'src/app/services/common.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  @Output() clearVehicleEvent = new EventEmitter<string>();
  constructor(public _common:CommonService,private _vehicleService:VehicleService) { }
  vehicle:Vehicle
  vehicleForm = new FormGroup({
    name: new FormControl(),
    brand: new FormControl(),
    gear_type: new FormControl(),
    mileage: new FormControl(),
    number_plate: new FormControl(),
    registered_date: new FormControl(),
    fuel_type: new FormControl(''),
    insurance_type: new FormControl(),
    owner_id: new FormControl(),
    location: new FormControl(),
    is_with_driver: new FormControl(),
  });
    
  ngOnInit(): void {
  }

  setVehicle(vehicle:Vehicle){
    this.vehicle=vehicle;
    this.vehicleForm.patchValue({
      name: vehicle.name,
      brand: vehicle.brand,
      gear_type: vehicle.gear_type,
      mileage: vehicle.mileage,
      number_plate: vehicle.number_plate,
      registered_date: vehicle.registered_date,
      fuel_type: vehicle.fuel_type,
      insurance_type: vehicle.insurance_type,
      owner_id: vehicle.owner_id,
      location: vehicle.location_id,
      is_with_driver: vehicle.is_with_driver,
    })
  }

  onFormSubmit(){
    const vehicleFormData = new FormData();
    vehicleFormData.append('name', this.vehicleForm.get('license_card_image').value);
    vehicleFormData.append('brand', this.vehicleForm.get('id_card_image').value);
    vehicleFormData.append('gear_type', this.vehicleForm.get('utility_bill_image').value);
    vehicleFormData.append('mileage', this.vehicleForm.get('first_name').value);
    vehicleFormData.append('number_plate', this.vehicleForm.get('last_name').value);
    vehicleFormData.append('registered_date', this.vehicleForm.get('license_card_number').value);
    vehicleFormData.append('fuel_type', this.vehicleForm.get('id_card_number').value);
    vehicleFormData.append('insurance_type', this.vehicleForm.get('contact_mobile').value);
    vehicleFormData.append('owner_id', this.vehicleForm.get('contact_mobile').value);
    vehicleFormData.append('location', this.vehicleForm.get('location').value);
    vehicleFormData.append('is_with_driver', this.vehicleForm.get('contact_mobile').value);
    if(this.vehicle){
      this.updateCustomer();
    }else{
      this.createCustomer(vehicleFormData);
    }
  }

  updateCustomer(){
    this._vehicleService.updateVehicle(this.vehicleForm.value,this.vehicle.id).subscribe(data=>{
      this.clearForm()   
    })
  }
  createCustomer(vehicleFormData:any){
    this._vehicleService.createVehicle(vehicleFormData).subscribe(data=>{
      this.vehicleForm.reset();      
    })
  }

  clearForm(){
    this.vehicleForm.reset();
    this.clearVehicleEvent.emit(undefined)
  }

  onFileChange(event:any,type:string){
    switch (type) {
      case 'id_card_image':
        // this.vehicleForm.patchValue({
        //   id_card_image: this._common.setFile(event)
        // });
        break;
      case 'utility_bill_image':
        // this.vehicleForm.patchValue({
        //   utility_bill_image: this._common.setFile(event)
        // });
        break;

      case 'license_card_image':
        // this.vehicleForm.patchValue({
        //   license_card_image: this._common.setFile(event)
        // });
        break;
      default:
        break;
    }
  }

}
