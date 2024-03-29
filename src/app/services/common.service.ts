import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModalComponent } from '../components/image-modal/image-modal.component';
import { ProfileModalComponent } from '../components/profile-modal/profile-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  dtOptions: any;
  // dtOptions: DataTables.Settings = {};

  getDataTableSettings() {
    this.dtOptions = {
      print: {
        title: "test"
      },
      dom: 'Bfrtip',
      pageLength: 15,
      lengthMenu: [5, 10, 20],
      buttons: [
        'copy',
        'print',
        'excel',
      ],

      responsive: true,
      drawCallback: function (settings: any) {
        console.log("pageLength:" + settings._iDisplayLength);
        console.log("PageNumber:" + settings._iDisplayStart);
      }
    };
    return this.dtOptions;
  }

  openImageDialog(image: any, title: string) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: {
        image: image,
        title: title
      },
      maxHeight: "60%",
      panelClass: "scrollable"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      return result;
    });
    this.setStyle();
  }

  openProfileDialog(profile: any,) {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      data: profile
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      return result;
    });
  }

  setStyle() {
    let doc = document.getElementsByClassName("scrollable");
    doc[0].setAttribute("style", "overflow:auto;");
  }

  setFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      return file;
    }
    return null

  }


  //Routing
  goToRoute(routeName: string = "admin") {
    this.router.navigate([routeName], { relativeTo: this.route });
  }

  _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

 
    
public checkPermission(page:string){
  let user = JSON.parse(localStorage.getItem('user'))
  // if(user.permissions){
  //   let permissions = JSON.parse(user.permissions);
  //     if(page=='customer'){
  //       return this.grantPermission(permissions.customer)
  //     }
  //     else if(page=='orders'){
  //       return this.grantPermission(permissions.orders)
  //     }
  //     else if(page=='packages'){
  //       return this.grantPermission(permissions.packages)
  //     }
  //     else if(page=='vehicle-subscription-payments'){
  //       return this.grantPermission(permissions.payments)
  //     }
  //     else if(page=='roles'){
  //       return this.grantPermission(permissions.roles)
  //     }
  //     else if(page=='settings'){
  //       return this.grantPermission(permissions.settings)
  //     }
  //     else if(page=='users'){
  //       return this.grantPermission(permissions.users)
  //     }
  //     else if(page=='vehicles'){
  //       return this.grantPermission(permissions.vehicles)
  //     }
  //     else{
  //       return true
  //     }
  // }
  return true
}

grantPermission(permission:any){
  if(permission.READ){
    return true
  }
  return false
}
}
