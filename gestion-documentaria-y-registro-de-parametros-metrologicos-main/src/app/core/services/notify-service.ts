import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyType } from '../constants/notify.constant';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private readonly _snack = inject(MatSnackBar);

  show(message: string, type: NotifyType = 'success') {
    this._snack.dismiss();
    this._snack.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`${type}-snack`]
    });
  }
}
