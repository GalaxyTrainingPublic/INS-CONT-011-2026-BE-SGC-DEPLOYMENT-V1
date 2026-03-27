import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialog } from '../components/overlays/modals/confirm-dialog/confirm-dialog';


@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private readonly dialog = inject(MatDialog);

  delete(itemName: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      autoFocus: 'button',
      disableClose: true,
      restoreFocus: true,
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
        itemName: itemName,
        confirmText: 'Sí, eliminar',
        cancelText: 'No, cancelar'
      }
    });

    return dialogRef.afterClosed();
  }
}
