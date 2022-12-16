import { Component, OnInit, ViewChild } from '@angular/core';
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

  vehicle: Vehicle[];
  selectedVehicle: Vehicle;
  dtOptions: any;
  selectedImage: string;

  @ViewChild(AddVehicleComponent) addVehicle: AddVehicleComponent;

  constructor(private _vehicleService: VehicleService, public _common: CommonService, public _location: LocationService, public _owner: VehicleOwnerService) { }

  ngOnInit(): void {
    this._vehicleService.getAllVehicles().subscribe(data => {
      if (!data.isError) {
        this.vehicle = data.data;
        this.dtOptions = this._common.getDataTableSettings();
      }
    })
  }

  deleteVehicle(id: string) {
    this._vehicleService.deleteVehicle(id).subscribe(data => {
      if (!data.isError) {
        this.vehicle = this.vehicle.filter(vehicle => vehicle.vehicle_id != id)
      }
    })
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
}
