import {Component, inject} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  durationInSeconds = 24;

  snackBarRef = inject(MatSnackBarRef);

  constructor(private _snackBar: MatSnackBar) { }

}
