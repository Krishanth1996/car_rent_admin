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
    public _common: CommonService,
    private _vehicleService: VehicleService,
    private _vehicleOwnerService: VehicleOwnerService
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
  


  vehicle: Vehicle
  vehiclePriceRangeForm = new FormGroup({
    vehicle_id:new FormControl(),
    name:new FormControl(),
    amount:new FormControl()
  })
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
    location_id: new FormControl(),
    // is_with_driver: new FormControl(),
  });
  vehicleOwners: VehicleOwner[] = []
  ngOnInit(): void {
    this._vehicleOwnerService.getAllVehicleOwner().subscribe(data => {
      if (!data.isError) {
        this.vehicleOwners = data.data
        this.filteredVehicleOwners = this.vehicleOwner.valueChanges.pipe(
          startWith(''),
          map(value => this._filterOwner(value || '')),
        );
      }
    })

    this.filteredGearTypes = this.gearType.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.gearTypes)),
    );
    this.filteredFuelTypes = this.fuelType.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.fuelTypes)),
    );
    this.filteredInsuranceTypes = this.insuranceType.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.insuranceTypes)),
    );
  }

  setVehicle(vehicle: Vehicle) {
    this.vehicle = vehicle;
    this.vehicleForm.patchValue({
      name: vehicle.name,
      brand: vehicle.brand,
      gear_type: vehicle.gear_type,
      mileage: vehicle.mileage,
      number_plate: vehicle.number_plate,
      registered_date: vehicle.registered_date,
      fuel_type: vehicle.fuel_type,
      insurance_type: vehicle.insurance_type,
      owner_id: vehicle.owner.owner_id,
      location_id: vehicle.location.location_id,
      // is_with_driver: vehicle.is_with_driver,
    })
    this.fuelType.setValue(this.vehicleForm.get('fuel_type').value.toUpperCase());
    this.gearType.setValue(this.vehicleForm.get('gear_type').value.toUpperCase());
    this.insuranceType.setValue(this.vehicleForm.get('insurance_type').value.toUpperCase());
    this.vehicleOwner.setValue(this.vehicleForm.get('owner_id').value.toUpperCase());
    // let owner = this.vehicleForm.get('owner').value;
    // this.vehicleOwner.setValue(owner.id_card_number.toUpperCase());
  }

  onFormSubmit() {
    // const vehicleFormData = new FormData();
    // vehicleFormData.append('name', this.vehicleForm.get('name').value);
    // vehicleFormData.append('brand', this.vehicleForm.get('brand').value);
    // vehicleFormData.append('gear_type', this.vehicleForm.get('gear_type').value);
    // vehicleFormData.append('mileage', this.vehicleForm.get('mileage').value);
    // vehicleFormData.append('number_plate', this.vehicleForm.get('number_plate').value);
    // vehicleFormData.append('registered_date', this.vehicleForm.get('registered_date').value);
    // vehicleFormData.append('fuel_type', this.fuelType.value);
    // vehicleFormData.append('insurance_type', this.insuranceType.value);
    // vehicleFormData.append('owner_id', this.vehicleOwner.value);
    // vehicleFormData.append('location_id', "6bb9a7eb-b68c-4947-b0e9-bb094e428d6a");
    // // vehicleFormData.append('is_with_driver', this.vehicleForm.get('contact_mobile').value);
    this.vehicleForm.patchValue({
      owner_id: this.vehicleOwners.find(x => x.id_card_number == this.vehicleOwner.value).owner_id,
      location_id: "22f83eba-0b9d-42f9-93c3-11399cbfa349",
      fuel_type: this.fuelType.value,
      insurance_type: this.insuranceType.value,
      gear_type: this.gearType.value
    })
    if (this.vehicle) {
      this.updateVehicle();
    } else {
      this.createVehicle();
    }
  }

  updateVehicle() {
    this._vehicleService.updateVehicle(this.vehicleForm.value, this.vehicle.vehicle_id).subscribe(data => {
      this.clearForm()
    })
  }
  createVehicle() {
    this._vehicleService.createVehicle(this.vehicleForm.value).subscribe(data => {
      this.vehicleForm.reset();
    })
  }

  clearForm() {
    this.vehicleForm.reset();
    this.clearVehicleEvent.emit(undefined)
  }

  onFileChange(event: any, type: string) {
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

  private _filter(value: string, data: any | VehicleOwner) {
    const filterValue = this._normalizeValue(value);
    return data.filter((gear: string) => this._normalizeValue(gear).includes(filterValue));
  }
  private _filterOwner(value: string) {
    const filterValue = this._normalizeValue(value);
    return this.vehicleOwners.filter(owner => this._normalizeValue(owner.first_name + ' ' + owner.last_name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
