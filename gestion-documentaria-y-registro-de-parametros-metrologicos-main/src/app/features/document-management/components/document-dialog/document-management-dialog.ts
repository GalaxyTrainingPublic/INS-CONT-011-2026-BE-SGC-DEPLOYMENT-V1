import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
   selector: 'app-document-management-dialog',
  imports: [MatDialogModule],
  templateUrl: './document-management-dialog.html',
  styles: ``,
})
export class DocumentmanagementDialog {

   dialogRef = inject(MatDialogRef);

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
