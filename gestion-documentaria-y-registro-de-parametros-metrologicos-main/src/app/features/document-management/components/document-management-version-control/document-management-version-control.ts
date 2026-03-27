import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-management-version-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './document-management-version-control.html'
})
export class DocumentManagementVersionControl {
    form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      version: [''],
      description: ['']
    });
  }

  createVersion() {
    console.log(this.form.value);
  }
}
