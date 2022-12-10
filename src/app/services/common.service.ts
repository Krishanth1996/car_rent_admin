import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ImageModalComponent } from '../components/image-modal/image-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public dialog: MatDialog) {}
  dtOptions: any;
  // dtOptions: DataTables.Settings = {};

  getDataTableSettings(){
    this.dtOptions={
      print:{
        title:"test"
      },
      dom: 'Bfrtip',
      pageLength:15,
      lengthMenu:[5,10,20],
      buttons: [
        'copy',
        'print',
        'excel',
      ],
      
      responsive: true,
      drawCallback: function( settings:any ) {
        console.log("pageLength:"+settings._iDisplayLength);
        console.log("PageNumber:"+settings._iDisplayStart);
    }
    };
    return this.dtOptions;
  }

  openImageDialog(image:any,title:string){
      const dialogRef = this.dialog.open(ImageModalComponent, {
        data: {
          image:image,
          title:title
        },
        maxHeight:"60%",
        panelClass:"scrollable"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        return result;
      });
      this.setStyle();
  }

  setStyle(){
    let doc = document.getElementsByClassName("scrollable");
    doc[0].setAttribute("style", "overflow:auto;");
  }

  setFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      return file;
    }
    return null

  }
  
}
