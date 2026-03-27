import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-personnel-file',
  standalone: true,
  templateUrl: './personnel-file.html',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule
  ]
})
export class PersonnelFile {

  id: string | null = null;
  mode: 'view' | 'edit' | 'delete' | 'create' = 'view';

  charges: string[] = ['Ingeniero', 'Supervisor', 'Analista', 'Asistente', 'Gerente'];
  areas: string[] = ['Producción', 'RRHH', 'Calidad', 'Logística', 'Sistemas', 'Finanzas'];
  statuses: Array<'Activo' | 'Inactivo'> = ['Activo', 'Inactivo'];
  documentTypes: string[] = ['DNI', 'CE', 'Pasaporte'];

  personnel: {
    id?: string | number;
    name: string;
    position: string;
    area: string;
    status: 'Activo' | 'Inactivo';
    email: string;
    phone: string;
    documentType: string;
    documentNumber: string;
    address: string;
    birthDate: string;
    hireDate: string;
    workExperienceDetail: {
      companyName: string;
      positionName: string;
      startDate: string;
      endDate: string;
    };
    recordSummary: {
      profileCode: string;
      inductionCode: string;
      trainingCode: string;
      evaluationCode: string;
      authorizationCode: string;
      reevaluationCode: string;
      continuousEducationCode: string;
      lastUpdateDate: string;
      notes: string;
    };
    records: {
      academicEducation: boolean;
      professionalLicense: boolean;
      workExperience: boolean;
      positionDescription: boolean;
      induction: boolean;
      training: boolean;
      competenceEvaluation: boolean;
      authorizations: boolean;
      reevaluations: boolean;
      continuousEducation: boolean;
      workAccidents: boolean;
      immunization: boolean;
    };
  } = this.emptyPersonnel();
  showMessageModal = false;
  showDeleteConfirmModal = false;
  messageModalTitle = '';
  messageModalText = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.syncModeFromRoute();
      this.loadMockData();
    });

    this.route.queryParamMap.subscribe(() => {
      this.syncModeFromRoute();
    });
  }

  get isCreateMode() {
    return this.mode === 'create' || this.id === null || this.id === 'new';
  }

  get isReadOnly() {
    return this.mode === 'view' || this.mode === 'delete';
  }

  get isViewMode() {
    return this.mode === 'view';
  }

  get isDeleteMode() {
    return this.mode === 'delete';
  }

  get experienceDurationLabel() {
    const { startDate, endDate } = this.personnel.workExperienceDetail;
    if (!startDate || !endDate) return 'Sin calcular';
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return 'Sin calcular';

    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return `${years} años ${months} meses`;
  }

  syncModeFromRoute() {
    const qpMode = (this.route.snapshot.queryParamMap.get('mode') ?? '').toLowerCase();
    if (qpMode === 'edit' || qpMode === 'delete' || qpMode === 'create' || qpMode === 'view') {
      this.mode = qpMode;
      return;
    }

    if (this.id === null || this.id === 'new') {
      this.mode = 'create';
      return;
    }

    this.mode = 'view';
  }

  emptyPersonnel() {
    return {
      name: '',
      position: '',
      area: '',
      status: 'Activo' as const,
      email: '',
      phone: '',
      documentType: 'DNI',
      documentNumber: '',
      address: '',
      birthDate: '',
      hireDate: '',
      workExperienceDetail: {
        companyName: '',
        positionName: '',
        startDate: '',
        endDate: ''
      },
      recordSummary: {
        profileCode: 'FOR-INS-058',
        inductionCode: 'FOR-CNSP-008',
        trainingCode: 'FOR-CNSP-219',
        evaluationCode: 'FOR-CNSP-220',
        authorizationCode: 'FOR-CNSP-221',
        reevaluationCode: 'FOR-CNSP-286',
        continuousEducationCode: 'FOR-CNSP-337',
        lastUpdateDate: '',
        notes: ''
      },
      records: {
        academicEducation: false,
        professionalLicense: false,
        workExperience: false,
        positionDescription: false,
        induction: false,
        training: false,
        competenceEvaluation: false,
        authorizations: false,
        reevaluations: false,
        continuousEducation: false,
        workAccidents: false,
        immunization: false
      }
    };
  }

  loadMockData() {
    if (this.isCreateMode) {
      this.personnel = this.emptyPersonnel();
      return;
    }

    // MOCK DATA (placeholder hasta integrar API)
    this.personnel = {
      id: this.id ?? undefined,
      name: 'Juan Pérez',
      position: 'Ingeniero',
      area: 'Producción',
      status: 'Activo',
      email: 'juan.perez@empresa.com',
      phone: '999999999',
      documentType: 'DNI',
      documentNumber: '12345678',
      address: 'Av. Principal 123',
      birthDate: '1990-01-15',
      hireDate: '2023-02-01',
      workExperienceDetail: {
        companyName: 'Hospital Nacional INS',
        positionName: 'Analista de laboratorio',
        startDate: '2018-01-01',
        endDate: '2022-12-31'
      },
      recordSummary: {
        profileCode: 'FOR-INS-058',
        inductionCode: 'FOR-CNSP-008',
        trainingCode: 'FOR-CNSP-219',
        evaluationCode: 'FOR-CNSP-220',
        authorizationCode: 'FOR-CNSP-221',
        reevaluationCode: 'FOR-CNSP-286',
        continuousEducationCode: 'FOR-CNSP-337',
        lastUpdateDate: '2026-03-20',
        notes: 'Registros al día en inducción, entrenamiento, evaluación y autorización.'
      },
      records: {
        academicEducation: true,
        professionalLicense: true,
        workExperience: true,
        positionDescription: true,
        induction: true,
        training: true,
        competenceEvaluation: true,
        authorizations: true,
        reevaluations: false,
        continuousEducation: true,
        workAccidents: false,
        immunization: true
      }
    };

    if (this.mode === 'delete') {
      // Solo guía visual del modo; la acción se ejecuta con el botón "Eliminar"
      // (no autodelete para evitar borrados accidentales)
    }
  }

  goBack() {
    this.router.navigate(['/personnel-competence/personnel-list']);
  }

  setMode(next: 'view' | 'edit' | 'delete' | 'create') {
    if (this.isCreateMode) {
      this.mode = 'create';
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode: next },
      queryParamsHandling: 'merge'
    });
  }

  save() {
    if (!this.personnel.name?.trim()) {
      this.openMessageModal('Validación', 'El nombre es obligatorio.');
      return;
    }

    if (this.isCreateMode) {
      this.openMessageModal('Éxito', 'Personal creado correctamente.');
      this.goBack();
      return;
    }

    this.openMessageModal('Éxito', 'Cambios guardados correctamente.');
    this.setMode('view');
  }

  delete() {
    if (this.isCreateMode) {
      this.openMessageModal('Información', 'No se puede eliminar: aún no se ha creado.');
      return;
    }
    this.showDeleteConfirmModal = true;
  }

  confirmDelete() {
    this.showDeleteConfirmModal = false;
    this.openMessageModal('Éxito', 'Personal eliminado correctamente.');
    this.goBack();
  }

  cancelDelete() {
    this.showDeleteConfirmModal = false;
  }

  closeMessageModal() {
    this.showMessageModal = false;
  }

  private openMessageModal(title: string, text: string) {
    this.messageModalTitle = title;
    this.messageModalText = text;
    this.showMessageModal = true;
  }

}