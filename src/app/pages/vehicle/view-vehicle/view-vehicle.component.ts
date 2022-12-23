import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Vehicle } from 'src/app/model/vehicle';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocationService } from 'src/app/services/location.service';
import { VehicleOwnerService } from 'src/app/services/vehicle-owner.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss']
})
export class ViewVehicleComponent implements OnInit {

  vehicle: Vehicle[]
  selectedVehicle: Vehicle;
  dtOptions: any;
  selectedImage: string;

  vehiclePriceRangeForm = new FormGroup({
    vehicle_id:new FormControl(),
    name:new FormControl(),
    amount:new FormControl(),
    is_mandatory:new FormControl(),
    is_per_day:new FormControl()
  });

  selectVehicles = new FormControl('');
  is_mandatorys= new FormControl('');
  is_per_days = new FormControl('');
  filteredVehicles: Observable<Vehicle[]>;
  
  @ViewChild(AddVehicleComponent) addVehicle: AddVehicleComponent;

  constructor(private _vehicleService: VehicleService, public _common: CommonService, public _location: LocationService, public _owner: VehicleOwnerService) { }

  ngOnInit(): void {
    this._vehicleService.getAllVehicles().subscribe(data => {
      if (!data.isError) {
        this.vehicle = data.data;
        this.filteredVehicles = this.selectVehicles.valueChanges.pipe(
          startWith(''),
          map(value => this._filterOwner(value || '')),
        );
        this.dtOptions = this._common.getDataTableSettings();
      }
    })
  }
  setPrice(){
    debugger
    this.vehiclePriceRangeForm.patchValue({
      vehicle_id:this.selectVehicles.value,
    })
    this._vehicleService.createPriceRange(this.vehiclePriceRangeForm.value).subscribe(data=>{
      console.log(data);
      
    })
  }

  clearPayForm(){

  }
  deleteVehicle(id: string) {
    this._vehicleService.deleteVehicle(id).subscribe(data => {
      if (!data.isError) {
        this.vehicle = this.vehicle.filter(vehicle => vehicle.vehicle_id != id)
      }
    })
  }

  getValue(e:any,type:string){
    if(type=='m'){
      debugger
      this.vehiclePriceRangeForm.patchValue({
        is_mandatory: this.is_mandatorys.value
      })
    }else{
      this.vehiclePriceRangeForm.patchValue({
        is_per_day: this.is_per_days.value
      })
    }
    
  }

  selectVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.addVehicle.setVehicle(vehicle);
  }

  clearVehicle(event: any) {
    this.selectedVehicle = undefined;
    this.addVehicle.setVehicle(undefined)
  }

  getSingleVehicleLocation(id: string) {
    this._location.getSingleVehicleLocation(id).subscribe(data => {
      if (!data.isError) {
        console.log(data);

      }
    })
  }

  getSingleVehicleOwner(id: string) {
    this._owner.getSingleVehicleOwner(id).subscribe(data => {
      if (!data.isError) {
        this._common.openProfileDialog(data.data[0])
      }
    })
  }
  private _filterOwner(value: string) {
    const filterValue = this._normalizeValue(value);
    return this.vehicle.filter(v => this._normalizeValue(v.brand + ' ' + v.number_plate).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
