import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    config: NgbCarouselConfig
    ) {
      config.showNavigationIndicators=true
     }
  image:any;
  title:any;
  ngOnInit(): void {
    this.image=this.data.image;
    this.title=this.data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
