import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-document-management-form',
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, RouterLink],
  templateUrl: './document-management-form.html',
  styles: ``,
})
export class DocumentManagementForm implements OnInit {

  documentForm: FormGroup;
  revisionStatuses = ['Vigente', 'Vencido', 'Por vencer', 'Derogado'];
  fileName: string | null = null;

   type!: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.documentForm = this.fb.group({
      indexNumber: [null, Validators.required],
      institutionalProcess: [''],
      iso15189Requirement: [''],
      documentCode: ['', Validators.required],
      documentTitle: ['', Validators.required],
      editionVersion: ['', Validators.required],
      elaborators: ['', Validators.required],
      technicalReviewers: [''],
      formalReviewers: [''],
      officializedBy: ['Director General'],
      approvalDocument: [''],
      approvalDate: [null],
      revisionHistory: [''],
      nextRevision: [null],
      revisionDaysCount: [0],
      revisionStatus: ['Vigente'],
      applicationScope: ['']
    });
  }

  documentTypes = ['POE', 'ITT', 'FOR'];

  ngOnInit(): void {
    // Cálculo automático de días restantes
    this.documentForm.get('nextRevision')?.valueChanges.subscribe(date => {
      if (date) {
        const nextDate = new Date(date);
        const today = new Date();
        const diffTime = nextDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.documentForm.patchValue({ revisionDaysCount: diffDays }, { emitEvent: false });
      }
    });
  }

// ngOnInit() {
//   this.type = this.route.snapshot.paramMap.get('type') || '';
// }

  onSubmit() {
    if (this.documentForm.valid) {
      console.log('Enviando datos...', this.documentForm.value);
    }
    this.type = this.route.snapshot.paramMap.get('type') || '';
  }


  //funciones para el input file
  onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
}

onDrop(event: DragEvent) {
  event.preventDefault();

  const file = event.dataTransfer?.files[0];
  if (file) {
    this.handleFile(file);
  }
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.handleFile(file);
  }
}

handleFile(file: File) {
  this.fileName = file.name;

  // Guardar en el formulario
  this.documentForm.patchValue({
    applicationScope: file
  });

  this.documentForm.get('applicationScope')?.updateValueAndValidity();
}

}
