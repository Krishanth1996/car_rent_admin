import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { VehicleOwner } from 'src/app/model/vehicle_owner';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
    vehicleOwner:VehicleOwner
  ngOnInit(): void {
    this.vehicleOwner=this.data;
    console.log(this.data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
