import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { FUEL_TYPE, GEAR_TYPE, INSURANCE } from 'src/app/model/common';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleOwner } from 'src/app/model/vehicle_owner';
import { CommonService } from 'src/app/services/common.service';
import { VehicleOwnerService } from 'src/app/services/vehicle-owner.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  @Output() clearVehicleEvent = new EventEmitter<string>();
  constructor(
    public _common:CommonService,
    private _vehicleService:VehicleService,
    private _vehicleOwnerService:VehicleOwnerService
    ) { }

  gearType = new FormControl('');
  gearTypes = Object.values(GEAR_TYPE);
  filteredGearTypes: Observable<string[]>;

  fuelType = new FormControl('');
  fuelTypes = Object.values(FUEL_TYPE);
  filteredFuelTypes: Observable<string[]>;

  insuranceType = new FormControl('');
  insuranceTypes = Object.values(INSURANCE);
  filteredInsuranceTypes: Observable<string[]>;

  vehicleOwner = new FormControl('');
  filteredVehicleOwners: Observable<VehicleOwner[]>;

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
    owner: new FormControl(),
    location: new FormControl(),
    is_with_driver: new FormControl(),
  });
  vehicleOwners:VehicleOwner[]=[]
  ngOnInit(): void {
    this._vehicleOwnerService.getAllVehicleOwner().subscribe(data=>{
      if(!data.isError){
        this.vehicleOwners=data.data
        this.filteredVehicleOwners = this.vehicleOwner.valueChanges.pipe(
          startWith(''),
          map(value => this._filterOwner(value || '')),
        );
      }
    })
    
    this.filteredGearTypes = this.gearType.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '',this.gearTypes)),
    );
    this.filteredFuelTypes = this.fuelType.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '',this.fuelTypes)),
    );
    this.filteredInsuranceTypes = this.insuranceType.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '',this.insuranceTypes)),
    );
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
      owner: vehicle.owner,
      location: vehicle.location,
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

  private _filter(value: string,data: any | VehicleOwner) {
    const filterValue = this._normalizeValue(value);
    return data.filter((gear: string) => this._normalizeValue(gear).includes(filterValue));
  }
  private _filterOwner(value: string) {
    const filterValue = this._normalizeValue(value);
    return this.vehicleOwners.filter(owner => this._normalizeValue(owner.first_name+' '+owner.last_name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
