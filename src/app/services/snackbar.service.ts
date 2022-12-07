import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  durationInSeconds:number=50;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(type:string="success") {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass:type,
      horizontalPosition:`right`,
      verticalPosition:`top`
    });
  }

  openSnackBarStatus(message:string) {
    this._snackBar.open(message, "action",{
      panelClass:"fail",
      horizontalPosition:`right`,
      verticalPosition:`top`
    });
  }

  snackBarAPI(){

  }

  getServerErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
        case 404: {
          this.openSnackBarStatus(`Not Found: ${error.message}`);
          break;
        }
        case 403: {
          this.openSnackBarStatus(`Access Denied: ${error.message}`);
          break;
        }
        case 500: {
          this.openSnackBarStatus(`Internal Server Error: ${error.message}`)
          break;
        }
        default: {
          this.openSnackBarStatus(`Unknown Server Error: ${error.message}`);
          break;
        }

    }
}
  
}
